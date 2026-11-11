import { twMerge } from 'tailwind-merge';
import { detailCardClass, panelClass } from '@/lib/brandTheme';

/**
 * Shared dark+lime surface used across public pages.
 * Prefer this over Ant Card so we never leak white Ant defaults.
 */
export default function ThemePanel({
  as: Comp = 'div',
  variant = 'detail',
  hover = true,
  className = '',
  children,
  ...rest
}) {
  const base = variant === 'panel' ? panelClass : detailCardClass;
  const hoverClass = hover
    ? 'transition-all duration-300 hover:border-cp-lime/40 hover:shadow-[0_0_20px_rgba(204,255,0,0.28)]'
    : '';

  return (
    <Comp className={twMerge(base, hoverClass, className)} {...rest}>
      {children}
    </Comp>
  );
}
