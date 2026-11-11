/**
 * Shared helpers for GraphQL property list queries used by buy / rent / listings.
 */

/**
 * Build a PropertyFilters input that matches the backend schema.
 * Drops unknown fields (e.g. legacy `mode`, `amenities`) that would fail GraphQL validation.
 */
export function buildPropertyFilters({
  listingType,
  type,
  minPrice,
  maxPrice,
  minBedrooms,
  maxBedrooms,
  minBathrooms,
  maxBathrooms,
  location,
  city,
  suburb,
  features,
  tags,
  featured,
  urgent,
  condition,
  sortBy,
  sortOrder,
  searchQuery,
  limit,
  offset,
  listingStatus = 'active',
} = {}) {
  const filters = {
    listingStatus,
  };

  if (listingType) filters.listingType = listingType;
  if (type) filters.type = type;
  if (minPrice != null && minPrice !== '') filters.minPrice = Number(minPrice);
  if (maxPrice != null && maxPrice !== '') filters.maxPrice = Number(maxPrice);
  if (typeof minBedrooms === 'number') filters.minBedrooms = minBedrooms;
  if (typeof maxBedrooms === 'number') filters.maxBedrooms = maxBedrooms;
  if (typeof minBathrooms === 'number') filters.minBathrooms = minBathrooms;
  if (typeof maxBathrooms === 'number') filters.maxBathrooms = maxBathrooms;
  if (location) filters.location = location;
  if (city) filters.city = city;
  if (suburb) filters.suburb = suburb;
  if (Array.isArray(features) && features.length) filters.features = features;
  if (Array.isArray(tags) && tags.length) filters.tags = tags;
  if (typeof featured === 'boolean') filters.featured = featured;
  if (typeof urgent === 'boolean') filters.urgent = urgent;
  if (condition) filters.condition = condition;
  if (sortBy) filters.sortBy = sortBy;
  if (sortOrder) filters.sortOrder = sortOrder;
  if (searchQuery) filters.searchQuery = searchQuery;
  if (typeof limit === 'number') filters.limit = limit;
  if (typeof offset === 'number') filters.offset = offset;

  return filters;
}

/**
 * Unwrap PropertyListResponse from properties / searchProperties queries.
 */
export function unwrapPropertyList(data, { isSearch = false } = {}) {
  const root = isSearch ? data?.searchProperties : data?.properties;
  if (!root) {
    return {
      properties: [],
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      currentPage: 1,
      totalPages: 0,
    };
  }

  // Legacy: some clients accidentally treated the connection as an array
  if (Array.isArray(root)) {
    return {
      properties: root,
      totalCount: root.length,
      hasNextPage: false,
      hasPreviousPage: false,
      currentPage: 1,
      totalPages: 1,
    };
  }

  const properties = Array.isArray(root.properties) ? root.properties : [];
  return {
    properties,
    totalCount: root.totalCount ?? properties.length,
    hasNextPage: !!root.hasNextPage,
    hasPreviousPage: !!root.hasPreviousPage,
    currentPage: root.currentPage ?? 1,
    totalPages: root.totalPages ?? 0,
  };
}
