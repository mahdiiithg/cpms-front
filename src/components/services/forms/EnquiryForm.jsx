'use client';

import { Form, Input, Button } from 'antd';

export default function EnquiryForm({ context = 'general', variant = 'light', fields }) {
  const [form] = Form.useForm();
  const isDark = variant === 'dark';
  const labelCls = isDark ? 'text-white/90' : 'text-gray-700';
  const inputCls = isDark
    ? 'h-11 rounded-lg border-white/30 bg-white/90'
    : 'h-11 rounded-lg border-gray-300 bg-white';

  const onFinish = (values) => {
    // Centralized placeholder submit; can be wired to /api/enquiries later
    // eslint-disable-next-line no-console
    console.log(`[EnquiryForm:${context}]`, values);
    // Simple UX feedback
    // eslint-disable-next-line no-alert
    alert("Thanks! We'll be in touch shortly.");
    form.resetFields();
  };

  const baseFields = fields && fields.length ? fields : [
    { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
    { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
    { name: 'message', label: 'Message', type: 'textarea', rows: 3, placeholder: 'Tell us about your needs' },
  ];

  const renderField = (f) => {
    const rules = [];
    if (f.required) rules.push({ required: true });
    if (f.type === 'email') rules.push({ type: 'email' });

    if (f.type === 'textarea') {
      return (
        <Form.Item key={f.name} name={f.name} label={<span className={labelCls}>{f.label}</span>} rules={rules}>
          <Input.TextArea rows={f.rows || 3} className={isDark ? 'rounded-lg border-white/30 bg-white/90' : 'rounded-lg border-gray-300 bg-white'} placeholder={f.placeholder} />
        </Form.Item>
      );
    }

    return (
      <Form.Item key={f.name} name={f.name} label={<span className={labelCls}>{f.label}</span>} rules={rules}>
        <Input className={inputCls} placeholder={f.placeholder} />
      </Form.Item>
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {baseFields.map(renderField)}
      <Button htmlType="submit" type="primary" className="h-11 w-full rounded-lg border-0 bg-gradient-to-r from-blue-600 to-teal-600">Request callback</Button>
    </Form>
  );
}
