'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { Building2, ArrowLeft, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { CREATE_LISTING } from '@/lib/mutations/listing';
import CpField from '@/components/shared/CpField';
import ListingPhotoUploader, {
  MIN_LISTING_PHOTOS,
  MAX_LISTING_PHOTOS,
} from '@/components/listings/ListingPhotoUploader';
import ListingLocationPicker from '@/components/listings/ListingLocationPicker';
import { CITY_COORD_FALLBACKS } from '@/utils/geocode';
import {
  pageSurfaceClass,
  panelClass,
  solidCtaClass,
  outlineCtaClass,
} from '@/lib/brandTheme';

const { TextArea } = Input;

/** Inline ink — Ant InputNumber ignored shared CSS in some browsers; keep digits light. */
const lightFieldStyle = {
  color: '#ffffff',
  WebkitTextFillColor: '#ffffff',
  caretColor: '#ccff00',
};

const CITY_OPTIONS = [
  { label: 'Gold Coast', value: 'Gold Coast' },
  { label: 'Sunshine Coast', value: 'Sunshine Coast' },
  { label: 'Brisbane', value: 'Brisbane' },
  { label: 'Sydney', value: 'Sydney' },
  { label: 'Melbourne', value: 'Melbourne' },
  { label: 'Perth', value: 'Perth' },
  { label: 'Adelaide', value: 'Adelaide' },
  { label: 'Cairns', value: 'Cairns' },
  { label: 'Dubai', value: 'Dubai' },
  { label: 'Abu Dhabi', value: 'Abu Dhabi' },
  { label: 'Miami', value: 'Miami' },
];

const STATE_OPTIONS = [
  { label: 'Queensland', value: 'QLD' },
  { label: 'New South Wales', value: 'NSW' },
  { label: 'Victoria', value: 'VIC' },
  { label: 'Western Australia', value: 'WA' },
  { label: 'South Australia', value: 'SA' },
  { label: 'Tasmania', value: 'TAS' },
  { label: 'Australian Capital Territory', value: 'ACT' },
  { label: 'Northern Territory', value: 'NT' },
  { label: 'Dubai', value: 'Dubai' },
  { label: 'Abu Dhabi', value: 'Abu Dhabi' },
  { label: 'Florida', value: 'FL' },
];

