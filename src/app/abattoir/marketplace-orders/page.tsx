'use client';

import { Table, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';

type Row = { id: string; date: string; items: string; buyer: string; total: number; payment: string; delivery: string };

const ROWS: Row[] = [
  { id: 'MKT-2611-07', date: '23 Nov 2026', items: 'Digital Hanging Scale 300 kg × 2', buyer: 'Abattoir stores', total: 37000, payment: 'Paid', delivery: 'In transit' },
  { id: 'MKT-2611-06', date: '21 Nov 2026', items: 'Ear Tags pack of 100 + applicator × 5', buyer: 'Procurement team', total: 22500, payment: 'Paid', delivery: 'Delivered' },
  { id: 'MKT-2611-05', date: '20 Nov 2026', items: 'Heart-Girth Weigh Band × 30 (for pastoralists)', buyer: 'Pastoralist support', total: 19500, payment: 'Paid', delivery: 'Delivered' },
  { id: 'MKT-2611-04', date: '18 Nov 2026', items: 'Butcher Protective Kit × 6', buyer: 'Slaughter floor', total: 72000, payment: 'Pending', delivery: 'Scheduled' },
  { id: 'MKT-2611-03', date: '14 Nov 2026', items: 'Automatic Vaccination Syringe × 4', buyer: 'Feedlot', total: 11600, payment: 'Paid', delivery: 'Delivered' },
  { id: 'MKT-2611-02', date: '10 Nov 2026', items: 'Core Probe Thermometer × 3', buyer: 'Quality', total: 10500, payment: 'Paid', delivery: 'Delivered' },
  { id: 'MKT-2611-01', date: '04 Nov 2026', items: 'Carcass Hooks & Rail Trolleys, set of 20', buyer: 'Slaughter floor', total: 24000, payment: 'Paid', delivery: 'Delivered' },
];

const cols: TableColumnsType<Row> = [
  { title: 'Order No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Items', dataIndex: 'items' },
  { title: 'Ordered for', dataIndex: 'buyer' },
  { title: 'Total', dataIndex: 'total', align: 'right', render: (v: number) => <b>{kes(v)}</b> },
  { title: 'Payment', dataIndex: 'payment', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Delivery', dataIndex: 'delivery', render: (v: string) => <StatusTag status={v} /> },
];

export default function AbMarketplaceOrders() {
  return (
    <ListPage
      eyebrow="Market Place"
      title="My Orders"
      subtitle="Tools and inputs bought for the abattoir and for supplying pastoralists."
      searchPlaceholder="Search orders..."
    >
      {(q) => <Table<Row> rowKey="id" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 900 }} />}
    </ListPage>
  );
}
