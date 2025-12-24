'use client';

import React from 'react';
import { Card, Button, Select, Input, Checkbox } from 'antd';

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
    <Card className="sticky top-4 bg-[#1a1a1a] border-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <Button
          type="text"
          size="small"
          onClick={onClear}
          className="text-[#ccff00] hover:text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Property Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">Property Type</label>
          <Select
            placeholder="Select property type"
            value={filters?.type}
            onChange={(value) => onChange('type', value)}
            className="w-full dark-select"
            allowClear
          >
            {propertyTypes.map((type) => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">Price Range</label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Min Price"
                value={filters?.minPrice ?? ''}
                onChange={(e) => handleNumberInput('minPrice', e)}
                prefix="$"
                className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
              />
              <Input
                placeholder="Max Price"
                value={filters?.maxPrice ?? ''}
                onChange={(e) => handleNumberInput('maxPrice', e)}
                prefix="$"
                className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">Minimum Bedrooms</label>
          <Select
            placeholder="Any"
            value={filters?.minBedrooms}
            onChange={(value) => onChange('minBedrooms', value)}
            className="w-full dark-select"
            allowClear
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Option key={num} value={num}>
                {num}+ Bedroom{num > 1 ? 's' : ''}
              </Option>
            ))}
          </Select>
        </div>

        {/* Property Features (toggles) */}
        <div>
          <label className="mb-3 block text-sm font-medium text-white">Property Features</label>
          <div className="space-y-2">
            <div>
              <Checkbox
                checked={!!filters?.parkingRequired}
                onChange={(e) => onChange('parkingRequired', e.target.checked)}
                className="text-gray-300"
              >
                <span className="text-gray-300">Parking Required</span>
              </Checkbox>
            </div>
            <div>
              <Checkbox
                checked={!!filters?.availableForSwap}
                onChange={(e) => onChange('availableForSwap', e.target.checked)}
                className="text-gray-300"
              >
                <span className="text-gray-300">Available for Home Swap</span>
              </Checkbox>
            </div>
          </div>
        </div>

        {/* Location Features */}
        {features?.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-white">Location Features</label>
            <div className="max-h-32 flex-col space-y-2 overflow-y-auto">
              {features.map((feature) => (
                <div key={feature}>
                  <Checkbox
                    checked={Array.isArray(filters?.features) && filters.features.includes(feature)}
                    onChange={(e) => toggleArrayValue('features', feature, e.target.checked)}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">
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

        {/* Amenities */}
        {amenities?.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-white">Amenities</label>
            <div className="max-h-40 space-y-2 overflow-y-auto">
              {amenities.map((amenity) => (
                <div key={amenity}>
                  <Checkbox
                    checked={Array.isArray(filters?.amenities) && filters.amenities.includes(amenity)}
                    onChange={(e) => toggleArrayValue('amenities', amenity, e.target.checked)}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">
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
    </Card>
  );
}
