'use client';

import { useState } from 'react';
import { Segmented, Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { COWS, type Cow, type CowStatus } from '@/lib/dairy-data';

const STATUS_COLORS: Record<CowStatus, string> = { Milking: 'green', Dry: 'default', 'In-calf heifer': 'purple', Heifer: 'blue', Calf: 'cyan' };

const cols: TableColumnsType<Cow> = [
  { title: 'Cow', dataIndex: 'name', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.tag}</div></> },
  { title: 'Breed', dataIndex: 'breed' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Status', dataIndex: 'status', render: (v: CowStatus) => <Tag color={STATUS_COLORS[v]}>{v}</Tag> },
  { title: 'Lactation', dataIndex: 'lactation', align: 'right', render: (v: number) => (v ? v : '—') },
  { title: 'Days in milk', dataIndex: 'daysInMilk', align: 'right', render: (v: number) => (v ? v : '—') },
  { title: 'Milk / day', dataIndex: 'litres', align: 'right', render: (v: number) => (v ? <b>{v} L</b> : '—') },
  { title: 'Last calving', dataIndex: 'lastCalving' },
  { title: 'Next', dataIndex: 'nextEvent' },
  { title: 'Health', dataIndex: 'health', render: (v: string) => <StatusTag status={v === 'Healthy' ? 'Healthy' : 'On hold'} /> },
];

export default function HerdPage() {
  const [filter, setFilter] = useState<'All' | CowStatus>('All');
  const milking = COWS.filter((c) => c.status === 'Milking');
  return (
    <ListPage
      eyebrow="Farm Management"
      title="My Herd"
      subtitle="Your cows, their milk and what's coming up for each."
      chips={[
        { value: COWS.length, label: 'Animals' },
        { value: milking.length, label: 'Milking' },
        { value: `${milking.reduce((s, c) => s + c.litres, 0)} L`, label: 'Milk a day' },
        { value: 2, label: 'Calving soon' },
      ]}
      addLabel="Add Animal"
      searchPlaceholder="Search name, tag, breed..."
      toolbarExtra={<Segmented value={filter} onChange={(v) => setFilter(v as 'All' | CowStatus)} options={['All', 'Milking', 'Dry', 'In-calf heifer', 'Heifer', 'Calf']} />}
    >
      {(q) => <Table<Cow> rowKey="tag" columns={cols} dataSource={COWS.filter((r) => (filter === 'All' || r.status === filter) && rowMatches(r, q))} pagination={false} scroll={{ x: 1200 }} />}
    </ListPage>
  );
}
