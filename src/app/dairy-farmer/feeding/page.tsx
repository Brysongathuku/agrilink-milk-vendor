'use client';

import { Table, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { FEEDS, type Feed } from '@/lib/dairy-data';
import { kes } from '@/lib/format';

const cols: TableColumnsType<Feed> = [
  { title: 'Feed', dataIndex: 'feed', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Per day', dataIndex: 'perDay' },
  { title: 'Source', dataIndex: 'source' },
  { title: 'Cost / month', dataIndex: 'costPerMonth', align: 'right', render: (v: number) => kes(v) },
  { title: 'In stock', dataIndex: 'stock' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function FeedingPage() {
  const monthly = FEEDS.reduce((s, f) => s + f.costPerMonth, 0);
  const litresPerMonth = 68 * 30;
  return (
    <ListPage
      eyebrow="Farm Management"
      title="Feeding"
      subtitle="What your cows eat each day and what it costs."
      chips={[
        { value: kes(monthly), label: 'Feed cost / month' },
        { value: `KES ${(monthly / litresPerMonth).toFixed(2)}`, label: 'Feed cost / litre' },
        { value: FEEDS.filter((f) => f.status === 'Low stock').length, label: 'Running low' },
        { value: 'Zero-grazing', label: 'System' },
      ]}
      addLabel="Record Feeding"
      searchPlaceholder="Search feed..."
    >
      {(q) => <Table<Feed> rowKey="feed" columns={cols} dataSource={FEEDS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 900 }} />}
    </ListPage>
  );
}
