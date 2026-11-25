'use client';

import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { MapPin } from 'lucide-react';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { PASTORALISTS, SPECIES_COLORS, type Pastoralist, type Species } from '@/lib/abattoir-data';

const cols: TableColumnsType<Pastoralist> = [
  { title: 'Supplier ID', dataIndex: 'id', width: 100 },
  { title: 'Name', dataIndex: 'name', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.phone}</div></> },
  { title: 'County / area', render: (_v, r) => <>{r.county}<div className="muted" style={{ fontSize: 12 }}>{r.area}</div></> },
  { title: 'Market', dataIndex: 'market' },
  { title: 'Geo-tag', dataIndex: 'geo', render: (v: string) => <span style={{ whiteSpace: 'nowrap' }}><MapPin size={13} style={{ verticalAlign: -2 }} /> {v}</span> },
  { title: 'Species', dataIndex: 'species', render: (v: Species[]) => v.map((s) => <Tag key={s} color={SPECIES_COLORS[s]}>{s}</Tag>) },
  { title: 'Head supplied (12 mo)', dataIndex: 'supplied', align: 'right' },
  { title: 'Last supply', dataIndex: 'lastSupply' },
  { title: 'Payout', dataIndex: 'payout' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Actions', render: () => <Button size="small">View</Button> },
];

export default function PastoralistsPage() {
  return (
    <ListPage
      eyebrow="Livestock Sourcing"
      title="Pastoralists & Suppliers"
      subtitle="Manage the pastoralists and suppliers you buy livestock from."
      chips={[
        { value: PASTORALISTS.length, label: 'Suppliers' },
        { value: 3, label: 'Counties' },
        { value: PASTORALISTS.reduce((s, p) => s + p.supplied, 0), label: 'Head (12 mo)' },
        { value: PASTORALISTS.filter((p) => p.payout === 'Pesira e-wallet').length, label: 'On e-wallet' },
      ]}
      addLabel="Add Pastoralist"
      searchPlaceholder="Search name, county, market..."
    >
      {(q) => <Table<Pastoralist> rowKey="id" columns={cols} dataSource={PASTORALISTS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1400 }} />}
    </ListPage>
  );
}
