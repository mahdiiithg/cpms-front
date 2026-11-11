/**
 * Realistic coastal sale listings used when the API is unavailable
 * or returns no results. Shaped for PropertyCard + SidebarFilters.
 */
export const sampleSaleProperties = [
  {
    id: 'sale-demo-1',
    title: 'Oceanfront Malibu Villa with Private Beach',
    description:
      'Architectural oceanfront villa with floor-to-ceiling glass, infinity pool, and private beach access along Pacific Coast Highway.',
    propertyType: 'Villa',
    type: 'villa',
    listingType: 'sale',
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 6200,
    salePrice: 12500000,
    pricePerNight: 2500,
    location: {
      address: '23450 Pacific Coast Highway',
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      zipCode: '90265',
      coordinates: { latitude: 34.0259, longitude: -118.7798 },
      features: ['city_view', 'private_garden', 'gated_community', 'quiet_neighborhood'],
      nearbyAttractions: ['Malibu Pier', 'Surfrider Beach', 'Nobu Malibu'],
      parkingSpaces: 4,
      garageType: 'attached',
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    ],
    amenities: [
      'pool',
      'spa',
      'gym',
      'wifi',
      'parking',
      'air_conditioning',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'security_system',
      'balcony',
      'patio',
    ],
    host: {
      id: 'host-coast-1',
      name: 'Coast Planet Realty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.9,
    reviewCount: 18,
    featured: true,
    views: 1240,
    createdAt: '2025-06-01T00:00:00Z',
  },
  {
    id: 'sale-demo-2',
    title: 'South Beach Penthouse with Ocean Views',
    description:
      'Glass-walled penthouse overlooking the Atlantic, with rooftop terrace, concierge service, and walkable access to Ocean Drive.',
    propertyType: 'Penthouse',
    type: 'penthouse',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 3.5,
    squareFeet: 3100,
    salePrice: 4850000,
    pricePerNight: 1200,
    location: {
      address: '801 Ocean Drive',
      city: 'Miami Beach',
      state: 'Florida',
      country: 'United States',
      zipCode: '33139',
      coordinates: { latitude: 25.7814, longitude: -80.1300 },
      features: ['high_rise', 'downtown_location', 'walkable', 'public_transport'],
      nearbyAttractions: ['Lincoln Road', 'Art Deco District', 'South Beach'],
      parkingSpaces: 2,
      garageType: 'valet',
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    ],
    amenities: [
      'pool',
      'gym',
      'spa',
      'concierge',
      'rooftop_terrace',
      'wifi',
      'parking',
      'air_conditioning',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'balcony',
    ],
    host: {
      id: 'host-coast-2',
      name: 'Atlantic Collection',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.8,
    reviewCount: 26,
    featured: true,
    views: 980,
    createdAt: '2025-05-12T00:00:00Z',
  },
  {
    id: 'sale-demo-3',
    title: 'Hamptons Beach House Near Main Beach',
    description:
      'Classic shingle-style beach house with wraparound porch, chef’s kitchen, and sandy path to the Atlantic.',
    propertyType: 'House',
    type: 'house',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3800,
    salePrice: 3750000,
    pricePerNight: 800,
    location: {
      address: '45 Dune Road',
      city: 'East Hampton',
      state: 'New York',
      country: 'United States',
      zipCode: '11937',
      coordinates: { latitude: 40.9634, longitude: -72.1731 },
      features: ['family_friendly', 'quiet_neighborhood', 'private_garden', 'near_schools'],
      nearbyAttractions: ['Main Beach', 'East Hampton Village', 'Montauk'],
      parkingSpaces: 3,
      garageType: 'detached',
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    amenities: [
      'pool',
      'wifi',
      'parking',
      'air_conditioning',
      'heating',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'fireplace',
      'patio',
      'garden',
    ],
    host: {
      id: 'host-coast-3',
      name: 'East End Homes',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.7,
    reviewCount: 31,
    featured: false,
    views: 640,
    createdAt: '2025-04-20T00:00:00Z',
  },
  {
    id: 'sale-demo-4',
    title: 'Laguna Beach Cliffside Contemporary',
    description:
      'Sculptural cliffside residence with panoramic Pacific views, outdoor living terraces, and designer interiors.',
    propertyType: 'House',
    type: 'house',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 4200,
    salePrice: 6900000,
    pricePerNight: 1500,
    location: {
      address: '312 Cliff Drive',
      city: 'Laguna Beach',
      state: 'California',
      country: 'United States',
      zipCode: '92651',
      coordinates: { latitude: 33.5427, longitude: -117.7854 },
      features: ['city_view', 'quiet_neighborhood', 'walkable', 'gated_community'],
      nearbyAttractions: ['Main Beach', 'Art galleries', 'Crystal Cove'],
      parkingSpaces: 2,
      garageType: 'attached',
    },
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    amenities: [
      'pool',
      'spa',
      'wifi',
      'parking',
      'air_conditioning',
      'heating',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'fireplace',
      'balcony',
      'security_system',
    ],
    host: {
      id: 'host-coast-4',
      name: 'OC Coastal Estates',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.9,
    reviewCount: 14,
    featured: true,
    views: 1120,
    createdAt: '2025-03-08T00:00:00Z',
  },
  {
    id: 'sale-demo-5',
    title: 'Santa Monica Ocean-View Condo',
    description:
      'Bright corner condo steps from the beach path, with open plan living, balcony sunsets, and building amenities.',
    propertyType: 'Condo',
    type: 'condo',
    listingType: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1450,
    salePrice: 1890000,
    pricePerNight: 450,
    location: {
      address: '1220 Ocean Avenue',
      city: 'Santa Monica',
      state: 'California',
      country: 'United States',
      zipCode: '90401',
      coordinates: { latitude: 34.0195, longitude: -118.4912 },
      features: ['walkable', 'public_transport', 'downtown_location', 'family_friendly'],
      nearbyAttractions: ['Santa Monica Pier', 'Third Street Promenade', 'Palisades Park'],
      parkingSpaces: 1,
      garageType: 'underground',
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    ],
    amenities: [
      'gym',
      'pool',
      'wifi',
      'parking',
      'air_conditioning',
      'heating',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'balcony',
      'concierge',
    ],
    host: {
      id: 'host-coast-5',
      name: 'Bay Cities Living',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.6,
    reviewCount: 42,
    featured: false,
    views: 870,
    createdAt: '2025-02-18T00:00:00Z',
  },
  {
    id: 'sale-demo-6',
    title: 'Coronado Bayfront Townhouse',
    description:
      'Light-filled townhouse on Coronado with bay views, private patio, and easy access to the Hotel del Coronado shoreline.',
    propertyType: 'Townhouse',
    type: 'townhouse',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2280,
    salePrice: 2150000,
    pricePerNight: 500,
    location: {
      address: '980 Orange Avenue',
      city: 'Coronado',
      state: 'California',
      country: 'United States',
      zipCode: '92118',
      coordinates: { latitude: 32.6859, longitude: -117.1831 },
      features: ['family_friendly', 'quiet_neighborhood', 'walkable', 'near_schools'],
      nearbyAttractions: ['Coronado Beach', 'Hotel del Coronado', 'Ferry Landing'],
      parkingSpaces: 2,
      garageType: 'attached',
    },
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?w=800',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    ],
    amenities: [
      'wifi',
      'parking',
      'air_conditioning',
      'heating',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'patio',
      'garden',
      'fireplace',
    ],
    host: {
      id: 'host-coast-6',
      name: 'San Diego Shoreline',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.5,
    reviewCount: 19,
    featured: false,
    views: 510,
    createdAt: '2025-01-30T00:00:00Z',
  },
  {
    id: 'sale-demo-7',
    title: 'Naples Gulf-Front Apartment',
    description:
      'Elegant gulf-front apartment with wide lanai, resort-style amenities, and sunset views over the Gulf of Mexico.',
    propertyType: 'Apartment',
    type: 'apartment',
    listingType: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1680,
    salePrice: 1325000,
    pricePerNight: 380,
    location: {
      address: '220 Gulf Shore Boulevard',
      city: 'Naples',
      state: 'Florida',
      country: 'United States',
      zipCode: '34102',
      coordinates: { latitude: 26.1420, longitude: -81.7948 },
      features: ['high_rise', 'quiet_neighborhood', 'walkable', 'family_friendly'],
      nearbyAttractions: ['Fifth Avenue South', 'Naples Pier', 'Lowdermilk Park'],
      parkingSpaces: 1,
      garageType: 'assigned',
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800',
    ],
    amenities: [
      'pool',
      'gym',
      'spa',
      'wifi',
      'parking',
      'air_conditioning',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'balcony',
      'concierge',
    ],
    host: {
      id: 'host-coast-7',
      name: 'Gulf Coast Partners',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.7,
    reviewCount: 22,
    featured: false,
    views: 430,
    createdAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'sale-demo-8',
    title: 'Cape Cod Waterfront Cottage',
    description:
      'Charming waterfront cottage with dock access, renovated kitchen, and classic New England coastal character.',
    propertyType: 'House',
    type: 'house',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1920,
    salePrice: 1650000,
    pricePerNight: 420,
    location: {
      address: '18 Harbor Road',
      city: 'Chatham',
      state: 'Massachusetts',
      country: 'United States',
      zipCode: '02633',
      coordinates: { latitude: 41.6821, longitude: -69.9598 },
      features: ['quiet_neighborhood', 'family_friendly', 'private_garden', 'walkable'],
      nearbyAttractions: ['Chatham Lighthouse', 'Main Street', 'Monomoy National Wildlife Refuge'],
      parkingSpaces: 2,
      garageType: 'detached',
    },
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1600047509358-9dc7556c2267?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    amenities: [
      'wifi',
      'parking',
      'heating',
      'kitchen',
      'dishwasher',
      'washer_dryer',
      'fireplace',
      'patio',
      'garden',
    ],
    host: {
      id: 'host-coast-8',
      name: 'Cape Shore Realty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true,
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.8,
    reviewCount: 27,
    featured: false,
    views: 390,
    createdAt: '2024-12-05T00:00:00Z',
  },
];

export function filterSaleSampleProperties(properties, filters = {}, searchTerm = '') {
  let filtered = [...properties];

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.location.city.toLowerCase().includes(term) ||
        p.location.state.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term) ||
        p.amenities.some((amenity) => amenity.toLowerCase().includes(term)),
    );
  }

  if (filters.type) {
    filtered = filtered.filter((p) => p.type === filters.type);
  }

  if (filters.minPrice != null) {
    filtered = filtered.filter((p) => (p.salePrice ?? 0) >= filters.minPrice);
  }

  if (filters.maxPrice != null) {
    filtered = filtered.filter((p) => (p.salePrice ?? 0) <= filters.maxPrice);
  }

  if (filters.minBedrooms) {
    filtered = filtered.filter((p) => p.bedrooms >= filters.minBedrooms);
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.location.city.toLowerCase().includes(loc) ||
        p.location.state.toLowerCase().includes(loc),
    );
  }

  if (filters.availableForSwap) {
    filtered = filtered.filter((p) => p.availableForSwap === true);
  }

  if (filters.parkingRequired) {
    filtered = filtered.filter((p) => (p.location?.parkingSpaces ?? 0) > 0);
  }

  if (filters.amenities?.length) {
    filtered = filtered.filter((p) =>
      filters.amenities.some((amenity) => p.amenities.includes(amenity)),
    );
  }

  if (filters.features?.length) {
    filtered = filtered.filter((p) =>
      filters.features.some((feature) => p.location?.features?.includes(feature)),
    );
  }

  return filtered;
}
