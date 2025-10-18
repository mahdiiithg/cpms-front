"use client";

import Link from "next/link";
import { Card, Tag } from "antd";

export default function MRFeaturedSection({ listingOfTheMonth, featured = [], title = "Featured Opportunities" }) {
  return (
    <>
      {listingOfTheMonth && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Listing of the Month</h2>
          <Card
            key={listingOfTheMonth.id}
            cover={<img src={listingOfTheMonth.images?.[0] || '/images/placeholder-property.jpg'} alt={listingOfTheMonth.title} className="h-64 w-full object-cover" />}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold line-clamp-1">{listingOfTheMonth.title}</h3>
                <Tag color="purple" className="capitalize">Featured</Tag>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{listingOfTheMonth.description}</p>
              <p className="text-sm text-gray-500">{listingOfTheMonth.location?.city}, {listingOfTheMonth.location?.state}</p>
              <Link href={`/property/${listingOfTheMonth.id}`} className="text-blue-600 text-sm">View details</Link>
            </div>
          </Card>
        </div>
      )}

      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.jpg'} alt={p.title} className="h-48 w-full object-cover" />}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                    <Tag color="blue" className="capitalize">{p.listingType}</Tag>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
                  <Link href={`/property/${p.id}`} className="text-blue-600 text-sm">View details</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
