'use client';

import { useState } from 'react';
import { App, Button, Form, Input, Select, Space, Tabs } from 'antd';
import { Building2, CircleDollarSign, Globe, Landmark } from 'lucide-react';

export default function AbattoirSettingsPage() {
  const { message } = App.useApp();
  const [dirty, setDirty] = useState(false);
  const [form] = Form.useForm();

  const org = (
    <div className="card" style={{ background: '#fcfcfd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: 18, marginBottom: 20, gap: 12 }}>
        <div>
          <h2 style={{ margin: 0 }}>Organization</h2>
          <p className="muted" style={{ margin: '6px 0 0' }}>Abattoir details, licences and payment settings.</p>
        </div>
        <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid #e5e7eb', display: 'grid', placeItems: 'center', color: '#d1d5db', flexShrink: 0 }}>
          <Landmark size={36} />
        </div>
      </div>
      {dirty && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0fdf7', border: '1px solid #a7e9cf', borderRadius: 10, padding: '12px 20px', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
          <span className="muted">You have unsaved changes</span>
          <Button type="primary" size="large" onClick={() => { setDirty(false); message.success('Changes saved'); }}>Save changes</Button>
        </div>
      )}
      <Form
        form={form}
        layout="vertical"
        onValuesChange={() => setDirty(true)}
        initialValues={{
          name: 'Demo Abattoir Ltd',
          kra: 'P052468013Z',
          code: '+254',
          phone: '700000000',
          email: 'info@abattoir.demo',
          address: 'Garissa, Kenya',
          licence: 'DVS/SLH/GRS/2026/017',
          paybill: '400200',
          species: ['Goat', 'Sheep', 'Cattle', 'Camel'],
        }}
      >
        <div className="card">
          <h4 style={{ marginTop: 0 }}><Building2 size={16} style={{ verticalAlign: -2 }} /> Business</h4>
          <div className="grid-2" style={{ gap: 16 }}>
            <Form.Item name="name" label="Business name"><Input /></Form.Item>
            <Form.Item name="kra" label="KRA PIN"><Input /></Form.Item>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            <Form.Item label="Phone number">
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item name="code" noStyle>
                  <Select style={{ width: '32%' }} options={[{ value: '+254', label: '+254' }, { value: '+971', label: '+971' }, { value: '+966', label: '+966' }]} />
                </Form.Item>
                <Form.Item name="phone" noStyle><Input style={{ width: '68%' }} /></Form.Item>
              </Space.Compact>
            </Form.Item>
            <Form.Item name="email" label="Email"><Input /></Form.Item>
            <Form.Item name="address" label="Location"><Input /></Form.Item>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            <Form.Item name="licence" label="Slaughterhouse licence no."><Input /></Form.Item>
            <Form.Item name="paybill" label="M-Pesa Paybill"><Input /></Form.Item>
            <Form.Item name="species" label="Species handled">
              <Select mode="multiple" options={['Goat', 'Sheep', 'Cattle', 'Camel'].map((s) => ({ value: s, label: s }))} />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );

  const currency = (
    <div style={{ padding: '10px 4px' }}>
      <h2>Currency</h2>
      <p className="muted">Local sales are in KES. Export invoices use the buyer&apos;s currency.</p>
      <Space wrap>
        <Select size="large" defaultValue="KES" style={{ width: 260 }} options={[{ value: 'KES', label: 'Local: KES – Kenyan Shilling' }]} />
        <Select size="large" defaultValue="USD" style={{ width: 260 }} options={[{ value: 'USD', label: 'Export: USD – US Dollar' }, { value: 'AED', label: 'Export: AED – UAE Dirham' }, { value: 'SAR', label: 'Export: SAR – Saudi Riyal' }]} />
      </Space>
    </div>
  );

  const language = (
    <div style={{ padding: '10px 4px' }}>
      <h2>Language Preference</h2>
      <p className="muted">Select your preferred language for the dashboard interface.</p>
      <Select size="large" defaultValue="en" style={{ width: 280, maxWidth: '100%' }} options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }, { value: 'sw', label: 'Kiswahili' }]} />
    </div>
  );

  return (
    <div>
      <h1 className="page-title" style={{ fontWeight: 600 }}>Settings</h1>
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
