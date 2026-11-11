/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { 
  Button, 
  Input, 
  Select, 
  Checkbox, 
  Card, 
  Spin, 
  Empty, 
  Pagination,
  Drawer,
  Slider,
} from 'antd';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Home,
  ChevronRight,
} from 'lucide-react';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import Link from 'next/link';
import { ListingViewToggle, ListingsPropertyCard } from '@/components/listings';
import CpField from '@/components/shared/CpField';
import {
  buildPropertyFilters,
  unwrapPropertyList,
} from '@/utils/listingQuery';

const { Search: AntSearch } = Input;

export default function PropertyListingsPage() {
  // State management
  const [filters, setFilters] = useState({
    // Removed listingType filter - now shows ALL properties (sale, rent)
    type: null,
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    minBathrooms: null,
    maxBathrooms: null,
    location: '',
    city: '',
    suburb: '',
    // Removed amenities & coastal-specific filters
    features: [],
    condition: '',
    // Removed furnishing & viewType (not in schema)
    minPropertySize: null,
    maxPropertySize: null,
    minParking: null,
    featured: false,
    urgent: false,
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(24);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [bedroomRange, setBedroomRange] = useState([1, 6]);

  // Calculate offset for pagination
  const offset = (currentPage - 1) * pageSize;

  // GraphQL query with schema-valid filters (sale + rent)
  const gqlFilters = useMemo(
    () =>
      buildPropertyFilters({
        location: filters.location,
        city: filters.city,
        suburb: filters.suburb,
        features: filters.features,
        featured: filters.featured || undefined,
        urgent: filters.urgent || undefined,
        condition: filters.condition || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minBedrooms: bedroomRange[0],
        maxBedrooms: bedroomRange[1],
        searchQuery: searchTerm || undefined,
        limit: pageSize,
        offset,
      }),
    [filters, pageSize, offset, searchTerm, priceRange, bedroomRange],
  );

  // Data fetching
  const { data, loading, error, refetch } = useQuery(
    searchTerm ? SEARCH_PROPERTIES : GET_PROPERTIES,
    {
      variables: searchTerm
        ? { query: searchTerm, filters: gqlFilters }
        : { filters: gqlFilters },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
  );

  const {
    properties,
    totalCount,
    totalPages,
  } = unwrapPropertyList(data, { isSearch: !!searchTerm });

  // Property types and features for filters
  const featuresList = [
    'city_view', 'mountain_view', 'garden_view',
    'private_garden', 'gated_community', 'high_rise', 'waterfront',
    'downtown_location', 'family_friendly', 
    'quiet_neighborhood', 'walkable', 'near_schools', 'public_transport'
  ];

  const conditionOptions = [
    { value: 'new', label: 'New/Under Construction' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'needs_renovation', label: 'Needs Work' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'bedrooms-desc', label: 'Bedrooms' },
    { value: 'size-desc', label: 'Size' },
    { value: 'views-desc', label: 'Most Viewed' },
  ];

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    const [sortBy, order] = value.endsWith('-desc')
      ? [value.slice(0, -5), 'desc']
      : value.endsWith('-asc')
        ? [value.slice(0, -4), 'asc']
        : [value, 'asc'];

    setFilters((prev) => ({ ...prev, sortBy, sortOrder: order }));
    setCurrentPage(1);
  };

  const sortValue = `${filters.sortBy}-${filters.sortOrder === 'desc' ? 'desc' : 'asc'}`;

  const clearFilters = () => {
    setFilters({
      // Removed listingType - shows ALL properties
      type: null,
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      minBathrooms: null,
      maxBathrooms: null,
      location: '',
      city: '',
      suburb: '',
      features: [],
      condition: '',
      minPropertySize: null,
      maxPropertySize: null,
      minParking: null,
      featured: false,
      urgent: false,
      sortBy: 'date',
      sortOrder: 'desc'
    });
    setPriceRange([0, 2000000]);
    setBedroomRange([1, 6]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-cp-surface text-white">
      {/* Header */}
      <div className="border-b border-cp-stroke bg-gradient-to-br from-cp-surface via-cp-raised to-cp-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-4 text-sm text-cp-subtle">
            <a href="/" className="transition-colors hover:text-cp-lime">Home</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cp-lime">Property Listings</span>
          </div>

          {/* Title and Stats */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Property Listings</h1>
              <p className="mt-1 text-cp-subtle">
                {loading ? 'Loading...' : `${totalCount} properties available`}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <AntSearch
              placeholder="Search by location, property type, or features..."
              allowClear
              size="large"
              className="cp-control dark-search flex-1"
              onSearch={handleSearch}
              enterButton={
                <Button className="!border-0 !bg-cp-lime !text-cp-surface shadow-[0_0_15px_rgba(204,255,0,0.45)] hover:!bg-cp-lime-hover">
                  <Search className="h-4 w-4" />
                </Button>
              }
            />
            <Button
              size="large"
              icon={<SlidersHorizontal className="h-4 w-4" />}
              onClick={() => setShowFilters(true)}
              className="cp-toolbar-btn lg:hidden"
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 space-y-6">
            <Card 
              title={<span className="text-white font-semibold drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">Filters</span>}
              className="dark-listing-card shadow-[0_0_15px_rgba(204,255,0,0.05)]"
              styles={{
                body: { background: '#1a1a1a', padding: '24px' },
                header: { background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'white' }
              }}
              bordered
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              extra={
                <Button 
                  type="text" 
                  size="small" 
                  onClick={clearFilters}
                  className="cp-text-action !px-2"
                >
                  Clear All
                </Button>
              }
            >
              <div className="space-y-6">
                {/* Property Type - removed on listings page to show all properties by default */}
                <div className="bg-gradient-to-br from-[#ccff00]/10 to-[#ccff00]/5 p-4 rounded-lg border border-[#ccff00]/20 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#ccff00]/20 p-2 rounded-lg shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                      <Home className="h-5 w-5 text-cp-lime" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cp-lime mb-1">All Properties</p>
                      <p className="text-xs text-cp-subtle">Showing both sale and rental properties</p>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
                  <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                    Price Range
                  </label>
                  <Slider
                    range
                    value={priceRange}
                    onChange={setPriceRange}
                    min={0}
                    max={2000000}
                    step={10000}
                    tipFormatter={(value) => `$${value.toLocaleString()}`}
                    styles={{
                      track: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' },
                      tracks: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' }
                    }}
                  />
                  <div className="flex justify-between text-xs text-cp-subtle mt-2">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
                  <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                    Bedrooms
                  </label>
                  <Slider
                    range
                    value={bedroomRange}
                    onChange={setBedroomRange}
                    min={1}
                    max={6}
                    marks={{ 
                      1: { label: <span className="text-cp-subtle">1</span> }, 
                      2: { label: <span className="text-cp-subtle">2</span> }, 
                      3: { label: <span className="text-cp-subtle">3</span> }, 
                      4: { label: <span className="text-cp-subtle">4</span> }, 
                      5: { label: <span className="text-cp-subtle">5</span> }, 
                      6: { label: <span className="text-cp-subtle">6+</span> } 
                    }}
                    styles={{
                      track: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' },
                      tracks: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' }
                    }}
                  />
                </div>

                {/* Location */}
                <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
                  <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                    Location
                  </label>
                  <CpField>
                    <Input
                      placeholder="City, suburb, or address"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      prefix={<MapPin className="h-4 w-4 text-cp-lime" />}
                      variant="borderless"
                    />
                  </CpField>
                </div>

                {/* Special Features */}
                <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
                  <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                    Special
                  </label>
                  <div className="space-y-3 bg-cp-surface p-4 rounded-lg border border-cp-stroke">
                    <Checkbox
                      checked={filters.featured}
                      onChange={(e) => handleFilterChange('featured', e.target.checked)}
                      className="text-cp-muted"
                    >
                      <span className="text-cp-muted">Featured Properties</span>
                    </Checkbox>
                    <Checkbox
                      checked={filters.urgent}
                      onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                      className="text-cp-muted"
                    >
                      <span className="text-cp-muted">Urgent Sale</span>
                    </Checkbox>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <CpField className="cp-sort-field min-w-[240px] w-[260px]">
                  <Select
                    value={sortValue}
                    onChange={handleSortChange}
                    className="w-full"
                    variant="borderless"
                    optionLabelProp="label"
                    popupMatchSelectWidth
                    dropdownStyle={{ minWidth: 260 }}
                    options={sortOptions.map((option) => ({
                      value: option.value,
                      label: option.label,
                    }))}
                  />
                </CpField>
              </div>

              <ListingViewToggle
                viewMode={viewMode}
                onChange={setViewMode}
                modes={['grid', 'list', 'map']}
                showLabels={false}
                className="flex"
              />
            </div>

            {/* Properties Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spin size="large" className="text-cp-lime" tip={<span className="text-cp-muted">Loading properties...</span>} />
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-cp-raised rounded-2xl border border-cp-stroke p-8">
                <Empty 
                  description={<span className="text-cp-subtle">Failed to load properties</span>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
                <Button 
                  onClick={() => refetch()} 
                  className="mt-4 bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]"
                >
                  Try Again
                </Button>
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-cp-raised rounded-2xl border border-cp-stroke p-8">
                <Empty 
                  description={<span className="text-cp-subtle">No properties found</span>}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className="py-12"
                />
              </div>
            ) : (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {properties.map((property) => (
                    <ListingsPropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalCount}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} properties`
                    }
                    className="dark-pagination"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        title={<span className="text-white font-semibold drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">Filters</span>}
        placement="left"
        width={320}
        onClose={() => setShowFilters(false)}
        open={showFilters}
        className="dark-drawer"
        styles={{
          body: { background: '#171717', padding: '16px' },
          header: { background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.08)' }
        }}
        extra={
          <Button 
            type="text" 
            size="small" 
            onClick={clearFilters}
            className="cp-text-action !px-2"
          >
            Clear All
          </Button>
        }
      >
        {/* Same filter content as desktop sidebar */}
        <div className="space-y-6">
          {/* Property Type Info */}
          <div className="bg-gradient-to-br from-[#ccff00]/10 to-[#ccff00]/5 p-4 rounded-lg border border-[#ccff00]/20 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
            <div className="flex items-start gap-3">
              <div className="bg-[#ccff00]/20 p-2 rounded-lg shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                <Home className="h-5 w-5 text-cp-lime" />
              </div>
              <div>
                <p className="text-sm font-semibold text-cp-lime mb-1">All Properties</p>
                <p className="text-xs text-cp-subtle">Showing both sale and rental properties</p>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
            <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
              Price Range
            </label>
            <Slider
              range
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={2000000}
              step={10000}
              tipFormatter={(value) => `$${value.toLocaleString()}`}
              styles={{
                track: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' },
                tracks: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' }
              }}
            />
            <div className="flex justify-between text-xs text-cp-subtle mt-2">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
            <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
              Bedrooms
            </label>
            <Slider
              range
              value={bedroomRange}
              onChange={setBedroomRange}
              min={1}
              max={6}
              marks={{ 
                1: { label: <span className="text-cp-subtle">1</span> }, 
                2: { label: <span className="text-cp-subtle">2</span> }, 
                3: { label: <span className="text-cp-subtle">3</span> }, 
                4: { label: <span className="text-cp-subtle">4</span> }, 
                5: { label: <span className="text-cp-subtle">5</span> }, 
                6: { label: <span className="text-cp-subtle">6+</span> } 
              }}
              styles={{
                track: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' },
                tracks: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' }
              }}
            />
          </div>

          {/* Location */}
          <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
            <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
              Location
            </label>
            <CpField>
              <Input
                placeholder="City, suburb, or address"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                prefix={<MapPin className="h-4 w-4 text-cp-lime" />}
                variant="borderless"
              />
            </CpField>
          </div>

          {/* Special Features */}
          <div className="bg-cp-elevated/50 p-4 rounded-lg border border-cp-stroke">
            <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
              Special
            </label>
            <div className="space-y-3 bg-cp-surface p-4 rounded-lg border border-cp-stroke">
              <Checkbox
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
                className="text-cp-muted"
              >
                <span className="text-cp-muted">Featured Properties</span>
              </Checkbox>
              <Checkbox
                checked={filters.urgent}
                onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                className="text-cp-muted"
              >
                <span className="text-cp-muted">Urgent Sale</span>
              </Checkbox>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
