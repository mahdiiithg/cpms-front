'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { ArrowLeft, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { GET_PROPERTY, GET_MY_PROPERTIES } from '@/lib/queries/property';
import { UPDATE_PROPERTY } from '@/lib/mutations/propertyMutations';
import { upsertMyListingJournal } from '@/lib/myListingsJournal';
import { getStatusMeta } from '@/lib/listingStatus';
import ListingForm from '@/components/listings/ListingForm';
import {
  pageSurfaceClass,
  panelClass,
} from '@/lib/brandTheme';

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { data: session, status } = useSession();

  const { data, loading: loadingProperty } = useQuery(GET_PROPERTY, {
    variables: { id },
    skip: !id || status !== 'authenticated',
    fetchPolicy: 'network-only',
  });

  const [updateProperty, { loading }] = useMutation(UPDATE_PROPERTY);
  const property = data?.property;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(
        `/signin?callbackUrl=${encodeURIComponent(`/dashboard/listings/${id}/edit`)}`,
      );
    }
  }, [status, router, id]);

  useEffect(() => {
    if (!property || !session?.userId) return;
    const ownerId = property.agent?.id;
    if (ownerId && String(ownerId) !== String(session.userId)) {
      toast.error('You can only edit your own listings.');
      router.replace('/dashboard/listings');
    }
  }, [property, session?.userId, router]);

  const initialValues = useMemo(() => {
    if (!property) return null;
    return {
      title: property.title,
      listingType: property.listingType || 'sale',
      type: property.type || 'apartment',
      price:
        property.listingType === 'rent'
          ? property.rentPrice
          : property.salePrice,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      city: property.location?.city,
      state: property.location?.state || 'QLD',
      country: property.location?.country || 'Australia',
      address: property.location?.address,
      zipCode: property.location?.zipCode,
      description: property.description,
    };
  }, [property]);

  const initialPhotos = useMemo(() => {
    if (!property?.images?.length) return [];
    return property.images.filter(Boolean);
  }, [property]);

  const initialCoords = useMemo(() => {
    const c = property?.location?.coordinates;
    if (
      c &&
      Number.isFinite(Number(c.latitude)) &&
      Number.isFinite(Number(c.longitude))
    ) {
      return {
        latitude: Number(c.latitude),
        longitude: Number(c.longitude),
      };
    }
    return null;
  }, [property]);

  const onSubmit = async (input) => {
    try {
      const { data: result } = await updateProperty({
        variables: { id, input },
        refetchQueries: [{ query: GET_MY_PROPERTIES }],
      });

      const updated = result?.updateProperty;
      const userId = session?.userId || session?.user?.id;
      if (updated && userId) upsertMyListingJournal(userId, updated);

      const nextStatus = updated?.status;
      if (nextStatus === 'pending_review') {
        toast.success('Saved. Listing needs re-approval before going live.');
      } else if (nextStatus === 'pending') {
        toast.success('Saved. Listing remains pending approval.');
      } else {
        toast.success('Listing updated.');
      }
      router.push('/dashboard/listings');
    } catch (error) {
      toast.error(error?.message || 'Could not update listing.');
    }
  };

  if (status === 'loading' || status === 'unauthenticated' || loadingProperty) {
    return (
      <div className={`${pageSurfaceClass} flex min-h-[50vh] items-center justify-center`}>
        <Spin size="large" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className={`${pageSurfaceClass} px-4 py-10`}>
        <div className={`${panelClass} mx-auto max-w-lg p-8 text-center`}>
          <p className="text-cp-muted">Listing not found.</p>
          <Link href="/dashboard/listings" className="mt-4 inline-block text-cp-lime">
            Back to My listings
          </Link>
        </div>
      </div>
    );
  }

  const meta = getStatusMeta(property.status);

  return (
    <div className={`${pageSurfaceClass} px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/dashboard/listings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-cp-subtle hover:text-cp-lime"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My listings
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
            Edit listing
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Pencil className="h-7 w-7 text-cp-lime" />
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              {property.title}
            </h1>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.className}`}
            >
              {meta.label}
            </span>
          </div>
          <p className="mt-2 text-cp-muted">
            Same form as create — photos, map pin, and full location. Saving a
            live listing sends it back for admin approval.
          </p>
        </div>

        <div className={`${panelClass} p-6 sm:p-8`}>
          <ListingForm
            mode="edit"
            loading={loading}
            initialValues={initialValues}
            initialPhotos={initialPhotos}
            initialCoords={initialCoords}
            submitLabel="Save changes"
            cancelHref="/dashboard/listings"
            cancelLabel="Cancel"
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
