'use client';

import { Grid, List, Map } from 'lucide-react';

const MODE_CONFIG = {
  grid: { icon: Grid, label: 'Grid' },
  list: { icon: List, label: 'List' },
  map: { icon: Map, label: 'Map' },
};

/**
 * Dark-theme view switcher used on property listing pages.
 * Native buttons avoid Ant text-button color defaults (black on dark).
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
    <div className={`cp-view-toggle ${className}`} role="group" aria-label="View mode">
      {modes.map((mode) => {
        const config = MODE_CONFIG[mode];
        if (!config) return null;
        const Icon = config.icon;
        const active = viewMode === mode;
        return (
          <button
            key={mode}
            type="button"
            aria-pressed={active}
            onClick={() => onChange?.(mode)}
            className={`cp-view-toggle__btn${active ? ' is-active' : ''}`}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {showLabels ? <span>{config.label}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
