'use client';

import { useState } from 'react';
import { Input, Button, AutoComplete } from 'antd';
import { Search, MapPin } from 'lucide-react';
import { solidCtaClass } from '@/lib/brandTheme';

const popularLocations = [
  'Malibu, California',
  'Miami Beach, Florida',
  'Hamptons, New York',
  'Key West, Florida',
  'Newport Beach, California',
  'Carmel, California',
  'Sausalito, California',
  'Santa Barbara, California',
  'Outer Banks, North Carolina',
  'Cape Cod, Massachusetts',
];

export default function PropertySearch({
  onSearch,
  placeholder = 'Search by location, property type, or amenities...',
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      location,
    });
  };

  const handleLocationSearch = (value) => {
    setLocation(value);
    if (value) {
      const filtered = popularLocations.filter((loc) =>
        loc.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestions(filtered.map((loc) => ({ value: loc })));
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="cp-search rounded-2xl border border-cp-stroke bg-cp-raised p-3 shadow-[0_0_24px_rgba(204,255,0,0.08)] sm:p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white">Location</label>
          <div className="cp-field">
            <AutoComplete
              value={location}
              options={suggestions}
              onSearch={handleLocationSearch}
              onSelect={setLocation}
              className="w-full"
              variant="borderless"
            >
              <Input
                prefix={<MapPin className="h-4 w-4 text-cp-lime" />}
                placeholder="Where do you want to stay?"
                onKeyPress={handleKeyPress}
                variant="borderless"
              />
            </AutoComplete>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-white">Search</label>
          <div className="cp-field">
            <Input
              prefix={<Search className="h-4 w-4 text-cp-lime" />}
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="borderless"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="hidden text-sm font-medium text-white opacity-0 md:block">
            Search
          </label>
          <Button
            type="primary"
            icon={<Search className="h-4 w-4" />}
            onClick={handleSearch}
            className={`h-[42px] w-full text-base ${solidCtaClass}`}
          >
            Search Properties
          </Button>
        </div>
      </div>

      <div className="mt-3 border-t border-cp-stroke pt-3">
        <div className="mb-1.5 text-sm text-cp-subtle">Popular destinations:</div>
        <div className="flex flex-wrap gap-2">
          {popularLocations.slice(0, 6).map((loc) => (
            <Button
              key={loc}
              size="small"
              className="cp-toolbar-btn !h-8 !text-xs"
              onClick={() => {
                setLocation(loc);
                onSearch({ searchTerm, location: loc });
              }}
            >
              {loc.split(',')[0]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
