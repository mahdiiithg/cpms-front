"use client";

import { Button } from "antd";

export default function MRRegionChips({ regions = [], active, onSelect }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Browse by region</h2>
      <div className="flex flex-wrap gap-2">
        {regions.map((r) => (
          <Button key={r} size="small" onClick={()=> onSelect(r)} className={`border ${active===r?'border-blue-500 text-blue-600':''}`}>{r}</Button>
        ))}
      </div>
    </div>
  );
}
