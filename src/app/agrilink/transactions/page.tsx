'use client';

import { Button, Table, Tabs, Tag, type TableColumnsType } from 'antd';
import { Download, RefreshCw } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { FARMER_RATE, MARKETPLACE_SPEND, MILK_LEDGER } from '@/lib/data';
import { kes, num } from '@/lib/format';

type MilkRow = (typeof MILK_LEDGER)[number];
type SpendRow = (typeof MARKETPLACE_SPEND)[number];

const gross = (r: MilkRow) => (r.status === 'Rejected' ? 0 : r.litres * FARMER_RATE);

const milkCols: TableColumnsType<MilkRow> = [
  { title: 'Date', dataIndex: 'date', render: (v: string, r) => <>{v} <Tag>{r.session}</Tag></> },
  { title: 'Farmer', dataIndex: 'farmer', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Quantity (L)', dataIndex: 'litres', align: 'right' },
  { title: 'Density (g/ml)', dataIndex: 'density', align: 'right', render: (v: number) => v.toFixed(3) },
  {
    title: 'Quality',
    dataIndex: 'grade',
    render: (g: string) => <Tag color={g === 'A' ? 'green' : g === 'B' ? 'gold' : 'red'}>{g === 'Rejected' ? 'Rejected' : `Grade ${g}`}</Tag>,
  },
  { title: 'Gross (KES)', align: 'right', render: (_v, r) => num(gross(r)) },
  { title: 'Input deduction', dataIndex: 'deduction', align: 'right', render: (v: number) => (v ? `− ${num(v)}` : '—') },
  { title: 'Paid to farmer', align: 'right', render: (_v, r) => <b>{kes(Math.max(gross(r) - r.deduction, 0))}</b> },
  { title: 'M-Pesa ref', dataIndex: 'mpesa' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

const spendCols: TableColumnsType<SpendRow> = [
  { title: 'Date', dataIndex: 'date' },
  { title: 'Item', dataIndex: 'item', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Seller', dataIndex: 'seller' },
  { title: 'Qty', dataIndex: 'qty', align: 'right' },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number) => kes(v) },
  { title: 'Method', dataIndex: 'method' },
  { title: 'Reference', dataIndex: 'ref' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function LedgerPage() {
  const accepted = MILK_LEDGER.filter((r) => r.status !== 'Rejected');
  const totalLitres = accepted.reduce((s, r) => s + r.litres, 0);
  const paid = MILK_LEDGER.filter((r) => r.status === 'Paid').reduce((s, r) => s + gross(r) - r.deduction, 0);
  const spend = MARKETPLACE_SPEND.reduce((s, r) => s + r.amount, 0);
  const avgDensity = accepted.reduce((s, r) => s + r.density, 0) / accepted.length;

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Finance"
        title="Milk Transactional Ledger"
        subtitle="Track milk received, farmer payments and marketplace spending."
        boxed={false}
      />
      <Stats>
        <StatCard label="Milk received (accepted)" value={num(totalLitres)} unit="L" foot={`${MILK_LEDGER.length} deliveries · ${MILK_LEDGER.length - accepted.length} rejected`} />
        <StatCard label="Average density" value={avgDensity.toFixed(3)} unit="g/ml" foot="Accepted deliveries" />
        <StatCard label="Paid to farmers" value={kes(paid)} foot={`Rate KES ${FARMER_RATE.toFixed(2)}/L, less input deductions`} />
        <StatCard label="Marketplace spend" value={kes(spend)} foot="Equipment and inputs, this month" />
      </Stats>
      <SectionCard>
        <Tabs
          tabBarExtraContent={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button icon={<RefreshCw size={16} />}>Refresh</Button>
              <Button icon={<Download size={16} />}>CSV</Button>
            </div>
          }
          items={[
            {
              key: 'milk',
              label: 'Milk collections & farmer payments',
              children: <Table<MilkRow> rowKey="ref" columns={milkCols} dataSource={MILK_LEDGER} pagination={false} scroll={{ x: 1100 }} />,
            },
            {
              key: 'spend',
              label: 'Marketplace spend',
              children: <Table<SpendRow> rowKey="ref" columns={spendCols} dataSource={MARKETPLACE_SPEND} pagination={false} scroll={{ x: 900 }} />,
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
