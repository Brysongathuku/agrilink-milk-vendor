'use client';

import { useState } from 'react';
import { Button, Segmented, Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { AB_CUSTOMERS, CUSTOMER_TYPES, CUSTOMER_TYPE_COLORS, type AbCustomer, type CustomerType } from '@/lib/abattoir-data';
import { num } from '@/lib/format';

const cols: TableColumnsType<AbCustomer> = [
  { title: 'Customer', dataIndex: 'name', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.contact}</div></> },
  { title: 'Type', dataIndex: 'type', render: (v: CustomerType) => <Tag color={CUSTOMER_TYPE_COLORS[v]}>{v}</Tag> },
  { title: 'Location', render: (_v, r) => `${r.city}, ${r.country}` },
  { title: 'Credit terms', dataIndex: 'terms' },
  { title: 'Currency', dataIndex: 'currency' },
  { title: 'Balance due', dataIndex: 'balance', align: 'right', render: (v: number, r) => (v ? <b style={{ color: '#b45309' }}>{r.currency} {num(v)}</b> : '—') },
  { title: 'Actions', render: () => <Button size="small">View</Button> },
];

export default function AbCustomersPage() {
  const [type, setType] = useState<'All' | CustomerType>('All');
  return (
    <ListPage
      eyebrow="Sales"
      title="Customers"
      subtitle="Manage your customers and track what they owe."
      chips={[
        { value: AB_CUSTOMERS.length, label: 'Customers' },
        { value: AB_CUSTOMERS.filter((c) => c.type === 'Export buyers').length, label: 'Export buyers' },
        { value: 'KES ' + num(AB_CUSTOMERS.filter((c) => c.currency === 'KES').reduce((s, c) => s + c.balance, 0)), label: 'Owed (local)' },
        { value: 'USD ' + num(AB_CUSTOMERS.filter((c) => c.currency === 'USD').reduce((s, c) => s + c.balance, 0)), label: 'Owed (export)' },
      ]}
      addLabel="Add Customer"
      searchPlaceholder="Search customers..."
      toolbarExtra={<Segmented value={type} onChange={(v) => setType(v as 'All' | CustomerType)} options={['All', ...CUSTOMER_TYPES]} />}
    >
      {(q) => (
        <Table<AbCustomer>
          rowKey="id"
          columns={cols}
          dataSource={AB_CUSTOMERS.filter((r) => (type === 'All' || r.type === type) && rowMatches(r, q))}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      )}
    </ListPage>
  );
}
