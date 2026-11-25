'use client';

import { Segmented, Table, Tag, type TableColumnsType } from 'antd';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PageHeader, Panel, StatCard, Stats } from '@/components/ui';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { kes } from '@/lib/format';
import { ICON_GREEN, SERIES } from '@/lib/theme';
import { ChartColumn, Receipt } from 'lucide-react';

type BatchRow = { batch: string; species: Species; head: number; purchase: number; transportComm: number; feedVet: number; slaughter: number; overheads: number; revenue: number };

const BATCHES: BatchRow[] = [
  { batch: 'BT-2611-04', species: 'Goat', head: 89, purchase: 783000, transportComm: 70000, feedVet: 0, slaughter: 31150, overheads: 79570, revenue: 1196000 },
  { batch: 'BT-2611-02', species: 'Goat', head: 149, purchase: 1314000, transportComm: 85000, feedVet: 73200, slaughter: 52150, overheads: 133210, revenue: 1879000 },
  { batch: 'BT-2611-01', species: 'Cattle', head: 10, purchase: 993200, transportComm: 66000, feedVet: 38900, slaughter: 20000, overheads: 8940, revenue: 1287000 },
  { batch: 'BT-2610-19', species: 'Sheep', head: 45, purchase: 403200, transportComm: 39000, feedVet: 36400, slaughter: 15750, overheads: 40230, revenue: 593100 },
  { batch: 'BT-2610-17', species: 'Camel', head: 6, purchase: 588000, transportComm: 48000, feedVet: 27600, slaughter: 15000, overheads: 5360, revenue: 790500 },
  { batch: 'BT-2610-15', species: 'Goat', head: 118, purchase: 1041000, transportComm: 72000, feedVet: 51900, slaughter: 41300, overheads: 105490, revenue: 1452000 },
  { batch: 'BT-2610-12', species: 'Cattle', head: 12, purchase: 1180800, transportComm: 70000, feedVet: 41800, slaughter: 24000, overheads: 10730, revenue: 1492000 },
];

const cost = (r: BatchRow) => r.purchase + r.transportComm + r.feedVet + r.slaughter + r.overheads;
const profit = (r: BatchRow) => r.revenue - cost(r);

