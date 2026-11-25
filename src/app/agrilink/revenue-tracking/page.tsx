'use client';

import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Plus } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats } from '@/components/ui';
import { kes, num } from '@/lib/format';
import { FARMER_RATE } from '@/lib/data';

type Rev = { key: number; product: string; period: string; volume: number; price: number; costPerL: number };

const ROWS: Rev[] = [
  { key: 1, product: 'Bulk raw milk → Off-takers/FMCG', period: 'Nov 2026', volume: 7250, price: 65, costPerL: FARMER_RATE + 8 },
  { key: 2, product: 'Pasteurised 500 ml → Supermarkets', period: 'Nov 2026', volume: 4620, price: 70, costPerL: FARMER_RATE + 13 },
  { key: 3, product: 'Fresh milk → Schools', period: 'Nov 2026', volume: 3480, price: 68, costPerL: FARMER_RATE + 9 },
  { key: 4, product: 'Fresh milk → Hotels', period: 'Nov 2026', volume: 1350, price: 72, costPerL: FARMER_RATE + 9 },
  { key: 5, product: 'Milk ATM retail → Households', period: 'Nov 2026', volume: 1890, price: 80, costPerL: FARMER_RATE + 11 },
  { key: 6, product: 'Mala 500 ml → Households', period: 'Nov 2026', volume: 220, price: 120, costPerL: FARMER_RATE + 22 },
  { key: 7, product: 'Bulk raw milk → Off-takers/FMCG', period: 'Oct 2026', volume: 6980, price: 63, costPerL: FARMER_RATE + 8 },
];

const rev = (r: Rev) => r.volume * r.price;
const gp = (r: Rev) => r.volume * (r.price - r.costPerL);
const margin = (r: Rev) => (gp(r) / rev(r)) * 100;

const cols: TableColumnsType<Rev> = [
  { title: '#', dataIndex: 'key', width: 50 },
  { title: 'Product / Channel', dataIndex: 'product', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Period', dataIndex: 'period' },
  { title: 'Sales Volume', dataIndex: 'volume', align: 'right', render: (v: number) => `${num(v)} L` },
  { title: 'Unit Price', dataIndex: 'price', align: 'right', render: (v: number) => `KES ${v}` },
  { title: 'Revenue', align: 'right', render: (_v, r) => kes(rev(r)) },
  { title: 'Gross Profit', align: 'right', render: (_v, r) => <b>{kes(gp(r))}</b> },
  { title: 'Margin', align: 'right', render: (_v, r) => `${margin(r).toFixed(1)}%` },
  {
    title: 'Performance',
    render: (_v, r) => {
      const m = margin(r);
      return <Tag color={m >= 15 ? 'green' : m >= 8 ? 'gold' : 'red'}>{m >= 15 ? 'Strong' : m >= 8 ? 'Fair' : 'Weak'}</Tag>;
    },
  },
];

export default function RevenuePage() {
  const current = ROWS.filter((r) => r.period === 'Nov 2026');
  const totalRev = current.reduce((s, r) => s + rev(r), 0);
  const totalGp = current.reduce((s, r) => s + gp(r), 0);
  return (
    <div className="stack">
      <PageHeader title="Revenue & Profitability Tracking" subtitle="Track revenue and profit by product" />
      <Stats>
        <StatCard label="Total Revenue (Nov)" value={kes(totalRev)} />
        <StatCard label="Gross Profit (Nov)" value={kes(totalGp)} color="#047857" />
        <StatCard label="Avg. Profit Margin" value={`${((totalGp / totalRev) * 100).toFixed(1)}%`} />
      </Stats>
      <SectionCard>
        <div className="toolbar">
          <Button>Filters</Button>
          <Button>Clear All</Button>
          <div className="spacer" />
          <Button>Download CSV</Button>
          <Button type="primary" icon={<Plus size={16} />}>Add Entry</Button>
        </div>
        <Table<Rev> columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 1100 }} />
      </SectionCard>
    </div>
  );
}
