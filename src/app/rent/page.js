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
  Calendar,
} from 'lucide-react';
import Header from '@/components/Header';
import PropertiesList from '@/components/PropertiesList';
// Auth checks are performed inside PropertyCard via useRequireAuth
import PropertyCard from '@/components/ui/PropertyCard';
import PropertySearch from '@/components/ui/PropertySearch';

const { Option } = Select;

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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [rentalType, setRentalType] = useState('longTerm'); // 'shortTerm', 'longTerm', 'vacation'

  // Calculate offset for pagination
  const offset = (currentPage - 1) * pageSize;

  // Use GraphQL as primary source
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const gqlFilters = useMemo(() => ({
    type: filters.type || undefined,
    mode: 'rental',
    minPrice: filters.minPrice ?? undefined,
    maxPrice: filters.maxPrice ?? undefined,
    minBedrooms: filters.minBedrooms ?? undefined,
    location: filters.location || undefined,
    amenities: filters.amenities?.length ? filters.amenities : undefined,
    coastalFeatures: filters.features?.length ? filters.features : undefined,
  }), [filters]);

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

  // Rental price ranges (monthly for long term, nightly for short term)
  const getRentalPrices = () => {
    if (rentalType === 'shortTerm') {
      return [
        { label: 'Under $500/night', min: 0, max: 500 },
        { label: '$500 - $1,000/night', min: 500, max: 1000 },
        { label: '$1,000 - $2,500/night', min: 1000, max: 2500 },
        { label: '$2,500+/night', min: 2500, max: null },
      ];
    } else {
      return [
        { label: 'Under $5,000/month', min: 0, max: 5000 },
        { label: '$5,000 - $10,000/month', min: 5000, max: 10000 },
        { label: '$10,000 - $25,000/month', min: 10000, max: 25000 },
        { label: '$25,000+/month', min: 25000, max: null },
      ];
    }
  };

  // Rental durations
  const rentalDurations = [
    { value: 'shortTerm', label: 'Short Term (Daily/Weekly)' },
    { value: 'longTerm', label: 'Long Term (Monthly/Yearly)' },
    { value: 'vacation', label: 'Vacation Rentals' },
  ];
  // Common amenities for rentals
  const rentalAmenities = [
    'Pool',
    'Spa',
    'Gym',
    'Wine Cellar',
    'Home Theater',
    'Smart Home',
    'Security System',
    'Parking',
    'WiFi',
    'Air Conditioning',
    'Heating',
    'Laundry',
    'Kitchen',
    'Dishwasher',
    'Washer/Dryer',
    'BBQ Grill',
    'Balcony',
    'Garden',
    'Rooftop Access',
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
            <span className="text-blue-600">Rent</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            {' '}
            <h1 className="mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl lg:text-4xl xl:text-5xl">
              Properties for Rent
            </h1>
            <p className="mx-auto mb-6 max-w-3xl text-lg text-gray-600 sm:mb-8 sm:text-xl">
              Find your perfect rental from our collection of apartments,
              houses, condos, and luxury properties.
            </p>
            {/* Rental Type Toggle */}
            <div className="mb-6 flex justify-center">
              <div className="flex rounded-lg bg-gray-100 p-1">
                {rentalDurations.map((duration) => (
                  <Button
                    key={duration.value}
                    type={rentalType === duration.value ? 'primary' : 'text'}
                    size="small"
                    onClick={() => setRentalType(duration.value)}
                    className={`mx-1 ${rentalType === duration.value ? 'bg-blue-600' : 'text-gray-600'}`}
                  >
                    {duration.label}
                  </Button>
                ))}
              </div>
            </div>
            {/* Quick Search */}
            <div className="mx-auto max-w-2xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <div className="flex-1">
                  <Input
                    size="large"
                    placeholder="Search by location, property type, or area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<Search className="h-4 w-4 text-gray-400" />}
                    onPressEnter={handleSearch}
                  />
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleSearch}
                  className="border-0 bg-gradient-to-r from-blue-600 to-teal-600"
                >
                  Search Rentals
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {getRentalPrices().map((range, index) => (
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

                  {/* Rental Price Range */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      {rentalType === 'shortTerm'
                        ? 'Nightly Rate'
                        : 'Monthly Rent'}
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder={`Min ${rentalType === 'shortTerm' ? '/night' : '/month'}`}
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
                          placeholder={`Max ${rentalType === 'shortTerm' ? '/night' : '/month'}`}
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

                  {/* Property Features */}
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

                  {/* Amenities */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">
                      Amenities
                    </label>{' '}
                    <div className="max-h-40 space-y-2 overflow-y-auto">
                      {rentalAmenities.map((amenity) => (
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
                            {amenity}
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
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Properties for Rent
                  </h2>
                  <p className="mt-1 text-gray-600">
                    {loading
                      ? 'Loading...'
                      : `${properties.length} rental properties found`}
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
                <div className="py-12 text-center">
                  <p className="text-red-600">
                    Error loading properties: {error.message}
                  </p>
                </div>
              ) : properties.length === 0 ? (
                <Empty
                  description="No rental properties found"
                  className="py-12"
                />
              ) : (
                <>
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                        : 'space-y-6'
                    }
                  >
                    <PropertiesList properties={properties} />
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
                        `${range[0]}-${range[1]} of ${total} rental properties`
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Home Swap Section */}
      <section className="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              Interested in Home Swapping?
            </h2>{' '}
            <p className="mx-auto max-w-3xl text-gray-600">
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
                icon: <MapPin className="h-8 w-8 text-blue-600" />,
              },
              {
                title: 'Browse Destinations',
                description: 'Explore amazing properties worldwide',
                icon: <Search className="h-8 w-8 text-blue-600" />,
              },
              {
                title: 'Start Swapping',
                description: 'Connect with property owners and plan your stay',
                icon: <Calendar className="h-8 w-8 text-blue-600" />,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              type="primary"
              size="large"
              className="border-0 bg-gradient-to-r from-blue-600 to-teal-600"
            >
              Learn About Home Swapping
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
            Need help finding the perfect rental?
          </h2>{' '}
          <p className="mb-6 text-sm text-blue-100 sm:mb-8 sm:text-base">
            Our rental specialists can help you find the ideal property for your
            stay.
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <Button
              type="default"
              size="large"
              className="flex-1"
              href="/contact"
            >
              Contact a Specialist
            </Button>
            <Button type="default" size="large" className="flex-1">
              Create Rental Alert
            </Button>
          </div>        </div>
      </section>
    </div>
  );
}
