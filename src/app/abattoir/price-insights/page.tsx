'use client';

import { useState } from 'react';
import { Button, Segmented, Table, Tag, type TableColumnsType } from 'antd';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RefreshCw } from 'lucide-react';
import { SectionCard } from '@/components/ui';
import { SPECIES, SPECIES_COLORS, type Species } from '@/lib/abattoir-data';
import { SERIES } from '@/lib/theme';

type Live = { key: string; market: string; county: string; species: Species; perHead: number; perKg: number; prev: number };

// Indicative live-weight prices (demo). Replace with market data feeds.
const LIVE: Live[] = [
  { key: 'l1', market: 'Garissa livestock market', county: 'Garissa', species: 'Goat', perHead: 8700, perKg: 300, prev: 290 },
  { key: 'l2', market: 'Garissa livestock market', county: 'Garissa', species: 'Cattle', perHead: 98800, perKg: 260, prev: 265 },
  { key: 'l3', market: 'Wajir livestock market', county: 'Wajir', species: 'Sheep', perHead: 8400, perKg: 270, prev: 262 },
  { key: 'l4', market: 'Habaswein market', county: 'Wajir', species: 'Camel', perHead: 96600, perKg: 230, prev: 225 },
  { key: 'l5', market: 'Isiolo livestock market', county: 'Isiolo', species: 'Goat', perHead: 9300, perKg: 310, prev: 305 },
  { key: 'l6', market: 'Isiolo livestock market', county: 'Isiolo', species: 'Cattle', perHead: 102000, perKg: 268, prev: 260 },
  { key: 'l7', market: 'Kiamaiko (Nairobi)', county: 'Nairobi', species: 'Goat', perHead: 11200, perKg: 360, prev: 355 },
];

type Exp = { key: string; destination: string; product: string; species: Species; usd: number; prev: number };
const EXPORT: Exp[] = [
  { key: 'x1', destination: 'UAE (Dubai)', product: 'Chilled goat carcass', species: 'Goat', usd: 7.2, prev: 7.0 },
  { key: 'x2', destination: 'Saudi Arabia', product: 'Chilled mutton carcass', species: 'Sheep', usd: 7.0, prev: 6.9 },
  { key: 'x3', destination: 'Qatar', product: 'Chilled goat carcass', species: 'Goat', usd: 7.4, prev: 7.3 },
  { key: 'x4', destination: 'Oman', product: 'Frozen camel meat', species: 'Camel', usd: 6.1, prev: 6.2 },
  { key: 'x5', destination: 'Kuwait', product: 'Frozen beef cuts', species: 'Cattle', usd: 5.4, prev: 5.3 },
];

const TREND = [
  { month: 'Jun', Goat: 270, Sheep: 250, Cattle: 245, Camel: 215 },
  { month: 'Jul', Goat: 265, Sheep: 248, Cattle: 240, Camel: 212 },
  { month: 'Aug', Goat: 280, Sheep: 255, Cattle: 250, Camel: 218 },
  { month: 'Sep', Goat: 285, Sheep: 258, Cattle: 255, Camel: 220 },
  { month: 'Oct', Goat: 290, Sheep: 262, Cattle: 262, Camel: 225 },
  { month: 'Nov', Goat: 300, Sheep: 270, Cattle: 264, Camel: 230 },
];
const SPECIES_SERIES: Record<Species, string> = { Goat: SERIES.s1, Sheep: SERIES.s2, Cattle: SERIES.s3, Camel: SERIES.s4 };

const Delta = ({ now, prev }: { now: number; prev: number }) => {
  const v = ((now - prev) / prev) * 100;
  if (Math.abs(v) < 0.05) return <span className="muted">0.0%</span>;
  return (
    <span style={{ color: v > 0 ? '#047857' : '#b91c1c', fontWeight: 600, background: v > 0 ? '#e7f8ef' : '#fdecec', padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>
      {v > 0 ? '▲' : '▼'} {Math.abs(v).toFixed(1)}%
    </span>
  );
};

const liveCols: TableColumnsType<Live> = [
  { title: 'Market', dataIndex: 'market', render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.county}</div></> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Avg price / head', dataIndex: 'perHead', align: 'right', render: (v: number) => `KES ${v.toLocaleString()}` },
  { title: 'Live weight price', dataIndex: 'perKg', align: 'right', render: (v: number) => <b>KES {v}/kg</b> },
  { title: 'Last week', dataIndex: 'prev', align: 'right', render: (v: number) => `KES ${v}/kg` },
  { title: 'Change', align: 'right', render: (_v, r) => <Delta now={r.perKg} prev={r.prev} /> },
];

const exportCols: TableColumnsType<Exp> = [
  { title: 'Destination', dataIndex: 'destination', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Product', dataIndex: 'product' },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Price (FOB/CIF)', dataIndex: 'usd', align: 'right', render: (v: number) => <b>USD {v.toFixed(2)}/kg</b> },
  { title: 'Last month', dataIndex: 'prev', align: 'right', render: (v: number) => `USD ${v.toFixed(2)}/kg` },
  { title: 'Change', align: 'right', render: (_v, r) => <Delta now={r.usd} prev={r.prev} /> },
];

export default function PriceInsightsPage() {
  const [species, setSpecies] = useState<'All' | Species>('All');
  const live = LIVE.filter((l) => species === 'All' || l.species === species);
  return (
    <div className="stack">
      <div className="insight-hero">
        <div>
          <span className="pill">● LIVESTOCK & MEAT PRICES</span>
          <h1 className="insight-title">Livestock prices for better buying.</h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560 }}>
            Track live-weight prices across livestock markets and meat prices in export markets.
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 18, flexWrap: 'wrap' }}>
            <span style={{ border: '1px solid #ccefdf', background: '#fff', borderRadius: 999, padding: '8px 16px' }}>Last updated: 24 Nov 2026</span>
            <Button type="primary" shape="round" size="large" icon={<RefreshCw size={16} />}>Refresh</Button>
          </div>
        </div>
        <div className="board">
          <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 2 }}>Market board</div>
              <div className="muted">Live weight, Garissa</div>
            </div>
            <span style={{ color: '#047857' }}>● Active</span>
          </div>
          {LIVE.filter((l) => l.county === 'Garissa').concat(LIVE.filter((l) => l.key === 'l3' || l.key === 'l4')).map((l) => (
            <div className="board-row" key={l.key}>
              <div>
                <div className="strong">{l.species} (live)</div>
                <div className="muted" style={{ fontSize: 13 }}>{l.market}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <b>KES {l.perKg}/kg</b>
                <Delta now={l.perKg} prev={l.prev} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-main">
        <SectionCard title="Live-weight prices by market" subtitle="Indicative, this week" extra={<Segmented value={species} onChange={(v) => setSpecies(v as 'All' | Species)} options={['All', ...SPECIES]} />}>
          <Table<Live> rowKey="key" columns={liveCols} dataSource={live} pagination={false} scroll={{ x: 760 }} />
        </SectionCard>
        <SectionCard title="Live-weight price trend" subtitle="Garissa, KES per kg">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[200, 320]} />
                <Tooltip formatter={(v) => `KES ${v}/kg`} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: '#374151' }} />
                {SPECIES.map((s) => (
                  <Line key={s} dataKey={s} stroke={SPECIES_SERIES[s]} strokeWidth={2} dot={{ r: 3 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Export carcass prices" subtitle="Gulf markets, USD per kg">
        <Table<Exp> rowKey="key" columns={exportCols} dataSource={EXPORT} pagination={false} scroll={{ x: 760 }} />
      </SectionCard>
    </div>
  );
}
