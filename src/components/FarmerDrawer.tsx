'use client';

import Link from 'next/link';
import { Button, Drawer, Tag } from 'antd';
import { TriangleAlert } from 'lucide-react';
import type { Farmer } from '@/lib/data';
import { COWS, DAIRY_FARMER, DELIVERIES, HEALTH } from '@/lib/dairy-data';

/** What the milk vendor sees about a supplier's farm. Grace Wanjiku (F-001) has the full farm record. */
export default function FarmerDrawer({ farmer, onClose }: { farmer: Farmer | null; onClose: () => void }) {
  const full = farmer?.id === 'F-001';
  const milking = COWS.filter((c) => c.status === 'Milking');
  const breeds = Array.from(new Set(COWS.map((c) => c.breed))).join(', ');

  return (
    <Drawer title={farmer?.name} open={!!farmer} onClose={onClose} width={480}>
      {farmer && (
        <>
          <div className="muted" style={{ marginTop: -8, marginBottom: 16 }}>
            {farmer.memberNo} · {farmer.ward}, {farmer.village} · {farmer.phone}
          </div>

          {full && (
            <div style={{ display: 'flex', gap: 10, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
              <TriangleAlert size={18} color="#b45309" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 13.5 }}>
                <b>One cow on treatment.</b> Malkia&apos;s milk is withheld until 26 Nov after mastitis treatment. Keep testing this farmer&apos;s milk.
              </div>
            </div>
          )}

          <h4 className="section-title" style={{ fontSize: 15 }}>Farm</h4>
          <div className="kv"><span className="muted">Cows</span><b>{full ? `${COWS.length} (${milking.length} milking)` : `${farmer.cows} milking`}</b></div>
          {full && <div className="kv"><span className="muted">Breeds</span><b>{breeds}</b></div>}
          {full && <div className="kv"><span className="muted">Feeding</span><b>Zero-grazing, Napier + dairy meal</b></div>}
          {full && <div className="kv"><span className="muted">Farm size</span><b>{DAIRY_FARMER.farmSize}</b></div>}
          <div className="kv"><span className="muted">Collection route</span><b>{farmer.route}</b></div>

          <h4 className="section-title" style={{ fontSize: 15, marginTop: 20 }}>Milk</h4>
          <div className="kv"><span className="muted">Average a day</span><b>{farmer.avgDailyLitres} L</b></div>
          <div className="kv"><span className="muted">Average density</span><b>{farmer.avgDensity.toFixed(3)} g/ml</b></div>
          <div className="kv"><span className="muted">Last delivery</span><b>{farmer.lastDelivery}</b></div>

          {full && (
            <>
              <h4 className="section-title" style={{ fontSize: 15, marginTop: 20 }}>Recent deliveries</h4>
              {DELIVERIES.slice(0, 5).map((d) => (
                <div className="kv" key={d.ref}>
                  <span>{d.date} {d.session}</span>
                  <span><b>{d.litres} L</b> · {d.density.toFixed(3)} <Tag color={d.grade === 'A' ? 'green' : 'gold'} style={{ marginLeft: 6 }}>{d.grade}</Tag></span>
                </div>
              ))}

              <h4 className="section-title" style={{ fontSize: 15, marginTop: 20 }}>Animal health</h4>
              {HEALTH.slice(0, 3).map((h) => (
                <div className="kv" key={h.date + h.cow}>
                  <span>{h.date} · {h.cow}</span>
                  <span className="muted">{h.type}</span>
                </div>
              ))}

              <Link href="/dairy-farmer"><Button block style={{ marginTop: 20 }}>Open the farmer&apos;s view</Button></Link>
            </>
          )}
        </>
      )}
    </Drawer>
  );
}
