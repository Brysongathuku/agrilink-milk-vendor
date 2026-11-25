'use client';

import { useState } from 'react';
import { Segmented, Tag } from 'antd';
import { Circle, CircleCheck, Clock } from 'lucide-react';
import { PageHeader, StatCard, Stats } from '@/components/ui';

type Step = { stage: string; when: string; detail: string; meta?: string; state: 'done' | 'now' | 'next' };
type Trace = { title: string; tags: { label: string; color?: string }[]; stats: { label: string; value: string; foot?: string }[]; steps: Step[] };

const TRACES: Record<string, Trace> = {
  'ORD-2611-013': {
    title: 'Order ORD-2611-013 · Eastleigh Prime Butchery',
    tags: [{ label: 'Local' }, { label: 'Goat', color: 'green' }, { label: '14-day credit', color: 'blue' }],
    stats: [
      { label: 'Meat ordered', value: '200 kg' },
      { label: 'Goats used', value: '16', foot: 'Batch BT-2611-08' },
      { label: 'Dressing %', value: '46.2%', foot: '446 kg live → 206.1 kg hot carcass' },
      { label: 'Invoice', value: 'KES 164,000', foot: 'Due 09 Dec 2026' },
    ],
    steps: [
      { stage: 'Order received', when: '22 Nov 2026, 10:15', detail: '200 kg goat carcass for delivery on 25 Nov at 06:00.', meta: 'ORD-2611-013', state: 'done' },
      { stage: 'Planned', when: '22 Nov 2026, 10:20', detail: 'At a 43% yield the order needs about 465 kg live, or 16 goats. Slaughter set for 24 Nov at 14:00.', state: 'done' },
      { stage: 'Bought', when: '23 Nov 2026, 09:40', detail: '16 goats (478 kg live) from Fatuma Ali Noor at Garissa livestock market. KES 138,600 sent to her Pesira e-wallet.', meta: 'Batch BT-2611-08', state: 'done' },
      { stage: 'Received & tagged', when: '23 Nov 2026, 15:05', detail: 'Tags KE-GRS-G-04220 to 04235. Sent straight to lairage (no feedlot).', meta: 'GRN-2611-034', state: 'done' },
      { stage: 'Lairage', when: '23–24 Nov 2026', detail: 'Entry weight 446 kg (6.7% shrinkage). All 16 passed ante-mortem.', meta: 'Lairage A · Dr. Mohamed Dahir', state: 'done' },
      { stage: 'Issued to production', when: '24 Nov 2026, 13:30', detail: '16 goats issued from stores to the slaughter floor.', meta: 'ISN-2611-044', state: 'done' },
      { stage: 'Slaughtered', when: '24 Nov 2026, 14:00–15:10', detail: 'Hot carcass 206.1 kg (46.2%). Offals 51 kg worth KES 10,200. Nothing condemned.', meta: 'SL-2611-0950 to 0965 · Stamp DVS-GRS-014', state: 'done' },
      { stage: 'Chilled & stored', when: '24 Nov 2026, 15:40', detail: 'Cold weight 201.8 kg after chilling (2.1% loss).', meta: 'Chiller 1 · PRN-2611-052', state: 'done' },
      { stage: 'Dispatched', when: '24 Nov 2026, 22:00', detail: '200 kg loaded at 2.0 °C on reefer van KDB 902K.', meta: 'DSP-2611-040 · Ibrahim Hussein', state: 'done' },
      { stage: 'Delivered', when: '25 Nov 2026, 05:52', detail: 'Received and signed for at Eastleigh, eight minutes early.', state: 'done' },
      { stage: 'Invoiced', when: '25 Nov 2026, 07:00', detail: '200 kg × KES 820 = KES 164,000 on 14-day terms.', meta: 'INV-AB-2611-08', state: 'now' },
      { stage: 'Payment due', when: '09 Dec 2026', detail: 'Waiting for payment.', state: 'next' },
    ],
  },
  'KE-WJR-G-02540': {
    title: 'Goat KE-WJR-G-02540 · Male, 20 months',
    tags: [{ label: 'Export', color: 'green' }, { label: 'Goat', color: 'green' }, { label: 'Wajir' }],
    stats: [
      { label: 'Live weight', value: '29 kg', foot: 'At purchase' },
      { label: 'Dressing %', value: '43.8%', foot: '27.6 kg → 12.1 kg hot carcass' },
      { label: 'Total cost', value: 'KES 9,820', foot: 'Purchase to dispatch' },
      { label: 'Profit', value: 'KES 1,806', foot: 'Carcass + offals' },
    ],
    steps: [
      { stage: 'Bought', when: '19 Nov 2026', detail: 'From Halima Abdullahi Omar, Tarbaj, Wajir (2.2167, 40.1500). 29 kg live at KES 280/kg = KES 8,120.', meta: 'Batch BT-2611-04', state: 'done' },
      { stage: 'Received & tagged', when: '20 Nov 2026', detail: 'Tagged on arrival. Movement permit checked.', meta: 'GRN-2611-029', state: 'done' },
      { stage: 'Lairage', when: '21 Nov 2026', detail: 'Entry weight 27.6 kg (4.8% shrinkage). Passed ante-mortem.', meta: 'Dr. Asha Kalicha', state: 'done' },
      { stage: 'Slaughtered', when: '22 Nov 2026', detail: 'Hot carcass 12.1 kg (43.8%). Offals 3.1 kg, KES 620.', meta: 'SL-2611-0902 · Stamp DVS-GRS-009', state: 'done' },
      { stage: 'Chilled & stored', when: '22 Nov 2026', detail: 'Cold weight 11.85 kg. Reserved for the Dubai export order.', meta: 'Chiller 1 · EXP-2611-07', state: 'done' },
      { stage: 'Export documents', when: '24 Nov 2026', detail: 'Export permit, Halal certificate and certificate of origin ready. Veterinary health certificate pending.', meta: 'SHP-2611-07', state: 'now' },
      { stage: 'Shipped', when: '27 Nov 2026, 02:15', detail: 'Air freight JKIA → Dubai.', meta: 'AWB 176-4410 2286', state: 'next' },
      { stage: 'Invoiced & paid', when: 'Due 30 days after shipping', detail: 'Al Noor Foods Trading LLC, USD 7.20/kg.', state: 'next' },
    ],
  },
};

