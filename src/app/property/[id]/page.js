'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Button, Divider, Tag, Spin, Rate, Input, Form } from 'antd';
import { toast } from 'sonner';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import {
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Heart,
  Share2,
  Calendar,
  Phone,
  Mail,
  Camera,
  ArrowLeft,
  Home,
} from 'lucide-react';
import { GET_PROPERTY, GET_PROPERTIES } from '@/lib/queries/property';
import PropertyCard from '@/components/ui/PropertyCard';
import ImageSlider from '@/components/ui/ImageSlider/ImageSlider';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [form] = Form.useForm();
  const { ensureAuth } = useRequireAuth();

  const { data, loading, error } = useQuery(GET_PROPERTY, {
    variables: { id: params.id },
    skip: !params?.id,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });

  const property = data?.property;

  // Fetch similar properties by type (and optionally city), defined before early returns to keep hooks order stable
  const { data: similarData } = useQuery(GET_PROPERTIES, {
    variables: {
      filters: {
        type: data?.property?.type,
        ...(data?.property?.location?.city
          ? { location: data.property.location.city }
          : {}),
      },
      limit: 6,
      offset: 0,
    },
    skip: !data?.property?.type,
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Failed to load property</h2>
        <div className="mb-4 text-gray-600">{error.message}</div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Property Not Found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const handleContactSubmit = (values) => {
    console.log('Contact form submitted:', values);
    // Handle form submission here
    setShowContactForm(false);
    form.resetFields();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayPrice = property.listingType === 'rent'
    ? `${formatPrice(property.rentPrice)} / week`
    : property.salePrice
      ? `${formatPrice(property.salePrice)}`
      : 'Price on request';

  // Contact actions
  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE;
  const whatsappBusinessNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER || adminPhone;
  const sanitizeDigits = (val) => (val || '').replace(/\D/g, '');

  const handleCallNow = () => {
    if (!ensureAuth('Please login to call our team.')) return;
    const phoneDigits = sanitizeDigits(adminPhone);
    if (!phoneDigits) {
      toast.error('Admin contact number is not configured.');
      return;
    }
    // Trigger device dialer
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
      toast.error('WhatsApp number must include country code (e.g., 971xxxxxxxxx).');
      return;
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/property/${property.id}`;
    const text = encodeURIComponent(
      `Hello Coast Planet, I'm interested in "${property.title}" (ID: ${property.id}).\nProperty link: ${link}\nPlease contact me.`
    );
    const waUrl = `https://wa.me/${waDigits}?text=${text}`;
    const apiUrl = `https://api.whatsapp.com/send?phone=${waDigits}&text=${text}`;
    // Try opening in a new tab; if blocked, fall back to same-tab navigation and alternate endpoint
    const popup = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!popup) {
      // Some browsers block window.open; navigate in the same tab instead
      window.location.href = apiUrl;
    }
  };

  const amenityIcons = {
    wifi: <Wifi className="h-5 w-5" />,
    parking: <Car className="h-5 w-5" />,
    pool: '🏊‍♂️',
    spa: '🛁',
    air_conditioning: '❄️',
    kitchen: '🍳',
    bbq_grill: '🔥',
    gym: '🏋️‍♂️',
    security_system: '🔒',
    smart_home: '🏠',
    wine_cellar: '🍷',
    home_theater: '🎬',
    garden: '🌿',
    fireplace: '🔥',
    balcony: '🏛️',
    rooftop_terrace: '🏢',
    concierge: '🛎️',
    valet_parking: '🚗',
  };

  const similarProperties = (similarData?.properties || [])
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  console.log('similarProperties', similarProperties);
  return (    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="transition-colors hover:text-blue-600">
              Home
            </Link>
            <span>›</span>
            <a href="/buy" className="transition-colors hover:text-blue-600">
              Properties
            </a>
            <span>›</span>
            <span className="font-medium text-gray-900">{property.title}</span>
          </div>
        </div>
      </div>
      {/* Hero Section with Property Info */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          {/* Property Header */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3">
                <Tag color="blue" className="text-sm font-medium">
                  {property.listingType}
                </Tag>
                {property.featured && (
                  <Tag color="gold" className="text-sm font-medium">
                    Featured Property
                  </Tag>
                )}
              </div>
              <h1 className="mb-3 text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
                {property.title}
              </h1>
              <div className="mb-4 flex items-center text-gray-600">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                <span className="text-lg">
                  {property.location?.address}, {property.location?.city},{' '}
                  {property.location?.state} {property.location?.zipCode}
                </span>
              </div>
              <div className="text-sm text-gray-500">Property ID: {property.id}</div>
            </div>

            {/* Price Section */}
            <div className="mt-6 lg:mt-0 lg:text-right">
              <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="mb-2 text-3xl font-bold text-blue-700 lg:text-4xl">
                  {displayPrice}
                </div>
                <div className="text-sm text-gray-600 capitalize">{property.type}</div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Gallery */}
          <div className="grid grid-cols-1 gap-4 overflow-x-scroll lg:mb-8 lg:grid-cols-4 lg:overflow-x-auto">
            <div className="relative lg:col-span-3">
              <div className="aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
                <img
                  src={
                    property.images[selectedImageIndex] || property.images[0]
                  }
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="bg-opacity-70 absolute top-6 left-6 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white backdrop-blur-sm">
                  <Camera className="h-4 w-4" />
                  <span className="font-medium">
                    {property.images.length} Photos
                  </span>
                </div>
                {/* <div className="absolute bottom-6 right-6">
                  <Button 
                    type="primary" 
                    className="bg-white text-gray-900 border-0 hover:bg-gray-100 font-medium shadow-lg"
                    icon={<Camera className="h-4 w-4" />}
                    onClick={() => setSelectedImageIndex(0)}
                  >
                    View All Photos
                  </Button>
                </div> */}
              </div>
            </div>
            <div className="flex gap-x-2 overflow-x-scroll overflow-y-auto px-2 lg:block lg:h-[600px] lg:max-h-[600px] lg:gap-x-0 lg:overflow-x-auto">
              {property.images.map((image, index) => (
                <div
                  key={index}
                  className="mb-4 aspect-square h-56 max-h-56 min-w-fit cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl"
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                    onClick={() => setSelectedImageIndex(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>{' '}
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 lg:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Quick Facts */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Property Details</h2>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Bed className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-xl font-semibold">
                    {property.bedrooms}
                  </div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Bath className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-xl font-semibold">
                    {property.bathrooms}
                  </div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Car className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-xl font-semibold">
                    {property.parking || 0}
                  </div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
                {property.propertySize && (
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-xl font-semibold">{property.propertySize} sqm</div>
                    <div className="text-sm text-gray-600">Internal Size</div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold">About This Property</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features?.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((f) => (
                    <Tag key={f} className="capitalize">{f.replace(/_/g, ' ')}</Tag>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Location & Nearby</h2>
              <div className="space-y-4">
                {/* Property Features */}
                {property.location?.features &&
                  property.location.features.length > 0 && (
                    <div className="rounded-lg bg-blue-50 p-4">
                      <h3 className="mb-3 font-semibold text-blue-900">
                        Property Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {property.location.features.map((feature, index) => (
                          <Tag key={index} color="blue" className="capitalize">
                            {feature.replace(/_/g, ' ')}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Nearby Attractions */}
                {property.location?.nearbyAttractions && (
                  <div className="rounded-lg bg-green-50 p-4">
                    <h3 className="mb-3 font-semibold text-green-900">
                      Nearby Attractions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {property.location.nearbyAttractions.map(
                        (attraction, index) => (
                          <Tag key={index} color="green">
                            {attraction}
                          </Tag>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Map Placeholder */}
                <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                  <div className="text-center text-gray-600">
                    <MapPin className="mx-auto mb-2 h-12 w-12" />
                    <div className="font-medium">Interactive Map</div>
                    <div className="text-sm">
                      {property.location?.city}, {property.location?.state}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="mb-1 text-3xl font-bold text-gray-900">{displayPrice}</div>
                  <div className="text-gray-600 capitalize">{property.listingType}</div>
                </div>

                {/* Agent Info */}
                <div className="text-center">
                  <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-200">
                    <img src={property.agent?.avatar || '/images/default-avatar.png'} alt={property.agent?.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{property.agent?.name || property.contactPerson}</h3>
                  <div className="text-sm text-gray-500">{property.contactEmail}</div>
                </div>

                {/* Contact Actions */}
                <div className="space-y-3">
                  <Button size="large" className="w-full" icon={<Phone className="h-4 w-4" />} onClick={handleCallNow}>Call Now</Button>
                  <Button size="large" className="w-full" icon={<Mail className="h-4 w-4" />} onClick={handleSendWhatsApp}>Send Message</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Similar Properties</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {similarProperties.map((similarProperty) => (
              <PropertyCard
                key={similarProperty.id}
                property={similarProperty}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
