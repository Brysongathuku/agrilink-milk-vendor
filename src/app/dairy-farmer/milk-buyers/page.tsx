'use client';

import { App, Button, Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { MILK_BUYERS, type Buyer } from '@/lib/dairy-data';

export default function MilkBuyersPage() {
  const { message } = App.useApp();
  const cols: TableColumnsType<Buyer> = [
    { title: 'Buyer', dataIndex: 'name', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Price / litre', dataIndex: 'price', align: 'right', render: (v: number) => <b>KES {v.toFixed(2)}</b> },
    { title: 'Pays', dataIndex: 'payment' },
    { title: 'Distance', dataIndex: 'distance' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <Tag color={v === 'Current buyer' ? 'green' : v === 'Member' ? 'blue' : 'default'}>{v}</Tag> },
    {
      title: '',
      render: (_v, r) =>
        r.status === 'Open' ? (
          <Button size="small" onClick={() => message.success(`Request sent to ${r.name}`)}>
            Contact
          </Button>
        ) : null,
    },
  ];
  return (
    <ListPage
      eyebrow="Farm Management"
      title="Milk Buyers"
      subtitle="Who buys your milk, and other buyers near you."
      searchPlaceholder="Search buyers..."
    >
      {(q) => <Table<Buyer> rowKey="name" columns={cols} dataSource={MILK_BUYERS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 900 }} />}
    </ListPage>
  );
}
