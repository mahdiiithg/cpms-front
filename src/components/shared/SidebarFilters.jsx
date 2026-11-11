'use client';

import React from 'react';
import { Button, Select, Input, Checkbox } from 'antd';

const { Option } = Select;

/**
 * Reusable Sidebar Filters with dark neon theme
 * Props:
 * - title: string
 * - filters: object
 * - onChange: (key, value) => void
 * - onClear: () => void
 * - propertyTypes: Array<{ value: string, label: string }>
 * - amenities: string[]
 * - features: string[]
 */
export default function SidebarFilters({
  title = 'Filters',
  filters,
  onChange,
  onClear,
  propertyTypes = [],
  amenities = [],
  features = [],
}) {
  const handleNumberInput = (key, e) => {
    const val = e?.target?.value;
    onChange(key, val ? Number(val) : null);
  };

  const toggleArrayValue = (key, value, checked) => {
    const prev = Array.isArray(filters[key]) ? filters[key] : [];
    if (checked) {
      onChange(key, [...prev, value]);
    } else {
      onChange(
        key,
        prev.filter((v) => v !== value),
      );
    }
  };

  return (
    <div className="listing-sidebar-filters sticky top-4 space-y-6 rounded-2xl border border-cp-stroke bg-cp-raised p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Button
          type="text"
          size="small"
          onClick={onClear}
          className="cp-text-action !px-2 !text-cp-lime"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Property Type
          </label>
          <div className="cp-field">
            <Select
              placeholder="Select property type"
              value={filters?.type}
              onChange={(value) => onChange('type', value)}
              className="w-full"
              variant="borderless"
              allowClear
            >
              {propertyTypes.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Price Range
          </label>
          <div className="flex gap-2">
            <div className="cp-field">
              <Input
                placeholder="Min Price"
                value={filters?.minPrice ?? ''}
                onChange={(e) => handleNumberInput('minPrice', e)}
                prefix="$"
                variant="borderless"
              />
            </div>
            <div className="cp-field">
              <Input
                placeholder="Max Price"
                value={filters?.maxPrice ?? ''}
                onChange={(e) => handleNumberInput('maxPrice', e)}
                prefix="$"
                variant="borderless"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Minimum Bedrooms
          </label>
          <div className="cp-field">
            <Select
              placeholder="Any"
              value={filters?.minBedrooms}
              onChange={(value) => onChange('minBedrooms', value)}
              className="w-full"
              variant="borderless"
              allowClear
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Option key={num} value={num}>
                  {num}+ Bedroom{num > 1 ? 's' : ''}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            Property Features
          </label>
          <div className="space-y-2 dark-checkbox-group">
            <div>
              <Checkbox
                checked={!!filters?.parkingRequired}
                onChange={(e) => onChange('parkingRequired', e.target.checked)}
              >
                <span className="text-cp-muted">Parking Required</span>
              </Checkbox>
            </div>
            <div>
              <Checkbox
                checked={!!filters?.availableForSwap}
                onChange={(e) =>
                  onChange('availableForSwap', e.target.checked)
                }
              >
                <span className="text-cp-muted">Available for Home Swap</span>
              </Checkbox>
            </div>
          </div>
        </div>

        {features?.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Location Features
            </label>
            <div className="max-h-32 flex-col space-y-2 overflow-y-auto dark-checkbox-group">
              {features.map((feature) => (
                <div key={feature}>
                  <Checkbox
                    checked={
                      Array.isArray(filters?.features) &&
                      filters.features.includes(feature)
                    }
                    onChange={(e) =>
                      toggleArrayValue('features', feature, e.target.checked)
                    }
                  >
                    <span className="text-cp-muted">
                      {feature
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        )}

        {amenities?.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-white">
              Amenities
            </label>
            <div className="max-h-40 space-y-2 overflow-y-auto dark-checkbox-group">
              {amenities.map((amenity) => (
                <div key={amenity}>
                  <Checkbox
                    checked={
                      Array.isArray(filters?.amenities) &&
                      filters.amenities.includes(amenity)
                    }
                    onChange={(e) =>
                      toggleArrayValue('amenities', amenity, e.target.checked)
                    }
                  >
                    <span className="text-cp-muted">
                      {amenity
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