const COUNTRY_OPTIONS = [
  { label: 'Australia', value: 'Australia' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United States', value: 'United States' },
];

const CITY_LOCATION_DEFAULTS = {
  'Gold Coast': { state: 'QLD', country: 'Australia' },
  'Sunshine Coast': { state: 'QLD', country: 'Australia' },
  Brisbane: { state: 'QLD', country: 'Australia' },
  Cairns: { state: 'QLD', country: 'Australia' },
  Sydney: { state: 'NSW', country: 'Australia' },
  Melbourne: { state: 'VIC', country: 'Australia' },
  Perth: { state: 'WA', country: 'Australia' },
  Adelaide: { state: 'SA', country: 'Australia' },
  Dubai: { state: 'Dubai', country: 'United Arab Emirates' },
  'Abu Dhabi': { state: 'Abu Dhabi', country: 'United Arab Emirates' },
  Miami: { state: 'FL', country: 'United States' },
};

const toOptionalNumber = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const toRequiredInt = (value) => {
  const n = toOptionalNumber(value);
  return n === undefined ? 0 : Math.trunc(n);
};

/** One shared label ink — optional suffix must match the field name exactly. */
const FIELD_LABEL_CLASS = 'text-cp-subtle';

function FieldLabel({ children, optional = false }) {
  return (
    <span className={FIELD_LABEL_CLASS}>
      {children}
      {optional ? ' (optional)' : null}
    </span>
  );
}

export default function ListYourPropertyPage() {
  const router = useRouter();
  const { status } = useSession();
  const [form] = Form.useForm();
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState('');
  const [coords, setCoords] = useState(null);
  const [createListing, { loading }] = useMutation(CREATE_LISTING);

  const watchedCity = Form.useWatch('city', form);
  const watchedAddress = Form.useWatch('address', form);
  const watchedState = Form.useWatch('state', form);
  const watchedCountry = Form.useWatch('country', form);

  const mapSearchQuery = useMemo(() => {
    return [watchedAddress, watchedCity, watchedState, watchedCountry]
      .map((v) => String(v || '').trim())
      .filter(Boolean)
      .join(', ');
  }, [watchedAddress, watchedCity, watchedState, watchedCountry]);

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
            bedrooms: toRequiredInt(values.bedrooms),
            bathrooms: toRequiredInt(values.bathrooms),
            salePrice:
              values.listingType === 'sale'
                ? toOptionalNumber(values.price) ?? null
                : null,
            rentPrice:
              values.listingType === 'rent'
                ? toOptionalNumber(values.price) ?? null
                : null,
            images: photos,
            location: {
              address: String(values.address || '').trim(),
              city: String(values.city || '').trim(),
              state: String(values.state || '').trim(),
              country: String(values.country || 'Australia').trim(),
              zipCode: String(values.zipCode || '').trim() || null,
              coordinates:
                coords &&
                Number.isFinite(Number(coords.latitude)) &&
                Number.isFinite(Number(coords.longitude))
                  ? {
                      latitude: Number(coords.latitude),
                      longitude: Number(coords.longitude),
                    }
                  : CITY_COORD_FALLBACKS[String(values.city || '').trim()] ||
                    null,
            },
          },
        },
      });

      const id = data?.createProperty?.id;
      const savedCity = data?.createProperty?.location?.city;
      toast.success(
        savedCity
          ? `Property listed in ${savedCity} with photo gallery.`
          : 'Property listed with photo gallery.'
      );
      if (id) router.push(`/property/${id}`);
      else router.push('/listings');
    } catch (error) {
      toast.error(error?.message || 'Could not save property.');
    }
  };

  const onCityChange = (city) => {
    const defaults = CITY_LOCATION_DEFAULTS[city];
    form.setFieldsValue({
      city,
      ...(defaults
        ? { state: defaults.state, country: defaults.country }
        : {}),
    });
    const fallback = CITY_COORD_FALLBACKS[city];
    if (fallback) setCoords(fallback);
  };

  const onMapResolvedLocation = (resolved) => {
    if (!resolved) return;
    const next = {};
    if (resolved.city) next.city = resolved.city;
    if (resolved.state) {
      const match = STATE_OPTIONS.find(
        (s) =>
          s.value === resolved.state ||
          s.label.toLowerCase() === String(resolved.state).toLowerCase() ||
          String(resolved.state).toLowerCase().includes(s.label.toLowerCase()),
      );
      next.state = match?.value || resolved.state;
    }
    if (resolved.country) {
      const match = COUNTRY_OPTIONS.find(
        (c) =>
          c.value === resolved.country ||
          String(resolved.country)
            .toLowerCase()
            .includes(c.value.toLowerCase()),
      );
      next.country = match?.value || resolved.country;
    }
    if (resolved.road && !form.getFieldValue('address')) {
      next.address = resolved.road;
    }
    if (resolved.postcode && !form.getFieldValue('zipCode')) {
      next.zipCode = resolved.postcode;
    }
    if (Object.keys(next).length) form.setFieldsValue(next);
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
            className="cp-dark-form"
            onFinish={onFinish}
            initialValues={{
              listingType: 'sale',
              type: 'apartment',
              country: 'Australia',
              state: 'QLD',
            }}
            requiredMark={false}
          >
            <Form.Item
              name="title"
              label={<FieldLabel>Title</FieldLabel>}
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
                label={<FieldLabel>Listing type</FieldLabel>}
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
                label={<FieldLabel>Property type</FieldLabel>}
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
                label={<FieldLabel>Price</FieldLabel>}
                rules={[{ required: true, message: 'Price is required' }]}
              >
                <CpField>
                  <Input
                    variant="borderless"
                    size="large"
                    inputMode="decimal"
                    placeholder="850000"
                    style={lightFieldStyle}
                    className="!text-white placeholder:!text-cp-muted"
                  />
                </CpField>
              </Form.Item>
              <Form.Item
                name="bedrooms"
                label={<FieldLabel optional>Beds</FieldLabel>}
              >
                <CpField>
                  <Input
                    variant="borderless"
                    size="large"
                    inputMode="numeric"
                    placeholder="2"
                    style={lightFieldStyle}
                    className="!text-white placeholder:!text-cp-muted"
                  />
                </CpField>
              </Form.Item>
              <Form.Item
                name="bathrooms"
                label={<FieldLabel optional>Baths</FieldLabel>}
              >
                <CpField>
                  <Input
                    variant="borderless"
                    size="large"
                    inputMode="numeric"
                    placeholder="2"
                    style={lightFieldStyle}
                    className="!text-white placeholder:!text-cp-muted"
                  />
                </CpField>
              </Form.Item>
            </div>

            <div className="mb-2 mt-1">
              <p className="text-sm font-medium text-white">Location</p>
              <p className="text-xs text-cp-faint">
                City is required. State and country sync with Coast Planet
                listing location objects.
              </p>
            </div>

            <Form.Item
              name="city"
              label={<FieldLabel>City</FieldLabel>}
              rules={[{ required: true, message: 'City is required' }]}
            >
              <CpField className="gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-cp-faint" />
                <Select
                  variant="borderless"
                  size="large"
                  className="w-full"
                  showSearch
                  optionFilterProp="label"
                  placeholder="Select city"
                  options={CITY_OPTIONS}
                  onChange={onCityChange}
                />
              </CpField>
            </Form.Item>

            <div className="grid gap-4 sm:grid-cols-2">
              <Form.Item
                name="state"
                label={<FieldLabel>State / region</FieldLabel>}
                rules={[{ required: true, message: 'State is required' }]}
              >
                <CpField>
                  <Select
                    variant="borderless"
                    size="large"
                    className="w-full"
                    showSearch
                    optionFilterProp="label"
                    placeholder="Select state"
                    options={STATE_OPTIONS}
                  />
                </CpField>
              </Form.Item>
              <Form.Item
                name="country"
                label={<FieldLabel>Country</FieldLabel>}
                rules={[{ required: true, message: 'Country is required' }]}
              >
                <CpField>
                  <Select
                    variant="borderless"
                    size="large"
                    className="w-full"
                    options={COUNTRY_OPTIONS}
                  />
                </CpField>
              </Form.Item>
            </div>

            <Form.Item
              name="address"
              label={<FieldLabel optional>Street address</FieldLabel>}
            >
              <CpField className="gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-cp-faint" />
                <Input
                  variant="borderless"
                  size="large"
                  placeholder="Optional street address"
                  style={lightFieldStyle}
                  className="!text-white placeholder:!text-cp-muted"
                />
              </CpField>
            </Form.Item>

            <Form.Item
              name="zipCode"
              label={<FieldLabel optional>Postcode</FieldLabel>}
            >
              <CpField>
                <Input
                  variant="borderless"
                  size="large"
                  inputMode="numeric"
                  placeholder="Optional postcode"
                  style={lightFieldStyle}
                  className="!text-white placeholder:!text-cp-muted"
                />
              </CpField>
            </Form.Item>

            <div className="mb-6">
              <p className="mb-1 text-sm font-medium text-white">Map pin</p>
              <p className="mb-3 text-xs text-cp-subtle">
                Click the map to drop a pin, or type city/address to move the
                marker. Coordinates save with the listing.
              </p>
              <ListingLocationPicker
                value={coords}
                onChange={setCoords}
                searchQuery={mapSearchQuery}
                onResolvedLocation={onMapResolvedLocation}
              />
            </div>

            <Form.Item
              name="description"
              label={<FieldLabel optional>Description</FieldLabel>}
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
