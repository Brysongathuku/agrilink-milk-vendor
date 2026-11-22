'use client';

import { Button, Progress, Table, type TableColumnsType } from 'antd';
import { Upload } from 'lucide-react';
import { SectionCard, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';
import { PESIRA_GREEN } from '@/lib/theme';

const FACTORS = [
  { name: 'Daily digital logging consistency', score: 97, note: '29 of the last 30 days logged' },
  { name: 'M-Pesa till reconciliation', score: 96, note: 'Sales matched to Till statements' },
  { name: 'Net margin health', score: 84, note: 'Average 23% after spoilage' },
  { name: 'Customer credit (Deni) control', score: 71, note: 'KES 176,200 outstanding, 2 accounts over 30 days' },
  { name: 'KDB compliance documents', score: 90, note: 'One medical certificate expires in 12 days' },
];

type Loan = { key: number; product: string; lender: string; limit: number; rate: string; tenor: string; status: string };
const LOANS: Loan[] = [
  { key: 1, product: 'Working capital (farmer payments)', lender: 'Kiambu Dairy SACCO', limit: 180000, rate: '1.2% / month', tenor: '6 months', status: 'Approved' },
  { key: 2, product: 'Milk chiller asset finance', lender: 'Kiambu Dairy SACCO', limit: 250000, rate: '14% p.a.', tenor: '24 months', status: 'Pending' },
  { key: 3, product: 'Milk ATM upgrade', lender: 'Pesira Partner Lender', limit: 60000, rate: '1.5% / month', tenor: '12 months', status: 'Open' },
];

const cols: TableColumnsType<Loan> = [
  { title: 'Facility', dataIndex: 'product', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Lender', dataIndex: 'lender' },
  { title: 'Limit', dataIndex: 'limit', align: 'right', render: (v: number) => kes(v) },
  { title: 'Rate', dataIndex: 'rate' },
  { title: 'Tenor', dataIndex: 'tenor' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function CreditRatingPage() {
  return (
    <div className="grid-main">
      <div className="stack">
        <SectionCard title="SACCO Credit Readiness" subtitle="Your score updates as you log collections, sales and payments every day.">
          <div style={{ display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
            <Progress
              type="dashboard"
              percent={88}
              size={200}
              strokeColor={PESIRA_GREEN}
              format={(p) => (
                <span style={{ fontSize: 36, fontWeight: 800 }}>
                  {p}
                  <span style={{ fontSize: 16, color: '#6b7280' }}>/100</span>
                </span>
              )}
            />
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="kv"><span className="muted">Eligibility status</span><StatusTag status="Excellent" /></div>
              <div className="kv"><span className="muted">Live borrowing limit</span><b>{kes(180000)}</b></div>
              <div className="kv"><span className="muted">M-Pesa match rate</span><b style={{ color: '#047857' }}>96% sync</b></div>
              <div className="kv"><span className="muted">Last updated</span><b>21 Nov 2026, 07:30</b></div>
            </div>
          </div>
        </SectionCard>
        <SectionCard title="What drives your score">
          {FACTORS.map((f) => (
            <div key={f.name} style={{ marginBottom: 12 }}>
              <div className="meter-row"><span className="strong">{f.name}</span><span>{f.score}</span></div>
              <Progress percent={f.score} showInfo={false} strokeColor={f.score >= 85 ? PESIRA_GREEN : '#eda100'} />
              <div className="muted" style={{ fontSize: 12.5 }}>{f.note}</div>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Credit facilities">
          <Table<Loan> columns={cols} dataSource={LOANS} pagination={false} />
        </SectionCard>
      </div>
      <div className="stack">
        <div className="card" style={{ background: '#1c1c1c', color: '#fff', border: 0 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>Credit Rating</h3>
          <p style={{ color: '#d1d5db', marginTop: 8 }}>View and manage your credit rating information</p>
          <Button size="large" icon={<Upload size={18} />}>Upload Documents</Button>
        </div>
        <div className="card" style={{ background: '#f0fdf7', borderColor: '#bbf0d9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <b style={{ color: '#047857', fontSize: 16 }}>Pesira Credit Score</b>
            <StatusTag status="Good" />
          </div>
          <div className="muted" style={{ fontWeight: 700, fontSize: 12, letterSpacing: 1, margin: '12px 0 6px' }}>TIPS TO IMPROVE</div>
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8, fontSize: 14 }}>
            <li>Collect overdue Deni from Githiga Primary School</li>
            <li>Renew handler medical certificate before 3 Dec</li>
            <li>Keep spoilage under 2.5% of daily collections</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
