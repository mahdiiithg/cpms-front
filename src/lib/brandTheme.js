/**
 * Coast Planet shared brand tokens + reusable class strings.
 * Keep palette locked: dark surfaces + lime #ccff00.
 */

export const brand = {
  lime: '#ccff00',
  limeHover: '#d4ff33',
  limeMuted: 'rgba(204, 255, 0, 0.14)',
  limeGlow: 'rgba(204, 255, 0, 0.45)',
  surface: '#171717',
  surfaceRaised: '#1a1a1a',
  surfaceElevated: '#212121',
  ink: '#ffffff',
  inkMuted: '#d1d5db',
  inkSubtle: '#9ca3af',
  inkFaint: '#6b7280',
  stroke: 'rgba(255, 255, 255, 0.08)',
  strokeStrong: 'rgba(255, 255, 255, 0.14)',
  strokeHover: 'rgba(204, 255, 0, 0.45)',
  radiusControl: '12px',
  radiusPanel: '16px',
  radiusPill: '9999px',
};

/** Page canvas */
export const pageSurfaceClass = 'min-h-screen bg-cp-surface text-white';

/** Raised panel / card shell */
export const panelClass =
  'rounded-2xl border border-cp-stroke bg-cp-raised shadow-[0_0_24px_rgba(0,0,0,0.28)]';

/** Compact detail cards */
export const detailCardClass =
  'rounded-xl border border-cp-stroke bg-cp-raised p-6 shadow-[0_0_20px_rgba(0,0,0,0.25)]';

/** Lime outline CTA (Ant Button-friendly with ! overrides) */
export const outlineCtaClass =
  '!border !border-cp-lime !bg-transparent !font-semibold !text-cp-lime transition-all duration-300 hover:!bg-cp-lime hover:!text-cp-surface hover:shadow-[0_0_20px_rgba(204,255,0,0.55)]';

/** Solid lime CTA */
export const solidCtaClass =
  '!border-0 !bg-cp-lime !font-semibold !text-cp-surface shadow-[0_0_15px_rgba(204,255,0,0.45)] hover:!bg-cp-lime-hover hover:shadow-[0_0_24px_rgba(204,255,0,0.7)]';

/** Shared control class applied to Ant Input / Select wrappers */
export const controlClass = 'cp-control';

/** Soft section divider */
export const hairlineClass = 'border-cp-stroke';

/** Icon well on dark panels */
export const iconWellClass =
  'mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-cp-lime/20 bg-cp-lime/10';

export default brand;
