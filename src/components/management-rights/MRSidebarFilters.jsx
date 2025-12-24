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
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">{title}</h3>
      <Divider className="my-2 border-gray-800" />
      <div>
        <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">{priceLabel}</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange?.[0] ?? ''}
            onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([v, priceRange[1]]); }}
            className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange?.[1] ?? ''}
            onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([priceRange[0], v]); }}
            className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">{featuresLabel}</label>
        <div className="space-y-1">
          {Object.keys(flags).map((key)=> (
            <Checkbox key={key} checked={flags[key]} onChange={(e)=> setFlags({ ...flags, [key]: e.target.checked })} className="text-gray-300 p-0 m-0 h-3 w-3">
              <span className="text-gray-300">{key}</span>
            </Checkbox>
          ))}
        </div>
      </div>
      <Divider className="my-2 border-gray-800" />
      <div className="space-y-2">
        <Button className="w-full bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]" onClick={onApply}>Apply</Button>
        <Button className="w-full bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}
