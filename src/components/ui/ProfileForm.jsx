'use client';

import { Button, Form } from 'antd';
import { User2, Mail, Phone, MapPin } from 'lucide-react';
import RHFInput from '@/components/shared/RHFInput';
import RHFSelect from '@/components/shared/RHFSelect';
import CpField from '@/components/shared/CpField';
import { solidCtaClass } from '@/lib/brandTheme';

const CITY_OPTIONS = [
  { label: 'Gold Coast', value: 'Gold Coast' },
  { label: 'Sydney', value: 'Sydney' },
  { label: 'Melbourne', value: 'Melbourne' },
  { label: 'Brisbane', value: 'Brisbane' },
  { label: 'Perth', value: 'Perth' },
  { label: 'Adelaide', value: 'Adelaide' },
  { label: 'Dubai', value: 'Dubai' },
  { label: 'Abu Dhabi', value: 'Abu Dhabi' },
  { label: 'Sharjah', value: 'Sharjah' },
];

const ProfileForm = ({ control, errors, handleSubmit, onSubmit, loading }) => {
  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      autoComplete="off"
      disabled={loading}
      className="space-y-1"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Form.Item
          label={<span className="text-cp-subtle">First name</span>}
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.message}
          className="!mb-3"
        >
          <RHFInput
            name="name"
            control={control}
            placeholder="First name"
            prefix={<User2 size={18} className="mr-1 text-cp-faint" />}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-cp-subtle">Last name</span>}
          validateStatus={errors.lastName ? 'error' : ''}
          help={errors.lastName?.message}
          className="!mb-3"
        >
          <RHFInput
            name="lastName"
            control={control}
            placeholder="Last name"
            prefix={<User2 size={18} className="mr-1 text-cp-faint" />}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-cp-subtle">Email</span>}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
          className="!mb-3"
        >
          <RHFInput
            name="email"
            control={control}
            placeholder="you@example.com"
            prefix={<Mail size={18} className="mr-1 text-cp-faint" />}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-cp-subtle">Phone</span>}
          validateStatus={errors.phone ? 'error' : ''}
          help={errors.phone?.message}
          className="!mb-3"
        >
          <RHFInput
            name="phone"
            control={control}
            placeholder="Phone number"
            prefix={<Phone size={18} className="mr-1 text-cp-faint" />}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-cp-subtle">City / location</span>}
          validateStatus={errors.city ? 'error' : ''}
          help={errors.city?.message}
          className="!mb-3 md:col-span-2"
        >
          <CpField className="flex items-center gap-2 px-3">
            <MapPin size={18} className="shrink-0 text-cp-faint" />
            <RHFSelect
              name="city"
              control={control}
              placeholder="Select city"
              variant="borderless"
              options={CITY_OPTIONS}
              className="w-full !bg-transparent"
            />
          </CpField>
        </Form.Item>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className={`${solidCtaClass} !h-11 !rounded-full !px-8`}
        >
          Save profile
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
