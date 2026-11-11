'use client';

import { Button } from 'antd';
import { Grid, List, Map } from 'lucide-react';

const MODE_CONFIG = {
  grid: { icon: Grid, label: 'Grid' },
  list: { icon: List, label: 'List' },
  map: { icon: Map, label: 'Map' },
};

/**
 * Dark-theme view switcher used on property listing pages.
 * @param {('grid'|'list'|'map')[]} modes
 */
export default function ListingViewToggle({
  viewMode = 'grid',
  onChange,
  modes = ['grid', 'list'],
  showLabels = true,
  className = '',
}) {
  return (
    <div
      className={`hidden rounded-lg border border-gray-800 bg-[#212121] p-1 sm:flex ${className}`}
    >
      {modes.map((mode) => {
        const config = MODE_CONFIG[mode];
        if (!config) return null;
        const Icon = config.icon;
        const active = viewMode === mode;
        return (
          <Button
            key={mode}
            type={active ? 'primary' : 'text'}
            size="small"
            icon={<Icon className="h-4 w-4" />}
            onClick={() => onChange?.(mode)}
            className={
              active
                ? 'bg-[#ccff00] border-0 text-[#171717] shadow-[0_0_10px_rgba(204,255,0,0.6)]'
                : 'text-gray-400 hover:text-[#ccff00]'
            }
          >
            {showLabels ? config.label : null}
          </Button>
        );
      })}
    </div>
  );
}
