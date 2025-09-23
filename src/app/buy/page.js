'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import {
  Button,
  Input,
  Select,
  Slider,
  Checkbox,
  Card,
  Spin,
  Empty,
  Pagination,
} from 'antd';
import {
  Search,
  Filter,
  MapPin,
  Grid,
  List,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  Eye,
} from 'lucide-react';
import Header from '@/components/Header';
import PropertiesList from '@/components/PropertiesList';
import PropertyCard from '@/components/ui/PropertyCard';
import PropertySearch from '@/components/ui/PropertySearch';

const { Option } = Select;

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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);

  // Calculate offset for pagination
  const offset = (currentPage - 1) * pageSize;

  // Use GraphQL as primary source, mock as fallback
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GraphQL variables mapping
  const gqlFilters = useMemo(() => {
    return {
      // Backend supports `type` and min/max price fields
      type: filters.type || undefined,
  mode: 'sale',
      minPrice: filters.minPrice ?? undefined,
      maxPrice: filters.maxPrice ?? undefined,
      // Schema defines minBedrooms; resolver may accept bedrooms as >= as well.
      minBedrooms: filters.minBedrooms ?? undefined,
      // Location fuzzy match on city
      location: filters.location || undefined,
      // Amenities array
      amenities: filters.amenities && filters.amenities.length ? filters.amenities : undefined,
      // Coastal feature aliases if used by UI
      coastalFeatures: filters.features && filters.features.length ? filters.features : undefined,
    };
  }, [filters]);

  const limit = pageSize;

  // Two queries: plain list vs search; skip one based on searchTerm
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
    refetch: refetchSearch,
  } = useQuery(SEARCH_PROPERTIES, {
    variables: { query: searchTerm || '', filters: gqlFilters, limit, offset },
    skip: !searchTerm,
    fetchPolicy: 'cache-and-network',
  });

  // Sync properties from GraphQL or fall back to mock filtering
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

  // If both queries errored or server unreachable, keep fallback logic below
  useEffect(() => {
    const anyError = listError || searchError;
    if (anyError) {
      setError(anyError);
      // Leave properties as-is; the render will compute displayProperties from mock
    }
  }, [listError, searchError]);
  // Property types for filter
  const propertyTypes = [
    { value: 'villa', label: 'Villas' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'penthouse', label: 'Penthouses' },
    { value: 'townhouse', label: 'Townhouses' },
    { value: 'condo', label: 'Condos' },
    { value: 'house', label: 'Houses' },
    { value: 'loft', label: 'Lofts' },
  ];

  // Price ranges
  const priceRanges = [
    { label: 'Under $200', min: 0, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000+', min: 1000, max: null },
  ];

  // Common property amenities
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

  // Property features
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
    setCurrentPage(1); // Reset to first page when filters change
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

  const handlePropertySearch = (searchData) => {
    setSearchTerm(searchData.searchTerm || '');
    if (searchData.location) {
      setFilters((prev) => ({ ...prev, location: searchData.location }));
    }
    setCurrentPage(1);
  };

  const displayProperties = properties || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2 sm:py-3">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-1 text-xs text-gray-600 sm:space-x-2 sm:text-sm">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-blue-600">Buy</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            {' '}
            <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
              Properties for Sale
            </h1>
            <p className="mx-auto mb-6 max-w-3xl text-lg text-gray-600 sm:mb-8 sm:text-xl">
              Discover your dream property from our exclusive collection of
              luxury homes, modern condos, and premium villas.
            </p>
            {/* Property Search Component */}
            <div className="mx-auto max-w-4xl">
              <PropertySearch
                onSearch={handlePropertySearch}
                placeholder="Search properties by location, type, or amenities..."
              />
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {priceRanges.map((range, index) => (
              <Button
                key={index}
                size="small"
                onClick={() => handlePriceRangeSelect(range)}
                className={`rounded-full ${
                  filters.minPrice === range.min &&
                  filters.maxPrice === range.max
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-blue-400'
                }`}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Sidebar Filters */}
            <div
              className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
            >
              <Card className="sticky top-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <Button type="text" size="small" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Property Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Property Type
                    </label>
                    <Select
                      placeholder="Select property type"
                      value={filters.type}
                      onChange={(value) => handleFilterChange('type', value)}
                      className="w-full"
                      allowClear
                    >
                      {propertyTypes.map((type) => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  {/* Price Range */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Price Range
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Min Price"
                          value={filters.minPrice || ''}
                          onChange={(e) =>
                            handleFilterChange(
                              'minPrice',
                              e.target.value ? Number(e.target.value) : null,
                            )
                          }
                          prefix="$"
                        />
                        <Input
                          placeholder="Max Price"
                          value={filters.maxPrice || ''}
                          onChange={(e) =>
                            handleFilterChange(
                              'maxPrice',
                              e.target.value ? Number(e.target.value) : null,
                            )
                          }
                          prefix="$"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Bedrooms */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Minimum Bedrooms
                    </label>
                    <Select
                      placeholder="Any"
                      value={filters.minBedrooms}
                      onChange={(value) =>
                        handleFilterChange('minBedrooms', value)
                      }
                      className="w-full"
                      allowClear
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <Option key={num} value={num}>
                          {num}+ Bedroom{num > 1 ? 's' : ''}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Property Features
                    </label>
                    <div className="space-y-2">
                      <div>
                        <Checkbox
                          checked={filters.parkingRequired}
                          onChange={(e) =>
                            handleFilterChange(
                              'parkingRequired',
                              e.target.checked,
                            )
                          }
                        >
                          Parking Required
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox
                          checked={filters.availableForSwap}
                          onChange={(e) =>
                            handleFilterChange(
                              'availableForSwap',
                              e.target.checked,
                            )
                          }
                        >
                          Available for Home Swap
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                  {/* Location Features */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Location Features
                    </label>
                    <div className="max-h-32 flex-col space-y-2 overflow-y-auto">
                      {propertyFeatures.map((feature) => (
                        <div key={feature}>
                          <Checkbox
                            key={feature}
                            checked={filters.features.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFilterChange('features', [
                                  ...filters.features,
                                  feature,
                                ]);
                              } else {
                                handleFilterChange(
                                  'features',
                                  filters.features.filter((f) => f !== feature),
                                );
                              }
                            }}
                          >
                            {feature
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Amenities */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Amenities
                    </label>
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                      {propertyAmenities.map((amenity) => (
                        <div key={amenity}>
                          <Checkbox
                            key={amenity}
                            checked={filters.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFilterChange('amenities', [
                                  ...filters.amenities,
                                  amenity,
                                ]);
                              } else {
                                handleFilterChange(
                                  'amenities',
                                  filters.amenities.filter(
                                    (a) => a !== amenity,
                                  ),
                                );
                              }
                            }}
                          >
                            {amenity
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                {' '}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Properties for Sale
                  </h2>
                  <p className="mt-1 text-gray-600">
                    {loading
                      ? 'Loading...'
                      : `${displayProperties.length} properties found`}
                    {error && ' (showing sample data)'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Toggle */}
                  <Button
                    icon={<SlidersHorizontal className="h-4 w-4" />}
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    Filters
                  </Button>

                  {/* View Mode Toggle */}
                  <div className="hidden rounded-lg border border-gray-200 p-1 sm:flex">
                    <Button
                      type={viewMode === 'grid' ? 'primary' : 'text'}
                      size="small"
                      icon={<Grid className="h-4 w-4" />}
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' ? 'bg-blue-600' : ''}
                    >
                      Grid
                    </Button>
                    <Button
                      type={viewMode === 'list' ? 'primary' : 'text'}
                      size="small"
                      icon={<List className="h-4 w-4" />}
                      onClick={() => setViewMode('list')}
                      className={viewMode === 'list' ? 'bg-blue-600' : ''}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </div>

              {/* Properties Grid/List */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Spin size="large" />
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                    <p className="text-sm text-yellow-800">
                      Unable to connect to server. Showing sample coastal
                      properties.
                    </p>
                  </div>
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                        : 'space-y-6'
                    }
                  >
                    {displayProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              ) : displayProperties.length === 0 ? (
                <Empty description="No properties found" className="py-12" />
              ) : (
                <>
                  {' '}
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                        : 'space-y-6'
                    }
                  >
                    {displayProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                  {/* Pagination */}
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={1000} // This should come from your API
                      onChange={setCurrentPage}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) =>
                        `${range[0]}-${range[1]} of ${total} properties`
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
            Can't find what you're looking for?
          </h2>{' '}
          <p className="mb-6 text-sm text-blue-100 sm:mb-8 sm:text-base">
            Our experts can help you find the perfect property that matches your
            requirements.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <Button
              type="default"
              size="large"
              className="flex-1"
              href="/contact"
            >
              Contact an Agent
            </Button>
            <Button type="default" size="large" className="flex-1">
              Create Property Alert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Same as other pages */}
      <footer className="bg-gray-900 py-8 text-white sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2 sm:mb-6 sm:space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 sm:h-10 sm:w-10">
                  <MapPin className="h-4 w-4 text-white sm:h-6 sm:w-6" />
                </div>
                <span className="text-xl font-bold sm:text-2xl">
                  Coast Planet
                </span>
              </div>
              <p className="mb-4 text-sm text-gray-400 sm:mb-6 sm:text-base">
                Vision Tower 42nd floor, Business Bay, Miami
              </p>
              <p className="text-sm text-gray-400 sm:text-base">
                +1 (555) 123-4567
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                Explore
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-400 sm:space-y-2 sm:text-base">
                <li>
                  <a href="/buy" className="transition-colors hover:text-white">
                    Buy
                  </a>
                </li>
                <li>
                  <a
                    href="/rent"
                    className="transition-colors hover:text-white"
                  >
                    Rent
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    New Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Property Developers
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    List Your Property
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                Services
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-400 sm:space-y-2 sm:text-base">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Property Management
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Development Sales and Consultancy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Property Valuation
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Mortgage Services
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Conveyancing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">
                Coast Planet
              </h3>
              <ul className="space-y-1.5 text-sm text-gray-400 sm:space-y-2 sm:text-base">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Our Management
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Our Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="transition-colors hover:text-white"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-6 sm:mt-12 sm:pt-8 md:flex-row">
            <p className="text-sm text-gray-400 sm:text-base">
              © Coast Planet LLC. All Rights Reserved
            </p>
            <div className="mt-3 flex space-x-4 sm:mt-4 sm:space-x-6 md:mt-0">
              <a
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
