'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { App, DatePicker, Form, Input, InputNumber, Modal, Select, Table, Tag, type TableColumnsType } from 'antd';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ListPage, { rowMatches } from '@/components/ListPage';
import { SectionCard, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';
import { SERIES } from '@/lib/theme';

const CATEGORIES = ['County fees', 'Vet inspection fees', 'NEMA waste disposal', 'Electricity', 'Water', 'Fuel', 'Maintenance', 'Cleaning & detergent', 'Hay feed'] as const;

type Exp = { key: string; date: string; category: string; description: string; payee: string; amount: number; status: string };

const INITIAL: Exp[] = [
  { key: 'e1', date: '24 Nov 2026', category: 'Vet inspection fees', description: 'Meat inspection, 94 head', payee: 'County Veterinary Department', amount: 9400, status: 'Paid' },
  { key: 'e2', date: '23 Nov 2026', category: 'Fuel', description: 'Reefer truck KDC 418Y, Garissa–Nairobi return', payee: 'Total Energies, Garissa', amount: 38500, status: 'Paid' },
  { key: 'e3', date: '22 Nov 2026', category: 'Hay feed', description: '120 bales Rhodes grass hay', payee: 'Bura Irrigation Farmers', amount: 54000, status: 'Pending' },
  { key: 'e4', date: '20 Nov 2026', category: 'Electricity', description: 'Chillers, lighting, saws (Nov token)', payee: 'Kenya Power', amount: 186000, status: 'Paid' },
  { key: 'e5', date: '18 Nov 2026', category: 'NEMA waste disposal', description: 'Effluent & blood waste collection', payee: 'Licensed waste handler', amount: 42000, status: 'Paid' },
  { key: 'e6', date: '15 Nov 2026', category: 'County fees', description: 'Slaughter cess & livestock movement fees', payee: 'County Government of Garissa', amount: 61500, status: 'Paid' },
  { key: 'e7', date: '12 Nov 2026', category: 'Cleaning & detergent', description: 'Detergents, sanitiser, protective gear', payee: 'Pesira Partner Store', amount: 23800, status: 'Paid' },
  { key: 'e8', date: '10 Nov 2026', category: 'Water', description: 'Borehole water, Nov', payee: 'Garissa Water & Sewerage Co.', amount: 28700, status: 'Paid' },
  { key: 'e9', date: '06 Nov 2026', category: 'Maintenance', description: 'Chiller 2 compressor service', payee: 'Coldchain Engineering Ltd', amount: 47000, status: 'Paid' },
];

export default function ExpensesPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Exp[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const total = rows.reduce((s, r) => s + r.amount, 0);
  const byCat = CATEGORIES.map((c) => ({ name: c, total: rows.filter((r) => r.category === c).reduce((s, r) => s + r.amount, 0) }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  const cols: TableColumnsType<Exp> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Category', dataIndex: 'category', render: (v: string) => <Tag color="green">{v}</Tag> },
    { title: 'Description', dataIndex: 'description' },
    { title: 'Paid to', dataIndex: 'payee' },
    { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number) => <b>{kes(v)}</b> },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  ];

  return (
    <>
      <ListPage
        eyebrow="Finance"
        title="Operating Expenses"
        subtitle="County fees, vet inspection, NEMA waste disposal, electricity, water, fuel, maintenance, cleaning and hay feed."
        chips={[
          { value: kes(total), label: 'Expenses (Nov)' },
          { value: kes(Math.round(total / 699)), label: 'Overhead / animal' },
          { value: rows.filter((r) => r.status === 'Pending').length, label: 'Unpaid bills' },
          { value: byCat[0]?.name ?? '—', label: 'Largest cost' },
        ]}
        addLabel="Add Expense"
        onAdd={() => setOpen(true)}
        searchPlaceholder="Search expenses..."
        note="Overhead per animal = November expenses ÷ 699 animals slaughtered. It is added to each animal's cost on the Cost & Profit page."
      >
        {(q) => (
          <div className="grid-main">
            <Table<Exp> rowKey="key" columns={cols} dataSource={rows.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 900 }} />
            <SectionCard title="By category" subtitle="KES, November" style={{ padding: 0, border: 0 }}>
              <div style={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byCat} layout="vertical" margin={{ top: 0, right: 16, left: 10, bottom: 0 }}>
                    <CartesianGrid horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
                    <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} width={120} />
                    <Tooltip formatter={(v) => [kes(Number(v)), 'Spent']} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Bar dataKey="total" fill={SERIES.s1} radius={[0, 4, 4, 0]} maxBarSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </div>
        )}
      </ListPage>

      <Modal
        title="Add expense"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save"
        onOk={() =>
          form.validateFields().then((v) => {
            setRows((r) => [{ key: `e${Date.now()}`, date: v.date.format('DD MMM YYYY'), category: v.category, description: v.description ?? '—', payee: v.payee ?? '—', amount: v.amount, status: 'Pending' }, ...r]);
            form.resetFields();
            setOpen(false);
            message.success('Expense added');
          })
        }
      >
        <Form form={form} layout="vertical" initialValues={{ date: dayjs() }}>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}><Select options={CATEGORIES.map((c) => ({ value: c, label: c }))} /></Form.Item>
          <Form.Item name="description" label="Description"><Input /></Form.Item>
          <Form.Item name="payee" label="Paid to"><Input /></Form.Item>
          <Form.Item name="amount" label="Amount (KES)" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
        </Form>
      </Modal>
    </>
  );
}
