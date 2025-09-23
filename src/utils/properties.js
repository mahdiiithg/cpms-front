export const defaultFilterValues = {
  location: ['all'],
  type: ['all'],
  amenities: ['all'],
  rating: ['all'],
  priceRange: ['all'],
  coastalFeatures: ['all'],
  search: ''
};

export const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    // Location filter
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

    // Amenities filter (all selected must exist in property.amenities)
    if (filters.amenities?.length && !filters.amenities.includes('all')) {
      const hasAllAmenities = filters.amenities.every((amenity) =>
        property.amenities.includes(amenity),
      );
      if (!hasAllAmenities) return false;
    }

    // Rating filter
    if (filters.rating?.length && !filters.rating.includes('all')) {
      const propertyRating = property.rating;
      const matchesRating = filters.rating.some((ratingFilter) => {
        switch (ratingFilter) {
          case '5':
            return propertyRating === 5;
          case '4.5+':
            return propertyRating >= 4.5;
          case '4+':
            return propertyRating >= 4;
          case '3.5+':
            return propertyRating >= 3.5;
          case '3+':
            return propertyRating >= 3;
          default:
            return propertyRating.toString() === ratingFilter;
        }
      });
      if (!matchesRating) return false;
    }

    // Price range filter
    if (filters.priceRange?.length && !filters.priceRange.includes('all')) {
      const price = property.pricePerNight;
      const matchesPriceRange = filters.priceRange.some((priceFilter) => {
        switch (priceFilter) {
          case 'under-100':
            return price < 100;
          case '100-200':
            return price >= 100 && price <= 200;
          case '200-300':
            return price >= 200 && price <= 300;
          case '300-500':
            return price >= 300 && price <= 500;
          case 'over-500':
            return price > 500;
          default:
            return false;
        }
      });
      if (!matchesPriceRange) return false;
    }

    // Coastal features filter
    if (filters.coastalFeatures?.length && !filters.coastalFeatures.includes('all')) {
      const hasCoastalFeatures = filters.coastalFeatures.every((feature) =>
        property.location.coastalFeatures?.includes(feature),
      );
      if (!hasCoastalFeatures) return false;
    }

    return true;
  });
};

