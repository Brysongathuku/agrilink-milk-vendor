'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { App, Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table, Tag, TimePicker, type TableColumnsType } from 'antd';
import { MapPin, Plus, RefreshCw, Truck } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { CATEGORY_COLORS, CUSTOMERS, type CustomerCategory } from '@/lib/data';
import { num } from '@/lib/format';
import { SERIES } from '@/lib/theme';

type Delivery = {
  id: string;
  customer: string;
  category: CustomerCategory;
  location: string;
  litres: number;
  date: string;
  time: string;
  rider: string;
  status: string;
};

const INITIAL: Delivery[] = [
  { id: 'DLV-2611-01', customer: 'Highland Dairies Ltd', category: 'Off-takers/FMCG', location: 'Ruiru depot', litres: 250, date: '21 Nov 2026', time: '09:30', rider: 'Truck KDA 412X – Kamau', status: 'Delivered' },
  { id: 'DLV-2611-02', customer: 'Green Valley Supermarket', category: 'Supermarkets', location: 'Githunguri Town, Main Street', litres: 120, date: '21 Nov 2026', time: '07:00', rider: 'Van KCB 908T – Otieno', status: 'Delivered' },
  { id: 'DLV-2611-03', customer: 'Githiga Primary School', category: 'Schools', location: 'Githiga', litres: 60, date: '21 Nov 2026', time: '08:15', rider: 'Motorbike KMEA 221J – Mwangi', status: 'Delivered' },
  { id: 'DLV-2611-04', customer: 'Kimbo Gardens Hotel', category: 'Hotels', location: 'Kambui', litres: 45, date: '21 Nov 2026', time: '14:00', rider: 'Van KCB 908T – Otieno', status: 'In transit' },
  { id: 'DLV-2611-05', customer: 'Kiambu Road Mini-Mart', category: 'Supermarkets', location: 'Kiambu Road', litres: 35, date: '21 Nov 2026', time: '16:30', rider: 'Motorbike KMEA 221J – Mwangi', status: 'Scheduled' },
  { id: 'DLV-2611-06', customer: 'Kanjai Hill Academy', category: 'Schools', location: 'Kanjai', litres: 80, date: '22 Nov 2026', time: '07:30', rider: 'Van KCB 908T – Otieno', status: 'Scheduled' },
  { id: 'DLV-2611-07', customer: 'Mama Njeri Household', category: 'Households', location: "Githunguri Town", litres: 3, date: '22 Nov 2026', time: '06:45', rider: 'Bicycle – Wachira', status: 'Scheduled' },
];

export default function DeliveriesPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Delivery[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const today = rows.filter((r) => r.date === '21 Nov 2026');
  const delivered = today.filter((r) => r.status === 'Delivered').reduce((s, r) => s + r.litres, 0);
  const pending = rows.filter((r) => r.status !== 'Delivered').reduce((s, r) => s + r.litres, 0);

  const cols: TableColumnsType<Delivery> = [
    { title: 'Delivery No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Customer', dataIndex: 'customer' },
    { title: 'Category', dataIndex: 'category', render: (v: CustomerCategory) => <Tag color={CATEGORY_COLORS[v]}>{v}</Tag> },
    { title: 'Location', dataIndex: 'location', render: (v: string) => <span><MapPin size={13} style={{ verticalAlign: -2 }} /> {v}</span> },
    { title: 'Quantity (L)', dataIndex: 'litres', align: 'right' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Time', dataIndex: 'time' },
    { title: 'Vehicle / Rider', dataIndex: 'rider' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Sales"
        title="Deliveries"
        subtitle="Track delivery quantities and drop-off locations for every customer."
        actions={<Button type="primary" size="large" icon={<Plus size={18} />} onClick={() => setOpen(true)}>Schedule Delivery</Button>}
      />
      <Stats>
        <StatCard label="Deliveries today" value={today.length} icon={<Truck size={20} color={SERIES.s1} />} />
        <StatCard label="Delivered today" value={num(delivered)} unit="L" />
        <StatCard label="Pending / in transit" value={num(pending)} unit="L" />
        <StatCard label="Drop-off locations" value={new Set(rows.map((r) => r.location)).size} />
      </Stats>
      <SectionCard title="Delivery schedule" extra={<Button icon={<RefreshCw size={16} />}>Refresh</Button>}>
        <Table<Delivery> rowKey="id" columns={cols} dataSource={rows} pagination={false} scroll={{ x: 1100 }} />
      </SectionCard>

      <Modal
        title="Schedule Delivery"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save"
        onOk={() =>
          form.validateFields().then((v) => {
            const c = CUSTOMERS.find((x) => x.name === v.customer);
            setRows((r) => [
              ...r,
              {
                id: `DLV-2611-${String(r.length + 1).padStart(2, '0')}`,
                customer: v.customer,
                category: c?.category ?? 'Households',
                location: v.location,
                litres: v.litres,
                date: v.date.format('DD MMM YYYY'),
                time: v.time.format('HH:mm'),
                rider: v.rider ?? '—',
                status: 'Scheduled',
              },
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Delivery scheduled');
          })
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ date: dayjs(), time: dayjs().hour(7).minute(0) }}
          onValuesChange={(changed) => {
            if (changed.customer) {
              const c = CUSTOMERS.find((x) => x.name === changed.customer);
              if (c) form.setFieldsValue({ location: c.location, litres: c.dailyLitres });
            }
          }}
        >
          <Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
            <Select showSearch options={CUSTOMERS.map((c) => ({ value: c.name, label: `${c.name} · ${c.category}` }))} />
          </Form.Item>
          <Form.Item name="location" label="Delivery location" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="litres" label="Quantity (litres)" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
          <div className="grid-2" style={{ gap: 12 }}>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="time" label="Time" rules={[{ required: true }]}><TimePicker format="HH:mm" style={{ width: '100%' }} /></Form.Item>
          </div>
          <Form.Item name="rider" label="Vehicle / rider"><Input placeholder="e.g. Van KCB 908T – Otieno" /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
