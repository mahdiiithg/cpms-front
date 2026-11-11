'use client';

import PropertyCard from './ui/PropertyCard';

const PropertiesList = ({ properties }) => {
  return (
    <>
      {properties?.map((property) => (
        <div key={property.id} className="h-full">
          <PropertyCard property={property} />
        </div>
      ))}
    </>
  );
};

export default PropertiesList;
