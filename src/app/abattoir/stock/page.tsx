'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { num } from '@/lib/format';

type Live = { species: Species; feedlot: number; lairage: number };
const LIVE: Live[] = [
  { species: 'Goat', feedlot: 119, lairage: 0 },
  { species: 'Sheep', feedlot: 0, lairage: 60 },
  { species: 'Cattle', feedlot: 0, lairage: 7 },
  { species: 'Camel', feedlot: 8, lairage: 0 },
];

type Meat = { item: string; species: Species | 'Mixed'; kg: number; reserved: number; room: string };
const MEAT: Meat[] = [
  { item: 'Goat carcasses', species: 'Goat', kg: 2820, reserved: 1079, room: 'Chiller 1' },
  { item: 'Beef sides', species: 'Cattle', kg: 1885, reserved: 0, room: 'Chiller 2' },
  { item: 'Mutton carcasses', species: 'Sheep', kg: 810, reserved: 810, room: 'Chiller 3' },
  { item: 'Camel quarters', species: 'Camel', kg: 232, reserved: 0, room: 'Chiller 3' },
  { item: 'Edible offals', species: 'Mixed', kg: 456, reserved: 0, room: 'Offal freezer' },
];

type Supply = { item: string; qty: number; unit: string; reorder: number };
const SUPPLIES: Supply[] = [
  { item: 'Rhodes grass hay', qty: 102, unit: 'bales', reorder: 40 },
  { item: 'Goat pellets', qty: 260, unit: 'kg', reorder: 300 },
  { item: 'PPR vaccine', qty: 300, unit: 'doses', reorder: 100 },
  { item: 'Dewormer', qty: 4, unit: 'litres', reorder: 5 },
  { item: 'Ear tags', qty: 480, unit: 'pieces', reorder: 200 },
];

const liveCols: TableColumnsType<Live> = [
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Feedlot', dataIndex: 'feedlot', align: 'right' },
  { title: 'Lairage', dataIndex: 'lairage', align: 'right' },
  { title: 'Total head', align: 'right', render: (_v, r) => <b>{r.feedlot + r.lairage}</b> },
];

const meatCols: TableColumnsType<Meat> = [
  { title: 'Item', dataIndex: 'item', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Room', dataIndex: 'room' },
  { title: 'In stock', dataIndex: 'kg', align: 'right', render: (v: number) => `${num(v)} kg` },
  { title: 'Reserved', dataIndex: 'reserved', align: 'right', render: (v: number) => (v ? `${num(v)} kg` : '—') },
  { title: 'Available', align: 'right', render: (_v, r) => <b>{num(r.kg - r.reserved)} kg</b> },
];

const supplyCols: TableColumnsType<Supply> = [
  { title: 'Item', dataIndex: 'item', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'In stock', align: 'right', render: (_v, r) => `${num(r.qty)} ${r.unit}` },
  { title: 'Reorder at', align: 'right', render: (_v, r) => `${num(r.reorder)} ${r.unit}` },
  { title: 'Status', render: (_v, r) => <StatusTag status={r.qty <= r.reorder ? 'Low stock' : 'In stock'} /> },
];

export default function StockBalancesPage() {
  const head = LIVE.reduce((s, r) => s + r.feedlot + r.lairage, 0);
  const meat = MEAT.filter((m) => m.species !== 'Mixed').reduce((s, m) => s + m.kg, 0);
  const offal = MEAT.filter((m) => m.species === 'Mixed').reduce((s, m) => s + m.kg, 0);
  return (
    <div className="stack">
      <PageHeader eyebrow="Stores" title="Stock Balances" subtitle="Everything you have in stock today." boxed={false} />
      <Stats>
        <StatCard label="Live animals" value={head} unit="head" />
        <StatCard label="Carcass meat" value={num(meat)} unit="kg" />
        <StatCard label="Offals" value={num(offal)} unit="kg" />
        <StatCard label="Supplies below reorder level" value={SUPPLIES.filter((s) => s.qty <= s.reorder).length} color="#b45309" />
      </Stats>
      <div className="grid-2">
        <SectionCard title="Live animals">
          <Table<Live> rowKey="species" columns={liveCols} dataSource={LIVE} pagination={false} size="middle" />
        </SectionCard>
        <SectionCard title="Feed & vet supplies">
          <Table<Supply> rowKey="item" columns={supplyCols} dataSource={SUPPLIES} pagination={false} size="middle" scroll={{ x: 480 }} />
        </SectionCard>
      </div>
      <SectionCard title="Meat & offals">
        <Table<Meat> rowKey="item" columns={meatCols} dataSource={MEAT} pagination={false} size="middle" scroll={{ x: 640 }} />
      </SectionCard>
    </div>
  );
}
