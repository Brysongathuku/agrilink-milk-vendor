'use client';

import { Button, Table, type TableColumnsType } from 'antd';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RefreshCw, Info } from 'lucide-react';
import { SectionCard } from '@/components/ui';
import { SERIES } from '@/lib/theme';

type Signal = { key: number; item: string; segment: string; unit: string; price: number; prev: number; county: string };

// Demo snapshot in the shape of Kenya Dairy Board price reporting. Replace with the KDB feed.
const SIGNALS: Signal[] = [
  { key: 1, item: 'Raw milk – farm-gate (co-operative)', segment: 'Farm-gate', unit: 'per L', price: 49.5, prev: 49.3, county: 'Kiambu' },
  { key: 2, item: 'Raw milk – farm-gate', segment: 'Farm-gate', unit: 'per L', price: 46, prev: 46, county: 'Nyandarua' },
  { key: 3, item: 'Raw milk – farm-gate', segment: 'Farm-gate', unit: 'per L', price: 47, prev: 48, county: 'Nakuru' },
  { key: 4, item: 'Raw milk – bulk to processor (cooled)', segment: 'Wholesale', unit: 'per L', price: 65, prev: 62, county: 'Kiambu' },
  { key: 5, item: 'Fresh milk – Milk ATM retail', segment: 'Retail', unit: 'per L', price: 80, prev: 80, county: 'Kiambu' },
  { key: 6, item: 'Pasteurised milk 500 ml (pouch)', segment: 'Retail', unit: 'per 500 ml', price: 65, prev: 63, county: 'National avg' },
  { key: 7, item: 'Mala 500 ml', segment: 'Retail', unit: 'per 500 ml', price: 70, prev: 72, county: 'National avg' },
];

const TREND = [
  { month: 'Jun', farmgate: 49, bulk: 60, retail: 75 },
  { month: 'Jul', farmgate: 48, bulk: 59, retail: 75 },
  { month: 'Aug', farmgate: 47, bulk: 59, retail: 78 },
  { month: 'Sep', farmgate: 48, bulk: 61, retail: 78 },
  { month: 'Oct', farmgate: 49.3, bulk: 62, retail: 80 },
  { month: 'Nov', farmgate: 49.5, bulk: 65, retail: 80 },
];

const change = (r: Signal) => ((r.price - r.prev) / r.prev) * 100;

const Delta = ({ v }: { v: number }) =>
  v === 0 ? (
    <span className="muted">0.0%</span>
  ) : (
    <span style={{ color: v > 0 ? '#047857' : '#b91c1c', fontWeight: 600, background: v > 0 ? '#e7f8ef' : '#fdecec', padding: '2px 8px', borderRadius: 6 }}>
      {v > 0 ? '▲' : '▼'} {Math.abs(v).toFixed(1)}%
    </span>
  );

const cols: TableColumnsType<Signal> = [
  { title: 'Commodity', dataIndex: 'item', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Segment', dataIndex: 'segment' },
  { title: 'County', dataIndex: 'county' },
  { title: 'Price', dataIndex: 'price', align: 'right', render: (v: number, r) => `KES ${v.toFixed(2)} ${r.unit}` },
  { title: 'Previous', dataIndex: 'prev', align: 'right', render: (v: number) => `KES ${v.toFixed(2)}` },
  { title: 'Change', align: 'right', render: (_v, r) => <Delta v={change(r)} /> },
];

export default function InsightsPage() {
  const rising = SIGNALS.filter((s) => change(s) > 0).length;
  const falling = SIGNALS.filter((s) => change(s) < 0).length;
  const largest = Math.max(...SIGNALS.map((s) => Math.abs(change(s))));
  return (
    <div className="stack">
      <div className="insight-hero">
        <div>
          <span className="pill">● KENYA DAIRY BOARD PRICES</span>
          <h1 className="insight-title">Milk prices for smarter buying &amp; selling.</h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560 }}>
            Follow farm-gate, bulk and retail milk prices from the Kenya Dairy Board so you set fair farmer rates and the right selling price.
          </p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 18 }}>
            <span style={{ border: '1px solid #ccefdf', background: '#fff', borderRadius: 999, padding: '8px 16px' }}>Last updated: 20 Nov 2026</span>
            <Button type="primary" shape="round" size="large" icon={<RefreshCw size={16} />}>Refresh</Button>
          </div>
        </div>
        <div className="board">
          <div style={{ padding: '18px 22px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 2 }}>Market board</div>
              <div className="muted">KDB snapshot · Kiambu</div>
            </div>
            <span style={{ color: '#047857' }}>● Active</span>
          </div>
          {SIGNALS.filter((s) => s.county === 'Kiambu').map((s) => (
            <div className="board-row" key={s.key}>
              <div>
                <div className="strong">{s.item}</div>
                <div className="muted" style={{ fontSize: 13 }}>{s.segment} · {s.unit}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <b>KES {s.price.toFixed(2)}</b>
                <Delta v={change(s)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats">
        <div className="stat"><div className="stat-label eyebrow" style={{ color: '#6b7280' }}>Prices tracked</div><div className="stat-value" style={{ fontSize: 40 }}>{SIGNALS.length}</div><div className="stat-foot">KDB farm-gate, wholesale, retail</div></div>
        <div className="stat"><div className="stat-label eyebrow" style={{ color: '#6b7280' }}>Rising</div><div className="stat-value" style={{ fontSize: 40, color: '#047857' }}>{rising}</div><div className="stat-foot">vs previous month</div></div>
        <div className="stat"><div className="stat-label eyebrow" style={{ color: '#6b7280' }}>Falling</div><div className="stat-value" style={{ fontSize: 40, color: '#b91c1c' }}>{falling}</div><div className="stat-foot">vs previous month</div></div>
        <div className="stat"><div className="stat-label eyebrow" style={{ color: '#6b7280' }}>Largest movement</div><div className="stat-value" style={{ fontSize: 40, color: '#047857' }}>{largest.toFixed(1)}%</div><div className="stat-foot">Bulk to processor, Kiambu</div></div>
      </div>

      <div className="grid-main">
        <SectionCard title="Price signals" subtitle="Kenya Dairy Board, November 2026">
          <Table<Signal> columns={cols} dataSource={SIGNALS} pagination={false} scroll={{ x: 800 }} />
        </SectionCard>
        <SectionCard title="6-month price trend" subtitle="Kiambu, KES per litre">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={[40, 85]} />
                <Tooltip formatter={(v) => `KES ${v}`} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                <Line dataKey="farmgate" name="Farm-gate" stroke={SERIES.s1} strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="bulk" name="Bulk to processor" stroke={SERIES.s2} strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="retail" name="Retail (ATM)" stroke={SERIES.s3} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
      <p className="demo-note"><Info size={14} /> Demo figures in the KDB format. Connect the Kenya Dairy Board price feed to make them live.</p>
    </div>
  );
}
