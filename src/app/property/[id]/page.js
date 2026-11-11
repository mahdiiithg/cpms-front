'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Tag, Spin } from 'antd';
import { toast } from 'sonner';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import {
  MapPin,
  Bed,
  Bath,
  Car,
  Phone,
  Mail,
  Camera,
  Home,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';
import { GET_PROPERTY, GET_PROPERTIES } from '@/lib/queries/property';
import PropertyCard from '@/components/ui/PropertyCard';
import PropertyLocationMap from '@/components/ui/PropertyLocationMap';
import { ListingBreadcrumb } from '@/components/listings';
import { resolvePropertyLatLng } from '@/utils/propertyCoordinates';

/** Coerce API/memory values to a real array before .map/.filter. */
function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  if (typeof value === 'object') {
    if (Array.isArray(value.properties)) return value.properties;
    return Object.values(value);
  }
  return [];
}

const sectionClass =
  'rounded-2xl border border-gray-800/90 bg-[#1a1a1a] p-5 sm:p-6 lg:p-7';
const sectionTitleClass =
  'mb-5 text-xl font-semibold tracking-tight text-white sm:text-2xl';
const primaryCtaClass =
  'w-full !h-11 !border-0 !bg-[#ccff00] !font-semibold !text-[#171717] shadow-[0_0_18px_rgba(204,255,0,0.35)] transition hover:!bg-[#d4ff33] hover:shadow-[0_0_28px_rgba(204,255,0,0.55)]';
const secondaryCtaClass =
  'w-full !h-11 !border !border-[#ccff00]/50 !bg-transparent !font-semibold !text-[#ccff00] transition hover:!border-[#ccff00] hover:!bg-[#ccff00]/10';