const cols: TableColumnsType<BatchRow> = [
  { title: 'Batch', dataIndex: 'batch', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Head', dataIndex: 'head', align: 'right' },
  { title: 'Purchase', dataIndex: 'purchase', align: 'right', render: (v: number) => kes(v) },
  { title: 'Transport & commission', dataIndex: 'transportComm', align: 'right', render: (v: number) => kes(v) },
  { title: 'Feed & vet', dataIndex: 'feedVet', align: 'right', render: (v: number) => (v ? kes(v) : '— (direct)') },
  { title: 'Slaughter', dataIndex: 'slaughter', align: 'right', render: (v: number) => kes(v) },
  { title: 'Overheads', dataIndex: 'overheads', align: 'right', render: (v: number) => kes(v) },
  { title: 'Revenue', dataIndex: 'revenue', align: 'right', render: (v: number) => kes(v) },
  { title: 'Profit', align: 'right', render: (_v, r) => <b style={{ color: profit(r) >= 0 ? '#047857' : '#b91c1c' }}>{kes(profit(r))}</b> },
  { title: 'Profit / animal', align: 'right', render: (_v, r) => <b>{kes(Math.round(profit(r) / r.head))}</b> },
  { title: 'Margin', align: 'right', render: (_v, r) => `${((profit(r) / r.revenue) * 100).toFixed(1)}%` },
];

const DAILY = [
  { label: 'Mon', revenue: 812, cost: 690 },
  { label: 'Tue', revenue: 904, cost: 771 },
  { label: 'Wed', revenue: 736, cost: 640 },
  { label: 'Thu', revenue: 988, cost: 832 },
  { label: 'Fri', revenue: 1120, cost: 941 },
  { label: 'Sat', revenue: 930, cost: 795 },
  { label: 'Sun', revenue: 488, cost: 430 },
];
const MONTHLY = [
  { label: 'Jun', revenue: 10.9, cost: 9.4 },
  { label: 'Jul', revenue: 11.8, cost: 10.1 },
  { label: 'Aug', revenue: 12.2, cost: 10.5 },
  { label: 'Sep', revenue: 12.9, cost: 11.0 },
  { label: 'Oct', revenue: 14.7, cost: 12.4 },
  { label: 'Nov', revenue: 16.0, cost: 13.4 },
];

const ONE_GOAT = [
  ['Purchase (29 kg live @ KES 280)', 8120],
  ['Transport & commission', 520],
  ['Feed & vet (6 days)', 380],
  ['Slaughter charges & labour', 350],
  ['Share of overheads', 450],
] as const;

export default function ProfitabilityPage() {
  const [period, setPeriod] = useState<'Daily' | 'Monthly'>('Monthly');
  const totalRev = BATCHES.reduce((s, r) => s + r.revenue, 0);
  const totalProfit = BATCHES.reduce((s, r) => s + profit(r), 0);
  const goatCost = ONE_GOAT.reduce((s, [, v]) => s + v, 0);
  const goatRevenue = 12.6 * 820 + 640; // carcass + offals

  return (
    <div className="stack">
      <PageHeader eyebrow="Finance" title="Cost & Profit" subtitle="See profit by animal, batch, day and month." boxed={false} />
      <Stats>
        <StatCard label="Revenue (last 7 batches)" value={kes(totalRev)} />
        <StatCard label="Profit (last 7 batches)" value={kes(totalProfit)} color="#047857" />
        <StatCard label="Average margin" value={`${((totalProfit / totalRev) * 100).toFixed(1)}%`} />
        <StatCard label="Creditors (unpaid bills)" value={kes(54000)} foot="Hay supplier, due 06 Dec" />
      </Stats>

      <div className="grid-main">
        <Panel icon={<ChartColumn size={20} color={ICON_GREEN} />} title="Revenue vs cost" sub={period === 'Daily' ? 'KES thousands, this week' : 'KES millions, 2026'}>
          <Segmented value={period} options={['Daily', 'Monthly']} onChange={(v) => setPeriod(v as 'Daily' | 'Monthly')} style={{ marginBottom: 12 }} />
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={period === 'Daily' ? DAILY : MONTHLY} margin={{ top: 10, right: 10, left: -16, bottom: 0 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="label" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip formatter={(v) => (period === 'Daily' ? `KES ${v}k` : `KES ${v}M`)} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: '#374151' }} />
                <Bar dataKey="revenue" name="Revenue" fill={SERIES.s1} radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="cost" name="Cost" fill={SERIES.s2} radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel icon={<Receipt size={20} color={ICON_GREEN} />} title="Profit per animal" sub="Example: goat KE-WJR-G-02540">
          {ONE_GOAT.map(([label, v]) => (
            <div className="kv" key={label}><span>{label}</span><b>{kes(v)}</b></div>
          ))}
          <div className="kv"><span className="strong">Total cost</span><b>{kes(goatCost)}</b></div>
          <div className="kv"><span>Revenue (12.6 kg carcass @ KES 820 + offals)</span><b>{kes(Math.round(goatRevenue))}</b></div>
          <div className="kv" style={{ fontSize: 16 }}><span className="strong">Profit</span><b style={{ color: '#047857' }}>{kes(Math.round(goatRevenue - goatCost))}</b></div>
        </Panel>
      </div>

      <Panel title="Profit by batch" bodyStyle={{ padding: 0 }}>
        <Table<BatchRow> rowKey="batch" columns={cols} dataSource={BATCHES} pagination={false} scroll={{ x: 1500 }} />
      </Panel>
    </div>
  );
}
