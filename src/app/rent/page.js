'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Button, Input } from 'antd';
import { Search, MapPin, Calendar } from 'lucide-react';
import SidebarFilters from '@/components/shared/SidebarFilters';
import {
  ListingBreadcrumb,
  ListingCtaSection,
  ListingHero,
  ListingPageShell,
  ListingResults,
  ListingResultsHeader,
  PriceRangePills,
} from '@/components/listings';

export default function RentPage() {
  const [filters, setFilters] = useState({
    type: null,
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    location: '',
    amenities: [],
    features: [],
    parkingRequired: false,
    availableForSwap: false,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [rentalType, setRentalType] = useState('longTerm');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const offset = (currentPage - 1) * pageSize;

  const gqlFilters = useMemo(
    () => ({
      type: filters.type || undefined,
      mode: 'rental',
      minPrice: filters.minPrice ?? undefined,
      maxPrice: filters.maxPrice ?? undefined,
      minBedrooms: filters.minBedrooms ?? undefined,
      location: filters.location || undefined,
      amenities: filters.amenities?.length ? filters.amenities : undefined,
      coastalFeatures: filters.features?.length ? filters.features : undefined,
    }),
    [filters],
  );

  const limit = pageSize;

  const {
    data: listData,
    loading: listLoading,
    error: listError,
  } = useQuery(GET_PROPERTIES, {
    variables: { filters: gqlFilters, limit, offset },
    skip: !!searchTerm,
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery(SEARCH_PROPERTIES, {
    variables: { query: searchTerm || '', filters: gqlFilters, limit, offset },
    skip: !searchTerm,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const gqlProps = searchTerm
      ? searchData?.searchProperties
      : listData?.properties;
    if (gqlProps) {
      setProperties(gqlProps);
      setError(null);
    }
    setLoading(listLoading || searchLoading);
  }, [listData, searchData, listLoading, searchLoading, searchTerm]);

  useEffect(() => {
    const anyError = listError || searchError;
    if (anyError) setError(anyError);
  }, [listError, searchError]);

  const propertyTypes = [
    { value: 'villa', label: 'Villas' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'townhouse', label: 'Townhouses' },
    { value: 'condo', label: 'Condos' },
    { value: 'house', label: 'Houses' },
    { value: 'loft', label: 'Lofts' },
  ];

  const getRentalPrices = () => {
    if (rentalType === 'shortTerm') {
      return [
        { label: 'Under $500/night', min: 0, max: 500 },
        { label: '$500 - $1,000/night', min: 500, max: 1000 },
        { label: '$1,000 - $2,500/night', min: 1000, max: 2500 },
        { label: '$2,500+/night', min: 2500, max: null },
      ];
    }
    return [
      { label: 'Under $5,000/month', min: 0, max: 5000 },
      { label: '$5,000 - $10,000/month', min: 5000, max: 10000 },
      { label: '$10,000 - $25,000/month', min: 10000, max: 25000 },
      { label: '$25,000+/month', min: 25000, max: null },
    ];
  };

  const rentalDurations = [
    { value: 'shortTerm', label: 'Short Term (Daily/Weekly)' },
    { value: 'longTerm', label: 'Long Term (Monthly/Yearly)' },
    { value: 'vacation', label: 'Vacation Rentals' },
  ];

  const rentalAmenities = [
    'pool',
    'spa',
    'gym',
    'parking',
    'wifi',
    'air_conditioning',
    'heating',
    'kitchen',
    'dishwasher',
    'washer_dryer',
    'balcony',
    'garden',
    'rooftop_terrace',
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const handlePriceRangeSelect = (range) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: range.min,
      maxPrice: range.max,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      type: null,
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      location: '',
      amenities: [],
      features: [],
      parkingRequired: false,
      availableForSwap: false,
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#171717]">
      <ListingBreadcrumb current="Rent" />

      <ListingHero
        title="Properties for Rent"
        description="Find your perfect rental from our collection of apartments, houses, condos, and luxury properties."
        footer={
          <PriceRangePills
            ranges={getRentalPrices()}
            selectedMin={filters.minPrice}
            selectedMax={filters.maxPrice}
            onSelect={handlePriceRangeSelect}
          />
        }
      >
        <div className="mb-3 flex justify-center sm:mb-4">
          <div className="flex flex-wrap justify-center gap-1 rounded-lg border border-gray-800 bg-[#212121] p-1">
            {rentalDurations.map((duration) => (
              <Button
                key={duration.value}
                type={rentalType === duration.value ? 'primary' : 'text'}
                size="small"
                onClick={() => setRentalType(duration.value)}
                className={
                  rentalType === duration.value
                    ? 'border-0 bg-[#ccff00] text-[#171717] shadow-[0_0_10px_rgba(204,255,0,0.6)]'
                    : 'text-gray-400 hover:text-[#ccff00]'
                }
              >
                {duration.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <div className="flex-1">
              <Input
                size="large"
                placeholder="Search by location, property type, or area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<Search className="h-4 w-4 text-gray-400" />}
                onPressEnter={handleSearch}
                className="border-gray-700 bg-[#212121] text-white"
              />
            </div>
            <Button
              type="primary"
              size="large"
              onClick={handleSearch}
              className="border-0 bg-[#ccff00] font-semibold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)]"
            >
              Search Rentals
            </Button>
          </div>
        </div>
      </ListingHero>

      <ListingPageShell
        showFilters={showFilters}
        sidebar={
          <SidebarFilters
            title="Filters"
            filters={filters}
            onChange={handleFilterChange}
            onClear={clearFilters}
            propertyTypes={propertyTypes}
            amenities={rentalAmenities}
          />
        }
      >
        <ListingResultsHeader
          title="Properties for Rent"
          loading={loading}
          count={properties.length}
          countLabel="rental properties found"
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {error && !properties.length ? (
          <div className="rounded-2xl border border-gray-800 bg-[#1a1a1a] p-8 text-center">
            <p className="text-red-400">
              Error loading properties: {error.message}
            </p>
          </div>
        ) : (
          <ListingResults
            loading={loading}
            properties={properties}
            viewMode={viewMode}
            emptyDescription="No rental properties found"
            currentPage={currentPage}
            pageSize={pageSize}
            total={1000}
            onPageChange={setCurrentPage}
            totalLabel="rental properties"
          />
        )}
      </ListingPageShell>

      <section className="border-t border-gray-800 bg-[#1a1a1a] py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Interested in Home Swapping?
            </h2>
            <p className="mx-auto max-w-3xl text-gray-400">
              Experience different destinations through our unique home swap
              program. Trade your property for stays in beautiful locations
              worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                title: 'List Your Property',
                description: 'Add your property to our swap network',
                icon: <MapPin className="h-8 w-8 text-[#ccff00]" />,
              },
              {
                title: 'Browse Destinations',
                description: 'Explore amazing properties worldwide',
                icon: <Search className="h-8 w-8 text-[#ccff00]" />,
              },
              {
                title: 'Start Swapping',
                description: 'Connect with property owners and plan your stay',
                icon: <Calendar className="h-8 w-8 text-[#ccff00]" />,
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-lg border border-gray-800 bg-[#212121] p-6 text-center"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              type="primary"
              size="large"
              className="border-0 bg-[#ccff00] text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)]"
            >
              Learn About Home Swapping
            </Button>
          </div>
        </div>
      </section>

      <ListingCtaSection
        title="Need help finding the perfect rental?"
        description="Our rental specialists can help you find the ideal property for your stay."
        primaryLabel="Contact a Specialist"
        secondaryLabel="Create Rental Alert"
      />
    </div>
  );
}
