"use client";

import { Button, Checkbox, Divider, Drawer, Input } from "antd";

export default function MRMobileFiltersDrawer({
  open,
  onClose,
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
    <Drawer title={title} placement="right" onClose={onClose} open={open} width={320}>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">{priceLabel}</label>
          <div className="flex gap-2">
            <Input type="number" placeholder="Min" value={priceRange?.[0] ?? ''} onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([v, priceRange[1]]); }} />
            <Input type="number" placeholder="Max" value={priceRange?.[1] ?? ''} onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([priceRange[0], v]); }} />
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
        <Button type="primary" className="w-full" onClick={onApply}>Apply</Button>
        <Button className="w-full" onClick={onReset}>Reset</Button>
      </div>
    </Drawer>
  );
}
