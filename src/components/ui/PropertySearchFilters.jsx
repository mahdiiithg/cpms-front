// filepath: src/components/ui/PropertySearchFilters.jsx
'use client';

import { Input, Select, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

export default function PropertySearchFilters({
  keywords,
  setKeywords,
  beds,
  setBeds,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  total,
  loading,
  setPage,
  searchPlaceholder = 'e.g., suburb, CBD, renovated',
  priceLabel = 'Price range',
  resultNoun = 'properties',
  priceMax = 2000000,
  priceStep = 10000,
  extraFilters = null,
  gridCols = 4,
}) {
  const onKeywords = (e) => { setKeywords(e.target.value); setPage(1); };
  const onBeds = (v) => { setBeds(v); setPage(1); };
  const onPrice = (v) => { setPriceRange(v); setPage(1); };

  const gridColsClass = gridCols === 6 ? 'md:grid-cols-6' : 'md:grid-cols-4';

  return (
    <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-200 p-4 md:p-5 shadow-sm mb-5">
      <div className={`grid grid-cols-1 ${gridColsClass} gap-3 md:gap-4 items-end`}>
        <div className="md:col-span-2">
          <label className="block text-[11px] font-medium tracking-wide uppercase text-gray-600 mb-1">Search by suburb, city or keyword</label>
          <Input size="middle" className="h-10" value={keywords} onChange={onKeywords} placeholder={searchPlaceholder} prefix={<SearchOutlined />} allowClear />
        </div>
        {extraFilters}
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-gray-600 mb-1">Min bedrooms</label>
          <Slider min={0} max={6} marks={{0:'Any',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6+'}} value={beds} onChange={onBeds} />
        </div>
        <div>
          <label className="block text-[11px] font-medium tracking-wide uppercase text-gray-600 mb-1">{priceLabel}</label>
          <Slider range min={0} max={priceMax} step={priceStep} value={priceRange} onChange={onPrice} />
          <div className="mt-1 flex justify-between text-[11px] text-gray-500">
            <span>${priceRange[0]?.toLocaleString()}</span>
            <span>${priceRange[1]?.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 md:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">{loading ? 'Loading…' : `${total} ${resultNoun} found`}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-600">Sort</span>
          <Select value={sortBy} onChange={setSortBy} className="w-40" size="small">
            <Option value="date">Newest</Option>
            <Option value="price">Price</Option>
            <Option value="bedrooms">Bedrooms</Option>
            <Option value="size">Size</Option>
            <Option value="views">Most Viewed</Option>
          </Select>
        </div>
      </div>
    </div>
  );
}
