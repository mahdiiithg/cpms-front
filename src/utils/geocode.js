/**
 * Browser helpers that call our /api/geocode proxy (Nominatim).
 */

export async function geocodeQuery(query, { signal, limit = 1 } = {}) {
  const q = String(query || '').trim();
  if (!q) return [];

  const url = `/api/geocode?mode=search&q=${encodeURIComponent(q)}&limit=${limit}`;
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('Geocode failed');
  const data = await res.json();
  return Array.isArray(data?.results) ? data.results : [];
}

export async function reverseGeocode(lat, lng, { signal } = {}) {
  const latitude = Number(lat);
  const longitude = Number(lng);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  const url = `/api/geocode?mode=reverse&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`;
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('Reverse geocode failed');
  const data = await res.json();
  return data?.result || null;
}

/** Known coastal defaults when Nominatim is slow/unavailable */
export const CITY_COORD_FALLBACKS = {
  'Gold Coast': { latitude: -28.0167, longitude: 153.4 },
  'Sunshine Coast': { latitude: -26.65, longitude: 153.0667 },
  Brisbane: { latitude: -27.4698, longitude: 153.0251 },
  Cairns: { latitude: -16.9186, longitude: 145.7781 },
  Sydney: { latitude: -33.8688, longitude: 151.2093 },
  Melbourne: { latitude: -37.8136, longitude: 144.9631 },
  Perth: { latitude: -31.9505, longitude: 115.8605 },
  Adelaide: { latitude: -34.9285, longitude: 138.6007 },
  Dubai: { latitude: 25.2048, longitude: 55.2708 },
  'Abu Dhabi': { latitude: 24.4539, longitude: 54.3773 },
  Miami: { latitude: 25.7617, longitude: -80.1918 },
};

export const DEFAULT_MAP_CENTER = {
  latitude: -28.0167,
  longitude: 153.4,
};
