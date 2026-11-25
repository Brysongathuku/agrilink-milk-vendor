'use client';

import { CircleCheck, Clock } from 'lucide-react';
import { PageHeader, StatCard, Stats } from '@/components/ui';
import { VENDOR } from '@/lib/dairy-data';

const STEPS = [
  { state: 'done', stage: 'Milked on the farm', when: '25 Nov 2026, 05:30', detail: '37 L from Neema, Baraka, Zawadi and Bahati. Malkia’s milk kept aside (treatment).', meta: 'Grace Wanjiku · Kanjai, Githunguri' },
  { state: 'done', stage: 'Collected and tested', when: '25 Nov 2026, 06:40', detail: 'Lactometer 1.029 g/ml, alcohol test negative. Graded A.', meta: `Kanjai collection point · ${VENDOR}` },
  { state: 'done', stage: 'Cooled', when: '25 Nov 2026, 07:30', detail: 'Mixed with milk from 5 other farmers and cooled to 4 °C.', meta: 'Lot LOT-MK-2511-AM · Cooler 1 – Kanjai' },
  { state: 'done', stage: 'Sold', when: '25 Nov 2026, 08:00', detail: 'Part of the lot went to Green Valley Supermarket and the rest to the Milk ATM in Githunguri Town.', meta: 'DLV-2611-02 · Milk ATM sales' },
  { state: 'now', stage: 'Payment to Grace', when: 'Today, by 18:00', detail: '37 L × KES 49.50 = KES 1,831.50, paid to her farm wallet.', meta: 'Receipt MC-26112501' },
] as const;

export default function FarmToForkPage() {
  return (
    <div className="stack">
      <PageHeader eyebrow="Farm Management" title="Farm to Fork" subtitle="Where this morning's milk went." boxed={false} />
      <Stats>
        <StatCard label="Milk delivered" value="37 L" foot="Morning, 25 Nov" />
        <StatCard label="Quality" value="Grade A" foot="1.029 g/ml" />
        <StatCard label="Buyer" value="Milk vendor" foot={VENDOR} />
        <StatCard label="Payment" value="KES 1,831.50" foot="Due today" />
      </Stats>
      <div className="card">
        <div className="trace">
          {STEPS.map((s) => (
            <div key={s.stage} className={`trace-step ${s.state}`}>
              <div className="trace-dot">{s.state === 'done' ? <CircleCheck size={20} /> : <Clock size={20} />}</div>
              <div className="trace-body">
                <div className="trace-head">
                  <span className="trace-stage">{s.stage}</span>
                  <span className="trace-when">{s.when}</span>
                </div>
                <div className="trace-detail">{s.detail}</div>
                <div className="trace-meta">{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
