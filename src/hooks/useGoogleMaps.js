import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const useGoogleMaps = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places', 'geometry'],
      });

      try {
        const google = await loader.load();

        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 25.2048, lng: 55.2708 }, // Dubai coordinates
            zoom: 12,
            styles: [
              // Optional: Custom map styling
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
              },
            ],
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });

          setMap(mapInstance);
          setIsLoaded(true);
        }
      } catch (err) {
        setError(err);
        console.error('Error loading Google Maps:', err);
      }
    };

    initializeMap();
  }, []);

  return { mapRef, map, isLoaded, error };
};

export default useGoogleMaps;
