import { useEffect, useRef, useState, useCallback } from 'react';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import GymPopupCard from './GymPopupCard';

const GoogleMap = ({
  gyms,
  onBoundsChanged,
  onMapLoad,
  selectedGym,
  onGymSelect,
}) => {
  const { mapRef, map, isLoaded, error } = useGoogleMaps();
  const markersRef = useRef(new Map()); // Use Map for better lookup performance
  const boundsListenerRef = useRef(null);
  const timeoutRef = useRef(null);

  // State for popup card
  const [showPopupCard, setShowPopupCard] = useState(false);
  const [selectedGymData, setSelectedGymData] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [mapBounds, setMapBounds] = useState({ width: 0, height: 0 });

  // Update map bounds when map loads or resizes
  useEffect(() => {
    if (!mapRef.current) return;

    const updateMapBounds = () => {
      const rect = mapRef.current.getBoundingClientRect();
      setMapBounds({ width: rect.width, height: rect.height });
    };

    updateMapBounds();
    window.addEventListener('resize', updateMapBounds);

    return () => window.removeEventListener('resize', updateMapBounds);
  }, [isLoaded]);

  // Convert lat/lng to pixel coordinates
  const getPixelPosition = useCallback(
    (marker) => {
      if (!map || !marker) return null;

      try {
        const projection = map.getProjection();
        const bounds = map.getBounds();
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        const worldCoordinate = projection.fromLatLngToPoint(
          marker.getPosition(),
        );
        const pixelCoordinate = new window.google.maps.Point(
          worldCoordinate.x * Math.pow(2, map.getZoom()),
          worldCoordinate.y * Math.pow(2, map.getZoom()),
        );

        const mapDiv = mapRef.current;
        const mapRect = mapDiv.getBoundingClientRect();
        const centerPixel = new window.google.maps.Point(
          mapRect.width / 2,
          mapRect.height / 2,
        );

        const centerWorldCoordinate = projection.fromLatLngToPoint(
          map.getCenter(),
        );
        const centerPixelCoordinate = new window.google.maps.Point(
          centerWorldCoordinate.x * Math.pow(2, map.getZoom()),
          centerWorldCoordinate.y * Math.pow(2, map.getZoom()),
        );

        return {
          x: centerPixel.x + (pixelCoordinate.x - centerPixelCoordinate.x),
          y: centerPixel.y + (pixelCoordinate.y - centerPixelCoordinate.y),
        };
      } catch (error) {
        console.error('Error calculating pixel position:', error);
        return null;
      }
    },
    [map],
  );

  // Handle bounds change for fetching new gym data
  useEffect(() => {
    if (!map || !isLoaded || !window.google?.maps?.event) return;

    const handleBoundsChanged = () => {
      try {
        const bounds = map.getBounds();
        if (bounds && onBoundsChanged) {
          const ne = bounds.getNorthEast();
          const sw = bounds.getSouthWest();

          const boundsData = {
            north: ne.lat(),
            south: sw.lat(),
            east: ne.lng(),
            west: sw.lng(),
            center: {
              lat: map.getCenter().lat(),
              lng: map.getCenter().lng(),
            },
            zoom: map.getZoom(),
          };

          onBoundsChanged(boundsData);
        }
      } catch (error) {
        console.error('Error handling bounds change:', error);
      }
    };

    // Add debounce to prevent too many API calls
    const debouncedBoundsChanged = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleBoundsChanged, 500);
    };

    // Remove existing listener if any
    if (boundsListenerRef.current) {
      try {
        window.google.maps.event.removeListener(boundsListenerRef.current);
      } catch (error) {
        console.warn('Error removing bounds listener:', error);
      }
    }

    try {
      boundsListenerRef.current = map.addListener(
        'bounds_changed',
        debouncedBoundsChanged,
      );
    } catch (error) {
      console.error('Error adding bounds listener:', error);
    }

    // Call onMapLoad when map is ready
    if (onMapLoad) {
      onMapLoad(map);
    }

    return () => {
      if (boundsListenerRef.current && window.google?.maps?.event) {
        try {
          window.google.maps.event.removeListener(boundsListenerRef.current);
        } catch (error) {
          console.warn('Error removing bounds listener in cleanup:', error);
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [map, isLoaded, onBoundsChanged, onMapLoad]);

  // Create marker click handler - Updated to show popup card
  const handleMarkerClick = useCallback(
    (gym, marker) => {
      const pixelPos = getPixelPosition(marker);
      if (pixelPos) {
        setPopupPosition(pixelPos);
        setSelectedGymData(gym);
        setShowPopupCard(true);

        // Notify parent component about selection
        if (onGymSelect) {
          onGymSelect(gym);
        }
      }
    },
    [getPixelPosition, onGymSelect],
  );

  // Handle popup close
  const handlePopupClose = useCallback(() => {
    setShowPopupCard(false);
    // setSelectedGymData(null);
    // if (onGymSelect) {
    //   onGymSelect(null);
    // }
  }, [onGymSelect]);

  // Close popup when map is clicked
  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleMapClick = () => {
      if (showPopupCard) {
        handlePopupClose();
      }
    };

    const mapClickListener = map.addListener('click', handleMapClick);

    return () => {
      if (mapClickListener && window.google?.maps?.event) {
        window.google.maps.event.removeListener(mapClickListener);
      }
    };
  }, [map, isLoaded, showPopupCard, handlePopupClose]);

  // Update popup position when map moves
  useEffect(() => {
    if (!map || !isLoaded || !showPopupCard || !selectedGymData) return;

    const handleMapMove = () => {
      const markerData = markersRef.current.get(selectedGymData.id);
      if (markerData) {
        const newPixelPos = getPixelPosition(markerData.marker);
        if (newPixelPos) {
          setPopupPosition(newPixelPos);
        }
      }
    };

    const moveListener = map.addListener('center_changed', handleMapMove);
    const zoomListener = map.addListener('zoom_changed', handleMapMove);

    return () => {
      if (window.google?.maps?.event) {
        window.google.maps.event.removeListener(moveListener);
        window.google.maps.event.removeListener(zoomListener);
      }
    };
  }, [map, isLoaded, showPopupCard, selectedGymData, getPixelPosition]);

  // Update markers when gyms data changes
  useEffect(() => {
    if (!map || !isLoaded || !gyms || !window.google?.maps?.Marker) return;

    // Clear existing markers safely
    markersRef.current.forEach(({ marker }) => {
      try {
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        }
      } catch (error) {
        console.warn('Error clearing marker:', error);
      }
    });
    markersRef.current.clear();

    // Add new markers
    gyms.forEach((gym) => {
      if (gym.location?.latitude && gym.location?.longitude) {
        try {
          const marker = new window.google.maps.Marker({
            position: {
              lat: parseFloat(gym.location.latitude),
              lng: parseFloat(gym.location.longitude),
            },
            map: map,
            title: gym.name,
            icon: {
              url: '/assets/images/pin.svg',
              scaledSize: new window.google.maps.Size(30, 30),
              // anchor: new window.google.maps.Point(44, 44), // Anchor point for proper positioning
            },
            optimized: true, // Enable marker optimization for better performance
          });

          // Add click listener
          const clickListener = marker.addListener('click', () => {
            handleMarkerClick(gym, marker);
          });

          // Store marker with its gym ID and click listener for cleanup
          markersRef.current.set(gym.id, {
            marker,
            clickListener,
            gym,
          });
        } catch (error) {
          console.error('Error creating marker for gym:', gym.name, error);
        }
      }
    });
  }, [map, isLoaded, gyms, handleMarkerClick]);

  // Handle external gym selection (from list) - Updated to show popup card
  useEffect(() => {
    if (!map || !isLoaded) return;

    if (selectedGym) {
      // Find the marker for the selected gym
      const markerData = markersRef.current.get(selectedGym.id);
      if (markerData) {
        handleMarkerClick(selectedGym, markerData.marker);
      }
    } else {
      // Close popup when no gym is selected
      setShowPopupCard(false);
      setSelectedGymData(null);
    }
  }, [selectedGym, map, isLoaded, handleMarkerClick]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Clear all markers and listeners
      markersRef.current.forEach(({ marker, clickListener }) => {
        try {
          if (clickListener && window.google?.maps?.event) {
            window.google.maps.event.removeListener(clickListener);
          }
          if (marker && typeof marker.setMap === 'function') {
            marker.setMap(null);
          }
        } catch (error) {
          console.warn('Error cleaning up marker:', error);
        }
      });
      markersRef.current.clear();

      // Clear timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Remove bounds listener
      if (boundsListenerRef.current && window.google?.maps?.event) {
        try {
          window.google.maps.event.removeListener(boundsListenerRef.current);
        } catch (error) {
          console.warn('Error removing bounds listener in cleanup:', error);
        }
      }
    };
  }, []);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
        <div className="p-6 text-center">
          <div className="mb-3 text-4xl text-red-500">🗺️</div>
          <p className="mb-2 font-semibold text-red-600">Error loading map</p>
          <p className="max-w-xs text-sm text-gray-600">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative h-full w-full">
      <div
        ref={mapRef}
        className="h-full w-full rounded-lg"
        style={{ minHeight: '400px' }}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100">
          <div className="text-center">
            <div className="border-primary mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"></div>
            <p className="font-medium text-gray-600">Loading map...</p>
            <p className="mt-1 text-sm text-gray-500">
              Please wait while we prepare your gym locations
            </p>
          </div>
        </div>
      )}

      {/* Gym count indicator */}
      {isLoaded && gyms && gyms.length > 0 && (
        <div className="absolute top-4 left-4 rounded-3xl bg-white/90 px-3 py-2 capitalize shadow-md backdrop-blur-2xl">
          <span className="text-sm font-medium text-gray-700">
            {gyms.length} gym{gyms.length !== 1 ? 's' : ''} shown
          </span>
        </div>
      )}

      {/* Gym Popup Card */}
      <GymPopupCard
        gym={selectedGymData}
        position={popupPosition}
        onClose={handlePopupClose}
        isVisible={showPopupCard}
        mapBounds={mapBounds}
        mapCenter={map?.getCenter()?.toJSON()}
        mapZoom={map?.getZoom()}
      />
    </div>
  );
};

export default GoogleMap;
