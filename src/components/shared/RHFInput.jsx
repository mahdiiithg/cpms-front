'use client';

import React from 'react';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import CpField from './CpField';

const RHFInput = ({
  name,
  control,
  type = 'text',
  disabled = false,
  lowercase = false,
  placeholder,
  autoComplete = 'off',
  rules,
  prefix,
  className,
  ...props
}) => {
  const AntInput = type === 'password' ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <CpField className={twMerge(error ? 'border-red-500/70' : '', className)}>
          <AntInput
            {...field}
            {...props}
            prefix={prefix}
            type={type !== 'password' ? type : undefined}
            size="large"
            variant="borderless"
            disabled={disabled}
            placeholder={placeholder}
            status={error ? 'error' : ''}
            value={field.value || ''}
            autoComplete={autoComplete}
            onChange={(e) => {
              const value = lowercase
                ? e.target.value.toLowerCase()
                : e.target.value;
              field.onChange(value);
            }}
          />
        </CpField>
      )}
    />
  );
};

export default RHFInput;
