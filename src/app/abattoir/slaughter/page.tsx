'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { kes } from '@/lib/format';

type Row = {
  no: string;
  date: string;
  batch: string;
  tag: string;
  species: Species;
  live: number;
  hot: number;
  offalKg: number;
  offalValue: number;
  condemned: string;
  condemnedValue: number;
  charges: number;
  labour: number;
  inspector: string;
  stamp: string;
};

const ROWS: Row[] = [
  { no: 'SL-2611-0931', date: '23 Nov 2026', batch: 'BT-2611-06', tag: 'KE-ISL-S-01207', species: 'Sheep', live: 31.4, hot: 14.3, offalKg: 3.6, offalValue: 720, condemned: '—', condemnedValue: 0, charges: 250, labour: 150, inspector: 'Dr. Mohamed Dahir', stamp: 'DVS-GRS-014' },
  { no: 'SL-2611-0930', date: '23 Nov 2026', batch: 'BT-2611-03', tag: 'KE-ISL-B-00986', species: 'Cattle', live: 362, hot: 190, offalKg: 32, offalValue: 6400, condemned: '—', condemnedValue: 0, charges: 1200, labour: 800, inspector: 'Dr. Mohamed Dahir', stamp: 'DVS-GRS-014' },
  { no: 'SL-2611-0902', date: '22 Nov 2026', batch: 'BT-2611-04', tag: 'KE-WJR-G-02540', species: 'Goat', live: 27.6, hot: 12.1, offalKg: 3.1, offalValue: 620, condemned: '—', condemnedValue: 0, charges: 200, labour: 150, inspector: 'Dr. Asha Kalicha', stamp: 'DVS-GRS-009' },
  { no: 'SL-2611-0903', date: '22 Nov 2026', batch: 'BT-2611-04', tag: 'KE-WJR-G-02547', species: 'Goat', live: 28.9, hot: 12.6, offalKg: 3.3, offalValue: 640, condemned: 'Lungs – pneumonia', condemnedValue: 180, charges: 200, labour: 150, inspector: 'Dr. Asha Kalicha', stamp: 'DVS-GRS-009' },
  { no: 'SL-2611-0874', date: '21 Nov 2026', batch: 'BT-2611-01', tag: 'KE-GRS-B-00774', species: 'Cattle', live: 350, hot: 181, offalKg: 30, offalValue: 5200, condemned: 'Liver – liver flukes', condemnedValue: 3600, charges: 1200, labour: 800, inspector: 'Dr. Asha Kalicha', stamp: 'DVS-GRS-009' },
  { no: 'SL-2611-0861', date: '21 Nov 2026', batch: 'BT-2611-05', tag: 'KE-WJR-C-00298', species: 'Camel', live: 431, hot: 236, offalKg: 38, offalValue: 7600, condemned: '—', condemnedValue: 0, charges: 1500, labour: 1000, inspector: 'Dr. Asha Kalicha', stamp: 'DVS-GRS-009' },
  { no: 'SL-2611-0855', date: '20 Nov 2026', batch: 'BT-2611-02', tag: 'KE-GRS-G-03970', species: 'Goat', live: 29.2, hot: 12.7, offalKg: 3.2, offalValue: 630, condemned: '—', condemnedValue: 0, charges: 200, labour: 150, inspector: 'Dr. Mohamed Dahir', stamp: 'DVS-GRS-014' },
];

const dressing = (r: Row) => (r.hot / r.live) * 100;

const cols: TableColumnsType<Row> = [
  { title: 'Slaughter No.', dataIndex: 'no', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Batch / tag', render: (_v, r) => <>{r.batch}<div className="muted" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{r.tag}</div></> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Live weight', dataIndex: 'live', align: 'right', render: (v: number) => `${v} kg` },
  { title: 'Hot carcass', dataIndex: 'hot', align: 'right', render: (v: number) => `${v} kg` },
  { title: 'Dressing %', align: 'right', render: (_v, r) => <b>{dressing(r).toFixed(1)}%</b> },
  { title: 'Offals', render: (_v, r) => `${r.offalKg} kg · ${kes(r.offalValue)}` },
  { title: 'Condemnation', dataIndex: 'condemned', render: (v: string, r) => (r.condemnedValue ? <span style={{ color: '#b91c1c' }}>{v} ({kes(r.condemnedValue)})</span> : <span className="muted">None</span>) },
  { title: 'Slaughter charges', dataIndex: 'charges', align: 'right', render: (v: number) => kes(v) },
  { title: 'Labour', dataIndex: 'labour', align: 'right', render: (v: number) => kes(v) },
  { title: 'Inspector / stamp', render: (_v, r) => <>{r.inspector}<div className="muted" style={{ fontSize: 12 }}>{r.stamp}</div></> },
];

export default function SlaughterPage() {
  return (
    <ListPage
      eyebrow="Processing"
      title="Slaughter"
      subtitle="Live animals issued from stores to production. Each slaughter records weights, offals, condemnations, charges and the meat inspector's stamp."
      chips={[
        { value: 94, label: 'Slaughtered today' },
        { value: (ROWS.reduce((s, r) => s + dressing(r), 0) / ROWS.length).toFixed(1) + '%', label: 'Avg dressing %' },
        { value: kes(ROWS.reduce((s, r) => s + r.offalValue, 0)), label: 'Offal value' },
        { value: kes(ROWS.reduce((s, r) => s + r.condemnedValue, 0)), label: 'Condemned value' },
      ]}
      addLabel="Record Slaughter"
      searchPlaceholder="Search slaughter no, tag, batch..."
      note="Dressing % = hot carcass weight ÷ live weight before slaughter."
    >
      {(q) => <Table<Row> rowKey="no" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1600 }} />}
    </ListPage>
  );
}