export const createFiltersFromPropertyData = (propertyList) => {
  if (!propertyList || !Array.isArray(propertyList) || propertyList.length === 0) {
    return [];
  }

  // Helper function to normalize strings for values
  const normalizeValue = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Helper function to capitalize words
  const capitalizeLabel = (str) => {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Extract unique locations
  const uniqueLocations = [
    ...new Set(propertyList.map((property) => property.location.city).filter(Boolean)),
  ];
  const locationOptions = [
    ...new Map(
      uniqueLocations.map((city) => [
        normalizeValue(city),
        {
          value: normalizeValue(city),
          label: capitalizeLabel(city),
        },
      ]),
    ).values(),
  ];

  // Extract unique property types
  const uniqueTypes = [
    ...new Set(propertyList.map((property) => property.type).filter(Boolean)),
  ];
  const typeOptions = [
    ...new Map(
      uniqueTypes.map((type) => [
        type,
        {
          value: type,
          label: capitalizeLabel(type.replace(/([a-z])([A-Z])/g, '$1 $2')),
        },
      ]),
    ).values(),
  ];

  // Extract unique amenities
  const allAmenities = propertyList
    .flatMap((property) => property.amenities || [])
    .filter(Boolean);
  const uniqueAmenities = [...new Set(allAmenities)];
  const amenityOptions = [
    ...new Map(
      uniqueAmenities.map((amenity) => [
        amenity,
        {
          value: amenity,
          label: capitalizeLabel(amenity.replace(/([a-z])([A-Z])/g, '$1 $2')),
        },
      ]),
    ).values(),
  ];

  // Extract unique coastal features
  const allCoastalFeatures = propertyList
    .flatMap((property) => property.location.coastalFeatures || [])
    .filter(Boolean);
  const uniqueCoastalFeatures = [...new Set(allCoastalFeatures)];
  const coastalFeatureOptions = [
    ...new Map(
      uniqueCoastalFeatures.map((feature) => [
        feature,
        {
          value: feature,
          label: capitalizeLabel(feature.replace(/([a-z])([A-Z])/g, '$1 $2')),
        },
      ]),
    ).values(),
  ];

  // Create rating ranges based on actual ratings
  const ratings = propertyList
    .map((property) => property.rating)
    .filter((rating) => rating != null);

  let ratingOptions = [];

  if (ratings.length > 0) {
    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);

    if (maxRating >= 5) ratingOptions.push({ value: '5', label: '5 Stars' });
    if (maxRating >= 4.5)
      ratingOptions.push({ value: '4.5+', label: '4.5+ Stars' });
    if (maxRating >= 4) ratingOptions.push({ value: '4+', label: '4+ Stars' });
    if (maxRating >= 3.5)
      ratingOptions.push({ value: '3.5+', label: '3.5+ Stars' });
    if (minRating < 3.5) ratingOptions.push({ value: '3+', label: '3+ Stars' });
  }

  // Price range options
  const priceRangeOptions = [
    { value: 'under-100', label: 'Under $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-300', label: '$200 - $300' },
    { value: '300-500', label: '$300 - $500' },
    { value: 'over-500', label: 'Over $500' },
  ];

  // Build the filters array
  const filters = [];

  // Location filter
  if (locationOptions.length > 0) {
    filters.push({
      defaultLabel: 'Location',
      isMulti: true,
      options: locationOptions.sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  // Property type filter
  if (typeOptions.length > 0) {
    filters.push({
      defaultLabel: 'Property Type',
      isMulti: true,
      options: typeOptions.sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  // Price range filter
  filters.push({
    defaultLabel: 'Price Range',
    isMulti: true,
    options: priceRangeOptions,
  });

  // Amenities filter
  if (amenityOptions.length > 0) {
    filters.push({
      defaultLabel: 'Amenities',
      isMulti: true,
      options: amenityOptions.sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  // Coastal features filter
  if (coastalFeatureOptions.length > 0) {
    filters.push({
      defaultLabel: 'Coastal Features',
      isMulti: true,
      options: coastalFeatureOptions.sort((a, b) => a.label.localeCompare(b.label)),
    });
  }

  // Rating filter
  if (ratingOptions.length > 0) {
    filters.push({
      defaultLabel: 'Rating',
      isMulti: true,
      options: ratingOptions,
    });
  }

  return filters;
};

// Property search utilities
export const searchProperties = (properties, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return properties;
  }

  const term = searchTerm.toLowerCase().trim();
  
  return properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(term) ||
      property.description.toLowerCase().includes(term) ||
      property.location.city.toLowerCase().includes(term) ||
      property.location.state.toLowerCase().includes(term) ||
      property.location.country.toLowerCase().includes(term) ||
      property.type.toLowerCase().includes(term) ||
      (property.amenities && property.amenities.some(amenity => 
        amenity.toLowerCase().includes(term)
      )) ||
      (property.location.coastalFeatures && property.location.coastalFeatures.some(feature => 
        feature.toLowerCase().includes(term)
      ))
    );
  });
};

// Property sorting utilities
export const sortProperties = (properties, sortBy) => {
  const sorted = [...properties];
  
  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case 'price-high-low':
      return sorted.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case 'rating-high-low':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted;
  }
};

// Calculate property rating display
export const getPropertyRatingDisplay = (rating, reviewCount) => {
  if (!rating || reviewCount === 0) {
    return 'No reviews yet';
  }
  
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return `${stars} ${rating.toFixed(1)} (${reviewCount} reviews)`;
};

// Format price display
export const formatPriceDisplay = (pricePerNight, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(pricePerNight);
};
