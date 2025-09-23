'use client';

import { Form, Button, Row, Col } from 'antd';
import { User2, Mail, KeyRound, Phone, LocateFixed } from 'lucide-react';
import RHFInput from '@/components/shared/RHFInput';
import RHFSelect from '@/components/shared/RHFSelect';

const ProfileForm = ({ control, errors, handleSubmit, onSubmit, loading }) => {
  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      autoComplete="off"
      disabled={loading}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
          >
            <RHFInput
              name="name"
              control={control}
              placeholder="Name"
              prefix={<User2 size={18} className="mr-1 text-[#ADADAD]" />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            validateStatus={errors.lastName ? 'error' : ''}
            help={errors.lastName?.message}
          >
            <RHFInput
              name="lastName"
              control={control}
              placeholder="Last Name"
              prefix={<User2 size={18} className="mr-1 text-[#ADADAD]" />}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <RHFInput
              name="email"
              control={control}
              placeholder="Email Address"
              prefix={<Mail size={18} className="mr-1 text-[#ADADAD]" />}
            />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={12}>
          <Form.Item
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <RHFInput
              name="password"
              control={control}
              type="password"
              placeholder="Password"
              prefix={<KeyRound size={18} className="mr-1 text-[#ADADAD]" />}
            />
          </Form.Item>
        </Col> */}
        <Col xs={24} md={12}>
          <Form.Item
            validateStatus={errors.phone ? 'error' : ''}
            help={errors.phone?.message}
          >
            <RHFInput
              name="phone"
              control={control}
              placeholder="Phone Number"
              prefix={<Phone size={18} className="mr-1 text-[#ADADAD]" />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            validateStatus={errors.city ? 'error' : ''}
            help={errors.city?.message}
          >
            <RHFSelect
              name="city"
              control={control}
              placeholder="city"
              prefix={<LocateFixed size={18} className="mr-1 text-[#ADADAD]" />}
              options={[
                { label: 'Dubai', value: 'dubai' },
                { label: 'Abu Dhabi', value: 'abudhabi' },
                { label: 'Sharjah', value: 'sharjah' },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className="mt-4 md:mt-8">
        <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#7EF273] font-semibold text-black"
              style={{ borderRadius: '9999px', height: '45px', width: '150px' }}
            >
              Update
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileForm;
