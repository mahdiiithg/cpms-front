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
import {
  buildPropertyFilters,
  unwrapPropertyList,
} from '@/utils/listingQuery';

const { Option } = Select;
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
  const [savedProperties, setSavedProperties] = useState(new Set());
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
    { value: 'date', label: 'Newest First' },
    { value: 'price', label: 'Price' },
    { value: 'bedrooms', label: 'Bedrooms' },
    { value: 'size', label: 'Size' },
    { value: 'views', label: 'Most Viewed' }
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
    const [sortBy, order] = value.includes('-desc') 
      ? [value.replace('-desc', ''), 'desc']
      : [value, 'asc'];
    
    setFilters(prev => ({ ...prev, sortBy, sortOrder: order }));
    setCurrentPage(1);
  };

  const toggleSaveProperty = (propertyId) => {
    setSavedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
      } else {
        newSet.add(propertyId);
      }
      return newSet;
    });
  };

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
    <div className="min-h-screen bg-[#171717]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-[#ccff00] transition-colors">Home</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[#ccff00]">Property Listings</span>
          </div>

          {/* Title and Stats */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Property Listings</h1>
              <p className="text-gray-400 mt-1">
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
              className="flex-1"
              onSearch={handleSearch}
              styles={{
                affixWrapper: {
                  background: '#212121',
                  borderColor: '#374151',
                  color: 'white'
                },
                input: { 
                  background: '#212121',
                  color: 'white',
                  borderColor: '#374151'
                }
              }}
              style={{
                background: '#212121'
              }}
              enterButton={
                <Button className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]">
                  <Search className="h-4 w-4" />
                </Button>
              }
            />
            <Button
              size="large"
              icon={<SlidersHorizontal className="h-4 w-4" />}
              onClick={() => setShowFilters(true)}
              className="lg:hidden bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
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
                header: { background: '#1a1a1a', borderBottom: '1px solid #374151', color: 'white' }
              }}
              bordered
              style={{ borderColor: '#374151' }}
              extra={
                <Button 
                  type="link" 
                  size="small" 
                  onClick={clearFilters}
                  className="text-[#ccff00] hover:text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
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
                      <Home className="h-5 w-5 text-[#ccff00]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#ccff00] mb-1">All Properties</p>
                      <p className="text-xs text-gray-400">Showing both sale and rental properties</p>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
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
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
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
                      1: { label: <span className="text-gray-400">1</span> }, 
                      2: { label: <span className="text-gray-400">2</span> }, 
                      3: { label: <span className="text-gray-400">3</span> }, 
                      4: { label: <span className="text-gray-400">4</span> }, 
                      5: { label: <span className="text-gray-400">5</span> }, 
                      6: { label: <span className="text-gray-400">6+</span> } 
                    }}
                    styles={{
                      track: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' },
                      tracks: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' }
                    }}
                  />
                </div>

                {/* Location */}
                <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
                  <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                    Location
                  </label>
                  <Input
                    placeholder="City, suburb, or address"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    prefix={<MapPin className="h-4 w-4 text-[#ccff00]" />}
                    className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                  />
                </div>

                {/* Special Features */}
                <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
                  <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                    Special
                  </label>
                  <div className="space-y-3 bg-[#171717] p-4 rounded-lg border border-gray-800">
                    <Checkbox
                      checked={filters.featured}
                      onChange={(e) => handleFilterChange('featured', e.target.checked)}
                      className="text-gray-300"
                    >
                      <span className="text-gray-300">Featured Properties</span>
                    </Checkbox>
                    <Checkbox
                      checked={filters.urgent}
                      onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                      className="text-gray-300"
                    >
                      <span className="text-gray-300">Urgent Sale</span>
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
                <Select
                  value={`${filters.sortBy}${filters.sortOrder === 'desc' ? '-desc' : ''}`}
                  onChange={handleSortChange}
                  className="w-48 dark-select"
                  size="large"
                >
                  {sortOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
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
                <Spin size="large" className="text-[#ccff00]" tip={<span className="text-gray-300">Loading properties...</span>} />
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8">
                <Empty 
                  description={<span className="text-gray-400">Failed to load properties</span>}
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
              <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-8">
                <Empty 
                  description={<span className="text-gray-400">No properties found</span>}
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
                  {properties.map(property => (
                    <ListingsPropertyCard
                      key={property.id}
                      property={property}
                      isListView={viewMode === 'list'}
                      isSaved={savedProperties.has(property.id)}
                      onToggleSave={toggleSaveProperty}
                    />
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
          header: { background: '#1a1a1a', borderBottom: '1px solid #374151' }
        }}
        extra={
          <Button 
            type="link" 
            size="small" 
            onClick={clearFilters}
            className="text-[#ccff00] hover:text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
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
                <Home className="h-5 w-5 text-[#ccff00]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#ccff00] mb-1">All Properties</p>
                <p className="text-xs text-gray-400">Showing both sale and rental properties</p>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
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
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
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
                1: { label: <span className="text-gray-400">1</span> }, 
                2: { label: <span className="text-gray-400">2</span> }, 
                3: { label: <span className="text-gray-400">3</span> }, 
                4: { label: <span className="text-gray-400">4</span> }, 
                5: { label: <span className="text-gray-400">5</span> }, 
                6: { label: <span className="text-gray-400">6+</span> } 
              }}
              styles={{
                track: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' },
                tracks: { background: '#ccff00', boxShadow: '0 0 10px rgba(204,255,0,0.5)' }
              }}
            />
          </div>

          {/* Location */}
          <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
            <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
              Location
            </label>
            <Input
              placeholder="City, suburb, or address"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              prefix={<MapPin className="h-4 w-4 text-[#ccff00]" />}
              className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            />
          </div>

          {/* Special Features */}
          <div className="bg-[#212121]/50 p-4 rounded-lg border border-gray-800/50">
            <label className="block text-sm font-medium text-white mb-3 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
              Special
            </label>
            <div className="space-y-3 bg-[#171717] p-4 rounded-lg border border-gray-800">
              <Checkbox
                checked={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.checked)}
                className="text-gray-300"
              >
                <span className="text-gray-300">Featured Properties</span>
              </Checkbox>
              <Checkbox
                checked={filters.urgent}
                onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                className="text-gray-300"
              >
                <span className="text-gray-300">Urgent Sale</span>
              </Checkbox>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
