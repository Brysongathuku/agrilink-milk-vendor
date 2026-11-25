'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { kes } from '@/lib/format';

type Row = { tag: string; species: Species; batch: string; transfer: string; buyWeight: number; entryWeight: number; days: number; feedWater: number; antemortem: string; vet: string };

const ROWS: Row[] = [
  { tag: 'KE-ISL-S-01207', species: 'Sheep', batch: 'BT-2611-06', transfer: '23 Nov 2026', buyWeight: 33, entryWeight: 31.4, days: 1, feedWater: 60, antemortem: 'Passed', vet: 'Dr. Mohamed Dahir' },
  { tag: 'KE-ISL-S-01211', species: 'Sheep', batch: 'BT-2611-06', transfer: '23 Nov 2026', buyWeight: 30, entryWeight: 28.7, days: 1, feedWater: 60, antemortem: 'Passed', vet: 'Dr. Mohamed Dahir' },
  { tag: 'KE-ISL-B-00986', species: 'Cattle', batch: 'BT-2611-03', transfer: '23 Nov 2026', buyWeight: 376, entryWeight: 362, days: 1, feedWater: 450, antemortem: 'Passed', vet: 'Dr. Mohamed Dahir' },
  { tag: 'KE-ISL-B-00991', species: 'Cattle', batch: 'BT-2611-03', transfer: '23 Nov 2026', buyWeight: 391, entryWeight: 379, days: 1, feedWater: 450, antemortem: 'Held', vet: 'Dr. Mohamed Dahir' },
  { tag: 'KE-WJR-G-02540', species: 'Goat', batch: 'BT-2611-04', transfer: '21 Nov 2026', buyWeight: 29, entryWeight: 27.6, days: 1, feedWater: 50, antemortem: 'Passed', vet: 'Dr. Asha Kalicha' },
  { tag: 'KE-WJR-G-02551', species: 'Goat', batch: 'BT-2611-04', transfer: '21 Nov 2026', buyWeight: 27, entryWeight: 25.9, days: 1, feedWater: 50, antemortem: 'Rejected', vet: 'Dr. Asha Kalicha' },
  { tag: 'KE-GRS-B-00774', species: 'Cattle', batch: 'BT-2611-01', transfer: '21 Nov 2026', buyWeight: 362, entryWeight: 350, days: 2, feedWater: 800, antemortem: 'Passed', vet: 'Dr. Asha Kalicha' },
];

const shrink = (r: Row) => ((r.buyWeight - r.entryWeight) / r.buyWeight) * 100;

const cols: TableColumnsType<Row> = [
  { title: 'Tag No.', dataIndex: 'tag', render: (v: string) => <span className="strong" style={{ whiteSpace: 'nowrap' }}>{v}</span> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Batch', dataIndex: 'batch' },
  { title: 'Transfer date', dataIndex: 'transfer' },
  { title: 'Weight at purchase', dataIndex: 'buyWeight', align: 'right', render: (v: number) => `${v} kg` },
  { title: 'Live weight on entry', dataIndex: 'entryWeight', align: 'right', render: (v: number) => <b>{v} kg</b> },
  { title: 'Weight loss', align: 'right', render: (_v, r) => `${(r.buyWeight - r.entryWeight).toFixed(1)} kg` },
  { title: 'Shrinkage', align: 'right', render: (_v, r) => <span style={{ color: shrink(r) > 4 ? '#b45309' : '#374151', fontWeight: 600 }}>{shrink(r).toFixed(1)}%</span> },
  { title: 'Days held', dataIndex: 'days', align: 'right' },
  { title: 'Feed & water', dataIndex: 'feedWater', align: 'right', render: (v: number) => kes(v) },
  { title: 'Ante-mortem', dataIndex: 'antemortem', render: (v: string) => <StatusTag status={v === 'Held' ? 'On hold' : v} /> },
  { title: 'Inspector', dataIndex: 'vet' },
];

export default function LairagePage() {
  return (
    <ListPage
      eyebrow="Processing"
      title="Lairage"
      subtitle="Track animals held before slaughter."
      chips={[
        { value: 88, label: 'Head in lairage' },
        { value: ROWS.filter((r) => r.antemortem === 'Passed').length + '/' + ROWS.length, label: 'Passed ante-mortem' },
        { value: (ROWS.reduce((s, r) => s + shrink(r), 0) / ROWS.length).toFixed(1) + '%', label: 'Avg shrinkage' },
        { value: ROWS.filter((r) => r.antemortem !== 'Passed').length, label: 'Held / rejected' },
      ]}
      addLabel="Transfer to Lairage"
      searchPlaceholder="Search tag, batch, inspector..."
    >
      {(q) => <Table<Row> rowKey="tag" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1400 }} />}
    </ListPage>
  );
}
