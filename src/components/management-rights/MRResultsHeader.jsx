'use client';

import { Select } from 'antd';
import CpField from '@/components/shared/CpField';

const sortOptions = [
  { value: 'date', label: 'Most Recent' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function MRResultsHeader({ loading, total, sortBy, setSortBy }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="text-sm text-cp-subtle">
        {loading ? 'Loading…' : `${total} opportunities found`}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-cp-subtle">Sort by</span>
        <CpField className="cp-sort-field min-w-[200px] w-[220px]">
          <Select
            value={sortBy}
            onChange={setSortBy}
            className="w-full"
            variant="borderless"
            optionLabelProp="label"
            popupMatchSelectWidth
            dropdownStyle={{ minWidth: 220 }}
            options={sortOptions}
          />
        </CpField>
      </div>
    </div>
  );
}
