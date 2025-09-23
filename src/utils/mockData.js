// Mock data for properties - General Property Management System
export const mockProperties = [
  {
    id: '1',
    title: 'Luxury Modern Villa in Beverly Hills',
    description: 'Experience luxury living in this stunning modern villa featuring panoramic city views, private pool, and world-class amenities. Perfect for those seeking the ultimate upscale lifestyle.',
    propertyType: 'Villa',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 6,
    maxGuests: 12,
    pricePerNight: 2500,
    salePrice: 8500000,
    location: {
      address: '1234 Beverly Hills Drive',
      city: 'Beverly Hills',
      state: 'California',
      country: 'United States',
      zipCode: '90210',
      coordinates: {
        latitude: 34.0736,
        longitude: -118.4004
      },
      features: ['city_view', 'private_garden', 'gated_community', 'hillside_location'],
      nearbyAttractions: ['Rodeo Drive', 'Hollywood', 'Santa Monica'],
      parkingSpaces: 3,
      garageType: 'attached'
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800'
    ],
    amenities: ['pool', 'spa', 'gym', 'wine_cellar', 'home_theater', 'smart_home', 'security_system', 'wifi', 'parking', 'air_conditioning', 'heating', 'kitchen', 'dishwasher', 'washer_dryer'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Property Management Co.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.9,
    reviewCount: 24,
    featured: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Modern Downtown Condo with City Views',
    description: 'Sleek urban condo in the heart of downtown with floor-to-ceiling windows and premium amenities. Perfect for professionals and city enthusiasts.',
    propertyType: 'Condo',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 450,
    salePrice: 1200000,
    location: {
      address: '500 Downtown Avenue',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      zipCode: '90014',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      },
      features: ['city_view', 'high_rise', 'downtown_location', 'public_transport'],
      nearbyAttractions: ['Financial District', 'Arts District', 'Staples Center'],
      parkingSpaces: 1,
      garageType: 'underground'
    },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    amenities: ['gym', 'concierge', 'rooftop_terrace', 'business_center', 'wifi', 'parking', 'air_conditioning', 'heating', 'kitchen', 'dishwasher', 'washer_dryer', 'balcony'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host2',
      name: 'Urban Properties LLC',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.7,
    reviewCount: 18,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: 'Charming Family House in Suburban Neighborhood',
    description: 'Spacious family home with large backyard and modern amenities. Perfect for families seeking comfort and convenience in a quiet neighborhood.',
    propertyType: 'House',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    pricePerNight: 300,
    salePrice: 950000,
    location: {
      address: '789 Maple Street',
      city: 'Pasadena',
      state: 'California',
      country: 'United States',
      zipCode: '91101',
      coordinates: {
        latitude: 34.1478,
        longitude: -118.1445
      },
      features: ['family_friendly', 'quiet_neighborhood', 'large_yard', 'near_schools'],
      nearbyAttractions: ['Rose Bowl', 'Old Town Pasadena', 'Caltech'],
      parkingSpaces: 2,
      garageType: 'attached'
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1594736797933-d0380501ba96?w=800',
      'https://images.unsplash.com/photo-1594736797933-d0380501ba96?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    amenities: ['backyard', 'garden', 'fireplace', 'wifi', 'parking', 'air_conditioning', 'heating', 'kitchen', 'dishwasher', 'washer_dryer', 'patio', 'bbq_grill'],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-09-30'
    },
    host: {
      id: 'host3',
      name: 'Family Homes Inc.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.8,
    reviewCount: 32,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Cozy Studio Apartment in Arts District',
    description: 'Beautifully designed studio apartment in trendy Arts District. Perfect for young professionals and artists looking for urban living.',
    propertyType: 'Apartment',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    pricePerNight: 180,
    salePrice: 450000,
    location: {
      address: '456 Arts Avenue',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      zipCode: '90013',
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      },
      features: ['trendy_area', 'walkable', 'art_galleries', 'restaurants'],
      nearbyAttractions: ['Grand Central Market', 'Walt Disney Concert Hall', 'Little Tokyo'],
      parkingSpaces: 0,
      garageType: 'street'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    amenities: ['exposed_brick', 'high_ceilings', 'wifi', 'air_conditioning', 'heating', 'kitchen', 'dishwasher', 'hardwood_floors'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host4',
      name: 'Urban Living Properties',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.6,
    reviewCount: 15,
    createdAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    title: 'Elegant Townhouse in Historic District',
    description: 'Sophisticated townhouse with historic charm and modern updates. Located in prestigious neighborhood with tree-lined streets.',
    propertyType: 'Townhouse',
    type: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    pricePerNight: 400,
    salePrice: 1800000,
    location: {
      address: '321 Heritage Lane',
      city: 'Pasadena',
      state: 'California',
      country: 'United States',
      zipCode: '91105',
      coordinates: {
        latitude: 34.1561,
        longitude: -118.1318
      },
      features: ['historic_district', 'tree_lined_streets', 'walkable', 'charming'],
      nearbyAttractions: ['Huntington Library', 'Colorado Boulevard', 'Rose Bowl'],
      parkingSpaces: 2,
      garageType: 'attached'
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    amenities: ['fireplace', 'hardwood_floors', 'crown_molding', 'wifi', 'parking', 'air_conditioning', 'heating', 'kitchen', 'dishwasher', 'washer_dryer', 'patio'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host5',
      name: 'Heritage Properties',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.7,
    reviewCount: 21,
    createdAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    title: 'Modern Loft in Industrial Building',
    description: 'Spacious industrial loft with exposed beams and modern finishes. Perfect for creative professionals and those who love unique spaces.',
    propertyType: 'Loft',
    type: 'loft',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 350,
    salePrice: 750000,
    location: {
      address: '654 Industrial Way',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      zipCode: '90021',
      coordinates: {
        latitude: 34.0330,
        longitude: -118.2516
      },
      features: ['industrial_style', 'open_plan', 'high_ceilings', 'artistic'],
      nearbyAttractions: ['Fashion District', 'Skid Row', 'Downtown LA'],
      parkingSpaces: 1,
      garageType: 'assigned'
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800'
    ],
    amenities: ['exposed_beams', 'concrete_floors', 'large_windows', 'open_plan', 'wifi', 'parking', 'air_conditioning', 'heating', 'kitchen', 'dishwasher'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host6',
      name: 'Industrial Properties',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.5,
    reviewCount: 19,
    createdAt: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    title: 'Luxury Penthouse with Panoramic Views',
    description: 'Exclusive penthouse with 360-degree city views and premium amenities. The ultimate in luxury urban living.',
    propertyType: 'Penthouse',
    type: 'penthouse',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 10,
    pricePerNight: 1200,
    salePrice: 4500000,
    location: {
      address: '987 Skyline Boulevard',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      zipCode: '90028',
      coordinates: {
        latitude: 34.0928,
        longitude: -118.3287
      },
      features: ['panoramic_views', 'luxury_building', 'rooftop_access', 'prime_location'],
      nearbyAttractions: ['Hollywood Sign', 'Sunset Strip', 'Beverly Hills'],
      parkingSpaces: 2,
      garageType: 'valet'
    },
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    amenities: ['city_views', 'private_terrace', 'concierge', 'valet_parking', 'wine_cellar', 'smart_home', 'gym', 'spa', 'wifi', 'air_conditioning', 'heating', 'kitchen', 'dishwasher', 'washer_dryer'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host7',
      name: 'Luxury Properties Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.9,
    reviewCount: 12,
    createdAt: '2024-01-07T00:00:00Z'
  }
];

// Filter function to simulate backend filtering
export const filterProperties = (properties, filters) => {
  let filtered = [...properties];

  if (filters.type) {
    filtered = filtered.filter(p => p.type === filters.type);
  }

  if (filters.minPrice !== null && filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.pricePerNight >= filters.minPrice);
  }

  if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.pricePerNight <= filters.maxPrice);
  }

  if (filters.minBedrooms) {
    filtered = filtered.filter(p => p.bedrooms >= filters.minBedrooms);
  }

  if (filters.location) {
    filtered = filtered.filter(p => 
      p.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
      p.location.state.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.availableForSwap) {
    filtered = filtered.filter(p => p.availableForSwap === true);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter(p => 
      filters.amenities.some(amenity => p.amenities.includes(amenity))
    );
  }

  if (filters.parkingRequired) {
    filtered = filtered.filter(p => p.location.parkingSpaces > 0);
  }

  if (filters.features && filters.features.length > 0) {
    filtered = filtered.filter(p => 
      filters.features.some(feature => p.location.features.includes(feature))
    );
  }

  return filtered;
};

// Search function to simulate backend search
export const searchProperties = (properties, searchTerm) => {
  if (!searchTerm) return properties;

  const term = searchTerm.toLowerCase();
  return properties.filter(p => 
    p.title.toLowerCase().includes(term) ||
    p.description.toLowerCase().includes(term) ||
    p.location.city.toLowerCase().includes(term) ||
    p.location.state.toLowerCase().includes(term) ||
    p.type.toLowerCase().includes(term) ||
    p.amenities.some(amenity => amenity.toLowerCase().includes(term)) ||
    p.location.features.some(feature => feature.toLowerCase().includes(term))
  );
};
