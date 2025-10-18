'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Card, Spin, Empty, Pagination, Tag } from 'antd';
import Link from 'next/link';

export default function PermanentManagementRightsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const offset = (page - 1) * pageSize;

  // We can use a search keyword hint for now (tune later with tags/filters)
  const filters = useMemo(() => ({
    limit: pageSize,
    offset,
    listingStatus: 'active',
  }), [pageSize, offset]);

  const { data, loading, error, refetch } = useQuery(SEARCH_PROPERTIES, {
    variables: { query: 'permanent management rights', filters },
    fetchPolicy: 'cache-and-network',
  });

  const res = data?.searchProperties;
  const properties = res?.properties || [];
  const total = res?.totalCount || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Permanent Management Rights</h1>
        <p className="text-gray-600">Browse permanent management rights opportunities.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12"><Spin size="large" /></div>
      ) : error ? (
        <div className="text-center py-12">
          <Empty description="Failed to load" />
        </div>
      ) : properties.length === 0 ? (
        <Empty description="No properties found" className="py-12" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((p) => (
              <Card key={p.id} cover={
                <img src={p.images?.[0] || '/images/placeholder-property.jpg'} alt={p.title} className="h-56 w-full object-cover" />
              }>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                    <Tag color="blue" className="capitalize">{p.listingType}</Tag>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
                  <Link href={`/listings`} className="text-blue-600 text-sm">View details</Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination current={page} total={total} pageSize={pageSize} onChange={setPage} showSizeChanger={false} />
          </div>
        </>
      )}
    </div>
  );
}
