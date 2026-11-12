'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import { Building2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { CREATE_LISTING } from '@/lib/mutations/listing';
import CpField from '@/components/shared/CpField';
import ListingPhotoUploader, {
  MIN_LISTING_PHOTOS,
  MAX_LISTING_PHOTOS,
} from '@/components/listings/ListingPhotoUploader';
import {
  pageSurfaceClass,
  panelClass,
  solidCtaClass,
  outlineCtaClass,
} from '@/lib/brandTheme';

const { TextArea } = Input;

export default function ListYourPropertyPage() {
  const router = useRouter();
  const { status } = useSession();
  const [form] = Form.useForm();
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState('');
  const [createListing, { loading }] = useMutation(CREATE_LISTING);

  const validatePhotos = (list) => {
    const count = Array.isArray(list) ? list.length : 0;
    if (count < MIN_LISTING_PHOTOS) {
      return `Please upload at least ${MIN_LISTING_PHOTOS} photos (you have ${count}).`;
    }
    if (count > MAX_LISTING_PHOTOS) {
      return `Please upload at most ${MAX_LISTING_PHOTOS} photos (you have ${count}).`;
    }
    return '';
  };

  const onFinish = async (values) => {
    if (status !== 'authenticated') {
      toast.info('Please sign in to list a property.');
      router.push('/signin?callbackUrl=%2Flist-your-property');
      return;
    }

    const err = validatePhotos(photos);
    if (err) {
      setPhotoError(err);
      toast.error(err);
      return;
    }
    setPhotoError('');

    try {
      const { data } = await createListing({
        variables: {
          input: {
            title: values.title,
            description: values.description || '',
            type: values.type,
            listingType: values.listingType,
            bedrooms: values.bedrooms,
            bathrooms: values.bathrooms,
            salePrice: values.listingType === 'sale' ? values.price : null,
            rentPrice: values.listingType === 'rent' ? values.price : null,
            images: photos,
            location: {
              city: values.city,
              address: values.address || '',
              country: 'Australia',
            },
          },
        },
      });

      const id = data?.createProperty?.id;
      toast.success('Property listed with photo gallery.');
      if (id) router.push(`/property/${id}`);
      else router.push('/listings');
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
            photos. Demo listings are stored in the memory GraphQL shim for this
            session.
          </p>
        </div>

        <div className={`${panelClass} p-6 sm:p-8`}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ listingType: 'sale', type: 'apartment' }}
            requiredMark="optional"
          >
            <Form.Item
              name="title"
              label={<span className="text-cp-subtle">Title</span>}
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <CpField>
                <Input
                  variant="borderless"
                  placeholder="Oceanfront apartment"
                  size="large"
                />
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
                    placeholder="850000"
                  />
                </CpField>
              </Form.Item>
              <Form.Item
                name="bedrooms"
                label={<span className="text-cp-subtle">Beds</span>}
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
              <Form.Item
                name="bathrooms"
                label={<span className="text-cp-subtle">Baths</span>}
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
            </div>

            <Form.Item
              name="city"
              label={<span className="text-cp-subtle">City</span>}
              rules={[{ required: true, message: 'City is required' }]}
            >
              <CpField>
                <Input
                  variant="borderless"
                  size="large"
                  placeholder="Gold Coast"
                />
              </CpField>
            </Form.Item>

            <Form.Item
              name="address"
              label={<span className="text-cp-subtle">Address</span>}
            >
              <CpField>
                <Input
                  variant="borderless"
                  size="large"
                  placeholder="Optional street address"
                />
              </CpField>
            </Form.Item>

            <Form.Item
              name="description"
              label={<span className="text-cp-subtle">Description</span>}
            >
              <CpField className="!items-start !min-h-[7rem] !py-2">
                <TextArea
                  variant="borderless"
                  rows={4}
                  placeholder="Highlight coastal features, views, and amenities"
                />
              </CpField>
            </Form.Item>

            <div className="mb-6 rounded-2xl border border-cp-stroke bg-cp-elevated/40 p-4">
              <ListingPhotoUploader
                value={photos}
                onChange={(next) => {
                  setPhotos(next);
                  setPhotoError(validatePhotos(next));
                }}
              />
              {photoError ? (
                <p className="mt-2 text-sm text-red-400">{photoError}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              <Button className={outlineCtaClass} href="/contact">
                Talk to an agent
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className={`${solidCtaClass} !h-11 !rounded-full !px-8`}
              >
                Save property
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
