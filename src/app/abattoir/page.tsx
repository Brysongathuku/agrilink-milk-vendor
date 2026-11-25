'use client';

import { Select, Table, Tag, type TableColumnsType } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Beef, ChartColumn, CircleCheck, DollarSign, Globe, Layers, ShieldCheck, TrendingUp, TriangleAlert } from 'lucide-react';
import { Panel } from '@/components/ui';
import { MONTHLY_REVENUE, PIPELINE, SPECIES, SPECIES_COLORS, SPECIES_INFO, USD_KES, WEEKLY_SLAUGHTER, type Species } from '@/lib/abattoir-data';
import { kes, num } from '@/lib/format';
import { ICON_GREEN, SERIES } from '@/lib/theme';

const axisProps = { stroke: '#9ca3af', fontSize: 12, tickLine: false, axisLine: false } as const;
const legendStyle = { fontSize: 13, color: '#374151' };
const ic = { size: 20, color: ICON_GREEN, strokeWidth: 1.8 };
const SPECIES_SERIES: Record<Species, string> = { Goat: SERIES.s1, Sheep: SERIES.s2, Cattle: SERIES.s3, Camel: SERIES.s4 };

const inPipeline = PIPELINE.reduce((s, p) => s + p.head, 0);
const thisMonth = MONTHLY_REVENUE[MONTHLY_REVENUE.length - 1];

type YieldRow = { species: Species; slaughtered: number; avgLive: number; avgCarcass: number; dressing: number; chillLoss: number; profit: number };
const YIELD_ROWS: YieldRow[] = [
  { species: 'Goat', slaughtered: 480, avgLive: 29.4, avgCarcass: 12.8, dressing: 43.5, chillLoss: 2.1, profit: 1240 },
  { species: 'Sheep', slaughtered: 160, avgLive: 31.2, avgCarcass: 14.1, dressing: 45.2, chillLoss: 2.3, profit: 1310 },
  { species: 'Cattle', slaughtered: 44, avgLive: 372, avgCarcass: 194, dressing: 52.2, chillLoss: 1.8, profit: 14800 },
  { species: 'Camel', slaughtered: 15, avgLive: 418, avgCarcass: 228, dressing: 54.6, chillLoss: 1.6, profit: 17200 },
];

const yieldCols: TableColumnsType<YieldRow> = [
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Slaughtered (Nov)', dataIndex: 'slaughtered', align: 'right' },
  { title: 'Avg live (kg)', dataIndex: 'avgLive', align: 'right' },
  { title: 'Avg carcass (kg)', dataIndex: 'avgCarcass', align: 'right' },
  {
    title: 'Dressing %',
    dataIndex: 'dressing',
    align: 'right',
    render: (v: number, r) => (
      <span style={{ fontWeight: 600, color: v >= SPECIES_INFO[r.species].yield * 100 ? '#047857' : '#b45309' }}>{v.toFixed(1)}%</span>
    ),
  },
  { title: 'Chilling loss', dataIndex: 'chillLoss', align: 'right', render: (v: number) => `${v.toFixed(1)}%` },
  { title: 'Profit / animal', dataIndex: 'profit', align: 'right', render: (v: number) => <b>{kes(v)}</b> },
];

const ALERTS = [
  { level: 'crit', title: 'Mortality in feedlot – Pen 2', body: 'Goat KE-GRS-G-04191 died on 23 Nov. Loss of KES 9,300 on batch BT-2611-07.' },
  { level: 'warn', title: 'Partial condemnation – KE-GRS-B-00774', body: 'Liver condemned for liver flukes. KES 3,600 written off.' },
  { level: 'warn', title: 'Chiller 2 at 5.8 °C', body: 'Above 4 °C for 35 minutes. 1,420 kg of beef inside.' },
  { level: 'warn', title: 'Invoice overdue – FreshMart Supermarkets', body: 'INV-AB-2611-03 for KES 312,400 was due on 20 Nov.' },
  { level: 'ok', title: 'Shipment SHP-2611-02 cleared', body: 'All documents approved for 2,400 kg of goat meat to Dubai.' },
];

