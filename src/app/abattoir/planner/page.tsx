'use client';

import { useState } from 'react';
import { InputNumber, Segmented, Table, Tag, type TableColumnsType } from 'antd';
import { Calculator } from 'lucide-react';
import { PageHeader, Panel } from '@/components/ui';
import { SPECIES, SPECIES_COLORS, SPECIES_INFO, type Species } from '@/lib/abattoir-data';
import { kes, num } from '@/lib/format';
import { ICON_GREEN } from '@/lib/theme';

type Row = { species: Species };

export default function LiveAnimalPlanner() {
  const [species, setSpecies] = useState<Species>('Goat');
  const [kg, setKg] = useState<number>(200);
  const info = SPECIES_INFO[species];
  const [yieldPct, setYieldPct] = useState<number>(info.yield * 100);

  const y = yieldPct / 100;
  const live = y > 0 ? kg / y : 0;
  const animals = Math.ceil(live / info.avgLive);
  const buyCost = live * info.livePrice;
  const localValue = kg * info.localCarcass;

  const cols: TableColumnsType<Row> = [
    { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
    { title: 'Expected yield', render: (_v, r) => `${Math.round(SPECIES_INFO[r.species].yield * 100)}%` },
    { title: 'Avg live weight', align: 'right', render: (_v, r) => `${SPECIES_INFO[r.species].avgLive} kg` },
    { title: 'Live price', align: 'right', render: (_v, r) => `${kes(SPECIES_INFO[r.species].livePrice)}/kg` },
    { title: 'Local carcass price', align: 'right', render: (_v, r) => `${kes(SPECIES_INFO[r.species].localCarcass)}/kg` },
    { title: 'Export price (FOB)', align: 'right', render: (_v, r) => `USD ${SPECIES_INFO[r.species].exportUsd.toFixed(2)}/kg` },
  ];

  return (
    <div className="stack">
      <PageHeader eyebrow="Orders & Planning" title="Live Animal Planner" subtitle="Work out how many live animals to buy to fill an order. Example: 200 kg of goat meat at a 43% yield needs about 465 kg of live goats." boxed={false} />
      <div className="grid-main">
        <Panel icon={<Calculator size={20} color={ICON_GREEN} />} title="Order calculator">
          <div style={{ marginBottom: 16 }}>
            <div className="stat-label" style={{ marginBottom: 6 }}>Species</div>
            <Segmented
              value={species}
              options={SPECIES}
              onChange={(v) => {
                const s = v as Species;
                setSpecies(s);
                setYieldPct(SPECIES_INFO[s].yield * 100);
              }}
            />
          </div>
          <div className="grid-2" style={{ gap: 16 }}>
            <div>
              <div className="stat-label" style={{ marginBottom: 6 }}>Meat ordered (kg)</div>
              <InputNumber size="large" min={1} value={kg} onChange={(v) => setKg(Number(v) || 0)} style={{ width: '100%' }} />
            </div>
            <div>
              <div className="stat-label" style={{ marginBottom: 6 }}>Expected yield (%)</div>
              <InputNumber size="large" min={1} max={100} step={0.5} value={yieldPct} onChange={(v) => setYieldPct(Number(v) || 0)} style={{ width: '100%' }} />
            </div>
          </div>
          <div className="kpis" style={{ marginTop: 20 }}>
            <div className="kpi"><div className="kpi-label">Live weight to buy</div><div className="kpi-value">{num(Math.round(live))} kg</div></div>
            <div className="kpi"><div className="kpi-label">Animals needed</div><div className="kpi-value">≈ {num(animals)}</div><div className="kpi-foot">at {info.avgLive} kg average</div></div>
            <div className="kpi"><div className="kpi-label">Estimated buying cost</div><div className="kpi-value">{kes(Math.round(buyCost))}</div><div className="kpi-foot">{kes(info.livePrice)}/kg live</div></div>
            <div className="kpi"><div className="kpi-label">Order value (local)</div><div className="kpi-value">{kes(Math.round(localValue))}</div><div className="kpi-foot">before transport, feed and slaughter costs</div></div>
          </div>
        </Panel>
        <Panel title="How it works">
          <div className="kv"><span>Live weight</span><b>Meat ordered ÷ yield</b></div>
          <div className="kv"><span>Animals</span><b>Live weight ÷ average live weight</b></div>
          <div className="kv"><span>Buying cost</span><b>Live weight × live price</b></div>
          <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
            Yields and prices come from the species settings below and can be adjusted per order. Actual dressing % from the Slaughter page updates these over time.
          </p>
        </Panel>
      </div>
      <Panel title="Species settings" bodyStyle={{ padding: 0 }}>
        <Table<Row> rowKey="species" columns={cols} dataSource={SPECIES.map((s) => ({ species: s }))} pagination={false} scroll={{ x: 760 }} />
      </Panel>
    </div>
  );
}
