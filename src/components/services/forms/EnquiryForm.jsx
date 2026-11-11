'use client';

import { Form, Input, Button } from 'antd';
import CpField from '@/components/shared/CpField';
import { solidCtaClass } from '@/lib/brandTheme';

export default function EnquiryForm({ context = 'general', variant = 'dark', fields }) {
  const [form] = Form.useForm();
  const isDark = variant !== 'light';
  const labelCls = isDark ? 'text-white/90' : 'text-gray-700';

  const onFinish = (values) => {
    // eslint-disable-next-line no-console
    console.log(`[EnquiryForm:${context}]`, values);
    // eslint-disable-next-line no-alert
    alert("Thanks! We'll be in touch shortly.");
    form.resetFields();
  };

  const baseFields =
    fields && fields.length
      ? fields
      : [
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
        <Form.Item
          key={f.name}
          name={f.name}
          label={<span className={labelCls}>{f.label}</span>}
          rules={rules}
        >
          <CpField className="!items-start !min-h-[7.5rem] !py-2">
            <Input.TextArea
              rows={f.rows || 3}
              className="resize-none !bg-transparent !text-white"
              placeholder={f.placeholder}
              variant="borderless"
            />
          </CpField>
        </Form.Item>
      );
    }

    return (
      <Form.Item
        key={f.name}
        name={f.name}
        label={<span className={labelCls}>{f.label}</span>}
        rules={rules}
      >
        <CpField>
          <Input placeholder={f.placeholder} variant="borderless" />
        </CpField>
      </Form.Item>
    );
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {baseFields.map(renderField)}
      <Button htmlType="submit" type="primary" className={`h-11 w-full ${solidCtaClass}`}>
        Request callback
      </Button>
    </Form>
  );
}
