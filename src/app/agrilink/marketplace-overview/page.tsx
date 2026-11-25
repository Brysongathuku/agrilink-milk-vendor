'use client';

import Link from 'next/link';
import { Button, Table, type TableColumnsType } from 'antd';
import { ShoppingBag, Package, Truck, Wallet } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { MARKETPLACE_SPEND, PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data';
import { kes } from '@/lib/format';
import { SERIES } from '@/lib/theme';

type Row = (typeof MARKETPLACE_SPEND)[number];

const cols: TableColumnsType<Row> = [
  { title: 'Ref', dataIndex: 'ref' },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Item', dataIndex: 'item', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Qty', dataIndex: 'qty', align: 'right' },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number) => kes(v) },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function MarketplaceOverview() {
  const spend = MARKETPLACE_SPEND.reduce((s, r) => s + r.amount, 0);
  return (
    <div className="stack">
      <PageHeader
        eyebrow="Market Place"
        title="Marketplace Overview"
        subtitle="Buy equipment and supplies for your milk business."
        actions={
          <Link href="/agrilink/products">
            <Button type="primary" size="large" icon={<ShoppingBag size={18} />}>Browse products</Button>
          </Link>
        }
      />
      <Stats>
        <StatCard label="Products available" value={PRODUCTS.length} icon={<Package size={20} color={SERIES.s1} />} foot={`${PRODUCT_CATEGORIES.length} categories`} />
        <StatCard label="Orders this month" value={MARKETPLACE_SPEND.length} icon={<Truck size={20} color={SERIES.s1} />} foot="1 awaiting payment" />
        <StatCard label="Spent this month" value={kes(spend)} icon={<Wallet size={20} color={SERIES.s1} />} foot="Shows in Finance › Ledger" />
        <StatCard label="Top category" value="Handling & Storage" foot="Milk churns, 50 L" />
      </Stats>
      <div className="grid-main">
        <SectionCard title="Recent purchases">
          <Table<Row> rowKey="ref" columns={cols} dataSource={MARKETPLACE_SPEND} pagination={false} />
        </SectionCard>
        <SectionCard title="Shop by category">
          {PRODUCT_CATEGORIES.map((c) => (
            <div className="kv" key={c.name}>
              <span>{c.name}</span>
              <b>{PRODUCTS.filter((p) => p.category === c.name).length} items</b>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}
