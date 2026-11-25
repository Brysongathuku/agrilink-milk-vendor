'use client';

import { App, Button, Table, type TableColumnsType } from 'antd';
import { Star } from 'lucide-react';
import ListPage, { rowMatches } from '@/components/ListPage';
import { OFFICERS, type Officer } from '@/lib/dairy-data';

export default function ExtensionOfficersPage() {
  const { message } = App.useApp();
  const cols: TableColumnsType<Officer> = [
    { title: 'Name', dataIndex: 'name', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.phone}</div></> },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Area', dataIndex: 'area' },
    { title: 'Last visit', dataIndex: 'lastVisit' },
    { title: 'Rating', dataIndex: 'rating', render: (v: number) => <span style={{ whiteSpace: 'nowrap' }}><Star size={13} fill="#f0a030" color="#f0a030" style={{ verticalAlign: -2 }} /> {v.toFixed(1)}</span> },
    { title: '', render: (_v, r) => <Button size="small" type="primary" ghost onClick={() => message.success(`Visit requested from ${r.name}`)}>Request visit</Button> },
  ];
  return (
    <ListPage title="Extension Officers" subtitle="Vets and advisors who work with your farm." searchPlaceholder="Search name or role...">
      {(q) => <Table<Officer> rowKey="name" columns={cols} dataSource={OFFICERS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 800 }} />}
    </ListPage>
  );
}
