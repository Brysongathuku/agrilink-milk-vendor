'use client';

import { useState } from 'react';
import { App, Button, Form, Input, InputNumber, Modal, Segmented, Select, Table, Tag, type TableColumnsType } from 'antd';
import { RefreshCw, Search, UserPlus } from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/ui';
import { CATEGORY_COLORS, CUSTOMERS, CUSTOMER_CATEGORIES, type Customer, type CustomerCategory } from '@/lib/data';
import { kes } from '@/lib/format';

export default function CustomersPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Customer[]>(CUSTOMERS);
  const [cat, setCat] = useState<'All' | CustomerCategory>('All');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const data = rows.filter(
    (r) => (cat === 'All' || r.category === cat) && `${r.name} ${r.location}`.toLowerCase().includes(q.toLowerCase()),
  );

  const cols: TableColumnsType<Customer> = [
    { title: '#', render: (_v, _r, i) => i + 1, width: 56 },
    { title: 'Customer Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name), render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Category', dataIndex: 'category', render: (v: CustomerCategory) => <Tag color={CATEGORY_COLORS[v]}>{v}</Tag> },
    { title: 'Contact', render: (_v, r) => <>{r.contact}<div className="muted" style={{ fontSize: 12 }}>{r.phone}</div></> },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Avg daily (L)', dataIndex: 'dailyLitres', align: 'right' },
    { title: 'Terms', dataIndex: 'paymentTerms' },
    { title: 'Balance (Deni)', dataIndex: 'balance', align: 'right', render: (v: number) => (v ? <b style={{ color: '#b45309' }}>{kes(v)}</b> : '—') },
    { title: 'Actions', render: () => <Button size="small">View</Button> },
  ];

  return (
    <div className="stack">
      <PageHeader title="Customers" subtitle="Manage your customers and track their purchasing activity." />
      <SectionCard>
        <div className="toolbar">
          <Button icon={<RefreshCw size={16} />}>Refresh</Button>
          <Button type="primary" icon={<UserPlus size={16} />} onClick={() => setOpen(true)}>Add New Customer</Button>
          <div className="spacer" />
          <Input prefix={<Search size={16} color="#9ca3af" />} placeholder="Search customers" style={{ maxWidth: 320 }} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <Segmented
          style={{ marginBottom: 16 }}
          value={cat}
          onChange={(v) => setCat(v as 'All' | CustomerCategory)}
          options={['All', ...CUSTOMER_CATEGORIES]}
        />
        <Table<Customer> rowKey="id" columns={cols} dataSource={data} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>

      <Modal
        title="Add New Customer"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save customer"
        onOk={() =>
          form.validateFields().then((v) => {
            setRows((r) => [...r, { id: `C-${Date.now()}`, balance: 0, paymentTerms: v.paymentTerms ?? 'M-Pesa on delivery', ...v }]);
            form.resetFields();
            setOpen(false);
            message.success('Customer added');
          })
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Customer name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select options={CUSTOMER_CATEGORIES.map((c) => ({ value: c, label: c }))} />
          </Form.Item>
          <Form.Item name="contact" label="Contact person"><Input /></Form.Item>
          <Form.Item name="phone" label="Phone"><Input addonBefore="+254" placeholder="7XX XXX XXX" /></Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="dailyLitres" label="Average litres per day" initialValue={10}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="paymentTerms" label="Payment terms">
            <Select options={['M-Pesa on delivery', '7 days', '14 days', '15 days', 'Monthly (term)'].map((t) => ({ value: t, label: t }))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
