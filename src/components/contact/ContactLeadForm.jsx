'use client';

import { useState } from 'react';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import { User, Mail, Phone, Send } from 'lucide-react';
import CpField from '@/components/shared/CpField';
import { solidCtaClass } from '@/lib/brandTheme';

const { Option } = Select;
const { TextArea } = Input;

export default function ContactLeadForm({
  title = 'Schedule a call with our consultants',
  subtitle = 'Fill out the form below and one of our experts will get back to you within 24 hours.',
  services = [
    'Property Management',
    'Property Sales',
    'Property Rental',
    'Investment Consultation',
    'Property Valuation',
    'Legal Services',
    'Mortgage Services',
    'General Inquiry',
  ],
  onSubmit,
  darkMode = true,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        await new Promise((res) => setTimeout(res, 1200));
        console.log('Contact lead submitted:', values);
      }
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  const labelCls = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div>
      {title && (
        <h2
          className={`mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mb-6 sm:mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="cp-dark-form space-y-4"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label={<span className={labelCls}>First Name</span>}
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <CpField>
                <Input
                  size="large"
                  placeholder="John"
                  prefix={<User className="h-4 w-4 text-cp-subtle" />}
                  variant="borderless"
                />
              </CpField>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label={<span className={labelCls}>Last Name</span>}
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <CpField>
                <Input
                  size="large"
                  placeholder="Doe"
                  prefix={<User className="h-4 w-4 text-cp-subtle" />}
                  variant="borderless"
                />
              </CpField>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label={<span className={labelCls}>Email Address</span>}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <CpField>
            <Input
              size="large"
              placeholder="john.doe@example.com"
              prefix={<Mail className="h-4 w-4 text-cp-subtle" />}
              variant="borderless"
            />
          </CpField>
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="countryCode"
              label={<span className={labelCls}>Country Code</span>}
              rules={[{ required: true, message: 'Please select country code' }]}
            >
              <CpField>
                <Select size="large" placeholder="Country" variant="borderless" className="w-full">
                  <Option value="+1">🇺🇸 +1</Option>
                  <Option value="+44">🇬🇧 +44</Option>
                  <Option value="+971">🇦🇪 +971</Option>
                  <Option value="+33">🇫🇷 +33</Option>
                  <Option value="+49">🇩🇪 +49</Option>
                </Select>
              </CpField>
            </Form.Item>
          </Col>
          <Col xs={24} sm={16}>
            <Form.Item
              name="phone"
              label={<span className={labelCls}>Phone Number</span>}
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <CpField>
                <Input
                  size="large"
                  placeholder="555 123 4567"
                  prefix={<Phone className="h-4 w-4 text-cp-subtle" />}
                  variant="borderless"
                />
              </CpField>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="service"
          label={<span className={labelCls}>Service of Interest</span>}
          rules={[{ required: true, message: 'Please select a service' }]}
        >
          <CpField>
            <Select
              size="large"
              placeholder="Select a service"
              variant="borderless"
              className="w-full"
            >
              {services.map((service, idx) => (
                <Option key={idx} value={service}>
                  {service}
                </Option>
              ))}
            </Select>
          </CpField>
        </Form.Item>

        <Form.Item
          name="message"
          label={<span className={labelCls}>Message</span>}
          rules={[{ required: true, message: 'Please enter your message' }]}
        >
          <CpField className="!items-start !min-h-[7.5rem] !py-2">
            <TextArea
              rows={4}
              placeholder="Tell us about your needs or any questions you have..."
              className="resize-none !bg-transparent !text-white"
              variant="borderless"
            />
          </CpField>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            icon={<Send className="h-4 w-4" />}
            className={`w-full transition-all duration-300 hover:scale-105 ${solidCtaClass}`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
