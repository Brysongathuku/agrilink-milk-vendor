'use client';

import { useState } from 'react';
import { App, Button, Form, Input, InputNumber, Modal, Select, Table, type TableColumnsType } from 'antd';
import { Download, Search } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { FARMERS, type Farmer } from '@/lib/data';

export default function FarmersPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Farmer[]>(FARMERS);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const data = rows.filter((r) => `${r.name} ${r.ward} ${r.village} ${r.memberNo}`.toLowerCase().includes(q.toLowerCase()));

  const cols: TableColumnsType<Farmer> = [
    { title: 'Name', dataIndex: 'name', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.phone}</div></> },
    { title: 'Co-op member no.', dataIndex: 'memberNo' },
    { title: 'County', dataIndex: 'county' },
    { title: 'Ward', dataIndex: 'ward' },
    { title: 'Village', dataIndex: 'village' },
    { title: 'Collection route', dataIndex: 'route' },
    { title: 'Cows', dataIndex: 'cows', align: 'right' },
    { title: 'Avg L/day', dataIndex: 'avgDailyLitres', align: 'right' },
    { title: 'Avg density', dataIndex: 'avgDensity', align: 'right', render: (v: number) => v.toFixed(3) },
    { title: 'Last delivery', dataIndex: 'lastDelivery' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
    { title: 'Actions', render: () => <Button size="small">View</Button> },
  ];

  return (
    <div className="stack">
      <PageHeader
        title="FARMERS"
        upper
        boxed={false}
        subtitle="Your milk suppliers: Githunguri Dairy Farmers Co-operative members across Githunguri, Ikinu, Ngewa, Komothai and Githiga wards."
        actions={<Button type="primary" onClick={() => setOpen(true)}>Add Farmer</Button>}
      />
      <SectionCard title="Farmers Records">
        <div className="toolbar">
          <Input size="large" prefix={<Search size={16} color="#9ca3af" />} placeholder="Search farmers..." style={{ maxWidth: 420 }} value={q} onChange={(e) => setQ(e.target.value)} />
          <Button>Filters</Button>
          <div className="spacer" />
          <span className="muted">{data.length} of {rows.length} records</span>
          <Button type="primary" icon={<Download size={16} />}>Export CSV</Button>
        </div>
        <Table<Farmer> rowKey="id" columns={cols} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ x: 1350 }} />
      </SectionCard>

      <Modal
        title="Add New Farmer"
        open={open}
        width={900}
        onCancel={() => setOpen(false)}
        okText="Submit"
        onOk={() =>
          form.validateFields().then((v) => {
            setRows((r) => [
              ...r,
              {
                id: `F-${String(r.length + 1).padStart(3, '0')}`,
                memberNo: v.memberNo ?? '—',
                name: `${v.firstName} ${v.lastName}`,
                phone: v.phone ? `+254 ${v.phone}` : '—',
                gender: v.gender ?? 'Female',
                county: v.county ?? 'Kiambu',
                ward: v.ward ?? '—',
                village: v.village ?? '—',
                cows: v.cows ?? 0,
                avgDailyLitres: v.litres ?? 0,
                avgDensity: 1.028,
                route: v.route ?? '—',
                lastDelivery: '—',
                status: 'Active',
              },
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Farmer added');
          })
        }
      >
        <Form form={form} layout="vertical">
          <h4>Personal Information</h4>
          <div className="grid-3" style={{ gap: 12 }}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}><Input placeholder="Enter first name" /></Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}><Input placeholder="Enter last name" /></Form.Item>
            <Form.Item name="gender" label="Gender"><Select placeholder="Select gender" options={[{ value: 'Female', label: 'Female' }, { value: 'Male', label: 'Male' }]} /></Form.Item>
            <Form.Item name="phone" label="Phone Number"><Input addonBefore="+254" placeholder="712 345 678" /></Form.Item>
            <Form.Item name="email" label="Email"><Input placeholder="Enter email (optional)" /></Form.Item>
            <Form.Item name="memberNo" label="Co-op member no."><Input placeholder="e.g. GDFCS-04418" /></Form.Item>
          </div>
          <h4>Location Details</h4>
          <div className="grid-3" style={{ gap: 12 }}>
            <Form.Item name="county" label="County" initialValue="Kiambu"><Select options={['Kiambu', 'Murang\'a', 'Nyandarua', 'Nakuru', 'Nyeri', 'Laikipia'].map((c) => ({ value: c, label: c }))} /></Form.Item>
            <Form.Item name="ward" label="Ward" rules={[{ required: true }]}><Input placeholder="e.g. Kanjai" /></Form.Item>
            <Form.Item name="village" label="Village"><Input placeholder="e.g. Kanjai" /></Form.Item>
          </div>
          <h4>Dairy Details</h4>
          <div className="grid-3" style={{ gap: 12 }}>
            <Form.Item name="cows" label="Milking cows"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="litres" label="Expected litres / day"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="route" label="Collection route">
              <Select options={['Kanjai Route', 'Ikinu Route', 'Ngewa Route', 'Komothai Route', 'Githiga Route'].map((c) => ({ value: c, label: c }))} />
            </Form.Item>
            <Form.Item name="payout" label="Payment method" initialValue="M-Pesa">
              <Select options={['M-Pesa', 'Bank', 'SACCO account'].map((c) => ({ value: c, label: c }))} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
