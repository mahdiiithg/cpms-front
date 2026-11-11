'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import PropertySearch from '@/components/ui/PropertySearch';
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
import {
  sampleSaleProperties,
  filterSaleSampleProperties,
} from '@/utils/sampleSaleProperties';

export default function BuyPage() {
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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingSample, setUsingSample] = useState(false);

  const offset = (currentPage - 1) * pageSize;

  const gqlFilters = useMemo(
    () => ({
      type: filters.type || undefined,
      mode: 'sale',
      minPrice: filters.minPrice ?? undefined,
      maxPrice: filters.maxPrice ?? undefined,
      minBedrooms: filters.minBedrooms ?? undefined,
      location: filters.location || undefined,
      amenities:
        filters.amenities && filters.amenities.length
          ? filters.amenities
          : undefined,
      coastalFeatures:
        filters.features && filters.features.length
          ? filters.features
          : undefined,
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
    const queryError = listError || searchError;
    const queryLoading = listLoading || searchLoading;

    setLoading(queryLoading);

    if (gqlProps && gqlProps.length > 0) {
      setProperties(gqlProps);
      setError(null);
      setUsingSample(false);
      return;
    }

    // Fall back to realistic local demo listings when API fails or returns empty
    if (!queryLoading && (queryError || !gqlProps || gqlProps.length === 0)) {
      const filtered = filterSaleSampleProperties(
        sampleSaleProperties,
        filters,
        searchTerm,
      );
      setProperties(filtered);
      setUsingSample(true);
      setError(queryError || null);
    }
  }, [
    listData,
    searchData,
    listLoading,
    searchLoading,
    listError,
    searchError,
    searchTerm,
    filters,
  ]);

  const propertyTypes = [
    { value: 'villa', label: 'Villas' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'townhouse', label: 'Townhouses' },
    { value: 'condo', label: 'Condos' },
    { value: 'house', label: 'Houses' },
    { value: 'loft', label: 'Lofts' },
  ];

  const priceRanges = [
    { label: 'Under $1M', min: 0, max: 1000000 },
    { label: '$1M – $3M', min: 1000000, max: 3000000 },
    { label: '$3M – $7M', min: 3000000, max: 7000000 },
    { label: '$7M+', min: 7000000, max: null },
  ];

  const propertyAmenities = [
    'pool',
    'gym',
    'spa',
    'parking',
    'wifi',
    'air_conditioning',
    'heating',
    'kitchen',
    'dishwasher',
    'washer_dryer',
    'fireplace',
    'balcony',
    'patio',
    'garden',
    'security_system',
    'concierge',
    'rooftop_terrace',
  ];

  const propertyFeatures = [
    'city_view',
    'private_garden',
    'gated_community',
    'high_rise',
    'downtown_location',
    'family_friendly',
    'quiet_neighborhood',
    'walkable',
    'near_schools',
    'public_transport',
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

  const handlePropertySearch = (searchData) => {
    setSearchTerm(searchData.searchTerm || '');
    if (searchData.location) {
      setFilters((prev) => ({ ...prev, location: searchData.location }));
    }
    setCurrentPage(1);
  };

  const displayProperties = properties || [];

  return (
    <div className="min-h-screen bg-[#171717]">
      <ListingBreadcrumb current="Buy" />

      <ListingHero
        title="Properties for Sale"
        description="Discover your dream property from our exclusive collection of luxury homes, modern condos, and premium villas."
        footer={
          <PriceRangePills
            ranges={priceRanges}
            selectedMin={filters.minPrice}
            selectedMax={filters.maxPrice}
            onSelect={handlePriceRangeSelect}
          />
        }
      >
        <div className="mx-auto max-w-4xl">
          <PropertySearch
            onSearch={handlePropertySearch}
            placeholder="Search properties by location, type, or amenities..."
          />
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
            amenities={propertyAmenities}
            features={propertyFeatures}
          />
        }
      >
        <ListingResultsHeader
          title="Properties for Sale"
          loading={loading}
          count={displayProperties.length}
          showingSample={usingSample}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        <ListingResults
          loading={loading}
          properties={displayProperties}
          viewMode={viewMode}
          showingSample={usingSample}
          sampleMessage="Browsing curated demo coastal sale listings. Live inventory will appear here when the server is connected."
          emptyDescription="No properties found"
          currentPage={currentPage}
          pageSize={pageSize}
          total={usingSample ? displayProperties.length : 1000}
          onPageChange={setCurrentPage}
          showPagination={!usingSample || displayProperties.length > pageSize}
        />
      </ListingPageShell>

      <ListingCtaSection />
    </div>
  );
}
