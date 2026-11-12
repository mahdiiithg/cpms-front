/** Moderation status helpers for owner + admin listing UIs */

export const STATUS_META = {
  pending: {
    label: 'Pending',
    className: 'border-amber-400/40 bg-amber-400/15 text-amber-200',
  },
  pending_review: {
    label: 'Needs re-approval',
    className: 'border-orange-400/40 bg-orange-400/15 text-orange-200',
  },
  approved: {
    label: 'Live',
    className: 'border-cp-lime/40 bg-cp-lime/15 text-cp-lime',
  },
  rejected: {
    label: 'Rejected',
    className: 'border-red-400/40 bg-red-400/15 text-red-300',
  },
};

export function getStatusMeta(status) {
  return STATUS_META[status] || STATUS_META.pending;
}

export function formatListingPrice(property) {
  if (property?.listingType === 'rent' && property?.rentPrice) {
    return `$${Number(property.rentPrice).toLocaleString()}/week`;
  }
  if (property?.salePrice) {
    return `$${Number(property.salePrice).toLocaleString()}`;
  }
  return 'Price on request';
}
