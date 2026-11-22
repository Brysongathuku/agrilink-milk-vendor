'use client';

import { Button, Select, Table, Tag, type TableColumnsType } from 'antd';
import { Download, Filter, Plus, RotateCcw } from 'lucide-react';
import { Hero, PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';

type PO = { id: string; chain: string; qty: string; received: string; supplier: string; price: number; priority: string; status: string; eta: string };

const ROWS: PO[] = [
  { id: 'PO-301', chain: 'Raw milk (weekly contract)', qty: '3,500 L', received: '2,980 / 520 L', supplier: 'Kanjai Dairy Farmers Group', price: 182000, priority: 'High', status: 'Pending', eta: '23 Nov 2026' },
  { id: 'PO-302', chain: 'Raw milk (weekly contract)', qty: '1,400 L', received: '1,210 / 190 L', supplier: 'Ikinu Route farmers', price: 72800, priority: 'High', status: 'Pending', eta: '23 Nov 2026' },
  { id: 'PO-303', chain: 'Dairy meal 70 kg', qty: '20 bags', received: '0 / 20', supplier: 'Ngewa Feeds & Vet', price: 62000, priority: 'Medium', status: 'Awaiting supplier', eta: '25 Nov 2026' },
  { id: 'PO-304', chain: 'Milk pouches 500 ml', qty: '5,000 pcs', received: '0 / 5,000', supplier: 'Kiambu Packaging Supplies', price: 17500, priority: 'Low', status: 'Awaiting supplier', eta: '28 Nov 2026' },
  { id: 'PO-305', chain: 'Alcohol test reagent', qty: '5 L', received: '0 / 5 L', supplier: 'Ngewa Feeds & Vet', price: 4500, priority: 'High', status: 'Overdue', eta: '19 Nov 2026' },
  { id: 'PO-306', chain: 'SteriScrub sanitizer', qty: '4 × 5 L', received: '4 / 0', supplier: 'ILRI Dairy Inputs', price: 10000, priority: 'Medium', status: 'Completed', eta: '14 Nov 2026' },
  { id: 'PO-307', chain: 'Raw milk (weekly contract)', qty: '900 L', received: '900 / 0 L', supplier: 'Ngewa Route', price: 46800, priority: 'Medium', status: 'Completed', eta: '16 Nov 2026' },
];

const cols: TableColumnsType<PO> = [
  { title: '#', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Value Chain', dataIndex: 'chain' },
  { title: 'Quantity', dataIndex: 'qty' },
  { title: 'Received / Remaining', dataIndex: 'received' },
  { title: 'Supplier', dataIndex: 'supplier' },
  { title: 'Price', dataIndex: 'price', align: 'right', render: (v: number) => kes(v) },
  { title: 'Priority', dataIndex: 'priority', render: (v: string) => <Tag color={v === 'High' ? 'red' : v === 'Medium' ? 'gold' : 'default'}>{v}</Tag> },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Est. Delivery', dataIndex: 'eta' },
];

export default function ProcurementPage() {
  return (
    <div className="stack">
      <PageHeader eyebrow="AgriLink · Procurement" title="Procurement Planning" subtitle="Plan and monitor milk and input acquisition" boxed={false} />
      <Hero chips={[{ value: ROWS.length, label: 'Orders' }, { value: 2, label: 'Awaiting supplier' }, { value: 2, label: 'To receive' }, { value: 1, label: 'Overdue' }]} />
      <SectionCard>
        <div className="toolbar">
          <Select size="large" defaultValue="all" style={{ width: 220 }} options={[{ value: 'all', label: 'All Priorities' }, { value: 'High', label: 'High' }, { value: 'Medium', label: 'Medium' }, { value: 'Low', label: 'Low' }]} />
          <Button icon={<Filter size={16} />}>Filters</Button>
          <Button icon={<RotateCcw size={16} />}>Reset</Button>
          <Button icon={<Download size={16} />}>Download</Button>
          <div className="spacer" />
          <Button type="primary" size="large" icon={<Plus size={18} />}>New Order</Button>
        </div>
        <Table<PO> rowKey="id" columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 1100 }} />
      </SectionCard>
    </div>
  );
}
