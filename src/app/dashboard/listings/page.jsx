'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { Button, Spin } from 'antd';
import { Building2, Pencil, Plus } from 'lucide-react';
import { GET_MY_PROPERTIES } from '@/lib/queries/property';
import { getStatusMeta, formatListingPrice } from '@/lib/listingStatus';
import {
  pageSurfaceClass,
  panelClass,
  solidCtaClass,
  outlineCtaClass,
} from '@/lib/brandTheme';

export default function MyListingsPage() {
  const router = useRouter();
  const { status } = useSession();

  const { data, loading, error, refetch } = useQuery(GET_MY_PROPERTIES, {
    skip: status !== 'authenticated',
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin?callbackUrl=%2Fdashboard%2Flistings');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'unauthenticated') {
    return (
      <div className={`${pageSurfaceClass} flex min-h-[50vh] items-center justify-center`}>
        <Spin size="large" />
      </div>
    );
  }

  const listings = data?.myProperties || [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
            Account
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Building2 className="h-7 w-7 text-cp-lime" />
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              My listings
            </h1>
          </div>
          <p className="mt-2 max-w-xl text-cp-muted">
            Track approval status for your Coast Planet listings. Edits to live
            listings return them to review before they show publicly again.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className={outlineCtaClass} onClick={() => refetch()}>
            Refresh
          </Button>
          <Button
            type="primary"
            className={solidCtaClass}
            icon={<Plus className="h-4 w-4" />}
            href="/list-your-property"
          >
            New listing
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spin size="large" />
        </div>
      ) : error && listings.length === 0 ? (
        <div className={`${panelClass} p-8 text-center`}>
          <p className="text-cp-muted">
            {error.message || 'Could not load your listings.'}
          </p>
        </div>
      ) : listings.length === 0 ? (
        <div className={`${panelClass} p-8 text-center`}>
          <p className="text-cp-muted">
            You have not listed a property yet. Create one to start the approval
            cycle.
          </p>
          <div className="mt-6">
            <Link href="/list-your-property">
              <Button type="primary" className={solidCtaClass}>
                List your property
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((property) => {
            const meta = getStatusMeta(property.status);
            const image = property.images?.[0];
            return (
              <div
                key={property.id}
                className={`${panelClass} flex flex-col gap-4 p-4 sm:flex-row sm:items-center`}
              >
                <div className="h-28 w-full overflow-hidden rounded-xl bg-cp-elevated sm:h-24 sm:w-36 sm:flex-shrink-0">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-cp-faint">
                      No photo
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-lg font-semibold text-white">
                      {property.title}
                    </h2>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.className}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-cp-muted">
                    {[property.location?.city, property.location?.state]
                      .filter(Boolean)
                      .join(', ') || 'Coastal AU'}
                    {' · '}
                    {property.listingType === 'rent' ? 'For rent' : 'For sale'}
                    {' · '}
                    {formatListingPrice(property)}
                  </p>
                  {property.status === 'rejected' && property.rejectionReason ? (
                    <p className="mt-2 text-sm text-red-300">
                      Reason: {property.rejectionReason}
                    </p>
                  ) : null}
                  {property.status === 'pending' ||
                  property.status === 'pending_review' ? (
                    <p className="mt-2 text-sm text-cp-subtle">
                      Waiting for admin approval before appearing on public
                      listings.
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                  <Button
                    className={outlineCtaClass}
                    icon={<Pencil className="h-4 w-4" />}
                    href={`/dashboard/listings/${property.id}/edit`}
                  >
                    Edit
                  </Button>
                  {property.status === 'approved' ? (
                    <Button className={outlineCtaClass} href={`/property/${property.id}`}>
                      View live
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
