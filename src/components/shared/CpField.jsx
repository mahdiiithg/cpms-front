import { twMerge } from 'tailwind-merge';
import { fieldShellClass } from '@/lib/brandTheme';

/**
 * Shared Coast Planet control shell — single soft stroke around Ant Input/Select/TextArea.
 * Put borderless Ant controls inside; do not add a second border on the child.
 */
export default function CpField({ className = '', children, ...rest }) {
  return (
    <div className={twMerge(fieldShellClass, className)} {...rest}>
      {children}
    </div>
  );
}
