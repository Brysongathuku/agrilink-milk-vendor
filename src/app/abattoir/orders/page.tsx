'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { App, DatePicker, Form, Input, InputNumber, Modal, Select, Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { AB_CUSTOMERS, SPECIES, SPECIES_COLORS, SPECIES_INFO, type Species } from '@/lib/abattoir-data';
import { num } from '@/lib/format';

type Order = { id: string; customer: string; market: 'Local' | 'Export'; species: Species; product: string; kg: number; delivery: string; terms: string; status: string };

const INITIAL: Order[] = [
  { id: 'ORD-2611-014', customer: 'Al Noor Foods Trading LLC', market: 'Export', species: 'Goat', product: 'Chilled goat carcass', kg: 2400, delivery: '27 Nov 2026, 02:00 (JKIA)', terms: '30 days', status: 'Scheduled' },
  { id: 'ORD-2611-013', customer: 'Eastleigh Prime Butchery', market: 'Local', species: 'Goat', product: 'Goat carcass', kg: 200, delivery: '25 Nov 2026, 06:00', terms: '14 days', status: 'Pending' },
  { id: 'ORD-2611-012', customer: 'FreshMart Supermarkets', market: 'Local', species: 'Cattle', product: 'Beef quarters', kg: 1200, delivery: '26 Nov 2026, 07:30', terms: '30 days', status: 'Pending' },
  { id: 'ORD-2611-011', customer: 'Gulf Fresh Meat Co.', market: 'Export', species: 'Sheep', product: 'Chilled mutton carcass', kg: 1600, delivery: '29 Nov 2026, 01:30 (JKIA)', terms: '14 days', status: 'Scheduled' },
  { id: 'ORD-2611-010', customer: 'Savannah Grill Hotels', market: 'Local', species: 'Camel', product: 'Camel meat (deboned)', kg: 180, delivery: '24 Nov 2026, 10:00', terms: '30 days', status: 'In transit' },
  { id: 'ORD-2611-009', customer: 'Kiamaiko Meat Traders', market: 'Local', species: 'Goat', product: 'Goat carcass', kg: 350, delivery: '23 Nov 2026, 06:00', terms: '14 days', status: 'Delivered' },
  { id: 'ORD-2611-008', customer: 'Garissa University Catering', market: 'Local', species: 'Cattle', product: 'Beef (bone-in)', kg: 400, delivery: '22 Nov 2026, 08:00', terms: '30 days', status: 'Delivered' },
];

const liveKg = (o: Order) => o.kg / SPECIES_INFO[o.species].yield;
const head = (o: Order) => Math.ceil(liveKg(o) / SPECIES_INFO[o.species].avgLive);

export default function ClientOrders() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Order[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const cols: TableColumnsType<Order> = [
    { title: 'Order No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Customer', dataIndex: 'customer', render: (v: string, r) => <>{v}<div><Tag color={r.market === 'Export' ? 'green' : 'default'} style={{ marginTop: 4 }}>{r.market}</Tag></div></> },
    { title: 'Product', dataIndex: 'product', render: (v: string, r) => <>{v}<div><Tag color={SPECIES_COLORS[r.species]} style={{ marginTop: 4 }}>{r.species}</Tag></div></> },
    { title: 'Meat ordered', dataIndex: 'kg', align: 'right', render: (v: number) => `${num(v)} kg` },
    { title: 'Expected yield', align: 'right', render: (_v, r) => `${Math.round(SPECIES_INFO[r.species].yield * 100)}%` },
    { title: 'Live weight needed', align: 'right', render: (_v, r) => <b>{num(Math.round(liveKg(r)))} kg</b> },
    { title: 'Animals needed', align: 'right', render: (_v, r) => `≈ ${num(head(r))} head` },
    { title: 'Delivery', dataIndex: 'delivery' },
    { title: 'Credit terms', dataIndex: 'terms' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <>
      <ListPage
        eyebrow="Orders & Planning"
        title="Client Orders"
        subtitle="Track client orders and the animals needed to fill them."
        chips={[
          { value: rows.length, label: 'Orders' },
          { value: rows.filter((r) => r.market === 'Export').length, label: 'Export' },
          { value: num(rows.filter((r) => r.status !== 'Delivered').reduce((s, r) => s + r.kg, 0)) + ' kg', label: 'Meat to supply' },
          { value: num(rows.filter((r) => r.status !== 'Delivered').reduce((s, r) => s + head(r), 0)), label: 'Animals to source' },
        ]}
        addLabel="New Order"
        onAdd={() => setOpen(true)}
        searchPlaceholder="Search orders, customers, species..."
      >
        {(q) => <Table<Order> rowKey="id" columns={cols} dataSource={rows.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1300 }} />}
      </ListPage>

      <Modal
        title="New Client Order"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save order"
        onOk={() =>
          form.validateFields().then((v) => {
            const c = AB_CUSTOMERS.find((x) => x.name === v.customer);
            setRows((r) => [
              {
                id: `ORD-2611-${String(15 + r.length - INITIAL.length).padStart(3, '0')}`,
                customer: v.customer,
                market: c?.type === 'Export buyers' ? 'Export' : 'Local',
                species: v.species,
                product: v.product,
                kg: v.kg,
                delivery: v.date.format('DD MMM YYYY, HH:mm'),
                terms: v.terms,
                status: 'Pending',
              },
              ...r,
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Order saved');
          })
        }
      >
        <Form form={form} layout="vertical" initialValues={{ species: 'Goat', kg: 200, terms: '14 days', product: 'Goat carcass', date: dayjs().add(2, 'day').hour(6).minute(0) }}>
          <Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
            <Select showSearch options={AB_CUSTOMERS.map((c) => ({ value: c.name, label: `${c.name} · ${c.type}` }))} />
          </Form.Item>
          <div className="grid-2" style={{ gap: 12 }}>
            <Form.Item name="species" label="Species" rules={[{ required: true }]}>
              <Select options={SPECIES.map((s) => ({ value: s, label: s }))} />
            </Form.Item>
            <Form.Item name="product" label="Product" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="kg" label="Meat ordered (kg)" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="terms" label="Credit terms">
              <Select options={['Cash on delivery', '14 days', '30 days'].map((t) => ({ value: t, label: t }))} />
            </Form.Item>
          </div>
          <Form.Item name="date" label="Delivery date & time" rules={[{ required: true }]}>
            <DatePicker showTime={{ format: 'HH:mm' }} format="DD MMM YYYY HH:mm" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
