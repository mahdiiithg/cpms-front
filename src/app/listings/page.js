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
  Tag,
  Avatar,
} from 'antd';
import {
  Search,
  MapPin,
  Grid,
  List,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  Eye,
  Phone,
  Camera,
  Bed,
  Bath,
  Car,
  Home,
  Star,
  Clock,
  Map,
  Share2,
} from 'lucide-react';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import Link from 'next/link';

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

  // GraphQL query with enhanced filters
  const gqlFilters = useMemo(() => ({
    // Exclude `type` so listings page fetches all property types by default
    ...(() => { const { type, ...rest } = filters; return rest; })(),
    limit: pageSize,
    offset,
    searchQuery: searchTerm || undefined,
    minPrice: priceRange[0] || undefined,
    maxPrice: priceRange[1] || undefined,
    minBedrooms: bedroomRange[0] || undefined,
    maxBedrooms: bedroomRange[1] || undefined
  }), [filters, pageSize, offset, searchTerm, priceRange, bedroomRange]);

  // Data fetching
  const { data, loading, error, refetch } = useQuery(
    searchTerm ? SEARCH_PROPERTIES : GET_PROPERTIES,
    {
      variables: searchTerm 
        ? { query: searchTerm, filters: gqlFilters }
        : { filters: gqlFilters },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    }
  );

  const propertyData = searchTerm ? data?.searchProperties : data?.properties;
  const properties = propertyData?.properties || [];
  const totalCount = propertyData?.totalCount || 0;
  const totalPages = propertyData?.totalPages || 0;

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
    { value: 'needs_work', label: 'Needs Work' }
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

  const formatPrice = (property) => {
    let price, suffix;

    if (property.listingType === 'sale') {
      price = property.salePrice;
      suffix = '';
    } else if (property.listingType === 'rent') {
      price = property.rentPrice;
      suffix = '/week';
    } else {
      // Fallback: try to determine from available price fields
      if (property.salePrice) {
        price = property.salePrice;
        suffix = '';
      } else if (property.rentPrice) {
        price = property.rentPrice;
        suffix = '/week';
      } else {
        return 'Price on request';
      }
    }

    if (!price) return 'Price on request';

    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);

    return `${formatted}${suffix}`;
  };

  // Enhanced Property Card Component
  const PropertyCard = ({ property, isListView = false }) => {
    const isSaved = savedProperties.has(property.id);

    return (
      <Card
        className={`property-card hover:shadow-lg transition-all duration-300 ${
          isListView ? 'mb-4' : ''
        }`}
        cover={
          <div className="relative">
            <img
              src={property.images[0] || '/images/placeholder-property.jpg'}
              alt={property.title}
              className={`object-cover ${isListView ? 'h-48' : 'h-64'}`}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              {property.featured && (
                <Tag color="gold" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Tag>
              )}
              {property.urgent && (
                <Tag color="red" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Urgent
                </Tag>
              )}
              <Tag color="blue" className="capitalize">
                {property.listingType}
              </Tag>
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                type="text"
                shape="circle"
                size="small"
                className="bg-white/80 hover:bg-white"
                icon={<Camera className="h-4 w-4" />}
              >
              </Button>
              <Button
                type="text"
                shape="circle"
                size="small"
                className={`${isSaved ? 'bg-red-100 text-red-600' : 'bg-white/80'} hover:bg-white`}
                icon={<Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />}
                onClick={() => toggleSaveProperty(property.id)}
              />
            </div>
            <div className="absolute bottom-3 left-3">
              <Tag color="green" className="text-lg font-semibold">
                {formatPrice(property)}
              </Tag>
            </div>
          </div>
        }
        actions={[
          <Button key="view" type="link" icon={<Eye className="h-4 w-4" />}>
            {property.views || 0} views
          </Button>,
          <Button key="share" type="link" icon={<Share2 className="h-4 w-4" />}>
            Share
          </Button>,
          <Button key="contact" type="primary" icon={<Phone className="h-4 w-4" />}>
            Contact
          </Button>
        ]}
      >
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              <Link href={`/property/${property.id}`} className="hover:text-blue-600">
                {property.title}
              </Link>
            </h3>
            <p className="text-gray-600 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {property.location.suburb}, {property.location.city}
            </p>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.bathrooms}
            </span>
            {property.parking > 0 && (
              <span className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                {property.parking}
              </span>
            )}
            {property.propertySize && (
              <span className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                {property.propertySize} sqm
              </span>
            )}
          </div>

          {property.features && property.features.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map(feature => (
                <Tag key={feature} size="small" className="text-xs">
                  {feature.replace(/_/g, ' ')}
                </Tag>
              ))}
              {property.features.length > 3 && (
                <Tag size="small" className="text-xs">
                  +{property.features.length - 3} more
                </Tag>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar size="small" src={property.agent?.avatar} />
              <span className="text-sm text-gray-600">{property.agent?.name}</span>
            </div>
            <Link href={`/property/${property.id}`} className="text-blue-600 text-sm">View details</Link>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-blue-600">Property Listings</span>
          </div>

          {/* Title and Stats */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
              <p className="text-gray-600 mt-1">
                {loading ? 'Loading...' : `${totalCount} properties found`}
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
              enterButton={<Search className="h-4 w-4" />}
            />
            <Button
              size="large"
              icon={<SlidersHorizontal className="h-4 w-4" />}
              onClick={() => setShowFilters(true)}
              className="lg:hidden"
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
            <Card title="Filters" extra={
              <Button type="link" size="small" onClick={clearFilters}>
                Clear All
              </Button>
            }>
              <div className="space-y-4">
                {/* Property Type - removed on listings page to show all properties by default */}
                <div>
                  <p className="text-sm text-gray-500">Showing all property types (sale, rent).</p>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <Slider
                    range
                    value={bedroomRange}
                    onChange={setBedroomRange}
                    min={1}
                    max={6}
                    marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6+' }}
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    placeholder="City, suburb, or address"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    prefix={<MapPin className="h-4 w-4 text-gray-400" />}
                  />
                </div>

                {/* Special Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special
                  </label>
                  <div className="space-y-2">
                    <Checkbox
                      checked={filters.featured}
                      onChange={(e) => handleFilterChange('featured', e.target.checked)}
                    >
                      Featured Properties
                    </Checkbox>
                    <Checkbox
                      checked={filters.urgent}
                      onChange={(e) => handleFilterChange('urgent', e.target.checked)}
                    >
                      Urgent Sale
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
                  className="w-48"
                >
                  {sortOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    type={viewMode === 'grid' ? 'primary' : 'text'}
                    size="small"
                    icon={<Grid className="h-4 w-4" />}
                    onClick={() => setViewMode('grid')}
                  />
                  <Button
                    type={viewMode === 'list' ? 'primary' : 'text'}
                    size="small"
                    icon={<List className="h-4 w-4" />}
                    onClick={() => setViewMode('list')}
                  />
                  <Button
                    type={viewMode === 'map' ? 'primary' : 'text'}
                    size="small"
                    icon={<Map className="h-4 w-4" />}
                    onClick={() => setViewMode('map')}
                  />
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spin size="large" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <Empty description="Failed to load properties" />
                <Button onClick={() => refetch()} className="mt-4">
                  Try Again
                </Button>
              </div>
            ) : properties.length === 0 ? (
              <Empty description="No properties found" className="py-12" />
            ) : (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }>
                  {properties.map(property => (
                    <PropertyCard 
                      key={property.id} 
                      property={property}
                      isListView={viewMode === 'list'}
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
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer
        title="Filters"
        placement="left"
        width={320}
        onClose={() => setShowFilters(false)}
        open={showFilters}
        extra={
          <Button type="link" size="small" onClick={clearFilters}>
            Clear All
          </Button>
        }
      >
        {/* Same filter content as desktop sidebar */}
        <div className="space-y-4">
          {/* Mobile filters content - keep minimal for now */}
        </div>
      </Drawer>
    </div>
  );
}
