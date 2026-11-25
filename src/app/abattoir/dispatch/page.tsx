'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { num } from '@/lib/format';

type Row = { id: string; order: string; customer: string; market: 'Local' | 'Export'; destination: string; product: string; kg: number; vehicle: string; driver: string; departure: string; eta: string; temp: number; status: string };

const ROWS: Row[] = [
  { id: 'DSP-2611-041', order: 'ORD-2611-014', customer: 'Al Noor Foods Trading LLC', market: 'Export', destination: 'JKIA cargo terminal (to Dubai)', product: 'Chilled goat carcass', kg: 2400, vehicle: 'Reefer truck KDC 418Y', driver: 'Abdirahman Noor', departure: '26 Nov, 18:00', eta: '27 Nov, 00:30', temp: 1.5, status: 'Scheduled' },
  { id: 'DSP-2611-040', order: 'ORD-2611-013', customer: 'Eastleigh Prime Butchery', market: 'Local', destination: 'Eastleigh, Nairobi', product: 'Goat carcass', kg: 200, vehicle: 'Reefer van KDB 902K', driver: 'Ibrahim Hussein', departure: '24 Nov, 22:00', eta: '25 Nov, 06:00', temp: 2.0, status: 'Scheduled' },
  { id: 'DSP-2611-039', order: 'ORD-2611-010', customer: 'Savannah Grill Hotels', market: 'Local', destination: 'Garissa Town', product: 'Camel meat (deboned)', kg: 180, vehicle: 'Reefer van KDB 902K', driver: 'Ibrahim Hussein', departure: '24 Nov, 08:30', eta: '24 Nov, 09:45', temp: 2.4, status: 'In transit' },
  { id: 'DSP-2611-038', order: 'ORD-2611-009', customer: 'Kiamaiko Meat Traders', market: 'Local', destination: 'Kiamaiko, Nairobi', product: 'Goat carcass', kg: 350, vehicle: 'Reefer truck KDC 418Y', driver: 'Abdirahman Noor', departure: '22 Nov, 21:30', eta: '23 Nov, 05:50', temp: 1.9, status: 'Delivered' },
  { id: 'DSP-2611-037', order: 'ORD-2611-008', customer: 'Garissa University Catering', market: 'Local', destination: 'Garissa University', product: 'Beef (bone-in)', kg: 400, vehicle: 'Reefer van KDB 902K', driver: 'Ibrahim Hussein', departure: '22 Nov, 07:00', eta: '22 Nov, 07:40', temp: 2.6, status: 'Delivered' },
  { id: 'DSP-2611-036', order: 'ORD-2611-006', customer: 'Gulf Fresh Meat Co.', market: 'Export', destination: 'JKIA cargo terminal (to Riyadh)', product: 'Chilled mutton carcass', kg: 1500, vehicle: 'Reefer truck KDC 418Y', driver: 'Abdirahman Noor', departure: '19 Nov, 17:00', eta: '19 Nov, 23:40', temp: 1.4, status: 'Delivered' },
  { id: 'DSP-2611-035', order: 'ORD-2611-005', customer: 'FreshMart Supermarkets', market: 'Local', destination: 'Industrial Area, Nairobi', product: 'Beef quarters', kg: 950, vehicle: 'Reefer truck KDC 418Y', driver: 'Abdirahman Noor', departure: '18 Nov, 20:00', eta: '19 Nov, 04:30', temp: 4.6, status: 'Delivered' },
];

const cols: TableColumnsType<Row> = [
  { title: 'Dispatch No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Order', dataIndex: 'order' },
  { title: 'Customer', dataIndex: 'customer', render: (v: string, r) => <>{v}<div><Tag color={r.market === 'Export' ? 'green' : 'default'} style={{ marginTop: 4 }}>{r.market}</Tag></div></> },
  { title: 'Destination', dataIndex: 'destination' },
  { title: 'Product', dataIndex: 'product' },
  { title: 'Quantity', dataIndex: 'kg', align: 'right', render: (v: number) => `${num(v)} kg` },
  { title: 'Vehicle / driver', render: (_v, r) => <>{r.vehicle}<div className="muted" style={{ fontSize: 12 }}>{r.driver}</div></> },
  { title: 'Departure', dataIndex: 'departure' },
  { title: 'ETA', dataIndex: 'eta' },
  { title: 'Load temp', dataIndex: 'temp', align: 'right', render: (v: number) => <span style={{ color: v > 4 ? '#b45309' : '#047857', fontWeight: 600 }}>{v} °C</span> },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function DispatchPage() {
  return (
    <ListPage
      eyebrow="Dispatch & Export"
      title="Dispatch & Delivery"
      subtitle="Track deliveries to your customers."
      chips={[
        { value: ROWS.filter((r) => r.status !== 'Delivered').length, label: 'Open dispatches' },
        { value: num(ROWS.filter((r) => r.status !== 'Delivered').reduce((s, r) => s + r.kg, 0)) + ' kg', label: 'To deliver' },
        { value: 2, label: 'Reefer vehicles' },
        { value: '100%', label: 'On time (Nov)' },
      ]}
      addLabel="New Dispatch"
      searchPlaceholder="Search dispatch, customer, vehicle..."
    >
      {(q) => <Table<Row> rowKey="id" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1600 }} />}
    </ListPage>
  );
}