export default function AbattoirAnalytics() {
  return (
    <div className="stack">
      <div className="an-head">
        <div>
          <h1 className="an-title">Analytics</h1>
          <p className="an-sub">Overview of your livestock, production and sales.</p>
        </div>
        <Select size="large" allowClear placeholder="Select species to filter analytics" className="an-filter" options={SPECIES.map((s) => ({ value: s, label: s }))} />
      </div>

      <div className="tiles">
        <div className="tile teal">
          <div className="tile-title">Animals in Pipeline</div>
          <div className="tile-value">{num(inPipeline)}</div>
          <div className="tile-foot">All species</div>
          <Layers className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
        <div className="tile orange">
          <div className="tile-title">Local Sales (Nov)</div>
          <div className="tile-value">{kes(thisMonth.local * 1000000)}</div>
          <div className="tile-foot">This month</div>
          <DollarSign className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
        <div className="tile blue">
          <div className="tile-title">Export Sales (Nov)</div>
          <div className="tile-value">USD {num(Math.round((thisMonth.export * 1000000) / USD_KES))}</div>
          <div className="tile-foot">≈ {kes(thisMonth.export * 1000000)} · UAE, Saudi Arabia, Qatar</div>
          <Globe className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
      </div>

      <div className="kpis">
        <div className="kpi"><div className="kpi-label">Avg dressing % (goats)</div><div className="kpi-value">43.5%</div><div className="kpi-foot">Target 40–45%</div></div>
        <div className="kpi"><div className="kpi-label">Chilled meat in stock</div><div className="kpi-value">6,840 kg</div><div className="kpi-foot">4 chill rooms · avg 2.0% chilling loss</div></div>
        <div className="kpi"><div className="kpi-label">Debtors outstanding</div><div className="kpi-value">{kes(721600)}</div><div className="kpi-foot">+ USD 35,120 from export buyers</div></div>
        <div className="kpi"><div className="kpi-label">Profit per goat (Nov)</div><div className="kpi-value">{kes(1240)}</div><div className="kpi-foot">After all costs</div></div>
      </div>

      <div className="grid-main">
        <Panel icon={<Beef {...ic} />} title="Animals Slaughtered" sub="Last 7 days, by species">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_SLAUGHTER} margin={{ top: 10, right: 10, left: -16, bottom: 0 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip formatter={(v) => `${v} head`} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Legend iconType="circle" wrapperStyle={legendStyle} />
                {SPECIES.map((s) => (
                  <Bar key={s} dataKey={s} name={s} fill={SPECIES_SERIES[s]} radius={[4, 4, 0, 0]} maxBarSize={14} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel icon={<Layers {...ic} />} title="Livestock Pipeline" sub="Head at each stage today">
          <div style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PIPELINE} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" {...axisProps} />
                <YAxis type="category" dataKey="stage" {...axisProps} width={120} />
                <Tooltip formatter={(v) => [`${v} head`, 'Animals']} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="head" fill={SERIES.s1} radius={[0, 4, 4, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid-main">
        <Panel icon={<ChartColumn {...ic} />} title="Yield & Profit by Species" sub="November 2026" bodyStyle={{ padding: 0 }}>
          <Table<YieldRow> rowKey="species" columns={yieldCols} dataSource={YIELD_ROWS} pagination={false} size="middle" scroll={{ x: 720 }} />
        </Panel>
        <Panel icon={<TrendingUp {...ic} />} title="Local vs Export Revenue" sub="KES millions">
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_REVENUE} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip formatter={(v) => `KES ${v}M`} />
                <Legend iconType="circle" wrapperStyle={legendStyle} />
                <Line dataKey="local" name="Local" stroke={SERIES.s1} strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="export" name="Export (in KES)" stroke={SERIES.s2} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel icon={<ShieldCheck {...ic} />} title="Alerts">
        {ALERTS.map((a) => (
          <div className="alert-item" key={a.title}>
            <div className={`alert-icon ${a.level}`}>{a.level === 'ok' ? <CircleCheck size={18} /> : <TriangleAlert size={18} />}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{a.title}</div>
              <div style={{ fontSize: 13, marginTop: 2, color: '#6b7280' }}>{a.body}</div>
            </div>
          </div>
        ))}
      </Panel>
    </div>
  );
}
