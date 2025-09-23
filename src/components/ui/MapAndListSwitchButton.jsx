'use client';

import { Segmented } from 'antd';
import { Map, Rows2 } from 'lucide-react';

const MapAndListSwitchButton = ({ active, onChange }) => {
  return (
    <div className="fixed bottom-1 left-1/2 z-50 -translate-x-1/2 transform md:hidden">
      <div className="flex rounded-full border border-gray-200 bg-white shadow-lg">
        <Segmented
          options={[
            { label: 'Map', value: 'map', icon: <Map size={20} /> },
            { label: 'List', value: 'list', icon: <Rows2 size={20} /> },
          ]}
          value={active}
          onChange={onChange}
          shape="round"
          className="custom-segmented-map-list-switch"
        />
      </div>
    </div>
  );
};

export default MapAndListSwitchButton;
