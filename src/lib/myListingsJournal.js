/**
 * Browser-side journal of the signed-in user's listings.
 * Complements durable backend Blob overlay so create → My listings
 * is visible immediately even before/without a refetch.
 */

const PREFIX = 'cpms.myListings.v1.';

function keyFor(userId) {
  return `${PREFIX}${userId || 'anon'}`;
}

export function readMyListingsJournal(userId) {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const raw = window.localStorage.getItem(keyFor(userId));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeMyListingsJournal(userId, listings) {
  if (typeof window === 'undefined' || !userId) return;
  try {
    window.localStorage.setItem(
      keyFor(userId),
      JSON.stringify(Array.isArray(listings) ? listings : []),
    );
  } catch {
    // Quota / private mode — ignore
  }
}

export function upsertMyListingJournal(userId, listing) {
  if (!userId || !listing?.id) return readMyListingsJournal(userId);
  const current = readMyListingsJournal(userId);
  const next = [listing, ...current.filter((p) => p.id !== listing.id)];
  writeMyListingsJournal(userId, next);
  return next;
}

export function mergeListings(serverList = [], journalList = []) {
  const byId = new Map();
  for (const item of journalList || []) {
    if (item?.id) byId.set(item.id, item);
  }
  for (const item of serverList || []) {
    if (!item?.id) continue;
    const prev = byId.get(item.id);
    byId.set(item.id, prev ? { ...prev, ...item } : item);
  }
  return Array.from(byId.values()).sort((a, b) => {
    const ta = Date.parse(a.updatedAt || a.createdAt || 0) || 0;
    const tb = Date.parse(b.updatedAt || b.createdAt || 0) || 0;
    return tb - ta;
  });
}
