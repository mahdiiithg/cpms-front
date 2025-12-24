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
  darkMode = false,
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
      {title && (
        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mb-6 sm:mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit} className="space-y-4 contact-form-dark">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="firstName"
              label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>First Name</span>}
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input size="large" placeholder="John" prefix={<User className="h-4 w-4 text-gray-400" />} className={darkMode ? 'dark-input' : ''} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="lastName"
              label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Last Name</span>}
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input size="large" placeholder="Doe" prefix={<User className="h-4 w-4 text-gray-400" />} className={darkMode ? 'dark-input' : ''} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Email Address</span>}
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input size="large" placeholder="john.doe@example.com" prefix={<Mail className="h-4 w-4 text-gray-400" />} className={darkMode ? 'dark-input' : ''} />
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              name="countryCode"
              label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Country Code</span>}
              rules={[{ required: true, message: 'Please select country code' }]}
            >
              <Select size="large" placeholder="Country" className={darkMode ? 'dark-select' : ''}>
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
              label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Phone Number</span>}
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input size="large" placeholder="555 123 4567" prefix={<Phone className="h-4 w-4 text-gray-400" />} className={darkMode ? 'dark-input' : ''} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="service" label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Service of Interest</span>} rules={[{ required: true, message: 'Please select a service' }]}>
          <Select size="large" placeholder="Select a service" className={darkMode ? 'dark-select' : ''}>
            {services.map((service, idx) => (
              <Option key={idx} value={service}>
                {service}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="message" label={<span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Message</span>} rules={[{ required: true, message: 'Please enter your message' }]}>
          <TextArea rows={4} placeholder="Tell us about your needs or any questions you have..." className={`resize-none ${darkMode ? 'dark-input' : ''}`} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            icon={<Send className="h-4 w-4" />}
            className={`w-full border-0 transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-[#ccff00] hover:bg-[#ccff00] text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]'
                : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:shadow-lg'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
