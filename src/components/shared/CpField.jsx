'use client';

import { Children, cloneElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { fieldShellClass } from '@/lib/brandTheme';

/**
 * Shared Coast Planet control shell — single soft stroke around Ant Input/Select/TextArea.
 * Put borderless Ant controls inside; do not add a second border on the child.
 * Forwards Form.Item value/onChange/id onto the nested control (not the shell div).
 */
export default function CpField({ className = '', children, ...rest }) {
  const child = Children.only(children);

  const control = isValidElement(child)
    ? cloneElement(child, {
        ...child.props,
        ...rest,
        className: twMerge(child.props.className, rest.className),
      })
    : children;

  return <div className={twMerge(fieldShellClass, className)}>{control}</div>;
}
