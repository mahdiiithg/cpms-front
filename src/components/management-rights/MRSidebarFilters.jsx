'use client';

import { Button, Checkbox, Divider, Input } from 'antd';
import CpField from '@/components/shared/CpField';
import { solidCtaClass } from '@/lib/brandTheme';

export default function MRSidebarFilters({
  priceRange,
  setPriceRange,
  flags,
  setFlags,
  onApply,
  onReset,
  title = 'Refine Results',
  priceLabel = 'Price range (sale)',
  featuresLabel = 'Features',
}) {
  return (
    <div className="space-y-4 rounded-lg border border-cp-stroke bg-cp-raised p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <Divider className="my-2 border-cp-stroke" />
      <div>
        <label className="mb-1 block text-xs font-medium text-white">{priceLabel}</label>
        <div className="flex gap-2">
          <CpField>
            <Input
              type="number"
              placeholder="Min"
              value={priceRange?.[0] ?? ''}
              onChange={(e) => {
                const v = Number(e.target.value || 0);
                setPriceRange([v, priceRange[1]]);
              }}
              variant="borderless"
            />
          </CpField>
          <CpField>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange?.[1] ?? ''}
              onChange={(e) => {
                const v = Number(e.target.value || 0);
                setPriceRange([priceRange[0], v]);
              }}
              variant="borderless"
            />
          </CpField>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-white">{featuresLabel}</label>
        <div className="space-y-1">
          {Object.keys(flags).map((key) => (
            <Checkbox
              key={key}
              checked={flags[key]}
              onChange={(e) => setFlags({ ...flags, [key]: e.target.checked })}
              className="m-0 h-3 w-3 p-0 text-cp-muted"
            >
              <span className="text-cp-muted">{key}</span>
            </Checkbox>
          ))}
        </div>
      </div>
      <Divider className="my-2 border-cp-stroke" />
      <div className="space-y-2">
        <Button className={`w-full ${solidCtaClass}`} onClick={onApply}>
          Apply
        </Button>
        <Button
          className="w-full !border-cp-stroke !bg-cp-elevated !text-cp-muted hover:!border-cp-lime hover:!text-cp-lime"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
