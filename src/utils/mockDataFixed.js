// Mock data for coastal properties
export const mockProperties = [
  {
    id: '1',
    title: 'Stunning Oceanfront Villa in Malibu',
    description: 'Experience luxury living in this breathtaking oceanfront villa featuring panoramic ocean views, private beach access, and world-class amenities. Perfect for those seeking the ultimate coastal lifestyle.',
    propertyType: 'Villa',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 6,
    maxGuests: 12,
    pricePerNight: 2500,
    location: {
      address: '1234 Pacific Coast Highway',
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      zipCode: '90265',
      coordinates: {
        latitude: 34.0259,
        longitude: -118.7798
      },
      coastalFeatures: ['beachfront', 'oceanView', 'privateDeck', 'directBeachAccess'],
      nearbyAttractions: ['Malibu Pier', 'Paradise Cove', 'Surfrider Beach'],
      distanceToBeach: 0,
      oceanView: true,
      beachfront: true
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=800',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800'
    ],
    amenities: ['beach_access', 'ocean_view', 'pool', 'hot_tub', 'wifi', 'parking', 'air_conditioning', 'kitchen', 'bbq_grill'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
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
    title: 'Luxury Beachfront Condo in Miami Beach',
    description: 'Modern luxury condo with stunning ocean views and direct beach access. Located in the heart of South Beach with world-class dining and entertainment nearby.',
    propertyType: 'Condo',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    pricePerNight: 450,
    location: {
      address: '500 Ocean Drive',
      city: 'Miami Beach',
      state: 'Florida',
      country: 'United States',
      zipCode: '33139',
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1300
      },
      coastalFeatures: ['beachfront', 'oceanView', 'privateDeck'],
      nearbyAttractions: ['Art Deco District', 'Lincoln Road', 'Ocean Drive'],
      distanceToBeach: 50,
      oceanView: true,
      beachfront: true
    },
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    amenities: ['ocean_view', 'pool', 'gym', 'concierge', 'wifi', 'parking', 'air_conditioning', 'kitchen'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
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
    title: 'Charming Beach House in Hamptons',
    description: 'Classic Hamptons beach house with traditional charm and modern amenities. Perfect for family getaways with private beach access and spacious outdoor areas.',
    propertyType: 'House',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    pricePerNight: 800,
    location: {
      address: '789 Dune Road',
      city: 'East Hampton',
      state: 'New York',
      country: 'United States',
      zipCode: '11937',
      coordinates: {
        latitude: 40.9634,
        longitude: -72.1731
      },
      coastalFeatures: ['beachfront', 'privateDeck', 'directBeachAccess'],
      nearbyAttractions: ['Main Beach', 'East Hampton Village', 'Montauk Point'],
      distanceToBeach: 100,
      oceanView: false,
      beachfront: true
    },
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      'https://images.unsplash.com/photo-1594736797933-d0380501ba96?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    ],
    amenities: ['beach_access', 'pool', 'wifi', 'parking', 'air_conditioning', 'kitchen', 'bbq_grill', 'fire_pit'],
    availability: {
      startDate: '2024-06-01',
      endDate: '2024-09-30'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
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
    title: 'Modern Oceanview Apartment in Key West',
    description: 'Beautifully designed modern apartment with stunning sunset views over the Gulf of Mexico. Walking distance to Duval Street and all Key West attractions.',
    propertyType: 'Apartment',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 300,
    location: {
      address: '456 Sunset Boulevard',
      city: 'Key West',
      state: 'Florida',
      country: 'United States',
      zipCode: '33040',
      coordinates: {
        latitude: 24.5557,
        longitude: -81.7826
      },
      coastalFeatures: ['oceanView', 'sunsetView', 'walkingToBeach'],
      nearbyAttractions: ['Duval Street', 'Mallory Square', 'Southernmost Point'],
      distanceToBeach: 200,
      oceanView: true,
      beachfront: false
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800'
    ],
    amenities: ['ocean_view', 'wifi', 'parking', 'air_conditioning', 'kitchen', 'balcony'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
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
    title: 'Elegant Coastal Retreat in Newport Beach',
    description: 'Sophisticated coastal home with panoramic harbor views and luxury finishes. Located in prestigious Balboa Island with easy access to beaches and fine dining.',
    propertyType: 'House',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    pricePerNight: 650,
    location: {
      address: '321 Bay Avenue',
      city: 'Newport Beach',
      state: 'California',
      country: 'United States',
      zipCode: '92661',
      coordinates: {
        latitude: 33.6061,
        longitude: -117.9048
      },
      coastalFeatures: ['harborView', 'walkingToBeach', 'boatAccess'],
      nearbyAttractions: ['Balboa Fun Zone', 'Newport Harbor', 'Fashion Island'],
      distanceToBeach: 300,
      oceanView: false,
      beachfront: false
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    amenities: ['harbor_view', 'boat_dock', 'wifi', 'parking', 'air_conditioning', 'kitchen', 'patio'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
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
    title: 'Romantic Cottage in Carmel-by-the-Sea',
    description: 'Enchanting fairy-tale cottage in the heart of Carmel with European charm and walking distance to white sand beaches. Perfect for romantic getaways.',
    propertyType: 'Cottage',
    type: 'cottage',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    pricePerNight: 400,
    location: {
      address: '654 Ocean Avenue',
      city: 'Carmel-by-the-Sea',
      state: 'California',
      country: 'United States',
      zipCode: '93921',
      coordinates: {
        latitude: 36.5552,
        longitude: -121.9233
      },
      coastalFeatures: ['walkingToBeach', 'villageCharm', 'forestSetting'],
      nearbyAttractions: ['Carmel Beach', 'Point Lobos', 'Monterey Bay Aquarium'],
      distanceToBeach: 400,
      oceanView: false,
      beachfront: false
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
      'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800'
    ],
    amenities: ['fireplace', 'garden', 'wifi', 'parking', 'kitchen', 'cozy_interior'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: true,
    rating: 4.8,
    reviewCount: 19,
    createdAt: '2024-01-06T00:00:00Z'
  },
  {
    id: '7',
    title: 'Waterfront Loft in Sausalito',
    description: 'Contemporary waterfront loft with breathtaking views of San Francisco Bay and city skyline. Modern amenities with easy ferry access to the city.',
    propertyType: 'Loft',
    type: 'loft',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    pricePerNight: 350,
    location: {
      address: '987 Harbor Drive',
      city: 'Sausalito',
      state: 'California',
      country: 'United States',
      zipCode: '94965',
      coordinates: {
        latitude: 37.8590,
        longitude: -122.4852
      },
      coastalFeatures: ['bayView', 'cityView', 'ferryAccess'],
      nearbyAttractions: ['Golden Gate Bridge', 'Muir Woods', 'Tiburon'],
      distanceToBeach: 500,
      oceanView: false,
      beachfront: false
    },
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
    ],
    amenities: ['bay_view', 'city_view', 'wifi', 'parking', 'air_conditioning', 'kitchen', 'modern_design'],
    availability: {
      startDate: '2024-01-01',
      endDate: '2025-12-31'
    },
    host: {
      id: 'host1',
      name: 'Coast Planet Host',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: true
    },
    isActive: true,
    availableForSwap: false,
    rating: 4.5,
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

  if (filters.oceanView) {
    filtered = filtered.filter(p => p.location.oceanView === true);
  }

  if (filters.beachfront) {
    filtered = filtered.filter(p => p.location.beachfront === true);
  }

  if (filters.maxDistanceToBeach) {
    filtered = filtered.filter(p => p.location.distanceToBeach <= filters.maxDistanceToBeach);
  }

  if (filters.availableForSwap) {
    filtered = filtered.filter(p => p.availableForSwap === true);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filtered = filtered.filter(p => 
      filters.amenities.some(amenity => p.amenities.includes(amenity))
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
    p.amenities.some(amenity => amenity.toLowerCase().includes(term))
  );
};
