'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import {
  CITY_COORD_FALLBACKS,
  DEFAULT_MAP_CENTER,
  geocodeQuery,
  reverseGeocode,
} from '@/utils/geocode';
import 'leaflet/dist/leaflet.css';

function limeIcon(L) {
  return L.divIcon({
    className: 'property-location-marker',
    html: `<div style="
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      background: #ccff00;
      border: 2px solid #171717;
      box-shadow: 0 0 16px rgba(204,255,0,0.65);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

/**
 * Interactive dark+lime Leaflet picker for seller list flow.
 * Click map → coordinates (+ reverse geocode). Search query → move marker.
 */
export default function ListingLocationPicker({
  value,
  onChange,
  searchQuery = '',
  onResolvedLocation,
  className = '',
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const LRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const onResolvedRef = useRef(onResolvedLocation);
  const [status, setStatus] = useState('loading');
  const [hint, setHint] = useState('Click the map or search city/address');

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    onResolvedRef.current = onResolvedLocation;
  }, [onResolvedLocation]);

  const lat = Number(value?.latitude);
  const lng = Number(value?.longitude);
  const hasValue = Number.isFinite(lat) && Number.isFinite(lng);

  // Init map once
  useEffect(() => {
    let cancelled = false;
    let map;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        if (cancelled || !containerRef.current) return;
        LRef.current = L;
        containerRef.current.innerHTML = '';

        const center = hasValue
          ? [lat, lng]
          : [DEFAULT_MAP_CENTER.latitude, DEFAULT_MAP_CENTER.longitude];

        map = L.map(containerRef.current, {
          center,
          zoom: hasValue ? 14 : 11,
          scrollWheelZoom: false,
          attributionControl: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
          className: 'property-map-tiles',
        }).addTo(map);

        const icon = limeIcon(L);
        if (hasValue) {
          markerRef.current = L.marker([lat, lng], { icon, draggable: true }).addTo(map);
        }

        map.on('click', async (e) => {
          const next = {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
          };
          onChangeRef.current?.(next);
          setHint('Pin dropped — resolving address…');
          try {
            const resolved = await reverseGeocode(next.latitude, next.longitude);
            if (resolved) {
              onResolvedRef.current?.(resolved);
              setHint(resolved.displayName || 'Location set from map');
            } else {
              setHint(`${next.latitude.toFixed(5)}, ${next.longitude.toFixed(5)}`);
            }
          } catch {
            setHint(`${next.latitude.toFixed(5)}, ${next.longitude.toFixed(5)}`);
          }
        });

        mapRef.current = map;
        setStatus('ready');
        setTimeout(() => map?.invalidateSize(), 100);
      } catch (err) {
        console.error('[ListingLocationPicker] init failed', err);
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      if (map) {
        map.remove();
        map = null;
      }
      mapRef.current = null;
      markerRef.current = null;
    };
    // intentionally mount-only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync marker when value changes
  useEffect(() => {
    const map = mapRef.current;
    const L = LRef.current;
    if (!map || !L || !hasValue) return;

    if (!markerRef.current) {
      markerRef.current = L.marker([lat, lng], {
        icon: limeIcon(L),
        draggable: true,
      }).addTo(map);
      markerRef.current.on('dragend', async (e) => {
        const pos = e.target.getLatLng();
        const next = { latitude: pos.lat, longitude: pos.lng };
        onChangeRef.current?.(next);
        try {
          const resolved = await reverseGeocode(next.latitude, next.longitude);
          if (resolved) onResolvedRef.current?.(resolved);
        } catch {
          /* ignore */
        }
      });
    } else {
      markerRef.current.setLatLng([lat, lng]);
    }
    map.setView([lat, lng], Math.max(map.getZoom(), 13), { animate: true });
  }, [lat, lng, hasValue]);

  // Geocode when city/address search query changes
  useEffect(() => {
    const q = String(searchQuery || '').trim();
    if (!q || q.length < 2) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setHint('Finding location…');
        const results = await geocodeQuery(q, { signal: controller.signal, limit: 1 });
        if (results[0]) {
          const hit = results[0];
          onChangeRef.current?.({
            latitude: hit.latitude,
            longitude: hit.longitude,
          });
          setHint(hit.displayName || 'Location found');
          return;
        }

        // Fallback: known city centers
        const cityKey = Object.keys(CITY_COORD_FALLBACKS).find((name) =>
          q.toLowerCase().includes(name.toLowerCase()),
        );
        if (cityKey) {
          onChangeRef.current?.(CITY_COORD_FALLBACKS[cityKey]);
          setHint(`${cityKey} (approximate center)`);
        } else {
          setHint('No map match yet — click the map to drop a pin');
        }
      } catch (err) {
        if (err?.name === 'AbortError') return;
        const cityKey = Object.keys(CITY_COORD_FALLBACKS).find((name) =>
          q.toLowerCase().includes(name.toLowerCase()),
        );
        if (cityKey) {
          onChangeRef.current?.(CITY_COORD_FALLBACKS[cityKey]);
          setHint(`${cityKey} (approximate center)`);
        }
      }
    }, 550);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-cp-stroke bg-cp-raised ${className}`}
    >
      <div className="relative h-64 w-full sm:h-72">
        <div ref={containerRef} className="h-full w-full bg-cp-elevated" />
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-cp-surface/90">
            <div className="text-center">
              <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-2 border-cp-lime border-t-transparent" />
              <p className="text-sm text-cp-muted">Loading map…</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-cp-surface">
            <div className="px-4 text-center text-cp-muted">
              <MapPin className="mx-auto mb-2 h-8 w-8 text-red-400" />
              Couldn’t load the map
            </div>
          </div>
        )}
      </div>
      <div className="flex items-start gap-2 border-t border-cp-stroke px-3 py-2.5">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cp-lime" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-white">
            {hasValue
              ? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
              : 'No pin yet'}
          </p>
          <p className="truncate text-xs text-cp-subtle">{hint}</p>
        </div>
      </div>
    </div>
  );
}
