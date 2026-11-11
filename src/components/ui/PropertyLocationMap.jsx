'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { mapsDirectionsUrl, openStreetMapUrl } from '@/utils/propertyCoordinates';
import 'leaflet/dist/leaflet.css';

const DARK_GOOGLE_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a1a' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#b0b0b0' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#151515' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#2a2a2a' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f1f1f' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#333333' }],
  },
  {
    featureType: 'transit',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0d1b24' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#4a6a7a' }],
  },
];

/**
 * Interactive property map.
 * Prefers Google Maps when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set (existing stack);
 * otherwise uses Leaflet + Carto dark tiles (no API key).
 */
export default function PropertyLocationMap({
  latitude,
  longitude,
  title,
  address,
  className = '',
}) {
  const containerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [status, setStatus] = useState('loading'); // loading | ready | error | missing
  const [provider, setProvider] = useState(null);

  const lat = Number(latitude);
  const lng = Number(longitude);
  const valid = Number.isFinite(lat) && Number.isFinite(lng);

  useEffect(() => {
    if (!valid || !containerRef.current) {
      setStatus(valid ? 'loading' : 'missing');
      return undefined;
    }

    let cancelled = false;
    let leafletMap = null;

    const cleanupGoogle = () => {
      mapInstanceRef.current = null;
    };

    const initGoogle = async (apiKey) => {
      const { Loader } = await import('@googlemaps/js-api-loader');
      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places'],
      });
      const google = await loader.load();
      if (cancelled || !containerRef.current) return;

      const map = new google.maps.Map(containerRef.current, {
        center: { lat, lng },
        zoom: 14,
        styles: DARK_GOOGLE_STYLES,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        backgroundColor: '#171717',
      });

      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: title || 'Property',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#ccff00',
          fillOpacity: 1,
          strokeColor: '#171717',
          strokeWeight: 2,
        },
      });

      mapInstanceRef.current = map;
      setProvider('google');
      setStatus('ready');
    };

    const initLeaflet = async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !containerRef.current) return;

      // Avoid re-init on Strict Mode remount into a dirty container
      containerRef.current.innerHTML = '';

      leafletMap = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 14,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      // Key-free OSM raster tiles + CSS invert for dark theme
      // (Carto dark_all now requires an API key).
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
        className: 'property-map-tiles',
      }).addTo(leafletMap);

      const markerHtml = `
        <div style="
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: #ccff00;
          border: 2px solid #171717;
          box-shadow: 0 0 16px rgba(204,255,0,0.65);
        "></div>
      `;

      const icon = L.divIcon({
        className: 'property-location-marker',
        html: markerHtml,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      L.marker([lat, lng], { icon })
        .addTo(leafletMap)
        .bindPopup(
          `<div style="font-family: system-ui, sans-serif; min-width: 140px">
            <strong style="color:#111">${title || 'Property'}</strong>
            ${address ? `<div style="margin-top:4px;color:#555;font-size:12px">${address}</div>` : ''}
          </div>`,
        );

      // Fix tile sizing after mount in flex layouts
      setTimeout(() => leafletMap?.invalidateSize(), 80);

      mapInstanceRef.current = leafletMap;
      setProvider('leaflet');
      setStatus('ready');
    };

    (async () => {
      setStatus('loading');
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      try {
        if (apiKey) {
          try {
            await initGoogle(apiKey);
            return;
          } catch (err) {
            console.warn(
              '[PropertyLocationMap] Google Maps unavailable, using Leaflet',
              err,
            );
            cleanupGoogle();
          }
        }
        await initLeaflet();
      } catch (err) {
        console.error('[PropertyLocationMap] failed to init map', err);
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      if (leafletMap) {
        leafletMap.remove();
        leafletMap = null;
      }
      cleanupGoogle();
    };
  }, [lat, lng, title, address, valid]);

  if (!valid) {
    return (
      <div
        className={`flex h-72 items-center justify-center rounded-xl border border-dashed border-gray-700 bg-[#212121] ${className}`}
      >
        <div className="px-4 text-center text-gray-400">
          <MapPin className="mx-auto mb-2 h-10 w-10 text-[#ccff00]/70" />
          <div className="font-medium text-white">Location unavailable</div>
          <div className="mt-1 text-sm">
            Coordinates were not provided for this listing.
          </div>
        </div>
      </div>
    );
  }

  const directions = mapsDirectionsUrl(lat, lng);
  const osm = openStreetMapUrl(lat, lng);

  return (
    <div className={`overflow-hidden rounded-xl border border-gray-800 bg-[#121212] ${className}`}>
      <div className="relative h-72 w-full sm:h-80 lg:h-[22rem]">
        <div ref={containerRef} className="h-full w-full" />

        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#171717]/90">
            <div className="text-center">
              <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
              <p className="text-sm font-medium text-gray-300">Loading map…</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#171717]">
            <div className="px-4 text-center">
              <MapPin className="mx-auto mb-2 h-10 w-10 text-red-400" />
              <p className="font-medium text-white">Couldn’t load the map</p>
              <a
                href={osm}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-[#ccff00] hover:underline"
              >
                Open on OpenStreetMap <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}

        {status === 'ready' && (
          <div className="pointer-events-none absolute top-3 left-3 rounded-full border border-gray-700 bg-[#171717]/85 px-3 py-1 text-xs text-gray-300 backdrop-blur">
            {provider === 'google' ? 'Google Maps' : 'Map'}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-white">
            {address || title || 'Property location'}
          </div>
          <div className="text-xs text-gray-500">
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1.5 text-xs font-semibold text-[#ccff00] transition hover:bg-[#ccff00] hover:text-[#171717]"
          >
            Directions <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={osm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-[#212121] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-[#ccff00]/40 hover:text-[#ccff00]"
          >
            Larger map
          </a>
        </div>
      </div>
    </div>
  );
}
