"use client";

import Link from "next/link";
import { Card, Tag } from "antd";

export default function MRListingCard({ property }) {
  return (
    <Card
      key={property.id}
      className="bg-[#1a1a1a] border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
      styles={{
        body: { background: '#1a1a1a', padding: '16px' }
      }}
      cover={<img src={property.images?.[0] || '/images/placeholder-property.png'} alt={property.title} className="h-56 w-full object-cover" />}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1 text-white">{property.title}</h3>
          <Tag className="capitalize bg-[#ccff00]/90 border-0 text-[#171717] font-semibold">{property.listingType}</Tag>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">{property.description}</p>
        <p className="text-sm text-gray-500">{property.location?.city}, {property.location?.state}</p>
        <Link href={`/property/${property.id}`} className="text-[#ccff00] text-sm hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)] transition-all">View details →</Link>
      </div>
    </Card>
  );
}
