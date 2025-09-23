'use client';

import React from 'react';
import { Select } from 'antd';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const { Option } = Select;

const RHFSelect = ({
  name,
  control,
  disabled = false,
  placeholder,
  options = [],
  rules,
  className,
  prefix,
  ...props
}) => {
  const selectClassName = twMerge('w-full', className);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          {...props}
          size="large"
          variant="filled"
          disabled={disabled}
          placeholder={placeholder}
          optionFilterProp="label"
          status={error ? 'error' : ''}
          className={selectClassName}
          onChange={(value) => field.onChange(value)}
          value={field.value === '' ? undefined : field.value}
          prefix={prefix}
        >
          {options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      )}
    />
  );
};

export default RHFSelect;
