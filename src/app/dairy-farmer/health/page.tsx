'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { HEALTH, type HealthEvent } from '@/lib/dairy-data';

const TYPE_COLORS: Record<string, string> = { Treatment: 'red', Breeding: 'purple', Deworming: 'blue', 'Pregnancy check': 'cyan', Calving: 'green', Vaccination: 'gold' };

const cols: TableColumnsType<HealthEvent> = [
  { title: 'Date', dataIndex: 'date' },
  { title: 'Cow', dataIndex: 'cow', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Type', dataIndex: 'type', render: (v: string) => <Tag color={TYPE_COLORS[v] ?? 'default'}>{v}</Tag> },
  { title: 'Details', dataIndex: 'detail' },
  { title: 'Done by', dataIndex: 'by' },
  {
    title: 'Milk withdrawal',
    dataIndex: 'withdrawal',
    render: (v: string) => (v.startsWith('Milk withheld until') ? <Tag color="orange">{v}</Tag> : <span className="muted">{v}</span>),
  },
];

export default function HealthPage() {
  return (
    <ListPage
      eyebrow="Farm Management"
      title="Breeding & Health"
      subtitle="Treatments, vaccinations, AI and calvings for your herd."
      chips={[
        { value: 1, label: 'Cow on treatment' },
        { value: 2, label: 'Calving soon' },
        { value: '01 Dec', label: 'Next vaccination' },
        { value: 2, label: 'Heat checks due' },
      ]}
      addLabel="Record Event"
      searchPlaceholder="Search cow, treatment..."
    >
      {(q) => <Table<HealthEvent> rowKey={(r) => r.date + r.cow} columns={cols} dataSource={HEALTH.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1100 }} />}
    </ListPage>
  );
}