function StatCell({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-[#141414] px-3.5 py-3 sm:px-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#ccff00]/20 bg-[#ccff00]/10">
        <Icon className="h-5 w-5 text-[#ccff00]" />
      </div>
      <div className="min-w-0">
        <div className="truncate text-lg font-semibold leading-none text-white">
          {value}
        </div>
        <div className="mt-1 text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { ensureAuth } = useRequireAuth();

  const { data, loading, error } = useQuery(GET_PROPERTY, {
    variables: { id: params.id },
    skip: !params?.id,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const property = data?.property;

  const { data: similarData } = useQuery(GET_PROPERTIES, {
    variables: {
      filters: {
        type: property?.type,
        ...(property?.location?.city
          ? { location: property.location.city }
          : {}),
        limit: 6,
        offset: 0,
      },
    },
    skip: !property?.type,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  if (loading && !property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#171717]">
        <Spin size="large" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#171717] px-4">
        <h2 className="mb-4 text-2xl font-bold text-white">
          {error ? 'Failed to load property' : 'Property Not Found'}
        </h2>
        {error?.message ? (
          <div className="mb-4 max-w-lg text-center text-gray-400">
            {error.message}
          </div>
        ) : null}
        <Button
          className="border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const images = asArray(property.images);
  const features = asArray(property.features);
  const locationFeatures = asArray(property.location?.features);
  const nearbyAttractions = asArray(property.location?.nearbyAttractions);
  const similarList = asArray(similarData?.properties);
  const similarProperties = similarList
    .filter((p) => p && p.id !== property.id)
    .slice(0, 3);

  const formatPrice = (price) => {
    if (price == null || Number.isNaN(Number(price))) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayPrice =
    property.listingType === 'rent'
      ? `${formatPrice(property.rentPrice) || 'Price on request'} / week`
      : formatPrice(property.salePrice) || 'Price on request';

  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE;
  const whatsappBusinessNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || adminPhone;
  const sanitizeDigits = (val) => (val || '').replace(/\D/g, '');

  const handleCallNow = () => {
    if (!ensureAuth('Please login to call our team.')) return;
    const phoneDigits = sanitizeDigits(adminPhone);
    if (!phoneDigits) {
      toast.error('Admin contact number is not configured.');
      return;
    }
    window.location.href = `tel:+${phoneDigits}`;
  };

  const handleSendWhatsApp = () => {
    if (!ensureAuth('Please login to message our team.')) return;
    const waDigits = sanitizeDigits(whatsappBusinessNumber);
    if (!waDigits) {
      toast.error('WhatsApp number is not configured.');
      return;
    }
    if (waDigits.length < 8) {
      toast.error(
        'WhatsApp number must include country code (e.g., 971xxxxxxxxx).',
      );
      return;
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/property/${property.id}`;
    const text = encodeURIComponent(
      `Hello Coast Planet, I'm interested in "${property.title}" (ID: ${property.id}).\nProperty link: ${link}\nPlease contact me.`,
    );
    const waUrl = `https://wa.me/${waDigits}?text=${text}`;
    const apiUrl = `https://api.whatsapp.com/send?phone=${waDigits}&text=${text}`;
    const popup = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      window.location.href = apiUrl;
    }
  };

  const heroImage =
    images[selectedImageIndex] || images[0] || '/images/placeholder-property.png';

  const locationLabel = [
    property.location?.address,
    property.location?.city,
    property.location?.state,
    property.location?.zipCode,
  ]
    .filter(Boolean)
    .join(', ');

  const coords = resolvePropertyLatLng(property.location?.coordinates);

  const goPrev = () => {
    if (images.length < 2) return;
    setSelectedImageIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = () => {
    if (images.length < 2) return;
    setSelectedImageIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <ListingBreadcrumb
        current={property.title}
        items={[
          { href: '/', label: 'Home' },
          { href: '/buy', label: 'Properties' },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {/* Title row */}
        <div className="mb-6 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Tag
                bordered={false}
                className="!m-0 !border !border-gray-700 !bg-[#1a1a1a] !px-2.5 !py-0.5 text-xs font-medium capitalize !text-gray-300"
              >
                {property.listingType}
              </Tag>
              {property.featured && (
                <Tag
                  bordered={false}
                  className="!m-0 !border-0 !bg-[#ccff00] !px-2.5 !py-0.5 text-xs font-semibold !text-[#171717]"
                >
                  Featured
                </Tag>
              )}
              {property.type ? (
                <Tag
                  bordered={false}
                  className="!m-0 !border !border-[#ccff00]/25 !bg-[#ccff00]/10 !px-2.5 !py-0.5 text-xs font-medium capitalize !text-[#ccff00]"
                >
                  {property.type}
                </Tag>
              ) : null}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              {property.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-start gap-x-4 gap-y-2 text-sm text-gray-400 sm:text-base">
              <span className="inline-flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ccff00]" />
                <span>{locationLabel}</span>
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-500">ID {property.id}</span>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-[#ccff00]/25 bg-gradient-to-br from-[#ccff00]/12 via-[#1a1a1a] to-[#141414] px-5 py-4 sm:min-w-[220px] sm:px-6">
            <div className="text-[11px] font-medium tracking-[0.14em] text-gray-400 uppercase">
              Asking price
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight text-[#ccff00] sm:text-4xl">
              {displayPrice}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-8 grid grid-cols-1 gap-3 lg:mb-10 lg:grid-cols-[minmax(0,1fr)_132px] lg:gap-3">
          <div className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-[#0d0d0d]">
            <div className="aspect-[16/10] w-full sm:aspect-[16/9]">
              <img
                src={heroImage}
                alt={property.title}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-sm text-white backdrop-blur-md">
              <Camera className="h-3.5 w-3.5 text-[#ccff00]" />
              <span>
                {images.length
                  ? `${selectedImageIndex + 1} / ${images.length}`
                  : '0'}{' '}
                Photos
              </span>
            </div>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={goPrev}
                  className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur transition hover:border-[#ccff00]/40 hover:text-[#ccff00]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={goNext}
                  className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur transition hover:border-[#ccff00]/40 hover:text-[#ccff00]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 lg:max-h-[min(560px,70vh)]">
            {images.map((image, index) => {
              const active = selectedImageIndex === index;
              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border transition lg:h-auto lg:w-full lg:aspect-square ${
                    active
                      ? 'border-[#ccff00] shadow-[0_0_0_1px_rgba(204,255,0,0.35)]'
                      : 'border-gray-800 hover:border-gray-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>Property details</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCell
                  icon={Bed}
                  value={property.bedrooms ?? '—'}
                  label="Bedrooms"
                />
                <StatCell
                  icon={Bath}
                  value={property.bathrooms ?? '—'}
                  label="Bathrooms"
                />
                <StatCell
                  icon={Car}
                  value={property.parking || 0}
                  label="Parking"
                />
                {property.propertySize ? (
                  <StatCell
                    icon={Maximize2}
                    value={`${property.propertySize} sqm`}
                    label="Internal size"
                  />
                ) : (
                  <StatCell icon={Home} value="—" label="Internal size" />
                )}
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className={sectionTitleClass}>About this property</h2>
              <p className="max-w-3xl text-[15px] leading-7 text-gray-300 sm:text-base sm:leading-7">
                {property.description}
              </p>
            </section>

            {features.length > 0 && (
              <section className={sectionClass}>
                <h2 className={sectionTitleClass}>Features</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((f) => (
                    <Tag
                      key={String(f)}
                      bordered={false}
                      className="!m-0 !rounded-full !border !border-gray-700 !bg-[#141414] !px-3 !py-1 capitalize !text-gray-300"
                    >
                      {String(f).replace(/_/g, ' ')}
                    </Tag>
                  ))}
                </div>
              </section>
            )}

            <section className={sectionClass}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Location
                </h2>
                {(property.location?.walkScore != null ||
                  property.location?.transitScore != null) && (
                  <div className="flex gap-3 text-xs text-gray-500">
                    {property.location?.walkScore != null && (
                      <span>
                        Walk score{' '}
                        <span className="font-semibold text-gray-300">
                          {property.location.walkScore}
                        </span>
                      </span>
                    )}
                    {property.location?.transitScore != null && (
                      <span>
                        Transit{' '}
                        <span className="font-semibold text-gray-300">
                          {property.location.transitScore}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {(locationFeatures.length > 0 || nearbyAttractions.length > 0) && (
                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  {locationFeatures.length > 0 && (
                    <div className="rounded-xl border border-[#ccff00]/15 bg-[#ccff00]/5 p-4">
                      <h3 className="mb-2 text-sm font-semibold text-[#ccff00]">
                        Area highlights
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {locationFeatures.map((feature, index) => (
                          <Tag
                            key={index}
                            bordered={false}
                            className="!m-0 !rounded-full !border !border-[#ccff00]/25 !bg-transparent capitalize !text-[#ccff00]"
                          >
                            {String(feature).replace(/_/g, ' ')}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                  {nearbyAttractions.length > 0 && (
                    <div className="rounded-xl border border-gray-800 bg-[#141414] p-4">
                      <h3 className="mb-2 text-sm font-semibold text-white">
                        Nearby
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {nearbyAttractions.map((attraction, index) => (
                          <Tag
                            key={index}
                            bordered={false}
                            className="!m-0 !rounded-full !border !border-gray-700 !bg-[#111] !text-gray-300"
                          >
                            {attraction}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <PropertyLocationMap
                latitude={coords?.lat}
                longitude={coords?.lng}
                title={property.title}
                address={locationLabel}
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-gray-800 bg-[#1a1a1a] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-6">
                <div className="border-b border-gray-800 pb-4">
                  <div className="text-[11px] font-medium tracking-[0.14em] text-gray-500 uppercase">
                    Listed for {property.listingType}
                  </div>
                  <div className="mt-1 text-3xl font-semibold tracking-tight text-white">
                    {displayPrice}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-700 bg-[#212121]">
                    <img
                      src={
                        property.agent?.avatar || '/images/default-avatar.png'
                      }
                      alt={property.agent?.name || 'Agent'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-white">
                      {property.agent?.name || property.contactPerson}
                    </div>
                    <div className="truncate text-sm text-gray-500">
                      {property.contactEmail}
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2.5">
                  <Button
                    size="large"
                    className={primaryCtaClass}
                    icon={<Phone className="h-4 w-4" />}
                    onClick={handleCallNow}
                  >
                    Call now
                  </Button>
                  <Button
                    size="large"
                    className={secondaryCtaClass}
                    icon={<Mail className="h-4 w-4" />}
                    onClick={handleSendWhatsApp}
                  >
                    Send message
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-[#141414] p-4 text-sm text-gray-400">
                <div className="font-medium text-gray-300">Need a tour?</div>
                <p className="mt-1 leading-relaxed">
                  Message the Coast Planet team to schedule a private viewing
                  or request more photos of this listing.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {similarProperties.length > 0 && (
          <div className="mt-12 border-t border-gray-800 pt-10">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
              Similar properties
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((similarProperty) => (
                <PropertyCard
                  key={similarProperty.id}
                  property={similarProperty}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
