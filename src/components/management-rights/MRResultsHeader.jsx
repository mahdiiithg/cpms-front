"use client";

import { Select } from "antd";
const { Option } = Select;

export default function MRResultsHeader({ loading, total, sortBy, setSortBy }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-sm text-gray-600">{loading ? 'Loading…' : `${total} opportunities found`}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">Sort by</span>
        <Select size="small" value={sortBy} onChange={setSortBy} style={{ width: 160 }}>
          <Option value="date">Most Recent</Option>
          <Option value="price-asc">Price: Low to High</Option>
          <Option value="price-desc">Price: High to Low</Option>
        </Select>
      </div>
    </div>
  );
}
