"use client";

import Link from "next/link";
import { Card, Tag } from "antd";

export default function MRListingCard({ property }) {
  return (
    <Card
      key={property.id}
      cover={<img src={property.images?.[0] || '/images/placeholder-property.png'} alt={property.title} className="h-56 w-full object-cover" />}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1">{property.title}</h3>
          <Tag color="blue" className="capitalize">{property.listingType}</Tag>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
        <p className="text-sm text-gray-500">{property.location?.city}, {property.location?.state}</p>
        <Link href={`/property/${property.id}`} className="text-blue-600 text-sm">View details</Link>
      </div>
    </Card>
  );
}
