'use client';

import { Children, cloneElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';
import { fieldShellClass } from '@/lib/brandTheme';

function mergeControlProps(child, rest) {
  return {
    ...child.props,
    ...rest,
    className: twMerge(child.props.className, rest.className),
    onChange: (...args) => {
      child.props.onChange?.(...args);
      rest.onChange?.(...args);
    },
    onBlur: (...args) => {
      child.props.onBlur?.(...args);
      rest.onBlur?.(...args);
    },
    onFocus: (...args) => {
      child.props.onFocus?.(...args);
      rest.onFocus?.(...args);
    },
  };
}

/**
 * Shared Coast Planet control shell — single soft stroke around Ant Input/Select/TextArea.
 * Put borderless Ant controls inside; do not add a second border on the child.
 * Forwards Form.Item value/onChange/id onto the nested control (not the shell div).
 * When an icon + control are nested, Form props bind to the last element child.
 */
export default function CpField({ className = '', children, ...rest }) {
  const items = Children.toArray(children);

  let content;
  if (items.length === 1 && isValidElement(items[0])) {
    content = cloneElement(items[0], mergeControlProps(items[0], rest));
  } else if (items.length > 1) {
    const leading = items.slice(0, -1);
    const last = items[items.length - 1];
    content = (
      <>
        {leading}
        {isValidElement(last)
          ? cloneElement(last, mergeControlProps(last, rest))
          : last}
      </>
    );
  } else {
    content = children;
  }

  return <div className={twMerge(fieldShellClass, className)}>{content}</div>;
}
