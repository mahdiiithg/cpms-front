"use client";

import { Input, Select, Button } from "antd";

const { Option } = Select;

export default function MRTopSearchBar({
  keywords,
  setKeywords,
  beds,
  setBeds,
  listingType,
  setListingType,
  city,
  setCity,
  suburb,
  setSuburb,
  onOpenMobileFilters,
  placeholder = "Search...",
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1">Keywords</label>
          <Input
            value={keywords}
            onChange={(e)=> setKeywords(e.target.value)}
            placeholder={placeholder}
            allowClear
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Beds (min)</label>
          <Select value={beds} onChange={setBeds} className="w-full">
            {[0,1,2,3,4,5].map((n)=>(<Option key={n} value={n}>{n === 0 ? 'Any' : `${n}+`}</Option>))}
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Listing type</label>
          <Select value={listingType} onChange={setListingType} className="w-full">
            <Option value="all">All</Option>
            <Option value="sale">For Sale</Option>
            <Option value="rent">For Rent</Option>
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
          <Input value={city} onChange={(e)=> setCity(e.target.value)} placeholder="City" allowClear />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Suburb</label>
          <Input value={suburb} onChange={(e)=> setSuburb(e.target.value)} placeholder="Suburb" allowClear />
        </div>
        <div className="md:hidden">
          <Button className="w-full" onClick={onOpenMobileFilters}>More Filters</Button>
        </div>
      </div>
    </div>
  );
}
