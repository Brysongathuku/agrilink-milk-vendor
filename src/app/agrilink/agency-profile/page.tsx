'use client';

import { useState } from 'react';
import { App, Button, Form, Input, Select, Space, Tabs } from 'antd';
import { Building2, CircleDollarSign, Globe, Landmark } from 'lucide-react';

export default function SettingsPage() {
  const { message } = App.useApp();
  const [dirty, setDirty] = useState(false);
  const [form] = Form.useForm();

  const org = (
    <div className="card" style={{ background: '#fcfcfd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: 18, marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: 0 }}>Organization</h2>
          <p className="muted" style={{ margin: '6px 0 0' }}>Update your public profile, contact details, and payment settings.</p>
        </div>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#d1d5db' }}>
          <Landmark size={40} />
        </div>
      </div>
      {dirty && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf7', border: '1px solid #a7e9cf', borderRadius: 10, padding: '12px 20px', marginBottom: 20 }}>
          <span className="muted">You have unsaved changes</span>
          <Button type="primary" size="large" onClick={() => { setDirty(false); message.success('Changes saved'); }}>Save changes</Button>
        </div>
      )}
      <Form
        form={form}
        layout="vertical"
        onValuesChange={() => setDirty(true)}
        initialValues={{
          name: 'Gathuku Fresh Milk Vendors',
          kra: 'P051234567X',
          code: '+254',
          phone: '706789700',
          email: 'bryson254706789703@pesira.com',
          address: 'Main Street, Githunguri Town',
          kdb: 'KDB/KBU/DT/2026/0412',
          till: '5123456',
        }}
      >
        <div className="card">
          <h4 style={{ marginTop: 0 }}><Building2 size={16} style={{ verticalAlign: -2 }} /> Business</h4>
          <div className="grid-2" style={{ gap: 16 }}>
            <Form.Item name="name" label="Business name"><Input /></Form.Item>
            <Form.Item name="kra" label="KRA PIN"><Input placeholder="Tax identifier" /></Form.Item>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            <Form.Item label="Phone number">
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item name="code" noStyle>
                  <Select style={{ width: '30%' }} options={[{ value: '+254', label: '+254' }, { value: '+256', label: '+256' }, { value: '+255', label: '+255' }]} />
                </Form.Item>
                <Form.Item name="phone" noStyle><Input style={{ width: '70%' }} /></Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item name="email" label="Email"><Input /></Form.Item>
            <Form.Item name="website" label="Website"><Input placeholder="https://" /></Form.Item>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            <Form.Item name="address" label="Physical address"><Input /></Form.Item>
            <Form.Item name="kdb" label="KDB licence number"><Input /></Form.Item>
            <Form.Item name="till" label="M-Pesa Till number"><Input /></Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );

  const currency = (
    <div style={{ padding: '10px 30px' }}>
      <h2>Currency</h2>
      <p className="muted">Currency used for prices, sales and reports.</p>
      <Select size="large" defaultValue="KES" style={{ width: 280 }} onChange={() => message.success('Currency updated')} options={[{ value: 'KES', label: 'KES – Kenyan Shilling' }, { value: 'UGX', label: 'UGX – Ugandan Shilling' }, { value: 'TZS', label: 'TZS – Tanzanian Shilling' }, { value: 'USD', label: 'USD – US Dollar' }]} />
    </div>
  );

  const language = (
    <div style={{ padding: '10px 30px' }}>
      <h2>Language Preference</h2>
      <p className="muted">Select your preferred language for the dashboard interface.</p>
      <Select size="large" defaultValue="en" style={{ width: 280 }} options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }, { value: 'sw', label: 'Kiswahili' }]} />
    </div>
  );

  return (
    <div>
      <h1 className="page-title" style={{ fontSize: 28, fontWeight: 600 }}>Settings</h1>
      <p className="page-sub" style={{ marginBottom: 24 }}>Manage your organization profile, currency, and language preferences.</p>
      <div className="card">
        <Tabs
          size="large"
          items={[
            { key: 'org', label: <span><Landmark size={16} style={{ verticalAlign: -3 }} /> Organization</span>, children: org },
            { key: 'cur', label: <span><CircleDollarSign size={16} style={{ verticalAlign: -3 }} /> Currency</span>, children: currency },
            { key: 'lang', label: <span><Globe size={16} style={{ verticalAlign: -3 }} /> Language</span>, children: language },
          ]}
        />
      </div>
    </div>
  );
}
