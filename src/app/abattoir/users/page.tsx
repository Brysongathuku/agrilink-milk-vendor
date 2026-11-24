'use client';

import { Button, Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';

type U = { key: number; name: string; email: string; department: string; role: string; financials: boolean; status: string; added: string };

const ROWS: U[] = [
  { key: 1, name: 'Managing Director', email: 'md@abattoir.demo', department: 'Management', role: 'Owner', financials: true, status: 'Active', added: '18 Nov 2026' },
  { key: 2, name: 'Plant Manager', email: 'plant@abattoir.demo', department: 'Production', role: 'Manager', financials: false, status: 'Active', added: '18 Nov 2026' },
  { key: 3, name: 'Stores & Dispatch Officer', email: 'stores@abattoir.demo', department: 'Stores', role: 'Officer', financials: false, status: 'Active', added: '18 Nov 2026' },
  { key: 4, name: 'Accountant', email: 'accounts@abattoir.demo', department: 'Finance', role: 'Manager', financials: true, status: 'Active', added: '18 Nov 2026' },
  { key: 5, name: 'Procurement Officer', email: 'procurement@abattoir.demo', department: 'Procurement', role: 'Officer', financials: false, status: 'Active', added: '19 Nov 2026' },
  { key: 6, name: 'Quality / Meat Inspector', email: 'quality@abattoir.demo', department: 'Quality', role: 'Officer', financials: false, status: 'Invited', added: '22 Nov 2026' },
  { key: 7, name: 'Marketing & Export Lead', email: 'marketing@abattoir.demo', department: 'Marketing', role: 'Manager', financials: false, status: 'Invited', added: '22 Nov 2026' },
];

const cols: TableColumnsType<U> = [
  { title: 'User', dataIndex: 'name', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.email}</div></> },
  { title: 'Department', dataIndex: 'department', render: (v: string) => <Tag color="green">{v}</Tag> },
  { title: 'Role', dataIndex: 'role' },
  { title: 'Sees financial figures', dataIndex: 'financials', render: (v: boolean) => (v ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>) },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Date added', dataIndex: 'added' },
  { title: 'Actions', render: () => <Button size="small">Edit</Button> },
];

export default function AbUsersPage() {
  return (
    <ListPage
      eyebrow="Staff & Roles"
      title="Users"
      subtitle="Staff accounts by department. What each department can open is set on the Department Access page."
      addLabel="Invite New User"
      searchPlaceholder="Search by name, email or department..."
      note="Demo accounts. Names are role titles only."
    >
      {(q) => <Table<U> columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 900 }} />}
    </ListPage>
  );
}
