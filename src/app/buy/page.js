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
import {
  buildPropertyFilters,
  unwrapPropertyList,
} from '@/utils/listingQuery';

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
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingSample, setUsingSample] = useState(false);

  const offset = (currentPage - 1) * pageSize;

  const gqlFilters = useMemo(
    () =>
      buildPropertyFilters({
        listingType: 'sale',
        type: filters.type,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        minBedrooms: filters.minBedrooms,
        location: filters.location,
        features: [
          ...(filters.features || []),
          ...(filters.amenities || []),
        ],
        limit: pageSize,
        offset,
      }),
    [filters, pageSize, offset],
  );

  const {
    data: listData,
    loading: listLoading,
    error: listError,
  } = useQuery(GET_PROPERTIES, {
    variables: { filters: gqlFilters },
    skip: !!searchTerm,
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery(SEARCH_PROPERTIES, {
    variables: { query: searchTerm || '', filters: gqlFilters },
    skip: !searchTerm,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const queryError = listError || searchError;
    const queryLoading = listLoading || searchLoading;
    const { properties: apiProperties, totalCount: apiTotal } =
      unwrapPropertyList(searchTerm ? searchData : listData, {
        isSearch: !!searchTerm,
      });

    setLoading(queryLoading);

    if (queryLoading) return;

    if (!queryError && apiProperties.length > 0) {
      setProperties(apiProperties);
      setTotalCount(apiTotal || apiProperties.length);
      setError(null);
      setUsingSample(false);
      return;
    }

    // Offline / hard failure only — prefer live API inventory once backend is seeded
    if (queryError) {
      const filtered = filterSaleSampleProperties(
        sampleSaleProperties,
        filters,
        searchTerm,
      );
      setProperties(filtered);
      setTotalCount(filtered.length);
      setUsingSample(true);
      setError(queryError);
      return;
    }

    setProperties([]);
    setTotalCount(0);
    setUsingSample(false);
    setError(null);
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

  const clearPriceRange = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: null,
      maxPrice: null,
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
    <div className="min-h-screen bg-cp-surface text-white">
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
            onClear={clearPriceRange}
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
          count={usingSample ? displayProperties.length : totalCount}
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
          sampleMessage="Unable to reach the listings API — showing offline demo sale listings. Live inventory loads from GraphQL properties(filters) once the backend is connected."
          emptyDescription="No sale properties found"
          currentPage={currentPage}
          pageSize={pageSize}
          total={usingSample ? displayProperties.length : totalCount}
          onPageChange={setCurrentPage}
          showPagination={
            usingSample
              ? displayProperties.length > pageSize
              : totalCount > pageSize
          }
        />
      </ListingPageShell>

      <ListingCtaSection />
    </div>
  );
}
