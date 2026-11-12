'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';
import CpField from '@/components/shared/CpField';
import ListingPhotoUploader, {
  MIN_LISTING_PHOTOS,
  MAX_LISTING_PHOTOS,
} from '@/components/listings/ListingPhotoUploader';
import ListingLocationPicker from '@/components/listings/ListingLocationPicker';
import { CITY_COORD_FALLBACKS } from '@/utils/geocode';
import { outlineCtaClass, solidCtaClass } from '@/lib/brandTheme';

const { TextArea } = Input;

const lightFieldStyle = {
  color: '#ffffff',
  WebkitTextFillColor: '#ffffff',
  caretColor: '#ccff00',
};

export const CITY_OPTIONS = [
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

export const STATE_OPTIONS = [
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

export const COUNTRY_OPTIONS = [
  { label: 'Australia', value: 'Australia' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United States', value: 'United States' },
];

export const CITY_LOCATION_DEFAULTS = {
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

export const toOptionalNumber = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

export const toRequiredInt = (value) => {
  const n = toOptionalNumber(value);
  return n === undefined ? 0 : Math.trunc(n);
};

function FieldLabel({ children, optional = false }) {
  return (
    <span className="text-cp-subtle">
      {children}
      {optional ? ' (optional)' : null}
    </span>
  );
}

/** Build GraphQL PropertyInput from form values + photos + coords. */
export function buildListingInput({ values, photos, coords }) {
  return {
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
          : CITY_COORD_FALLBACKS[String(values.city || '').trim()] || null,
    },
  };
}

/**
 * Shared create/edit listing form (photos 8–11, map pin, full location).
 */
export default function ListingForm({
  mode = 'create',
  initialValues = null,
  initialPhotos = [],
  initialCoords = null,
  loading = false,
  submitLabel,
  cancelHref = '/dashboard/listings',
  cancelLabel = 'Cancel',
  onSubmit,
}) {
  const [form] = Form.useForm();
  const [photos, setPhotos] = useState(initialPhotos || []);
  const [photoError, setPhotoError] = useState('');
  const [coords, setCoords] = useState(initialCoords);

  useEffect(() => {
    if (!initialValues) return;
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  useEffect(() => {
    setPhotos(Array.isArray(initialPhotos) ? initialPhotos : []);
  }, [initialPhotos]);

  useEffect(() => {
    setCoords(initialCoords || null);
  }, [initialCoords]);

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

  const handleFinish = async (values) => {
    const err = validatePhotos(photos);
    if (err) {
      setPhotoError(err);
      toast.error(err);
      return;
    }
    setPhotoError('');
    const input = buildListingInput({ values, photos, coords });
    return onSubmit?.(input, { values, photos, coords });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="cp-dark-form"
      onFinish={handleFinish}
      initialValues={{
        listingType: 'sale',
        type: 'apartment',
        country: 'Australia',
        state: 'QLD',
        ...(initialValues || {}),
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
        <Form.Item name="bedrooms" label={<FieldLabel optional>Beds</FieldLabel>}>
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
          City is required. State and country sync with Coast Planet listing
          location objects.
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
          Click the map to drop a pin, or type city/address to move the marker.
          Coordinates save with the listing.
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
        <Button className={outlineCtaClass} href={cancelHref}>
          {cancelLabel}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className={`${solidCtaClass} !h-11 !rounded-full !px-8`}
        >
          {submitLabel ||
            (mode === 'edit' ? 'Save changes' : 'Save property')}
        </Button>
      </div>
    </Form>
  );
}
