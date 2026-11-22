'use client';

import { Button, Input, Table, Tag, type TableColumnsType } from 'antd';
import { Plus } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';

type U = { key: number; first: string; last: string; email: string; roles: string[]; status: string; added: string };

const ROWS: U[] = [
  { key: 1, first: 'Bryson', last: 'Gathuku', email: 'bryson@pesira.com', roles: ['Owner', 'Admin'], status: 'Active', added: '01 Aug 2026' },
  { key: 2, first: 'Jane', last: 'Muthoni', email: 'jane.muthoni@milkvendor.co.ke', roles: ['Milk bar attendant'], status: 'Active', added: '04 Aug 2026' },
  { key: 3, first: 'Kevin', last: 'Mwangi', email: 'kevin.mwangi@milkvendor.co.ke', roles: ['Grader'], status: 'Active', added: '12 Aug 2026' },
  { key: 4, first: 'Faith', last: 'Njoki', email: 'faith.njoki@milkvendor.co.ke', roles: ['Grader'], status: 'Active', added: '12 Aug 2026' },
  { key: 5, first: 'Brian', last: 'Otieno', email: 'brian.otieno@milkvendor.co.ke', roles: ['Rider'], status: 'Active', added: '20 Sep 2026' },
  { key: 6, first: 'Mercy', last: 'Wanjiru', email: 'mercy.accounts@milkvendor.co.ke', roles: ['Accounts'], status: 'Invited', added: '18 Nov 2026' },
  { key: 7, first: 'David', last: 'Kamau', email: 'david.kamau@milkvendor.co.ke', roles: ['Rider'], status: 'Inactive', added: '02 Sep 2026' },
];

const cols: TableColumnsType<U> = [
  { title: '#', dataIndex: 'key', width: 50 },
  { title: 'First Name', dataIndex: 'first' },
  { title: 'Last Name', dataIndex: 'last' },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Roles', dataIndex: 'roles', render: (v: string[]) => v.map((r) => <Tag key={r} color="green">{r}</Tag>) },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Date Added', dataIndex: 'added' },
  { title: 'Actions', render: () => <Button size="small">Edit</Button> },
];

export default function UsersPage() {
  return (
    <div className="stack">
      <PageHeader
        title="USERS"
        upper
        boxed={false}
        actions={
          <>
            <Input size="large" placeholder="Search by name or email..." style={{ width: 340 }} />
            <Button type="primary" size="large" icon={<Plus size={18} />}>Invite New User</Button>
          </>
        }
      />
      <SectionCard>
        <Table<U> columns={cols} dataSource={ROWS} pagination={{ pageSize: 10, showTotal: (t) => `Total ${t} users` }} scroll={{ x: 900 }} />
      </SectionCard>
    </div>
  );
}
