'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatCard, Stats, StatusTag } from '@/components/ui';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { num } from '@/lib/format';

type Row = { id: string; room: string; product: string; species: Species; batch: string; pieces: number; hot: number; cold: number; dateIn: string; useBy: string; temp: number; status: string };

const ROWS: Row[] = [
  { id: 'CS-01', room: 'Chiller 1', product: 'Goat carcass (export)', species: 'Goat', batch: 'BT-2611-04', pieces: 88, hot: 1102, cold: 1079, dateIn: '22 Nov 2026', useBy: '28 Nov 2026', temp: 2.1, status: 'Reserved – ORD-2611-014' },
  { id: 'CS-02', room: 'Chiller 1', product: 'Goat carcass (local)', species: 'Goat', batch: 'BT-2611-02', pieces: 140, hot: 1778, cold: 1741, dateIn: '20 Nov 2026', useBy: '26 Nov 2026', temp: 2.1, status: 'Available' },
  { id: 'CS-03', room: 'Chiller 2', product: 'Beef sides', species: 'Cattle', batch: 'BT-2611-01', pieces: 18, hot: 1729, cold: 1698, dateIn: '21 Nov 2026', useBy: '30 Nov 2026', temp: 5.8, status: 'Temperature alert' },
  { id: 'CS-04', room: 'Chiller 2', product: 'Beef sides', species: 'Cattle', batch: 'BT-2611-03', pieces: 2, hot: 190, cold: 186.6, dateIn: '23 Nov 2026', useBy: '02 Dec 2026', temp: 5.8, status: 'Available' },
  { id: 'CS-05', room: 'Chiller 3', product: 'Mutton carcass', species: 'Sheep', batch: 'BT-2611-06', pieces: 58, hot: 829, cold: 810, dateIn: '23 Nov 2026', useBy: '29 Nov 2026', temp: 1.8, status: 'Reserved – ORD-2611-011' },
  { id: 'CS-06', room: 'Chiller 3', product: 'Camel quarters', species: 'Camel', batch: 'BT-2611-05', pieces: 4, hot: 236, cold: 232.2, dateIn: '21 Nov 2026', useBy: '30 Nov 2026', temp: 1.8, status: 'Available' },
  { id: 'CS-07', room: 'Offal freezer', product: 'Edible offals (mixed)', species: 'Goat', batch: 'Mixed', pieces: 0, hot: 412, cold: 405, dateIn: '22 Nov 2026', useBy: '22 Dec 2026', temp: -18, status: 'Available' },
];

const loss = (r: Row) => ((r.hot - r.cold) / r.hot) * 100;

const cols: TableColumnsType<Row> = [
  { title: 'Room', dataIndex: 'room', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Product', dataIndex: 'product' },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Batch', dataIndex: 'batch' },
  { title: 'Pieces', dataIndex: 'pieces', align: 'right', render: (v: number) => (v ? v : '—') },
  { title: 'Hot weight', dataIndex: 'hot', align: 'right', render: (v: number) => `${num(v, 1)} kg` },
  { title: 'Cold weight', dataIndex: 'cold', align: 'right', render: (v: number) => <b>{num(v, 1)} kg</b> },
  { title: 'Chilling loss', align: 'right', render: (_v, r) => `${loss(r).toFixed(1)}%` },
  { title: 'Date in', dataIndex: 'dateIn' },
  { title: 'Use by', dataIndex: 'useBy' },
  { title: 'Temp', dataIndex: 'temp', align: 'right', render: (v: number) => <span style={{ color: v > 4 ? '#b91c1c' : '#047857', fontWeight: 600 }}>{v} °C</span> },
  { title: 'Status', dataIndex: 'status', render: (v: string) => (v.startsWith('Reserved') ? <Tag color="blue">{v}</Tag> : <StatusTag status={v === 'Temperature alert' ? 'Critical' : 'In stock'} />) },
];

export default function ColdStorePage() {
  const total = ROWS.reduce((s, r) => s + r.cold, 0);
  return (
    <ListPage
      eyebrow="Processing"
      title="Weighing, Chilling & Cold Store"
      subtitle="Carcasses are reweighed after chilling. Chilling loss and stock per room update automatically."
      stats={
        <Stats>
          <StatCard label="Chilled meat in stock" value={num(Math.round(total))} unit="kg" />
          <StatCard label="Reserved for orders" value={num(Math.round(ROWS.filter((r) => r.status.startsWith('Reserved')).reduce((s, r) => s + r.cold, 0)))} unit="kg" />
          <StatCard label="Avg chilling loss" value={(ROWS.reduce((s, r) => s + loss(r), 0) / ROWS.length).toFixed(1) + '%'} />
          <StatCard label="Rooms out of range" value={1} color="#b91c1c" foot="Chiller 2 at 5.8 °C (target 0–4 °C)" />
        </Stats>
      }
      addLabel="Receive into Store"
      searchPlaceholder="Search room, product, batch..."
      note="Chilling loss = (hot weight − cold weight) ÷ hot weight."
    >
      {(q) => <Table<Row> rowKey="id" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1450 }} />}
    </ListPage>
  );
}
