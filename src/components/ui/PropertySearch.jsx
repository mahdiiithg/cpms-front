'use client';

import { useState } from 'react';
import { Input, Button, Select, AutoComplete } from 'antd';
import { Search, MapPin } from 'lucide-react';

const { Option } = Select;

// Popular coastal locations for autocomplete
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
  'Cape Cod, Massachusetts'
];

export default function PropertySearch({ onSearch, placeholder = "Search by location, property type, or amenities..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    onSearch({
      searchTerm,
      location
    });
  };

  const handleLocationSearch = (value) => {
    setLocation(value);
    if (value) {
      const filtered = popularLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.map(loc => ({ value: loc })));
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
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Location Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Location</label>
          <AutoComplete
            value={location}
            options={suggestions}
            onSearch={handleLocationSearch}
            onSelect={setLocation}
            className="w-full"
          >
            <Input
              prefix={<MapPin className="h-4 w-4 text-[#ccff00]" />}
              placeholder="Where do you want to stay?"
              onKeyPress={handleKeyPress}
              className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            />
          </AutoComplete>
        </div>

        {/* General Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Search</label>
          <Input
            prefix={<Search className="h-4 w-4 text-[#ccff00]" />}
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-[#212121] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
          />
        </div>

        {/* Search Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white opacity-0">Search</label>
          <Button 
            type="primary"
            icon={<Search className="h-4 w-4" />}
            onClick={handleSearch}
            className="w-full h-10 text-base font-medium bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]"
          >
            Search Properties
          </Button>
        </div>
      </div>

      {/* Quick Location Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="text-sm text-gray-400 mb-2">Popular destinations:</div>
        <div className="flex flex-wrap gap-2">
          {popularLocations.slice(0, 6).map((loc) => (
            <Button
              key={loc}
              size="small"
              className="text-xs bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
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
