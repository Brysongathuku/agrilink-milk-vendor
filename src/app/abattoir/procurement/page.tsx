'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { BATCHES, SPECIES_COLORS, type Batch, type Species } from '@/lib/abattoir-data';
import { kes, num } from '@/lib/format';

const landed = (b: Batch) => b.purchaseCost + b.transport + b.commission;

const cols: TableColumnsType<Batch> = [
  { title: 'Batch No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Market / suppliers', render: (_v, r) => <>{r.market}<div className="muted" style={{ fontSize: 12 }}>{r.suppliers}</div></> },
  { title: 'Head', dataIndex: 'head', align: 'right' },
  { title: 'Live weight', dataIndex: 'liveKg', align: 'right', render: (v: number) => `${num(v)} kg` },
  { title: 'Purchase cost', dataIndex: 'purchaseCost', align: 'right', render: (v: number) => kes(v) },
  { title: 'Transport', dataIndex: 'transport', align: 'right', render: (v: number) => kes(v) },
  { title: 'Commission', dataIndex: 'commission', align: 'right', render: (v: number) => kes(v) },
  { title: 'Landed cost / head', align: 'right', render: (_v, r) => <b>{kes(Math.round(landed(r) / r.head))}</b> },
  { title: 'Route', dataIndex: 'route', render: (v: string) => <Tag color={v === 'Feedlot' ? 'cyan' : 'magenta'}>{v}</Tag> },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function ProcurementPage() {
  return (
    <ListPage
      eyebrow="Livestock Sourcing"
      title="Procurement Batches"
      subtitle="Each purchase is a batch: who sold it, how many head, live weight and every cost to bring it to the abattoir."
      chips={[
        { value: BATCHES.length, label: 'Batches' },
        { value: BATCHES.reduce((s, b) => s + b.head, 0), label: 'Head bought' },
        { value: BATCHES.filter((b) => b.route === 'Direct slaughter').length, label: 'Direct slaughter' },
        { value: kes(BATCHES.reduce((s, b) => s + landed(b), 0)), label: 'Landed cost' },
      ]}
      addLabel="New Batch"
      searchPlaceholder="Search batch, market, supplier..."
      note="Landed cost = purchase + transport + commission. It feeds the cost per animal on the Cost & Profit page."
    >
      {(q) => <Table<Batch> rowKey="id" columns={cols} dataSource={BATCHES.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1500 }} />}
    </ListPage>
  );
}
