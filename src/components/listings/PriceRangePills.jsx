'use client';

import { Button } from 'antd';

/**
 * Quick price-range filter chips for listing pages.
 * @param {{ label: string, min: number|null, max: number|null }[]} ranges
 */
export default function PriceRangePills({
  ranges = [],
  selectedMin = null,
  selectedMax = null,
  onSelect,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {ranges.map((range, index) => {
        const isActive =
          selectedMin === range.min && selectedMax === range.max;
        return (
          <Button
            key={`${range.label}-${index}`}
            size="small"
            onClick={() => onSelect?.(range)}
            className={`rounded-full ${
              isActive
                ? 'border-[#ccff00] bg-[#ccff00] text-[#171717] shadow-[0_0_10px_rgba(204,255,0,0.6)]'
                : 'border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]'
            }`}
          >
            {range.label}
          </Button>
        );
      })}
    </div>
  );
}
