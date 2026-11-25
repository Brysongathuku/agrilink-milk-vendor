'use client';

import { useState } from 'react';
import { Button, Switch, Table, type TableColumnsType } from 'antd';
import { Download, Filter, RotateCcw } from 'lucide-react';
import { Hero, PageHeader, SectionCard, StatusTag } from '@/components/ui';

type Lot = { lot: string; material: string; supplier: string; store: string; received: number; accepted: number; hold: number; remaining: number; expiry: string; qa: string; expiring: boolean };

const ROWS: Lot[] = [
  { lot: 'LOT-MK-2111-AM', material: 'Raw milk', supplier: 'Kanjai Route (6 farmers)', store: 'Cooler 1 – Kanjai', received: 312, accepted: 303, hold: 0, remaining: 140, expiry: '23 Nov 2026', qa: 'Passed', expiring: true },
  { lot: 'LOT-MK-2011-PM', material: 'Raw milk', supplier: 'Ikinu Route (4 farmers)', store: 'Cooler 2 – Ikinu', received: 233, accepted: 215, hold: 9, remaining: 28, expiry: '22 Nov 2026', qa: 'On hold', expiring: true },
  { lot: 'LOT-MK-2011-AM', material: 'Raw milk', supplier: 'Ngewa Route', store: 'Cooler 1 – Kanjai', received: 295, accepted: 295, hold: 0, remaining: 0, expiry: '22 Nov 2026', qa: 'Passed', expiring: true },
  { lot: 'LOT-ML-1911', material: 'Mala', supplier: 'In-house fermentation', store: 'Milk bar fridge', received: 64, accepted: 64, hold: 0, remaining: 64, expiry: '28 Nov 2026', qa: 'Passed', expiring: false },
  { lot: 'LOT-MK-1911-PM', material: 'Raw milk', supplier: 'Githiga Route', store: 'Cooler 2 – Ikinu', received: 220, accepted: 211, hold: 0, remaining: 0, expiry: '21 Nov 2026', qa: 'Expired', expiring: true },
  { lot: 'LOT-DM-1011', material: 'Dairy meal 70 kg', supplier: 'Ngewa Feeds & Vet', store: 'Store room', received: 10, accepted: 10, hold: 0, remaining: 6, expiry: '15 Feb 2027', qa: 'Passed', expiring: false },
  { lot: 'LOT-PK-1211', material: 'Milk pouches 500 ml', supplier: 'Kiambu Packaging Supplies', store: 'Store room', received: 2000, accepted: 2000, hold: 0, remaining: 1200, expiry: '—', qa: 'Passed', expiring: false },
];

const cols: TableColumnsType<Lot> = [
  { title: 'Lot', dataIndex: 'lot', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Material', dataIndex: 'material' },
  { title: 'Supplier', dataIndex: 'supplier' },
  { title: 'Store / warehouse', dataIndex: 'store' },
  { title: 'Received', dataIndex: 'received', align: 'right' },
  { title: 'Accepted', dataIndex: 'accepted', align: 'right' },
  { title: 'On hold', dataIndex: 'hold', align: 'right' },
  { title: 'Remaining', dataIndex: 'remaining', align: 'right' },
  { title: 'Expiry', dataIndex: 'expiry' },
  { title: 'QA', dataIndex: 'qa', render: (v: string) => <StatusTag status={v} /> },
];

export default function LotsPage() {
  const [onlyExpiring, setOnlyExpiring] = useState(false);
  const data = onlyExpiring ? ROWS.filter((r) => r.expiring) : ROWS;
  return (
    <div className="stack">
      <PageHeader eyebrow="AgriLink · Traceability" title="Received Lots" subtitle="Track milk batches, quality checks and expiry." boxed={false} />
      <Hero chips={[{ value: ROWS.length, label: 'Lots' }, { value: 1, label: 'On hold' }, { value: 3, label: 'Expiring ≤48h' }, { value: 1, label: 'Expired' }]} />
      <SectionCard>
        <div className="toolbar">
          <Switch checked={onlyExpiring} onChange={setOnlyExpiring} /> <span>Expiring or expired only</span>
          <Button icon={<Filter size={16} />}>Filters</Button>
          <Button icon={<RotateCcw size={16} />}>Reset</Button>
          <Button icon={<Download size={16} />}>Download</Button>
        </div>
        <Table<Lot> rowKey="lot" columns={cols} dataSource={data} pagination={false} scroll={{ x: 1100 }} />
      </SectionCard>
    </div>
  );
}
