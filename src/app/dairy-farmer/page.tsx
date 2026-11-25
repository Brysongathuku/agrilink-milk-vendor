'use client';

import Link from 'next/link';
import { Button } from 'antd';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CircleCheck, Milk, TriangleAlert, Users, Wallet, ChartColumn, Bell } from 'lucide-react';
import { Panel } from '@/components/ui';
import { COWS, DAIRY_FARMER, DELIVERIES, VENDOR, WEEK_MILK } from '@/lib/dairy-data';
import { kes } from '@/lib/format';
import { ICON_GREEN, SERIES } from '@/lib/theme';

const axisProps = { stroke: '#9ca3af', fontSize: 12, tickLine: false, axisLine: false } as const;
const ic = { size: 20, color: ICON_GREEN, strokeWidth: 1.8 };

const milking = COWS.filter((c) => c.status === 'Milking');
const today = WEEK_MILK[WEEK_MILK.length - 1];
const week = WEEK_MILK.reduce((s, d) => s + d.delivered, 0);

const ALERTS = [
  { level: 'warn', title: "Malkia's milk is on hold", body: 'Mastitis treatment. Keep her milk separate until 26 Nov.' },
  { level: 'warn', title: 'Dairy meal running low', body: '2 bags left, about 10 days. Order from the marketplace or your milk vendor.' },
  { level: 'ok', title: 'Furaha is due to calve on 12 Dec', body: 'Move her to the calving pen a week before.' },
  { level: 'ok', title: 'Rain expected Friday and Saturday', body: 'Cut and store Napier grass on Thursday.' },
];

export default function DairyOverview() {
  return (
    <div className="stack">
      <div className="an-head">
        <div>
          <h1 className="an-title">Habari, Grace</h1>
          <p className="an-sub">Here&apos;s how your farm is doing today.</p>
        </div>
      </div>

      <div className="tiles">
        <div className="tile teal">
          <div className="tile-title">Milk Yesterday</div>
          <div className="tile-value">{today.produced} L</div>
          <div className="tile-foot">{today.delivered} L delivered to {VENDOR}</div>
          <Milk className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
        <div className="tile orange">
          <div className="tile-title">Wallet Balance</div>
          <div className="tile-value">{kes(DAIRY_FARMER.walletBalance)}</div>
          <div className="tile-foot">{kes(DAIRY_FARMER.pendingMilk)} on the way for 64 L</div>
          <Wallet className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
        <div className="tile blue">
          <div className="tile-title">Cows Milking</div>
          <div className="tile-value">{milking.length} of {COWS.length}</div>
          <div className="tile-foot">1 dry, 1 in-calf heifer, 1 heifer, 1 calf</div>
          <Users className="tile-icon" size={56} strokeWidth={1.4} />
        </div>
      </div>

      <div className="kpis">
        <div className="kpi"><div className="kpi-label">Delivered this week</div><div className="kpi-value">{week} L</div></div>
        <div className="kpi"><div className="kpi-label">Milk quality</div><div className="kpi-value">Grade A</div><div className="kpi-foot">Average density 1.029 g/ml</div></div>
        <div className="kpi"><div className="kpi-label">Price per litre</div><div className="kpi-value">KES 49.50</div><div className="kpi-foot">Paid daily to your wallet</div></div>
        <div className="kpi"><div className="kpi-label">Best cow</div><div className="kpi-value">Neema</div><div className="kpi-foot">18 L a day</div></div>
      </div>

      <div className="grid-main">
        <Panel icon={<ChartColumn {...ic} />} title="Milk This Week" sub="Litres">
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK_MILK} margin={{ top: 10, right: 10, left: -16, bottom: 0 }} barGap={2}>
                <CartesianGrid vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip formatter={(v) => `${v} L`} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13, color: '#374151' }} />
                <Bar dataKey="produced" name="Milked" fill={SERIES.s1} radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="delivered" name="Delivered" fill={SERIES.s2} radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel icon={<Bell {...ic} />} title="Reminders">
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

      <Panel icon={<Milk {...ic} />} title="Latest deliveries" sub={VENDOR}>
        {DELIVERIES.slice(0, 4).map((d) => (
          <div className="kv" key={d.ref}>
            <span>{d.date} · {d.session === 'AM' ? 'Morning' : 'Evening'}</span>
            <span><b>{d.litres} L</b> <span className="muted">· {d.density.toFixed(3)} · Grade {d.grade} · {d.status}</span></span>
          </div>
        ))}
        <div style={{ marginTop: 14 }}>
          <Link href="/dairy-farmer/milk-records"><Button>See all milk records</Button></Link>
        </div>
      </Panel>
    </div>
  );
}
