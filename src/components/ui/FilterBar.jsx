'use client';

import { Input, Button } from 'antd';
import { Search } from 'lucide-react';
import FilterSelectBox from './FilterSelectBox';
import useMediaQuery from '@/hooks/useMediaQuery';
import ResetFiltersButton from './ResetFiltersButton ';
import { createFiltersFromGymData } from '@/utils/gyms';

const FilterBar = ({
  inputSearchQuery,
  filterValues,
  onSearchInputChange,
  onFilterChange,
  handleSubmitSearch,
  onResetFilters,
  hasActiveFilters,
  loading,
  gymData,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const dynamicFilters = createFiltersFromGymData(gymData);

  return (
    <div className="flex flex-col items-center justify-between gap-x-1 gap-y-2 rounded-full border-gray-100 md:flex-row md:border-b md:bg-[#fafafa] md:p-2 lg:justify-start">
      <Input
        placeholder="Search gyms..."
        prefix={<Search className="text-gray-400" size={20} />}
        value={inputSearchQuery}
        onChange={(e) => onSearchInputChange(e.target.value)}
        className="w-full min-w-xs md:max-w-xs"
        style={{
          borderRadius: '9999px',
          border: 'none',
          background: isMobile && '#EEEEEE',
        }}
      />

      <div className="filter-box-container flex w-full max-w-full items-center justify-start gap-x-1 overflow-x-auto pb-1 md:overflow-x-visible md:pb-0">
        <ResetFiltersButton
          onReset={onResetFilters}
          hasActiveFilters={hasActiveFilters}
          loading={loading}
        />
        {dynamicFilters.map((filter, index) => {
          const filterName = filter.defaultLabel.toLowerCase();
          const filterValue = filterValues[filterName];
          const isDefaultValue =
            Array.isArray(filterValue) &&
            filterValue.length === 1 &&
            filterValue[0] === 'all';

          return (
            <FilterSelectBox
              key={index}
              isMulti={filter.isMulti}
              defaultLabel={filter.defaultLabel}
              options={filter.options}
              onChange={(value) => onFilterChange(filterName, value)}
              className={filter.className}
              placeholder={filterName}
              value={isDefaultValue ? undefined : filterValue}
            />
          );
        })}
      </div>

      <Button
        type="primary"
        className="min-w-[100px] rounded-full border-green-400 bg-green-400 px-6 text-black hover:bg-green-500"
        style={{
          borderRadius: '9999px',
          display: isMobile ? 'none' : 'inline-flex',
        }}
        onClick={handleSubmitSearch}
      >
        Find
      </Button>
    </div>
  );
};

export default FilterBar;
