'use client';

import PropertyCard from './ui/PropertyCard';

const PropertiesList = ({ properties }) => {
  return (
    <>
      {properties?.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </>
  );
};

export default PropertiesList;