export default function TracePage() {
  const [key, setKey] = useState<string>('ORD-2611-013');
  const t = TRACES[key];

  return (
    <div className="stack">
      <PageHeader eyebrow="Orders & Planning" title="Trace an Order or Animal" subtitle="Follow an order or a single animal from the market to payment." boxed={false} />

      <Segmented
        size="large"
        value={key}
        onChange={(v) => setKey(v as string)}
        options={[
          { value: 'ORD-2611-013', label: 'Order ORD-2611-013' },
          { value: 'KE-WJR-G-02540', label: 'Tag KE-WJR-G-02540' },
        ]}
      />

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#111827' }}>{t.title}</h2>
          <div>
            {t.tags.map((g) => (
              <Tag key={g.label} color={g.color}>{g.label}</Tag>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <Stats>
            {t.stats.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} foot={s.foot} />
            ))}
          </Stats>
        </div>
      </div>

      <div className="card">
        <div className="trace">
          {t.steps.map((s) => (
            <div key={s.stage} className={`trace-step ${s.state}`}>
              <div className="trace-dot">
                {s.state === 'done' ? <CircleCheck size={20} /> : s.state === 'now' ? <Clock size={20} /> : <Circle size={20} />}
              </div>
              <div className="trace-body">
                <div className="trace-head">
                  <span className="trace-stage">{s.stage}</span>
                  <span className="trace-when">{s.when}</span>
                </div>
                <div className="trace-detail">{s.detail}</div>
                {s.meta && <div className="trace-meta">{s.meta}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
