'use client';

import { Button, Progress, Select, Table, Tag, type TableColumnsType } from 'antd';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartColumn,
  CircleCheck,
  DollarSign,
  Gauge,
  Milk,
  ShieldCheck,
  TrendingUp,
  TriangleAlert,
  Users,
  Wallet,
  CalendarRange,
} from 'lucide-react';
import { Panel, StatusTag } from '@/components/ui';
import { FARMERS, MONTHLY_PRODUCTION, SALES_BY_CATEGORY, SESSION_COMPARE, WEEKLY_OPS, FARMER_RATE } from '@/lib/data';
import { kes, num } from '@/lib/format';
import { ICON_GREEN, PESIRA_GREEN, SERIES } from '@/lib/theme';

const RETAIL_PRICE = 80;
const BULK_PRICE = 65;

const today = WEEKLY_OPS[WEEKLY_OPS.length - 1];
const yesterday = WEEKLY_OPS[WEEKLY_OPS.length - 2];
const collectionDelta = ((today.collections - yesterday.collections) / yesterday.collections) * 100;
const spoilageRate = (today.spoilage / today.collections) * 100;
const salesKes = today.retail * RETAIL_PRICE + today.bulk * BULK_PRICE;
const milkCost = today.collections * FARMER_RATE;
const netMargin = salesKes - milkCost;
const activeFarmers = FARMERS.filter((f) => f.status === 'Active').length;

const axisProps = { stroke: '#9ca3af', fontSize: 12, tickLine: false, axisLine: false } as const;
const legendStyle = { fontSize: 13, color: '#374151' };
const ic = { size: 20, color: ICON_GREEN, strokeWidth: 1.8 };

type FarmerRow = { key: string; name: string; location: string; am: number; pm: number; density: number; grade: string };
const farmerRows: FarmerRow[] = FARMERS.map((f) => {
  const inactive = f.status === 'Inactive';
  return {
    key: f.id,
    name: f.name,
    location: `${f.ward}, ${f.village}`,
    am: inactive ? 0 : Math.round(f.avgDailyLitres * 0.57),
    pm: inactive ? 0 : Math.round(f.avgDailyLitres * 0.43),
    density: f.avgDensity,
    grade: f.avgDensity >= 1.028 ? 'A' : f.avgDensity >= 1.026 ? 'B' : 'Hold',
  };
});

const farmerCols: TableColumnsType<FarmerRow> = [
  { title: 'Farmer', dataIndex: 'name', render: (v: string) => <span style={{ fontWeight: 600, color: '#111827' }}>{v}</span> },
  { title: 'Location', dataIndex: 'location' },
  { title: 'Morning (L)', dataIndex: 'am', align: 'right' },
  { title: 'Evening (L)', dataIndex: 'pm', align: 'right' },
  { title: 'Density (g/ml)', dataIndex: 'density', align: 'right', render: (v: number) => v.toFixed(3) },
  {
    title: 'Quality',
    dataIndex: 'grade',
    render: (g: string) => <Tag color={g === 'A' ? 'green' : g === 'B' ? 'gold' : 'red'}>{g === 'Hold' ? 'Hold – retest' : `Grade ${g}`}</Tag>,
  },
];

const ALERTS = [
  { level: 'crit', title: 'Low lactometer reading – Mary Wairimu', body: 'Density 1.024 g/ml on the 20 Nov evening delivery (9 L). Batch rejected; possible added water.' },
  { level: 'warn', title: 'Afternoon spoilage rising', body: 'Sunday spoilage hit 22 L (4.0%). Divert 60 L of the 2 pm stock to Highland Dairies before 4 pm.' },
  { level: 'warn', title: 'Cooler 2 (Ikinu) at 7.5 °C', body: 'Above the 4 °C target for 40 min. Check the door seal and compressor.' },
  { level: 'ok', title: 'Morning batch passed', body: 'LOT-MK-2111-AM: 312 L, average density 1.029 g/ml, alcohol test negative.' },
];

