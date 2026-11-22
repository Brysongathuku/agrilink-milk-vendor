'use client';

import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Plus } from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/ui';

type P = { key: number; name: string; description: string; roles: string[]; modules: number; updated: string };

const ROWS: P[] = [
  { key: 1, name: 'Full access', description: 'Every module, all actions', roles: ['Owner', 'Admin'], modules: 11, updated: '01 Aug 2026' },
  { key: 2, name: 'Collection centre', description: 'Milk intake, grading, lots and farmer records', roles: ['Grader'], modules: 4, updated: '12 Aug 2026' },
  { key: 3, name: 'Retail counter', description: 'Milk ATM and milk-bar sales, receipts', roles: ['Milk bar attendant'], modules: 2, updated: '04 Aug 2026' },
  { key: 4, name: 'Delivery', description: 'Delivery schedule and proof of delivery', roles: ['Rider'], modules: 1, updated: '20 Sep 2026' },
  { key: 5, name: 'Finance', description: 'Ledger, invoices, receipts, production costs', roles: ['Accounts'], modules: 4, updated: '18 Nov 2026' },
  { key: 6, name: 'Compliance officer', description: 'KDB documents and medical certificates', roles: [], modules: 1, updated: '18 Nov 2026' },
  { key: 7, name: 'Read only', description: 'Dashboard view only', roles: ['Viewer'], modules: 1, updated: '01 Aug 2026' },
];

const cols: TableColumnsType<P> = [
  { title: 'Profile', dataIndex: 'name', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Description', dataIndex: 'description' },
  { title: 'Assigned roles', dataIndex: 'roles', render: (v: string[]) => (v.length ? v.map((r) => <Tag key={r} color="green">{r}</Tag>) : <span className="muted">—</span>) },
  { title: 'Modules', dataIndex: 'modules', align: 'right' },
  { title: 'Last updated', dataIndex: 'updated' },
  { title: 'Actions', render: () => <Button size="small">Edit</Button> },
];

export default function PermissionProfilesPage() {
  return (
    <div className="stack">
      <PageHeader title="PERMISSION PROFILES" upper boxed={false} actions={<Button type="primary" size="large" icon={<Plus size={18} />}>New Profile</Button>} />
      <SectionCard>
        <Table<P> columns={cols} dataSource={ROWS} pagination={false} />
      </SectionCard>
    </div>
  );
}
