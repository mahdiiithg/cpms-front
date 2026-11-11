'use client';

import { Button } from 'antd';
import { SlidersHorizontal } from 'lucide-react';
import ListingViewToggle from './ListingViewToggle';

/**
 * Results title, count, mobile filter toggle, and grid/list switch.
 */
export default function ListingResultsHeader({
  title,
  loading = false,
  count = 0,
  countLabel = 'properties found',
  showingSample = false,
  showFilters = false,
  onToggleFilters,
  viewMode = 'grid',
  onViewModeChange,
}) {
  const subtitle = loading
    ? 'Loading...'
    : `${count} ${countLabel}${showingSample ? ' (demo data)' : ''}`;

  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <p className="mt-1 text-gray-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {onToggleFilters && (
          <Button
            icon={<SlidersHorizontal className="h-4 w-4" />}
            onClick={onToggleFilters}
            className={`cp-toolbar-btn lg:hidden ${showFilters ? 'is-active' : ''}`}
          >
            Filters
          </Button>
        )}
        <ListingViewToggle viewMode={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}
