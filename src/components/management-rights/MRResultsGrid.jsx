"use client";

import { Empty, Pagination, Spin } from "antd";
import MRListingCard from "./MRListingCard";

export default function MRResultsGrid({ loading, error, properties, page, total, pageSize, onChangePage }) {
  if (loading) return <div className="flex items-center justify-center py-12"><Spin size="large" /></div>;
  if (error) return <div className="text-center py-12"><Empty description="Failed to load" /></div>;
  if (!properties || properties.length === 0) return <Empty description="No properties found" className="py-12" />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((p) => (
          <MRListingCard key={p.id} property={p} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination current={page} total={total} pageSize={pageSize} onChange={onChangePage} showSizeChanger={false} />
      </div>
    </>
  );
}
