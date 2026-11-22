'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { App, Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table, Tag, type TableColumnsType } from 'antd';
import { RefreshCw, ShoppingCart } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { CATEGORY_COLORS, CUSTOMERS, type CustomerCategory } from '@/lib/data';
import { kes, num } from '@/lib/format';

type Sale = {
  key: string;
  date: string;
  channel: 'Retail' | 'Bulk';
  customer: string;
  category: CustomerCategory;
  product: string;
  litres: number;
  unitPrice: number;
  status: string;
  method: string;
};

const INITIAL: Sale[] = [
  { key: 'S1', date: '21 Nov 2026', channel: 'Bulk', customer: 'Highland Dairies Ltd', category: 'Off-takers/FMCG', product: 'Raw milk (cooled)', litres: 250, unitPrice: 65, status: 'Pending', method: 'Bank transfer' },
  { key: 'S2', date: '21 Nov 2026', channel: 'Bulk', customer: 'Green Valley Supermarket', category: 'Supermarkets', product: 'Pasteurised milk 500 ml', litres: 120, unitPrice: 70, status: 'Deni (credit)', method: 'Invoice' },
  { key: 'S3', date: '21 Nov 2026', channel: 'Retail', customer: 'Walk-in (Milk ATM)', category: 'Households', product: 'Fresh milk (ATM)', litres: 96, unitPrice: 80, status: 'Paid', method: 'M-Pesa Till' },
  { key: 'S4', date: '21 Nov 2026', channel: 'Bulk', customer: 'Githiga Primary School', category: 'Schools', product: 'Raw milk (boiled on site)', litres: 60, unitPrice: 68, status: 'Deni (credit)', method: 'Monthly invoice' },
  { key: 'S5', date: '20 Nov 2026', channel: 'Bulk', customer: 'Kimbo Gardens Hotel', category: 'Hotels', product: 'Fresh milk', litres: 45, unitPrice: 72, status: 'Paid', method: 'M-Pesa Till' },
  { key: 'S6', date: '20 Nov 2026', channel: 'Retail', customer: 'Mama Njeri Household', category: 'Households', product: 'Fresh milk', litres: 3, unitPrice: 80, status: 'Paid', method: 'Cash' },
  { key: 'S7', date: '20 Nov 2026', channel: 'Retail', customer: 'Walk-in (milk bar)', category: 'Households', product: 'Mala 500 ml', litres: 24, unitPrice: 120, status: 'Paid', method: 'M-Pesa Till' },
];

export default function DirectSalesPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Sale[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const litres = Form.useWatch('litres', form) ?? 0;
  const unitPrice = Form.useWatch('unitPrice', form) ?? 0;

  const total = rows.reduce((s, r) => s + r.litres * r.unitPrice, 0);
  const todayTotal = rows.filter((r) => r.date === '21 Nov 2026').reduce((s, r) => s + r.litres * r.unitPrice, 0);

  const cols: TableColumnsType<Sale> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Type', dataIndex: 'channel', render: (v: string) => <Tag color={v === 'Retail' ? 'cyan' : 'geekblue'}>{v}</Tag> },
    { title: 'Customer Name', dataIndex: 'customer', render: (v: string, r) => <><span className="strong">{v}</span><div><Tag color={CATEGORY_COLORS[r.category]} style={{ marginTop: 4 }}>{r.category}</Tag></div></> },
    { title: 'Product Name', dataIndex: 'product' },
    { title: 'Quantity (L)', dataIndex: 'litres', align: 'right' },
    { title: 'Amount', align: 'right', render: (_v, r) => <b>{kes(r.litres * r.unitPrice)}</b> },
    { title: 'Payment Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
    { title: 'Payment Method', dataIndex: 'method' },
  ];

  return (
    <div className="stack">
      <PageHeader
        title="Sales Management"
        subtitle="Track and manage all your milk sales, retail and bulk."
        actions={<Button type="primary" size="large" icon={<ShoppingCart size={18} />} onClick={() => setOpen(true)}>Record New Sale</Button>}
      />
      <Stats>
        <StatCard label="Total Sales" value={kes(total)} />
        <StatCard label="Today's Sales" value={kes(todayTotal)} />
        <StatCard label="Litres sold" value={num(rows.reduce((s, r) => s + r.litres, 0))} unit="L" />
        <StatCard label="Total Records" value={rows.length} />
      </Stats>
      <SectionCard title="Sales Records" extra={<Button icon={<RefreshCw size={16} />}>Refresh</Button>}>
        <Table<Sale> columns={cols} dataSource={rows} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>

      <Modal
        title="Record New Sale"
        open={open}
        width={760}
        onCancel={() => setOpen(false)}
        okText="Record Sale"
        onOk={() =>
          form.validateFields().then((v) => {
            const c = CUSTOMERS.find((x) => x.name === v.customer);
            setRows((r) => [
              {
                key: `S${Date.now()}`,
                date: v.date.format('DD MMM YYYY'),
                channel: v.channel,
                customer: v.customer,
                category: c?.category ?? 'Households',
                product: v.product,
                litres: v.litres,
                unitPrice: v.unitPrice,
                status: v.status,
                method: v.method,
              },
              ...r,
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Sale recorded');
          })
        }
      >
        <Form form={form} layout="vertical" initialValues={{ channel: 'Retail', product: 'Fresh milk', litres: 1, unitPrice: 80, date: dayjs() }}>
          <Form.Item name="customer" label="Customer Name" rules={[{ required: true }]}>
            <Select showSearch placeholder="Search customer name" options={CUSTOMERS.map((c) => ({ value: c.name, label: `${c.name} · ${c.category}` }))} />
          </Form.Item>
          <div className="grid-2" style={{ gap: 12 }}>
            <Form.Item name="channel" label="Type" rules={[{ required: true }]}>
              <Select options={[{ value: 'Retail', label: 'Retail (Milk ATM / bar)' }, { value: 'Bulk', label: 'Bulk (off-taker)' }]} />
            </Form.Item>
            <Form.Item name="product" label="Product" rules={[{ required: true }]}>
              <Select options={['Fresh milk', 'Raw milk (cooled)', 'Pasteurised milk 500 ml', 'Mala 500 ml'].map((p) => ({ value: p, label: p }))} />
            </Form.Item>
            <Form.Item name="litres" label="Quantity (litres)" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="unitPrice" label="Unit price (KES / L)" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="method" label="Payment Method" rules={[{ required: true }]}>
              <Select placeholder="Select payment method" options={['M-Pesa Till', 'Cash', 'Bank transfer', 'Invoice'].map((p) => ({ value: p, label: p }))} />
            </Form.Item>
            <Form.Item name="status" label="Payment Status" rules={[{ required: true }]}>
              <Select placeholder="Select payment status" options={['Paid', 'Pending', 'Deni (credit)'].map((p) => ({ value: p, label: p }))} />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item label="Total Sale"><Input value={kes(Number(litres) * Number(unitPrice))} readOnly /></Form.Item>
          </div>
          <Form.Item name="description" label="Description"><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
