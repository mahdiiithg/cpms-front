'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, InputNumber, Select, Spin } from 'antd';
import { ArrowLeft, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { GET_PROPERTY } from '@/lib/queries/property';
import { UPDATE_PROPERTY } from '@/lib/mutations/propertyMutations';
import { getStatusMeta } from '@/lib/listingStatus';
import CpField from '@/components/shared/CpField';
import {
  pageSurfaceClass,
  panelClass,
  solidCtaClass,
  outlineCtaClass,
} from '@/lib/brandTheme';

const { TextArea } = Input;

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const { data: session, status } = useSession();
  const [form] = Form.useForm();

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
    if (!property) return;
    form.setFieldsValue({
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
      address: property.location?.address,
      description: property.description,
    });
  }, [property, form]);

  useEffect(() => {
    if (!property || !session?.userId) return;
    const ownerId = property.agent?.id;
    if (ownerId && String(ownerId) !== String(session.userId)) {
      toast.error('You can only edit your own listings.');
      router.replace('/dashboard/listings');
    }
  }, [property, session?.userId, router]);

  const onFinish = async (values) => {
    try {
      const { data: result } = await updateProperty({
        variables: {
          id,
          input: {
            title: values.title,
            description: values.description || '',
            type: values.type,
            listingType: values.listingType,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
            salePrice: values.listingType === 'sale' ? values.price : null,
            rentPrice: values.listingType === 'rent' ? values.price : null,
            location: {
              city: values.city,
              address: values.address || '',
              country: 'Australia',
            },
            images: property?.images || [],
          },
        },
      });

      const nextStatus = result?.updateProperty?.status;
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
      <div className="mx-auto w-full max-w-2xl">
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
            Saving a live listing sends it back for admin approval. Pending
            listings stay in review.
          </p>
        </div>

        <div className={`${panelClass} p-6`}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="title"
              label={<span className="text-cp-subtle">Title</span>}
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <CpField>
                <Input variant="borderless" placeholder="Oceanfront apartment" size="large" />
              </CpField>
            </Form.Item>

            <div className="grid gap-4 sm:grid-cols-2">
              <Form.Item
                name="listingType"
                label={<span className="text-cp-subtle">Listing type</span>}
                rules={[{ required: true }]}
              >
                <CpField>
                  <Select
                    variant="borderless"
                    size="large"
                    className="w-full"
                    options={[
                      { value: 'sale', label: 'For sale' },
                      { value: 'rent', label: 'For rent' },
                    ]}
                  />
                </CpField>
              </Form.Item>
              <Form.Item
                name="type"
                label={<span className="text-cp-subtle">Property type</span>}
                rules={[{ required: true }]}
              >
                <CpField>
                  <Select
                    variant="borderless"
                    size="large"
                    className="w-full"
                    options={[
                      { value: 'apartment', label: 'Apartment' },
                      { value: 'house', label: 'House' },
                      { value: 'villa', label: 'Villa' },
                      { value: 'townhouse', label: 'Townhouse' },
                      { value: 'penthouse', label: 'Penthouse' },
                    ]}
                  />
                </CpField>
              </Form.Item>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Form.Item
                name="price"
                label={<span className="text-cp-subtle">Price</span>}
                rules={[{ required: true, message: 'Price is required' }]}
              >
                <CpField>
                  <InputNumber
                    variant="borderless"
                    size="large"
                    className="w-full"
                    min={0}
                  />
                </CpField>
              </Form.Item>
              <Form.Item name="bedrooms" label={<span className="text-cp-subtle">Beds</span>}>
                <CpField>
                  <InputNumber variant="borderless" size="large" className="w-full" min={0} />
                </CpField>
              </Form.Item>
              <Form.Item name="bathrooms" label={<span className="text-cp-subtle">Baths</span>}>
                <CpField>
                  <InputNumber variant="borderless" size="large" className="w-full" min={0} />
                </CpField>
              </Form.Item>
            </div>

            <Form.Item
              name="city"
              label={<span className="text-cp-subtle">City</span>}
              rules={[{ required: true, message: 'City is required' }]}
            >
              <CpField>
                <Input variant="borderless" size="large" placeholder="Gold Coast" />
              </CpField>
            </Form.Item>

            <Form.Item name="address" label={<span className="text-cp-subtle">Address</span>}>
              <CpField>
                <Input variant="borderless" size="large" placeholder="Optional street address" />
              </CpField>
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-cp-subtle">Description</span>}
            >
              <CpField className="!items-start !min-h-[7rem] !py-2">
                <TextArea variant="borderless" rows={4} />
              </CpField>
            </Form.Item>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <Button className={outlineCtaClass} href="/dashboard/listings">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={`${solidCtaClass} !h-11 !rounded-full !px-8`}
              >
                Save changes
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
