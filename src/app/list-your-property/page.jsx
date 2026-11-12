'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { Building2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { CREATE_LISTING } from '@/lib/mutations/listing';
import { GET_MY_PROPERTIES } from '@/lib/queries/property';
import { upsertMyListingJournal } from '@/lib/myListingsJournal';
import ListingForm from '@/components/listings/ListingForm';
import {
  MIN_LISTING_PHOTOS,
  MAX_LISTING_PHOTOS,
} from '@/components/listings/ListingPhotoUploader';
import {
  pageSurfaceClass,
  panelClass,
} from '@/lib/brandTheme';

export default function ListYourPropertyPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [createListing, { loading }] = useMutation(CREATE_LISTING);

  const onSubmit = async (input) => {
    if (status !== 'authenticated') {
      toast.info('Please sign in to list a property.');
      router.push('/signin?callbackUrl=%2Flist-your-property');
      return;
    }

    try {
      const { data } = await createListing({
        variables: { input },
        refetchQueries: [{ query: GET_MY_PROPERTIES }],
        awaitRefetchQueries: true,
        update: (cache, result) => {
          const created = result?.data?.createProperty;
          if (!created) return;
          try {
            const existing = cache.readQuery({ query: GET_MY_PROPERTIES });
            const prev = existing?.myProperties || [];
            cache.writeQuery({
              query: GET_MY_PROPERTIES,
              data: {
                myProperties: [
                  created,
                  ...prev.filter((p) => p.id !== created.id),
                ],
              },
            });
          } catch {
            // Query may not be in cache yet
          }
        },
      });

      const created = data?.createProperty;
      const userId = session?.userId || session?.user?.id;
      if (created && userId) {
        upsertMyListingJournal(userId, created);
      }

      const savedCity = created?.location?.city;
      toast.success(
        savedCity
          ? `Submitted in ${savedCity} for approval. Track it under My listings.`
          : 'Submitted for approval. Track it under My listings.',
      );
      router.push('/dashboard/listings');
    } catch (error) {
      toast.error(error?.message || 'Could not save property.');
    }
  };

  return (
    <div className={`${pageSurfaceClass} px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/listings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-cp-subtle hover:text-cp-lime"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
            Sell or lease
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Building2 className="h-7 w-7 text-cp-lime" />
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              List your property
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-cp-muted">
            Add a coastal listing with {MIN_LISTING_PHOTOS}–{MAX_LISTING_PHOTOS}{' '}
            photos. New listings start Pending until an admin approves them.
          </p>
        </div>

        <div className={`${panelClass} p-6 sm:p-8`}>
          <ListingForm
            mode="create"
            loading={loading}
            submitLabel="Save property"
            cancelHref="/contact"
            cancelLabel="Talk to an agent"
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
