'use client';

import { Empty, Pagination, Spin } from 'antd';
import PropertiesList from '@/components/PropertiesList';
import SampleDataBanner from './SampleDataBanner';

/**
 * Shared loading / empty / demo-banner / property grid for listing pages.
 */
export default function ListingResults({
  loading = false,
  properties = [],
  viewMode = 'grid',
  showingSample = false,
  sampleMessage,
  emptyDescription = 'No properties found',
  currentPage = 1,
  pageSize = 20,
  total,
  onPageChange,
  showPagination = true,
  totalLabel = 'properties',
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spin size="large" className="text-[#ccff00]" />
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-[#1a1a1a] p-8">
        <Empty
          description={<span className="text-gray-400">{emptyDescription}</span>}
          className="py-12"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  const gridClass =
    viewMode === 'grid'
      ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
      : 'space-y-6';

  return (
    <div className="space-y-4">
      {showingSample && <SampleDataBanner message={sampleMessage} />}
      <div className={gridClass}>
        <PropertiesList properties={properties} />
      </div>
      {showPagination && onPageChange && (
        <div className="mt-8 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total ?? properties.length}
            onChange={onPageChange}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(pageTotal, range) =>
              `${range[0]}-${range[1]} of ${pageTotal} ${totalLabel}`
            }
            className="dark-pagination"
          />
        </div>
      )}
    </div>
  );
}
