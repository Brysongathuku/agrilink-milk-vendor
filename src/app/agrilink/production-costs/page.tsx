'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { App, Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table, Tag, type TableColumnsType } from 'antd';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { DollarSign, ChartColumn, Plus } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';
import { SERIES } from '@/lib/theme';

const LITRES_THIS_MONTH = 15630;

const COST_TYPES = ['Labour / workers', 'Refrigeration (coolers & fridges)', 'Compliance (KDB, medical, county)', 'Electricity', 'Transport & fuel', 'Packaging', 'Hygiene & testing'] as const;

type Cost = { key: string; period: string; category: string; breakdown: string; total: number; status: string };

const INITIAL: Cost[] = [
  { key: 'c1', period: 'Nov 2026', category: 'Labour / workers', breakdown: '2 graders × 18,000 · 1 milk-bar attendant 15,000 · 2 riders × 12,000', total: 75000, status: 'Paid' },
  { key: 'c2', period: 'Nov 2026', category: 'Refrigeration (coolers & fridges)', breakdown: 'Chiller service 6,500 · Milk ATM maintenance 3,000 · Fridge gas refill 2,800', total: 12300, status: 'Paid' },
  { key: 'c3', period: 'Nov 2026', category: 'Electricity', breakdown: 'KPLC token – chiller, ATM, fridge (≈ 1,050 kWh)', total: 27400, status: 'Paid' },
  { key: 'c4', period: 'Nov 2026', category: 'Compliance (KDB, medical, county)', breakdown: 'KDB levy on volume 3,900 · 3 medical certificates 4,500 · County health permit (monthly share) 1,250', total: 9650, status: 'Pending' },
  { key: 'c5', period: 'Nov 2026', category: 'Transport & fuel', breakdown: 'Van fuel 14,000 · Motorbike fuel 4,200 · Truck hire (bulk) 8,000', total: 26200, status: 'Paid' },
  { key: 'c6', period: 'Nov 2026', category: 'Packaging', breakdown: '5,000 pouches 500 ml · labels', total: 17500, status: 'Pending' },
  { key: 'c7', period: 'Nov 2026', category: 'Hygiene & testing', breakdown: 'SteriScrub 4 × 5 L · alcohol reagent · lactometer replacement', total: 15600, status: 'Paid' },
];

export default function ProductionCostsPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Cost[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const total = rows.reduce((s, r) => s + r.total, 0);
  const chartData = [...rows]
    .sort((a, b) => b.total - a.total)
    .map((r) => ({ name: r.category.split(' (')[0], total: r.total }));

  const cols: TableColumnsType<Cost> = [
    { title: '#', render: (_v, _r, i) => i + 1, width: 50 },
    { title: 'Period', dataIndex: 'period' },
    { title: 'Overhead', dataIndex: 'category', render: (v: string) => <Tag color="green">{v}</Tag> },
    { title: 'Cost Breakdown', dataIndex: 'breakdown', width: 380 },
    { title: 'Total Cost', dataIndex: 'total', align: 'right', sorter: (a, b) => a.total - b.total, render: (v: number) => <b>{kes(v)}</b> },
    { title: 'Per Litre', align: 'right', render: (_v, r) => `KES ${(r.total / LITRES_THIS_MONTH).toFixed(2)}` },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <div className="stack">
      <PageHeader title="Production Cost Analysis" subtitle="Track your running costs." />
      <Stats>
        <StatCard label="Total overheads (Nov)" value={kes(total)} icon={<DollarSign size={20} color={SERIES.s1} />} />
        <StatCard label="Overhead per litre" value={`KES ${(total / LITRES_THIS_MONTH).toFixed(2)}`} icon={<ChartColumn size={20} color={SERIES.s2} />} foot={`${LITRES_THIS_MONTH.toLocaleString()} L collected this month`} />
        <StatCard label="Largest overhead" value="Labour" foot={`${Math.round((75000 / total) * 100)}% of overheads`} />
      </Stats>
      <div className="grid-main">
        <SectionCard>
          <div className="toolbar">
            <DatePicker picker="month" placeholder="Filter by month" defaultValue={dayjs('2026-11-01')} />
            <Select defaultValue="all" style={{ width: 240 }} options={[{ value: 'all', label: 'All overheads' }, ...COST_TYPES.map((c) => ({ value: c, label: c }))]} />
            <div className="spacer" />
            <Button type="primary" icon={<Plus size={16} />} onClick={() => setOpen(true)}>Add Entry</Button>
          </div>
          <Table<Cost> columns={cols} dataSource={rows} pagination={false} scroll={{ x: 1000 }} />
        </SectionCard>
        <SectionCard title="Where the money goes" subtitle="Overheads by type, KES this month">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 16, left: 10, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
                <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} width={110} />
                <Tooltip formatter={(v) => [kes(Number(v)), 'Cost']} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="total" fill={SERIES.s1} radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <Modal
        title="Add overhead entry"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save"
        onOk={() =>
          form.validateFields().then((v) => {
            setRows((r) => [...r, { key: `c${Date.now()}`, period: v.period.format('MMM YYYY'), category: v.category, breakdown: v.breakdown ?? '—', total: v.total, status: 'Pending' }]);
            form.resetFields();
            setOpen(false);
            message.success('Entry added');
          })
        }
      >
        <Form form={form} layout="vertical" initialValues={{ period: dayjs() }}>
          <Form.Item name="period" label="Period" rules={[{ required: true }]}><DatePicker picker="month" style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="category" label="Overhead type" rules={[{ required: true }]}>
            <Select options={COST_TYPES.map((c) => ({ value: c, label: c }))} />
          </Form.Item>
          <Form.Item name="breakdown" label="Breakdown"><Input.TextArea rows={2} placeholder="e.g. 2 graders × 18,000" /></Form.Item>
          <Form.Item name="total" label="Total (KES)" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
