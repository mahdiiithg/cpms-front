'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Spin, Button, Empty } from 'antd';
import { MapPin, Filter, Grid, Map } from 'lucide-react';
import PropertiesList from '@/components/PropertiesList';
import { GET_PROPERTIES } from '@/lib/queries';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const { data: session } = useSession();
  const [view, setView] = useState('grid'); // 'grid' or 'map'
  const [filters, setFilters] = useState({
    propertyType: null,
    minPrice: null,
    maxPrice: null,
    oceanView: false,
    beachfront: false,
    maxDistanceToBeach: 1000, // 1km
  });

  const { 
    data: propertiesData, 
    loading, 
    error, 
    refetch 
  } = useQuery(GET_PROPERTIES, {
    variables: {
      filters: filters,
      limit: 20,
      offset: 0
    },
    errorPolicy: 'all'
  });

  const properties = propertiesData?.properties || [];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
        <span className="ml-3">Loading coastal properties...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-500 mb-4">
          We couldn't load the properties. Please try again.
        </p>
        <Button type="primary" onClick={() => refetch()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome to Coast Planet
                </h1>
                <p className="text-gray-600">
                  Discover amazing coastal properties for your next getaway
                </p>
              </div>
              
              {session?.user && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Hello, {session.user.name}!
                  </span>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">
                      Coastal Properties
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {properties.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">★</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-900">
                      Average Rating
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      4.8
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🏖️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-purple-900">
                      Beachfront
                    </p>
                    <p className="text-2xl font-bold text-purple-600">
                      {properties.filter(p => p.location?.beachfront).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                icon={<Filter className="h-4 w-4" />}
                className="flex items-center"
              >
                Filters
              </Button>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Ocean View:</label>
                <input
                  type="checkbox"
                  checked={filters.oceanView}
                  onChange={(e) => handleFilterChange('oceanView', e.target.checked)}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Beachfront:</label>
                <input
                  type="checkbox"
                  checked={filters.beachfront}
                  onChange={(e) => handleFilterChange('beachfront', e.target.checked)}
                  className="rounded"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                type={view === 'grid' ? 'primary' : 'default'}
                icon={<Grid className="h-4 w-4" />}
                onClick={() => setView('grid')}
              >
                Grid
              </Button>
              <Button
                type={view === 'map' ? 'primary' : 'default'}
                icon={<Map className="h-4 w-4" />}
                onClick={() => setView('map')}
              >
                Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'grid' ? (
          properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PropertiesList properties={properties} />
            </div>
          ) : (
            <Empty
              description="No coastal properties found"
              className="mt-12"
            >
              <Button type="primary">
                Browse All Properties
              </Button>
            </Empty>
          )
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[600px]">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Map View Coming Soon
                </h3>
                <p className="text-gray-500">
                  We're working on an interactive map to help you explore coastal properties by location.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;