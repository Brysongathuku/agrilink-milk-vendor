'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { num } from '@/lib/format';

type Row = { key: string; slaughter: string; order: string; customer: string; species: Species; kg: number; needed: number; reserved: number; from: string; delivery: string; status: string };

const ROWS: Row[] = [
  { key: 's1', slaughter: '24 Nov, 14:00', order: 'ORD-2611-013', customer: 'Eastleigh Prime Butchery', species: 'Goat', kg: 200, needed: 16, reserved: 16, from: 'BT-2611-08 · Lairage A', delivery: '25 Nov, 06:00', status: 'Completed' },
  { key: 's2', slaughter: '25 Nov, 13:00', order: 'ORD-2611-014', customer: 'Al Noor Foods Trading LLC', species: 'Goat', kg: 2400, needed: 186, reserved: 120, from: 'BT-2611-07 · Pens 1–2', delivery: '27 Nov, 02:00 (JKIA)', status: 'Short' },
  { key: 's3', slaughter: '25 Nov, 15:00', order: 'ORD-2611-012', customer: 'FreshMart Supermarkets', species: 'Cattle', kg: 1200, needed: 7, reserved: 7, from: 'BT-2611-03 · Lairage A', delivery: '26 Nov, 07:30', status: 'Scheduled' },
  { key: 's4', slaughter: '27 Nov, 13:00', order: 'ORD-2611-011', customer: 'Gulf Fresh Meat Co.', species: 'Sheep', kg: 1600, needed: 111, reserved: 60, from: 'BT-2611-06 · Lairage B', delivery: '29 Nov, 01:30 (JKIA)', status: 'Short' },
];

const cols: TableColumnsType<Row> = [
  { title: 'Slaughter', dataIndex: 'slaughter', render: (v: string) => <span className="strong" style={{ whiteSpace: 'nowrap' }}>{v}</span> },
  { title: 'Order', dataIndex: 'order', render: (v: string, r) => <>{v}<div className="muted" style={{ fontSize: 12 }}>{r.customer}</div></> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Meat', dataIndex: 'kg', align: 'right', render: (v: number) => `${num(v)} kg` },
  { title: 'Animals needed', dataIndex: 'needed', align: 'right' },
  {
    title: 'Reserved',
    dataIndex: 'reserved',
    align: 'right',
    render: (v: number, r) => (
      <span style={{ fontWeight: 600, color: v < r.needed ? '#b45309' : '#047857' }}>
        {v}
        {v < r.needed && <span style={{ fontWeight: 400 }}> ({r.needed - v} short)</span>}
      </span>
    ),
  },
  { title: 'Reserved from', dataIndex: 'from' },
  { title: 'Delivery', dataIndex: 'delivery' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => (v === 'Short' ? <Tag color="orange">Need more animals</Tag> : <StatusTag status={v} />) },
];

export default function SlaughterSchedulePage() {
  const short = ROWS.reduce((s, r) => s + Math.max(r.needed - r.reserved, 0), 0);
  return (
    <ListPage
      eyebrow="Orders & Planning"
      title="Slaughter Schedule"
      subtitle="Plan slaughter days around your orders and reserve the animals for each one."
      chips={[
        { value: ROWS.filter((r) => r.status !== 'Completed').length, label: 'Upcoming' },
        { value: ROWS.filter((r) => r.status !== 'Completed').reduce((s, r) => s + r.needed, 0), label: 'Animals needed' },
        { value: short, label: 'Still to buy' },
        { value: '25 Nov', label: 'Next slaughter' },
      ]}
      addLabel="Schedule Slaughter"
      searchPlaceholder="Search order, customer..."
    >
      {(q) => <Table<Row> rowKey="key" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1200 }} />}
    </ListPage>
  );
}
