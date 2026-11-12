'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Input, Modal, Spin } from 'antd';
import { Check, Shield, X } from 'lucide-react';
import { toast } from 'sonner';
import { GET_PENDING_PROPERTIES } from '@/lib/queries/property';
import {
  APPROVE_PROPERTY,
  REJECT_PROPERTY,
} from '@/lib/mutations/propertyMutations';
import { getStatusMeta, formatListingPrice } from '@/lib/listingStatus';
import {
  pageSurfaceClass,
  panelClass,
  solidCtaClass,
  outlineCtaClass,
} from '@/lib/brandTheme';

export default function AdminListingsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const isAdmin = Boolean(session?.admin || session?.user?.admin);

  const { data, loading, refetch } = useQuery(GET_PENDING_PROPERTIES, {
    skip: status !== 'authenticated' || !isAdmin,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  });

  const [approveProperty, { loading: approving }] = useMutation(APPROVE_PROPERTY);
  const [rejectProperty, { loading: rejecting }] = useMutation(REJECT_PROPERTY);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signin?callbackUrl=%2Fadmin%2Flistings');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && !isAdmin) {
      toast.error('Admin access required.');
      router.replace('/dashboard');
    }
  }, [status, isAdmin, router]);

  const onApprove = async (id) => {
    try {
      await approveProperty({ variables: { id } });
      toast.success('Listing approved and now live.');
      refetch();
    } catch (error) {
      toast.error(error?.message || 'Could not approve listing.');
    }
  };

  const onRejectConfirm = async () => {
    if (!rejectId) return;
    try {
      await rejectProperty({
        variables: {
          id: rejectId,
          reason: rejectReason || 'Does not meet listing guidelines',
        },
      });
      toast.success('Listing rejected.');
      setRejectId(null);
      setRejectReason('');
      refetch();
    } catch (error) {
      toast.error(error?.message || 'Could not reject listing.');
    }
  };

  if (
    status === 'loading' ||
    status === 'unauthenticated' ||
    (status === 'authenticated' && !isAdmin)
  ) {
    return (
      <div className={`${pageSurfaceClass} flex min-h-[50vh] items-center justify-center`}>
        <Spin size="large" />
      </div>
    );
  }

  const pending = data?.pendingProperties || [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cp-lime">
            Admin
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Shield className="h-7 w-7 text-cp-lime" />
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Pending listings
            </h1>
          </div>
          <p className="mt-2 max-w-xl text-cp-muted">
            Approve or reject user submissions and re-approval edits. Demo admin:{' '}
            <span className="text-cp-lime">admin@coastplanet.com</span>
          </p>
        </div>
        <Button className={outlineCtaClass} onClick={() => refetch()}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Spin size="large" />
        </div>
      ) : pending.length === 0 ? (
        <div className={`${panelClass} p-8 text-center`}>
          <p className="text-cp-muted">No listings waiting for approval.</p>
          <Link href="/dashboard/listings" className="mt-4 inline-block text-cp-lime">
            Go to My listings
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {pending.map((property) => {
            const meta = getStatusMeta(property.status);
            return (
              <div
                key={property.id}
                className={`${panelClass} flex flex-col gap-4 p-4 sm:flex-row sm:items-center`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-white">
                      {property.title}
                    </h2>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.className}`}
                    >
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-cp-muted">
                    {[property.location?.city, property.location?.address]
                      .filter(Boolean)
                      .join(' · ') || 'No location'}
                    {' · '}
                    {property.listingType === 'rent' ? 'Rent' : 'Sale'}
                    {' · '}
                    {formatListingPrice(property)}
                  </p>
                  <p className="mt-1 text-sm text-cp-subtle">
                    Owner:{' '}
                    {property.agent?.name ||
                      property.agent?.email ||
                      'Unknown'}
                  </p>
                  {property.description ? (
                    <p className="mt-2 line-clamp-2 text-sm text-cp-muted">
                      {property.description}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="primary"
                    className={solidCtaClass}
                    icon={<Check className="h-4 w-4" />}
                    loading={approving}
                    onClick={() => onApprove(property.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    danger
                    icon={<X className="h-4 w-4" />}
                    loading={rejecting}
                    onClick={() => {
                      setRejectId(property.id);
                      setRejectReason('');
                    }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        title="Reject listing"
        open={Boolean(rejectId)}
        onCancel={() => setRejectId(null)}
        onOk={onRejectConfirm}
        okText="Reject"
        confirmLoading={rejecting}
        okButtonProps={{ danger: true }}
      >
        <p className="mb-3 text-sm text-cp-muted">
          Optionally add a reason shown to the listing owner.
        </p>
        <Input.TextArea
          rows={3}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Does not meet listing guidelines"
        />
      </Modal>
    </div>
  );
}
