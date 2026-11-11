'use client';

import { Button } from 'antd';

/**
 * Quick price-range filter chips for listing pages.
 * Active selection can be cleared via the Clear control or by re-clicking the active pill.
 * @param {{ label: string, min: number|null, max: number|null }[]} ranges
 */
export default function PriceRangePills({
  ranges = [],
  selectedMin = null,
  selectedMax = null,
  onSelect,
  onClear,
}) {
  const hasActive = ranges.some(
    (range) => selectedMin === range.min && selectedMax === range.max,
  );

  const handleSelect = (range, isActive) => {
    if (isActive) {
      onClear?.();
      return;
    }
    onSelect?.(range);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {ranges.map((range, index) => {
        const isActive =
          selectedMin === range.min && selectedMax === range.max;
        return (
          <Button
            key={`${range.label}-${index}`}
            size="small"
            aria-pressed={isActive}
            onClick={() => handleSelect(range, isActive)}
            className={
              isActive
                ? '!h-8 !rounded-full !border-0 !bg-cp-lime !font-medium !text-cp-surface shadow-[0_0_10px_rgba(204,255,0,0.45)]'
                : 'cp-toolbar-btn !h-8 !rounded-full !text-xs sm:!text-sm'
            }
          >
            {range.label}
          </Button>
        );
      })}
      {hasActive && (
        <button
          type="button"
          onClick={() => onClear?.()}
          className="cp-text-action px-1 text-sm font-medium text-cp-lime transition-all hover:text-cp-lime-hover"
        >
          Clear
        </button>
      )}
    </div>
  );
}
