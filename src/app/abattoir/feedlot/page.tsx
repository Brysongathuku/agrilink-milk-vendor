'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { SectionCard, StatusTag } from '@/components/ui';
import { SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { kes } from '@/lib/format';

type Pen = { pen: string; batch: string; species: Species; head: number; arrived: string; days: number; feed: string; feedQty: string; feedCost: number; treatment: string; vetCost: number; status: string };

const PENS: Pen[] = [
  { pen: 'Pen 1', batch: 'BT-2611-07', species: 'Goat', head: 60, arrived: '22 Nov 2026', days: 2, feed: 'Rhodes grass hay + goat pellets', feedQty: '180 kg', feedCost: 9800, treatment: 'PPR vaccine, deworming', vetCost: 6600, status: 'Healthy' },
  { pen: 'Pen 2', batch: 'BT-2611-07', species: 'Goat', head: 59, arrived: '22 Nov 2026', days: 2, feed: 'Rhodes grass hay + goat pellets', feedQty: '176 kg', feedCost: 9600, treatment: 'PPR vaccine, deworming, antibiotics (3)', vetCost: 8100, status: 'Under watch' },
  { pen: 'Camel pen', batch: 'BT-2611-05', species: 'Camel', head: 8, arrived: '20 Nov 2026', days: 4, feed: 'Browse + lucerne hay', feedQty: '420 kg', feedCost: 21000, treatment: 'Trypanosomiasis treatment', vetCost: 9600, status: 'Healthy' },
  { pen: 'Cattle pen A', batch: 'BT-2611-03', species: 'Cattle', head: 14, arrived: '18 Nov 2026', days: 5, feed: 'Hay + maize germ', feedQty: '910 kg', feedCost: 38200, treatment: 'FMD vaccine, acaricide spray', vetCost: 12600, status: 'Moved to lairage' },
  { pen: 'Pen 3', batch: 'BT-2611-02', species: 'Goat', head: 150, arrived: '16 Nov 2026', days: 6, feed: 'Rhodes grass hay + goat pellets', feedQty: '1,050 kg', feedCost: 56700, treatment: 'PPR vaccine, deworming', vetCost: 16500, status: 'Slaughtered' },
  { pen: 'Cattle pen B', batch: 'BT-2611-01', species: 'Cattle', head: 10, arrived: '14 Nov 2026', days: 7, feed: 'Hay + maize germ', feedQty: '760 kg', feedCost: 31900, treatment: 'FMD vaccine', vetCost: 7000, status: 'Slaughtered' },
  { pen: 'Pen 4', batch: 'BT-2610-19', species: 'Sheep', head: 45, arrived: '10 Nov 2026', days: 8, feed: 'Hay + sheep pellets', feedQty: '590 kg', feedCost: 30100, treatment: 'CCPP vaccine, deworming', vetCost: 6300, status: 'Slaughtered' },
];

type Death = { tag: string; species: Species; batch: string; date: string; cause: string; cost: number; loss: number };
const DEATHS: Death[] = [
  { tag: 'KE-GRS-G-04191', species: 'Goat', batch: 'BT-2611-07', date: '23 Nov 2026', cause: 'Suspected pneumonia', cost: 8850, loss: 9300 },
  { tag: 'KE-GRS-G-03966', species: 'Goat', batch: 'BT-2611-02', date: '17 Nov 2026', cause: 'Transport stress', cost: 8760, loss: 9100 },
];

const cols: TableColumnsType<Pen> = [
  { title: 'Pen', dataIndex: 'pen', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Batch', dataIndex: 'batch' },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Head', dataIndex: 'head', align: 'right' },
  { title: 'Arrived', dataIndex: 'arrived' },
  { title: 'Days', dataIndex: 'days', align: 'right' },
  { title: 'Feed type & qty', render: (_v, r) => <>{r.feed}<div className="muted" style={{ fontSize: 12 }}>{r.feedQty}</div></> },
  { title: 'Feed cost', dataIndex: 'feedCost', align: 'right', render: (v: number) => kes(v) },
  { title: 'Drugs / vaccines', dataIndex: 'treatment' },
  { title: 'Vet cost', dataIndex: 'vetCost', align: 'right', render: (v: number) => kes(v) },
  { title: 'Cost / head', align: 'right', render: (_v, r) => <b>{kes(Math.round((r.feedCost + r.vetCost) / r.head))}</b> },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v === 'Under watch' ? 'On hold' : v === 'Healthy' ? 'Healthy' : v === 'Slaughtered' ? 'Completed' : 'In transit'} /> },
];

const deathCols: TableColumnsType<Death> = [
  { title: 'Tag No.', dataIndex: 'tag', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Batch', dataIndex: 'batch' },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Cause', dataIndex: 'cause' },
  { title: 'Cost incurred', dataIndex: 'cost', align: 'right', render: (v: number) => kes(v) },
  { title: 'Loss value', dataIndex: 'loss', align: 'right', render: (v: number) => <b style={{ color: '#b91c1c' }}>{kes(v)}</b> },
];

export default function FeedlotPage() {
  return (
    <ListPage
      eyebrow="Processing"
      title="Feedlot"
      subtitle="Track feeding, treatment and losses in the feedlot."
      chips={[
        { value: PENS.filter((p) => p.status === 'Healthy' || p.status === 'Under watch').reduce((s, p) => s + p.head, 0), label: 'Head in feedlot' },
        { value: kes(PENS.reduce((s, p) => s + p.feedCost, 0)), label: 'Feed cost (Nov)' },
        { value: kes(PENS.reduce((s, p) => s + p.vetCost, 0)), label: 'Vet cost (Nov)' },
        { value: DEATHS.length, label: 'Deaths (Nov)' },
      ]}
      addLabel="Record Feeding / Treatment"
      searchPlaceholder="Search pen, batch, treatment..."
    >
      {(q) => (
        <>
          <Table<Pen> rowKey="pen" columns={cols} dataSource={PENS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1500 }} />
          <SectionCard title="Mortality log" style={{ marginTop: 20, padding: 0, border: 0 }}>
            <Table<Death> rowKey="tag" columns={deathCols} dataSource={DEATHS} pagination={false} scroll={{ x: 900 }} />
          </SectionCard>
        </>
      )}
    </ListPage>
  );
}
