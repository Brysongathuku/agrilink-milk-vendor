'use client';

import { useState } from 'react';
import { Button, Checkbox, Input, Table, type TableColumnsType } from 'antd';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/ui';

const MODULES = ['Analytics', 'Market Place', 'Finance', 'Sales & Deliveries', 'Raw Materials', 'Finance & Investment', 'Market Access', 'Farmers', 'Community', 'Compliance', 'Staff & Roles'];
type Perm = { view: boolean; create: boolean; edit: boolean; delete: boolean };

const ROLES: { name: string; users: number; perms: Record<string, Perm> }[] = [
  ['Owner', 1, 'all'],
  ['Admin', 1, 'all'],
  ['Grader', 2, 'Analytics,Raw Materials,Farmers,Compliance'],
  ['Milk bar attendant', 1, 'Sales & Deliveries,Market Place'],
  ['Rider', 2, 'Sales & Deliveries'],
  ['Accounts', 1, 'Analytics,Finance,Finance & Investment,Sales & Deliveries'],
  ['Viewer', 0, 'Analytics'],
].map(([name, users, mods]) => ({
  name: name as string,
  users: users as number,
  perms: Object.fromEntries(
    MODULES.map((m) => {
      const on = mods === 'all' || (mods as string).split(',').includes(m);
      const full = mods === 'all';
      return [m, { view: on, create: on && (full || name !== 'Viewer'), edit: on && (full || name === 'Accounts' || name === 'Grader'), delete: full }];
    }),
  ),
}));

type Row = { module: string } & Perm;

export default function RolesPage() {
  const [sel, setSel] = useState(ROLES[2].name);
  const [q, setQ] = useState('');
  const role = ROLES.find((r) => r.name === sel)!;
  const data: Row[] = MODULES.map((m) => ({ module: m, ...role.perms[m] }));

  const box = (v: boolean) => <Checkbox checked={v} />;
  const cols: TableColumnsType<Row> = [
    { title: 'Module', dataIndex: 'module', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'View', dataIndex: 'view', align: 'center', render: box },
    { title: 'Create', dataIndex: 'create', align: 'center', render: box },
    { title: 'Edit', dataIndex: 'edit', align: 'center', render: box },
    { title: 'Delete', dataIndex: 'delete', align: 'center', render: box },
  ];

  return (
    <div>
      <PageHeader title="ROLES & PROFILE PERMISSIONS" upper boxed={false} actions={<Button type="primary" size="large" icon={<Plus size={18} />}>Create New Role</Button>} />
      <div className="roles-grid">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 className="section-title" style={{ margin: 0 }}>Roles</h3>
            <Button size="small" icon={<Plus size={14} />}>New</Button>
          </div>
          <Input placeholder="Search by role name" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 12 }} />
          {ROLES.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())).map((r) => (
            <div key={r.name} className={`role-list-item ${sel === r.name ? 'selected' : ''}`} onClick={() => setSel(r.name)}>
              <div className="strong">{r.name}</div>
              <div className="muted" style={{ fontSize: 12 }}>{r.users} user{r.users === 1 ? '' : 's'}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 className="section-title">{role.name} · permissions</h3>
          <Table<Row> rowKey="module" columns={cols} dataSource={data} pagination={false} size="middle" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <Button type="primary">Save permissions</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
