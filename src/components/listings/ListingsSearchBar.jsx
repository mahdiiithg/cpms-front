'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

/**
 * Shared listings search + Filters chrome matching Coast Planet design refs:
 * single-stroke field, lime focus, equal-height Filters pill.
 */
export default function ListingsSearchBar({
  placeholder = 'Search by location, property type, or features...',
  defaultValue = '',
  onSearch,
  onOpenFilters,
  showFiltersButton = true,
}) {
  const [value, setValue] = useState(defaultValue);

  const submit = () => {
    onSearch?.(value.trim());
  };

  return (
    <div className="flex w-full items-center gap-3">
      <form
        className="cp-listings-search flex min-w-0 flex-1 items-stretch overflow-hidden rounded-full border border-cp-stroke bg-cp-elevated transition-[border-color,box-shadow] focus-within:border-cp-lime focus-within:shadow-[0_0_0_1px_rgba(204,255,0,0.35)]"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 border-0 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-cp-subtle"
          aria-label="Search listings"
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center border-0 border-l border-cp-stroke bg-transparent px-4 text-cp-muted transition-colors hover:text-cp-lime"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {showFiltersButton && (
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex h-[42px] shrink-0 items-center gap-2 rounded-full border border-cp-stroke bg-cp-elevated px-4 text-sm font-medium text-cp-muted transition-colors hover:border-cp-lime/45 hover:text-cp-lime"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      )}
    </div>
  );
}
