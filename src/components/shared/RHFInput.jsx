'use client';

import React from 'react';
import { Input } from 'antd';
import { Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

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
  const inputClassName = twMerge('p-2', className);

  const AntInput = type === 'password' ? Input.Password : Input;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <AntInput
          {...field}
          {...props}
          prefix={prefix}
          type={type !== 'password' ? type : undefined}
          size="large"
          variant="filled"
          disabled={disabled}
          placeholder={placeholder}
          status={error ? 'error' : ''}
          value={field.value || ''}
          autoComplete={autoComplete}
          className={inputClassName}
          onChange={(e) => {
            const value = lowercase
              ? e.target.value.toLowerCase()
              : e.target.value;
            field.onChange(value);
          }}
        />
      )}
    />
  );
};

export default RHFInput;
