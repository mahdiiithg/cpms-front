/**
 * Normalize property coordinate payloads from GraphQL / memory seed.
 * Supports { latitude, longitude } and GeoJSON { coordinates: [lng, lat] }.
 */
export function resolvePropertyLatLng(coordinates) {
  if (!coordinates || typeof coordinates !== 'object') return null;

  const lat = Number(coordinates.latitude);
  const lng = Number(coordinates.longitude);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng };
  }

  const pair = coordinates.coordinates;
  if (Array.isArray(pair) && pair.length >= 2) {
    const geoLng = Number(pair[0]);
    const geoLat = Number(pair[1]);
    if (Number.isFinite(geoLat) && Number.isFinite(geoLng)) {
      return { lat: geoLat, lng: geoLng };
    }
  }

  return null;
}

export function mapsDirectionsUrl(lat, lng) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function openStreetMapUrl(lat, lng) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
}
