export const defaultFilterValues = {
  location: ['all'],
  type: ['all'],
  priceRange: ['all'],
  search: ''
};

export const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    // Location filter (city match)
    if (filters.location?.length && !filters.location.includes('all')) {
      const normalizedPropertyLocation = property.location.city
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      if (!filters.location.includes(normalizedPropertyLocation)) {
        return false;
      }
    }

    // Property type filter
    if (filters.type?.length && !filters.type.includes('all')) {
      if (!filters.type.includes(property.type)) {
        return false;
      }
    }

    // Price range filter (salePrice/rentPrice aware)
    if (filters.priceRange?.length && !filters.priceRange.includes('all')) {
      const price = property.salePrice ?? property.rentPrice ?? 0;
      const matchesPriceRange = filters.priceRange.some((priceFilter) => {
        switch (priceFilter) {
          case 'under-100k':
            return price < 100000;
          case '100k-300k':
            return price >= 100000 && price <= 300000;
          case '300k-600k':
            return price >= 300000 && price <= 600000;
          case '600k-1m':
            return price >= 600000 && price <= 1000000;
          case 'over-1m':
            return price > 1000000;
          default:
            return false;
        }
      });
      if (!matchesPriceRange) return false;
    }

    return true;
  });
};

export const createFiltersFromPropertyData = (propertyList) => {
  if (!propertyList || !Array.isArray(propertyList) || propertyList.length === 0) {
    return [];
  }

  const normalizeValue = (str) => str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const capitalizeLabel = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());

  // Locations
  const uniqueLocations = [
    ...new Set(propertyList.map((p) => p.location?.city).filter(Boolean)),
  ];
  const locationOptions = [
    ...new Map(
      uniqueLocations.map((city) => [
        normalizeValue(city),
        { value: normalizeValue(city), label: capitalizeLabel(city) },
      ])
    ).values(),
  ];

  // Types
  const uniqueTypes = [
    ...new Set(propertyList.map((p) => p.type).filter(Boolean)),
  ];
  const typeOptions = [
    ...new Map(
      uniqueTypes.map((type) => [
        type,
        { value: type, label: capitalizeLabel(type.replace(/([a-z])([A-Z])/g, '$1 $2')) },
      ])
    ).values(),
  ];

  // Price ranges (generic buckets)
  const priceRangeOptions = [
    { value: 'under-100k', label: 'Under $100k' },
    { value: '100k-300k', label: '$100k - $300k' },
    { value: '300k-600k', label: '$300k - $600k' },
    { value: '600k-1m', label: '$600k - $1m' },
    { value: 'over-1m', label: 'Over $1m' },
  ];

  const filters = [];

  if (locationOptions.length > 0) {
    filters.push({
      defaultLabel: 'Location',
      isMulti: true,
      options: locationOptions.sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  if (typeOptions.length > 0) {
    filters.push({
      defaultLabel: 'Property Type',
      isMulti: true,
      options: typeOptions.sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  filters.push({
    defaultLabel: 'Price Range',
    isMulti: true,
    options: priceRangeOptions,
  });

  return filters;
};

export const searchProperties = (properties, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return properties;
  const term = searchTerm.toLowerCase().trim();
  return properties.filter((p) =>
    [
      p.title,
      p.description,
      p.location?.city,
      p.location?.state,
      p.location?.country,
      p.type,
    ]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(term))
  );
};

export const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];
  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => (a.salePrice ?? a.rentPrice ?? 0) - (b.salePrice ?? b.rentPrice ?? 0));
    case 'price-high-low':
      return sorted.sort((a, b) => (b.salePrice ?? b.rentPrice ?? 0) - (a.salePrice ?? a.rentPrice ?? 0));
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sorted;
  }
};

export const formatPriceDisplay = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
};
