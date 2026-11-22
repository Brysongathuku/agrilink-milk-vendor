'use client';

import { useState } from 'react';
import { App, Button, Input, Segmented, Table, Tabs, Tag, type TableColumnsType } from 'antd';
import { Bell, RefreshCw, Search, Settings } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { CATEGORY_COLORS, CUSTOMER_CATEGORIES, type CustomerCategory } from '@/lib/data';

type Opp = { id: string; buyer: string; category: CustomerCategory; need: string; litresPerDay: number; price: number; pricing: 'Firm price' | 'Negotiable'; location: string; frequency: string; status: string };

const OPPS: Opp[] = [
  { id: 'ML-01', buyer: 'Highland Dairies Ltd', category: 'Off-takers/FMCG', need: 'Cooled raw milk, density ≥ 1.027', litresPerDay: 400, price: 66, pricing: 'Firm price', location: 'Ruiru', frequency: 'Daily', status: 'Open' },
  { id: 'ML-02', buyer: 'Summit Fresh Supermarkets', category: 'Supermarkets', need: 'Pasteurised 500 ml pouches', litresPerDay: 150, price: 72, pricing: 'Negotiable', location: 'Githunguri Town', frequency: 'Daily', status: 'Open' },
  { id: 'ML-03', buyer: 'Ruaka Ridge Lodge', category: 'Hotels', need: 'Fresh whole milk, morning drop', litresPerDay: 40, price: 75, pricing: 'Negotiable', location: 'Kanjai', frequency: 'Daily', status: 'Open' },
  { id: 'ML-04', buyer: 'Ikinu Boys High School', category: 'Schools', need: 'Raw milk for boarding (term 1)', litresPerDay: 120, price: 66, pricing: 'Firm price', location: 'Ikinu', frequency: 'School days', status: 'Pending' },
  { id: 'ML-05', buyer: 'Ruiru Estate Residents', category: 'Households', need: 'Doorstep 1–2 L subscriptions', litresPerDay: 60, price: 85, pricing: 'Firm price', location: 'Ruiru', frequency: 'Daily', status: 'Open' },
  { id: 'ML-06', buyer: 'Mlima Foods (yoghurt)', category: 'Off-takers/FMCG', need: 'Raw milk for yoghurt line', litresPerDay: 300, price: 64, pricing: 'Negotiable', location: 'Ruiru Industrial Area', frequency: 'Mon–Sat', status: 'Open' },
  { id: 'ML-07', buyer: 'Kiambu Town Guest House', category: 'Hotels', need: 'Fresh milk + mala', litresPerDay: 15, price: 78, pricing: 'Firm price', location: 'Kiambu Town', frequency: 'Daily', status: 'Accepted' },
];

export default function MarketLinkagesPage() {
  const { message } = App.useApp();
  const [cat, setCat] = useState<'All' | CustomerCategory>('All');
  const [pricing, setPricing] = useState<'All' | 'Firm price' | 'Negotiable'>('All');

  const data = OPPS.filter((o) => (cat === 'All' || o.category === cat) && (pricing === 'All' || o.pricing === pricing));
  const count = (c: 'All' | CustomerCategory) => (c === 'All' ? OPPS.length : OPPS.filter((o) => o.category === c).length);

  const cols: TableColumnsType<Opp> = [
    { title: 'Buyer', dataIndex: 'buyer', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Category', dataIndex: 'category', render: (v: CustomerCategory) => <Tag color={CATEGORY_COLORS[v]}>{v}</Tag> },
    { title: 'Requirement', dataIndex: 'need' },
    { title: 'Quantity', dataIndex: 'litresPerDay', align: 'right', render: (v: number, r) => `${v} L · ${r.frequency}` },
    { title: 'Price', dataIndex: 'price', align: 'right', render: (v: number, r) => <>KES {v}/L<div className="muted" style={{ fontSize: 12 }}>{r.pricing}</div></> },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
    {
      title: 'Action',
      fixed: 'right',
      render: (_v, r) => (
        <Button size="small" type="primary" ghost onClick={() => message.success(`Response sent to ${r.buyer}`)}>
          Respond
        </Button>
      ),
    },
  ];

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Buyer workspace"
        title="Market Opportunities"
        subtitle="Buyer demand for your milk, grouped by the same customer categories you use in Sales."
        boxed={false}
        actions={
          <>
            <Button icon={<Bell size={16} />}>Notifications</Button>
            <Button icon={<Settings size={16} />}>Preferences</Button>
            <Button icon={<RefreshCw size={16} />}>Refresh</Button>
          </>
        }
      />
      <SectionCard>
        <Tabs
          activeKey={cat}
          onChange={(k) => setCat(k as 'All' | CustomerCategory)}
          items={(['All', ...CUSTOMER_CATEGORIES] as ('All' | CustomerCategory)[]).map((c) => ({ key: c, label: `${c === 'All' ? 'Market Feed' : c} (${count(c)})` }))}
        />
        <div className="toolbar">
          <Input prefix={<Search size={16} color="#9ca3af" />} placeholder="Search by buyer, need or location..." style={{ maxWidth: 380 }} />
          <Segmented value={pricing} onChange={(v) => setPricing(v as typeof pricing)} options={['All', 'Firm price', 'Negotiable']} />
        </div>
        <Table<Opp> rowKey="id" columns={cols} dataSource={data} pagination={false} scroll={{ x: 1100 }} />
      </SectionCard>
    </div>
  );
}
