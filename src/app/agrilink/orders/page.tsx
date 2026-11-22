'use client';

import { Button, Input, Table, type TableColumnsType } from 'antd';
import { Download, RefreshCw, Search } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';

type Order = { id: string; date: string; items: string; seller: string; total: number; payment: string; delivery: string; eta: string };

const ORDERS: Order[] = [
  { id: 'ORD-2611-007', date: '21 Nov 2026', items: 'Dairy Thermometer × 1', seller: 'ILRI Dairy Inputs', total: 2999, payment: 'Pending', delivery: 'Scheduled', eta: '24 Nov 2026' },
  { id: 'ORD-2611-006', date: '19 Nov 2026', items: 'Milk Churn 50 L × 2', seller: 'ILRI Dairy Inputs', total: 33000, payment: 'Paid', delivery: 'In transit', eta: '22 Nov 2026' },
  { id: 'ORD-2611-005', date: '17 Nov 2026', items: 'Lactometer × 2', seller: 'ILRI Dairy Inputs', total: 2200, payment: 'Paid', delivery: 'Delivered', eta: '18 Nov 2026' },
  { id: 'ORD-2611-004', date: '14 Nov 2026', items: 'SteriScrub 5 L × 3', seller: 'ILRI Dairy Inputs', total: 7500, payment: 'Paid', delivery: 'Delivered', eta: '15 Nov 2026' },
  { id: 'ORD-2611-003', date: '10 Nov 2026', items: 'Dairy Meal 70 kg × 10', seller: 'Pesira Partner Store', total: 31000, payment: 'Paid', delivery: 'Delivered', eta: '12 Nov 2026' },
  { id: 'ORD-2611-002', date: '06 Nov 2026', items: 'Milk ATM 50 L × 1', seller: 'ILRI Dairy Inputs', total: 15000, payment: 'Paid', delivery: 'Delivered', eta: '09 Nov 2026' },
  { id: 'ORD-2611-001', date: '03 Nov 2026', items: 'Milk Sieve × 4', seller: 'ILRI Dairy Inputs', total: 4000, payment: 'Paid', delivery: 'Delivered', eta: '04 Nov 2026' },
];

const cols: TableColumnsType<Order> = [
  { title: 'Order No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Items', dataIndex: 'items' },
  { title: 'Seller', dataIndex: 'seller' },
  { title: 'Total', dataIndex: 'total', align: 'right', render: (v: number) => kes(v) },
  { title: 'Payment', dataIndex: 'payment', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Delivery', dataIndex: 'delivery', render: (v: string) => <StatusTag status={v} /> },
  { title: 'ETA', dataIndex: 'eta' },
];

export default function OrdersPage() {
  return (
    <div className="stack">
      <PageHeader eyebrow="Market Place" title="My Orders" subtitle="Equipment and inputs you have ordered from the marketplace." />
      <SectionCard>
        <div className="toolbar">
          <Input prefix={<Search size={16} color="#9ca3af" />} placeholder="Search orders..." style={{ maxWidth: 320 }} />
          <div className="spacer" />
          <Button icon={<RefreshCw size={16} />}>Refresh</Button>
          <Button icon={<Download size={16} />}>CSV</Button>
        </div>
        <Table<Order> rowKey="id" columns={cols} dataSource={ORDERS} pagination={false} scroll={{ x: 900 }} />
      </SectionCard>
    </div>
  );
}
