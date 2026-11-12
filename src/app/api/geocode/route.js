import { NextResponse } from 'next/server';

const NOMINATIM = 'https://nominatim.openstreetmap.org';
const UA = 'CoastPlanetCPMS/1.0 (listing-location; contact=listings@coastplanet.demo)';

function normalizeSearchHit(hit) {
  const address = hit?.address || {};
  return {
    latitude: Number(hit.lat),
    longitude: Number(hit.lon),
    displayName: hit.display_name || '',
    city:
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      address.municipality ||
      '',
    state: address.state || address.region || '',
    country: address.country || '',
    postcode: address.postcode || '',
    road: [address.house_number, address.road].filter(Boolean).join(' '),
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') || 'search';

  try {
    if (mode === 'reverse') {
      const lat = searchParams.get('lat');
      const lon = searchParams.get('lon');
      if (!lat || !lon) {
        return NextResponse.json({ error: 'lat and lon required' }, { status: 400 });
      }
      const url = `${NOMINATIM}/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&addressdetails=1`;
      const res = await fetch(url, {
        headers: { Accept: 'application/json', 'User-Agent': UA },
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        return NextResponse.json({ error: 'upstream reverse failed' }, { status: 502 });
      }
      const hit = await res.json();
      return NextResponse.json({ result: normalizeSearchHit(hit) });
    }

    const q = searchParams.get('q');
    if (!q) {
      return NextResponse.json({ error: 'q required' }, { status: 400 });
    }
    const limit = Math.min(5, Math.max(1, Number(searchParams.get('limit')) || 1));
    const url = `${NOMINATIM}/search?format=jsonv2&q=${encodeURIComponent(q)}&limit=${limit}&addressdetails=1`;
    const res = await fetch(url, {
      headers: { Accept: 'application/json', 'User-Agent': UA },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'upstream search failed' }, { status: 502 });
    }
    const hits = await res.json();
    const results = (Array.isArray(hits) ? hits : [])
      .map(normalizeSearchHit)
      .filter((r) => Number.isFinite(r.latitude) && Number.isFinite(r.longitude));
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'geocode error' },
      { status: 500 },
    );
  }
}
