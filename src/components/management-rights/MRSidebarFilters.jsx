"use client";

import { Button, Checkbox, Divider, Input } from "antd";

export default function MRSidebarFilters({
  priceRange,
  setPriceRange,
  flags,
  setFlags,
  onApply,
  onReset,
  title = "Refine Results",
  priceLabel = "Price range (sale)",
  featuresLabel = "Features",
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold">{title}</h3>
      <Divider className="my-2" />
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{priceLabel}</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange?.[0] ?? ''}
            onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([v, priceRange[1]]); }}
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange?.[1] ?? ''}
            onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([priceRange[0], v]); }}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">{featuresLabel}</label>
        <div className="space-y-1">
          {Object.keys(flags).map((key)=> (
            <Checkbox key={key} checked={flags[key]} onChange={(e)=> setFlags({ ...flags, [key]: e.target.checked })}>
              {key}
            </Checkbox>
          ))}
        </div>
      </div>
      <Divider className="my-2" />
      <div className="space-y-2">
        <Button type="primary" className="w-full" onClick={onApply}>Apply</Button>
        <Button className="w-full" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}