export default function AnalyticsPage() {
  return (
    <div className="stack">
      <div className="an-head">
        <div>
          <h1 className="an-title">Analytics</h1>
          <p className="an-sub">Milk collection, quality, sales and credit overview.</p>
        </div>
        <Select
          size="large"
          allowClear
          placeholder="Select collection route to filter analytics"
          className="an-filter"
          options={['Kanjai Route', 'Ikinu Route', 'Ngewa Route', 'Komothai Route', 'Githiga Route'].map((r) => ({ value: r, label: r }))}
        />
      </div>

      <div className="tiles">
        <div className="tile teal">
          <div className="tile-title">Today&apos;s Collection</div>
          <div className="tile-value">{num(today.collections)} L</div>
          <div className="tile-foot">
            {collectionDelta >= 0 ? '▲' : '▼'} {Math.abs(collectionDelta).toFixed(1)}% vs yesterday ({num(yesterday.collections)} L)
          </div>
          <Milk className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
        <div className="tile orange">
          <div className="tile-title">Today&apos;s Sales</div>
          <div className="tile-value">{kes(salesKes)}</div>
          <div className="tile-foot">{num(today.retail + today.bulk)} L sold · retail + bulk</div>
          <DollarSign className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
        <div className="tile blue">
          <div className="tile-title">Farmers Supplying</div>
          <div className="tile-value">{activeFarmers}</div>
          <div className="tile-foot">of {FARMERS.length} Githunguri co-op members on record</div>
          <Users className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi-label">Spoilage rate</div>
          <div className="kpi-value">{spoilageRate.toFixed(1)}%</div>
          <div className="kpi-foot">{today.spoilage} L lost today · target under 2.5%</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Avg milk density</div>
          <div className="kpi-value">1.028 g/ml</div>
          <div className="kpi-foot">KDB minimum 1.026 g/ml</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Net margin (after spoilage)</div>
          <div className="kpi-value">{kes(netMargin)}</div>
          <div className="kpi-foot">Milk cost {kes(milkCost)} @ KES {FARMER_RATE.toFixed(2)}/L</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">SACCO credit score</div>
          <div className="kpi-value">88 / 100</div>
          <div className="kpi-foot">Eligibility: Excellent</div>
        </div>
      </div>

      <div className="grid-main">
        <Panel icon={<ChartColumn {...ic} />} title="Daily Volume & Margin Tracker" sub="Last 7 days, litres">
          <div style={{ height: 330 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={WEEKLY_OPS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => `${v}L`} />
                <Tooltip formatter={(v) => `${v} L`} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Legend iconType="circle" wrapperStyle={legendStyle} />
                <Bar dataKey="retail" name="Retail channel (Milk ATM/bar)" fill={SERIES.s2} radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="bulk" name="Bulk off-taker sales" fill={SERIES.s3} radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="spoilage" name="Spoilage / losses" fill={SERIES.s4} radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Line dataKey="collections" name="Daily collections" stroke={SERIES.s1} strokeWidth={2} dot={{ r: 4, strokeWidth: 2, stroke: '#fff' }} type="monotone" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel icon={<Gauge {...ic} />} title="SACCO Credit Readiness">
          <div style={{ textAlign: 'center', margin: '4px 0 10px' }}>
            <Progress
              type="dashboard"
              percent={88}
              strokeColor={PESIRA_GREEN}
              size={160}
              format={(p) => (
                <span style={{ fontSize: 28, fontWeight: 800, color: '#111827' }}>
                  {p}
                  <span style={{ fontSize: 14, color: '#6b7280' }}>/100</span>
                </span>
              )}
            />
            <div style={{ marginTop: 2 }}>
              <StatusTag status="Excellent" /> <span style={{ color: '#6b7280', fontSize: 13 }}>eligibility status</span>
            </div>
          </div>
          <div className="kv"><span style={{ color: '#6b7280' }}>M-Pesa match rate</span><b style={{ color: '#047857' }}>96% sync</b></div>
          <div className="kv"><span style={{ color: '#6b7280' }}>Days logged (last 30)</span><b>29 / 30</b></div>
          <div className="kv"><span style={{ color: '#6b7280' }}>Avg monthly net margin</span><b>{kes(241800)}</b></div>
          <div className="kv"><span style={{ color: '#6b7280' }}>Live borrowing limit</span><b>{kes(180000)}</b></div>
          <Button type="primary" block style={{ marginTop: 14 }} icon={<Wallet size={16} />}>
            Request working capital / cooler loan
          </Button>
        </Panel>
      </div>

      <div className="grid-2">
        <Panel icon={<CalendarRange {...ic} />} title="Yesterday vs Today" sub="Litres per session">
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SESSION_COMPARE} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="session" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => `${v}L`} />
                <Tooltip formatter={(v) => `${v} L`} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Legend iconType="circle" wrapperStyle={legendStyle} />
                <Bar dataKey="yesterday" name="Yesterday" fill={SERIES.s1} radius={[4, 4, 0, 0]} maxBarSize={48} />
                <Bar dataKey="today" name="Today" fill={SERIES.s2} radius={[4, 4, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel icon={<TrendingUp {...ic} />} title="Monthly Production" sub="Litres collected, 2026">
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_PRODUCTION} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="prodFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SERIES.s1} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={SERIES.s1} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" {...axisProps} />
                <YAxis {...axisProps} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
                <Tooltip formatter={(v) => [`${num(Number(v))} L`, 'Litres']} />
                <Area dataKey="litres" type="monotone" stroke={SERIES.s1} strokeWidth={2} fill="url(#prodFill)" dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid-main">
        <Panel icon={<Users {...ic} />} title="Farmer Collections – Today" sub="Quantity, density and quality" bodyStyle={{ padding: 0 }}>
          <Table<FarmerRow> columns={farmerCols} dataSource={farmerRows} pagination={false} size="middle" scroll={{ x: 640 }} />
        </Panel>

        <Panel icon={<ShieldCheck {...ic} />} title="Spoilage & Quality Alerts">
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

      <div className="grid-2">
        <Panel icon={<Wallet {...ic} />} title="Payment & Credit (“Deni”) Reconciliation" sub="This week">
          <div className="kv"><span>M-Pesa Till payments</span><b>{kes(186450)}</b></div>
          <div className="kv"><span>Cash sales</span><b>{kes(42300)}</b></div>
          <div className="kv"><span>Customer credit (Deni) outstanding</span><b style={{ color: '#b45309' }}>{kes(176200)}</b></div>
          <div className="kv"><span>Input deductions recovered (dairy meal)</span><b>{kes(4650)}</b></div>
          <div className="kv"><span>Paid to farmers</span><b>{kes(163100)}</b></div>
          <div className="meter-row"><span style={{ color: '#6b7280' }}>Collected vs invoiced</span><span style={{ fontWeight: 600 }}>57%</span></div>
          <Progress percent={57} showInfo={false} strokeColor={PESIRA_GREEN} />
        </Panel>

        <Panel icon={<ChartColumn {...ic} />} title="Sales by Customer Category" sub="Revenue this month, KES">
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_BY_CATEGORY} layout="vertical" margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" {...axisProps} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
                <YAxis type="category" dataKey="category" {...axisProps} width={110} />
                <Tooltip formatter={(v) => [kes(Number(v)), 'Revenue']} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="revenue" fill={SERIES.s1} radius={[0, 4, 4, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}
