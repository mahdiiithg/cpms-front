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
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3 md:p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">Keywords</label>
          <Input
            value={keywords}
            onChange={(e)=> setKeywords(e.target.value)}
            placeholder={placeholder}
            allowClear
            className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">Beds (min)</label>
          <Select value={beds} onChange={setBeds} className="w-full">
            {[0,1,2,3,4,5].map((n)=>(<Option key={n} value={n}>{n === 0 ? 'Any' : `${n}+`}</Option>))}
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">Listing type</label>
          <Select value={listingType} onChange={setListingType} className="w-full">
            <Option value="all">All</Option>
            <Option value="sale">For Sale</Option>
            <Option value="rent">For Rent</Option>
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">City</label>
          <Input value={city} onChange={(e)=> setCity(e.target.value)} placeholder="City" allowClear className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">Suburb</label>
          <Input value={suburb} onChange={(e)=> setSuburb(e.target.value)} placeholder="Suburb" allowClear className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]" />
        </div>
        <div className="md:hidden">
          <Button className="w-full bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)]" onClick={onOpenMobileFilters}>More Filters</Button>
        </div>
      </div>
    </div>
  );
}
