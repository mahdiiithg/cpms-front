'use client';

import { useState } from 'react';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import { User, Mail, Phone, Send } from 'lucide-react';

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
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(values);
      } else {
        // Simulate submit
        await new Promise((res) => setTimeout(res, 1200));
        console.log('Contact lead submitted:', values);
      }
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        {title}
      </h2>
      <p className="text-gray-600 mb-6 sm:mb-8">{subtitle}</p>

      <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input size="large" placeholder="John" prefix={<User className="h-4 w-4 text-gray-400" />} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input size="large" placeholder="Doe" prefix={<User className="h-4 w-4 text-gray-400" />} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input size="large" placeholder="john.doe@example.com" prefix={<Mail className="h-4 w-4 text-gray-400" />} />
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="countryCode"
              label="Country Code"
              rules={[{ required: true, message: 'Please select country code' }]}
            >
              <Select size="large" placeholder="Country">
                <Option value="+1">🇺🇸 +1</Option>
                <Option value="+44">🇬🇧 +44</Option>
                <Option value="+971">🇦🇪 +971</Option>
                <Option value="+33">🇫🇷 +33</Option>
                <Option value="+49">🇩🇪 +49</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={16}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input size="large" placeholder="555 123 4567" prefix={<Phone className="h-4 w-4 text-gray-400" />} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="service" label="Service of Interest" rules={[{ required: true, message: 'Please select a service' }]}>
          <Select size="large" placeholder="Select a service">
            {services.map((service, idx) => (
              <Option key={idx} value={service}>
                {service}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
          <TextArea rows={4} placeholder="Tell us about your needs or any questions you have..." className="resize-none" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            icon={<Send className="h-4 w-4" />}
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
