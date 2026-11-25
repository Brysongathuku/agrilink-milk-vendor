'use client';

import { Button } from 'antd';
import { MapPin, Pencil } from 'lucide-react';
import { PageHeader, SectionCard } from '@/components/ui';
import { COWS, DAIRY_FARMER, VENDOR } from '@/lib/dairy-data';

export default function MyFarmPage() {
  const f = DAIRY_FARMER;
  const breeds = Array.from(new Set(COWS.map((c) => c.breed))).join(', ');
  return (
    <div className="stack">
      <PageHeader
        eyebrow="Farm Management"
        title="My Farm"
        subtitle="Your farm and contact details."
        boxed={false}
        actions={<Button icon={<Pencil size={15} />}>Edit</Button>}
      />
      <div className="grid-2">
        <SectionCard title="Farmer">
          <div className="kv"><span className="muted">Name</span><b>{f.name}</b></div>
          <div className="kv"><span className="muted">Phone</span><b>{f.phone}</b></div>
          <div className="kv"><span className="muted">Co-op member no.</span><b>{f.memberNo}</b></div>
          <div className="kv"><span className="muted">Wallet client code</span><b>{f.clientCode}</b></div>
          <div className="kv"><span className="muted">Sells milk to</span><b>{VENDOR}</b></div>
          <div className="kv"><span className="muted">Collection</span><b>{f.collection}</b></div>
        </SectionCard>
        <SectionCard title="Farm">
          <div className="kv"><span className="muted">Location</span><b>{f.location}</b></div>
          <div className="kv"><span className="muted">GPS</span><b><MapPin size={13} style={{ verticalAlign: -2 }} /> {f.geo}</b></div>
          <div className="kv"><span className="muted">Size</span><b>{f.farmSize}</b></div>
          <div className="kv"><span className="muted">Fodder</span><b>{f.pasture}</b></div>
          <div className="kv"><span className="muted">Housing</span><b>{f.zeroGrazing}</b></div>
          <div className="kv"><span className="muted">Water</span><b>{f.water}</b></div>
          <div className="kv"><span className="muted">Breeds</span><b>{breeds}</b></div>
        </SectionCard>
      </div>
    </div>
  );
}
