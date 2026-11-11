'use client';

import { Input, Select, Button } from 'antd';
import CpField from '@/components/shared/CpField';
import { solidCtaClass } from '@/lib/brandTheme';

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
  placeholder = 'Search...',
}) {
  return (
    <div className="mb-4 rounded-lg border border-cp-stroke bg-cp-raised p-3 md:p-4">
      <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-6">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-white">Keywords</label>
          <CpField>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder={placeholder}
              allowClear
              variant="borderless"
            />
          </CpField>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white">Beds (min)</label>
          <CpField>
            <Select
              value={beds}
              onChange={setBeds}
              className="w-full"
              variant="borderless"
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <Option key={n} value={n}>
                  {n === 0 ? 'Any' : `${n}+`}
                </Option>
              ))}
            </Select>
          </CpField>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white">Listing type</label>
          <CpField>
            <Select
              value={listingType}
              onChange={setListingType}
              className="w-full"
              variant="borderless"
            >
              <Option value="all">All</Option>
              <Option value="sale">For Sale</Option>
              <Option value="rent">For Rent</Option>
            </Select>
          </CpField>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white">City</label>
          <CpField>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              allowClear
              variant="borderless"
            />
          </CpField>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-white">Suburb</label>
          <CpField>
            <Input
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              placeholder="Suburb"
              allowClear
              variant="borderless"
            />
          </CpField>
        </div>
        <div className="md:hidden">
          <Button className={`w-full ${solidCtaClass}`} onClick={onOpenMobileFilters}>
            More Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
