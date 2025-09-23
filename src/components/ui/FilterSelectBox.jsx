'use client';

import React from 'react';
import { Select } from 'antd';
import { twMerge } from 'tailwind-merge';
import useMediaQuery from '@/hooks/useMediaQuery';

const { Option } = Select;

const FilterSelectBox = ({
  defaultLabel = 'Select',
  options = [],
  className = '',
  onChange = () => {},
  isMulti = false,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Select
      mode="multiple"
      placeholder={defaultLabel}
      onChange={onChange}
      size={isMobile ? 'small' : 'middle'}
      className={twMerge(
        `filter-select-box w-fit cursor-pointer ${props.value ? 'min-w-fit' : 'min-w-[100px]'}`,
        className,
      )}
      {...props}
    >
      {options.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSelectBox;
