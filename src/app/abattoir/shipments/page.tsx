'use client';

import { App, Button, Table, type TableColumnsType } from 'antd';
import { CircleCheck, Clock, Plane, Ship, CircleX } from 'lucide-react';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { num } from '@/lib/format';

type DocState = 'Valid' | 'Pending' | 'Missing';
type Row = { id: string; exportNo: string; mode: 'Air' | 'Sea'; route: string; ref: string; departure: string; kg: number; permit: DocState; vetCert: DocState; halal: DocState; coo: DocState; status: string };

const ROWS: Row[] = [
  { id: 'SHP-2611-07', exportNo: 'EXP-2611-07', mode: 'Air', route: 'JKIA (NBO) → Dubai (DXB)', ref: 'AWB 176-4410 2286', departure: '27 Nov 2026, 02:15', kg: 2400, permit: 'Valid', vetCert: 'Pending', halal: 'Valid', coo: 'Valid', status: 'Scheduled' },
  { id: 'SHP-2611-06', exportNo: 'EXP-2611-06', mode: 'Air', route: 'JKIA (NBO) → Riyadh (RUH)', ref: 'AWB 065-3391 0045', departure: '29 Nov 2026, 01:40', kg: 1600, permit: 'Pending', vetCert: 'Pending', halal: 'Valid', coo: 'Pending', status: 'Scheduled' },
  { id: 'SHP-2611-05', exportNo: 'EXP-2611-05', mode: 'Air', route: 'JKIA (NBO) → Doha (DOH)', ref: 'Booking pending', departure: '04 Dec 2026', kg: 1800, permit: 'Missing', vetCert: 'Missing', halal: 'Valid', coo: 'Missing', status: 'Pending' },
  { id: 'SHP-2611-04', exportNo: 'EXP-2611-04', mode: 'Sea', route: 'Mombasa → Sohar', ref: 'Reefer container MSKU 801 442 7', departure: '10 Dec 2026', kg: 3000, permit: 'Pending', vetCert: 'Missing', halal: 'Valid', coo: 'Missing', status: 'Pending' },
  { id: 'SHP-2611-03', exportNo: 'EXP-2611-03', mode: 'Air', route: 'JKIA (NBO) → Dubai (DXB)', ref: 'AWB 176-4409 8712', departure: '20 Nov 2026, 02:15', kg: 2200, permit: 'Valid', vetCert: 'Valid', halal: 'Valid', coo: 'Valid', status: 'Delivered' },
  { id: 'SHP-2611-02', exportNo: 'EXP-2611-02', mode: 'Air', route: 'JKIA (NBO) → Riyadh (RUH)', ref: 'AWB 065-3390 7719', departure: '19 Nov 2026, 01:40', kg: 1500, permit: 'Valid', vetCert: 'Valid', halal: 'Valid', coo: 'Valid', status: 'Delivered' },
  { id: 'SHP-2611-01', exportNo: 'EXP-2611-01', mode: 'Sea', route: 'Mombasa → Shuwaikh', ref: 'Reefer container MSKU 799 105 3', departure: '08 Nov 2026', kg: 4000, permit: 'Valid', vetCert: 'Valid', halal: 'Valid', coo: 'Valid', status: 'Completed' },
];

function Doc({ s }: { s: DocState }) {
  const color = s === 'Valid' ? '#047857' : s === 'Pending' ? '#b45309' : '#b91c1c';
  const Icon = s === 'Valid' ? CircleCheck : s === 'Pending' ? Clock : CircleX;
  return (
    <span style={{ color, fontWeight: 500, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Icon size={14} /> {s}
    </span>
  );
}

export default function ShipmentsPage() {
  const { message } = App.useApp();
  const docsDone = (r: Row) => [r.permit, r.vetCert, r.halal, r.coo].every((d) => d === 'Valid');

  const cols: TableColumnsType<Row> = [
    { title: 'Shipment', dataIndex: 'id', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.exportNo}</div></> },
    { title: 'Mode / route', render: (_v, r) => <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>{r.mode === 'Air' ? <Plane size={15} /> : <Ship size={15} />} {r.route}</span> },
    { title: 'AWB / container', dataIndex: 'ref' },
    { title: 'Departure', dataIndex: 'departure' },
    { title: 'Quantity', dataIndex: 'kg', align: 'right', render: (v: number) => `${num(v)} kg` },
    { title: 'Export permit', dataIndex: 'permit', render: (v: DocState) => <Doc s={v} /> },
    { title: 'Vet health cert.', dataIndex: 'vetCert', render: (v: DocState) => <Doc s={v} /> },
    { title: 'Halal cert.', dataIndex: 'halal', render: (v: DocState) => <Doc s={v} /> },
    { title: 'Cert. of origin', dataIndex: 'coo', render: (v: DocState) => <Doc s={v} /> },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
    {
      title: 'Documents',
      render: (_v, r) =>
        docsDone(r) ? (
          <Button size="small">View pack</Button>
        ) : (
          <Button size="small" type="primary" onClick={() => message.info('Upload dialog (demo)')}>
            Upload
          </Button>
        ),
    },
  ];

  return (
    <ListPage
      eyebrow="Dispatch & Export"
      title="Shipments & Export Documents"
      subtitle="Every export shipment needs an export permit, a veterinary health certificate, a Halal certificate and a certificate of origin before it can fly or sail."
      chips={[
        { value: ROWS.filter((r) => r.status === 'Scheduled' || r.status === 'Pending').length, label: 'Upcoming shipments' },
        { value: ROWS.filter((r) => !docsDone(r)).length, label: 'Missing documents' },
        { value: ROWS.filter((r) => r.mode === 'Air').length + ' / ' + ROWS.filter((r) => r.mode === 'Sea').length, label: 'Air / sea' },
        { value: num(ROWS.reduce((s, r) => s + r.kg, 0)) + ' kg', label: 'Shipped & booked' },
      ]}
      addLabel="New Shipment"
      searchPlaceholder="Search shipment, AWB, route..."
    >
      {(q) => <Table<Row> rowKey="id" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1600 }} />}
    </ListPage>
  );
}
