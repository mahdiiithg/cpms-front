'use client';

import PropertyCard from '@/components/ui/PropertyCard';

/**
 * Listings browse card — thin alias over the shared PropertyCard kit
 * so /listings stays DRY with buy/rent/detail related grids.
 */
export default function ListingsPropertyCard({ property }) {
  return (
    <div className="h-full">
      <PropertyCard property={property} />
    </div>
  );
}
