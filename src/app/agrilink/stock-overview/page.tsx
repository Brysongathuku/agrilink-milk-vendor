'use client';

import { useState } from 'react';
import { App, Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table, type TableColumnsType } from 'antd';
import { FileText, Filter, Plus, RefreshCw, Search } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';

type Stock = { key: number; name: string; quantity: number; unit: string; expiry: string; status: string };

const INITIAL: Stock[] = [
  { key: 1, name: 'Fresh milk (cooled, bulk)', quantity: 480, unit: 'Litres', expiry: '23 Nov 2026', status: 'In stock' },
  { key: 2, name: 'Mala (fermented milk)', quantity: 64, unit: 'Litres', expiry: '28 Nov 2026', status: 'In stock' },
  { key: 3, name: 'Milk pouches 500 ml (empty)', quantity: 1200, unit: 'Pieces', expiry: '—', status: 'In stock' },
  { key: 4, name: 'Dairy meal 70 kg (farmer credit)', quantity: 6, unit: 'Bags', expiry: '15 Feb 2027', status: 'Low stock' },
  { key: 5, name: 'SteriScrub sanitizer', quantity: 2, unit: '5 L jerricans', expiry: '30 Jun 2027', status: 'Low stock' },
  { key: 6, name: 'Lactometer', quantity: 3, unit: 'Pieces', expiry: '—', status: 'In stock' },
  { key: 7, name: 'Alcohol test reagent', quantity: 0, unit: 'Litres', expiry: '—', status: 'Critical' },
];

export default function StockOverview() {
  const { message } = App.useApp();
  const [rows, setRows] = useState(INITIAL);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [form] = Form.useForm();

  const cols: TableColumnsType<Stock> = [
    { title: '#', render: (_v, _r, i) => i + 1, width: 60 },
    { title: 'Product name', dataIndex: 'name', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Quantity', dataIndex: 'quantity', align: 'right' },
    { title: 'Unit', dataIndex: 'unit' },
    { title: 'Expiry date', dataIndex: 'expiry' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  ];

  const data = rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="stack">
      <PageHeader title="Stock overview" subtitle="Track product quantities, units, expiry, and status for your milk business." />
      <SectionCard>
        <div className="toolbar">
          <Input prefix={<Search size={16} color="#9ca3af" />} placeholder="Search by product name..." style={{ maxWidth: 380 }} value={q} onChange={(e) => setQ(e.target.value)} />
          <Button icon={<Filter size={16} />}>Filters</Button>
          <Button icon={<RefreshCw size={16} />}>Refresh</Button>
          <Button icon={<FileText size={16} />}>CSV</Button>
          <div className="spacer" />
          <Button type="primary" size="large" icon={<Plus size={18} />} onClick={() => setOpen(true)}>Add stock</Button>
        </div>
        <div className="muted" style={{ marginBottom: 10 }}>Showing {data.length} of {rows.length} records</div>
        <Table<Stock> columns={cols} dataSource={data} pagination={false} />
      </SectionCard>

      <Modal
        title="Add stock"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save"
        onOk={() =>
          form.validateFields().then((v) => {
            setRows((r) => [
              ...r,
              { key: Date.now(), name: v.name, quantity: v.quantity, unit: v.unit, expiry: v.expiry ? v.expiry.format('DD MMM YYYY') : '—', status: 'In stock' },
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Stock added');
          })
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Product name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="unit" label="Unit" initialValue="Litres">
            <Select options={['Litres', 'Pieces', 'Bags', 'Kg', '5 L jerricans'].map((u) => ({ value: u, label: u }))} />
          </Form.Item>
          <Form.Item name="expiry" label="Expiry date"><DatePicker style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
