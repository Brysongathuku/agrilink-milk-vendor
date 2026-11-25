'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { DELIVERIES, deliveryValue, type Delivery } from '@/lib/dairy-data';
import { FARMER_RATE } from '@/lib/data';
import { kes } from '@/lib/format';

const cols: TableColumnsType<Delivery> = [
  { title: 'Date', dataIndex: 'date', render: (v: string, r) => <>{v} <Tag>{r.session}</Tag></> },
  { title: 'Delivered to', dataIndex: 'buyer' },
  { title: 'Litres', dataIndex: 'litres', align: 'right', render: (v: number) => <b>{v} L</b> },
  { title: 'Density (g/ml)', dataIndex: 'density', align: 'right', render: (v: number) => v.toFixed(3) },
  { title: 'Grade', dataIndex: 'grade', render: (v: string) => <Tag color={v === 'A' ? 'green' : 'gold'}>Grade {v}</Tag> },
  { title: 'Value', align: 'right', render: (_v, r) => kes(deliveryValue(r), deliveryValue(r) % 1 ? 2 : 0) },
  { title: 'Payment', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'M-Pesa ref', dataIndex: 'mpesa' },
  { title: 'Receipt', dataIndex: 'ref' },
];

export default function MilkRecordsPage() {
  const litres = DELIVERIES.reduce((s, d) => s + d.litres, 0);
  return (
    <ListPage
      eyebrow="Farm Management"
      title="Milk Records"
      subtitle="Every delivery, its quality reading and payment."
      chips={[
        { value: `${litres} L`, label: 'Delivered' },
        { value: '1.029', label: 'Avg density' },
        { value: `KES ${FARMER_RATE.toFixed(2)}`, label: 'Per litre' },
        { value: DELIVERIES.filter((d) => d.status === 'Pending').length, label: 'Awaiting payment' },
      ]}
      addLabel="Record Milking"
      searchPlaceholder="Search date, receipt..."
    >
      {(q) => <Table<Delivery> rowKey="ref" columns={cols} dataSource={DELIVERIES.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1100 }} />}
    </ListPage>
  );
}
