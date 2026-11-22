'use client';

import { Button, Input, Table, Tag, type TableColumnsType } from 'antd';
import { Download, Filter, Plus, Search, RotateCcw } from 'lucide-react';
import { Hero, PageHeader, SectionCard } from '@/components/ui';

type Supplier = { id: string; name: string; type: string; contact: string; phone: string; chains: string[]; location: string; rating: string };

const ROWS: Supplier[] = [
  { id: 'SP-01', name: 'Grace Wanjiku', type: 'Farmer', contact: 'Grace Wanjiku', phone: '+254 712 438 901', chains: ['Raw milk'], location: 'Githunguri, Kanjai', rating: 'Excellent' },
  { id: 'SP-02', name: 'Esther Nyokabi', type: 'Farmer', contact: 'Esther Nyokabi', phone: '+254 701 662 109', chains: ['Raw milk'], location: 'Ikinu, Gathangari', rating: 'Excellent' },
  { id: 'SP-03', name: 'Kanjai Dairy Farmers Group', type: 'Farmer group', contact: 'John Muriuki (Chair)', phone: '+254 722 610 845', chains: ['Raw milk'], location: 'Kanjai', rating: 'Good' },
  { id: 'SP-04', name: 'Samuel Gitonga', type: 'Farmer', contact: 'Samuel Gitonga', phone: '+254 768 114 590', chains: ['Raw milk'], location: 'Githunguri, Kiairia', rating: 'Good' },
  { id: 'SP-05', name: 'Ngewa Feeds & Vet', type: 'Input supplier', contact: 'Dr. Ruth Kibe', phone: '+254 733 902 117', chains: ['Dairy meal', 'Mineral salts'], location: 'Ngewa', rating: 'Good' },
  { id: 'SP-06', name: 'Kiambu Packaging Supplies', type: 'Input supplier', contact: 'Sales desk', phone: '+254 709 448 220', chains: ['Milk pouches', 'Labels'], location: 'Githunguri Town', rating: 'Fair' },
  { id: 'SP-07', name: 'Peter Kariuki', type: 'Farmer', contact: 'Peter Kariuki', phone: '+254 733 208 516', chains: ['Raw milk'], location: 'Komothai, Kambui', rating: 'Fair' },
];

const cols: TableColumnsType<Supplier> = [
  { title: '#', render: (_v, _r, i) => i + 1, width: 50 },
  { title: 'Supplier Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name), render: (v: string, r) => <><span className="strong">{v}</span><div className="muted" style={{ fontSize: 12 }}>{r.type}</div></> },
  { title: 'Contact Info', render: (_v, r) => <>{r.contact}<div className="muted" style={{ fontSize: 12 }}>{r.phone}</div></> },
  { title: 'Value Chains', dataIndex: 'chains', render: (v: string[]) => v.map((c) => <Tag key={c} color="green">{c}</Tag>) },
  { title: 'Location', dataIndex: 'location' },
  { title: 'Performance', dataIndex: 'rating', render: (v: string) => <Tag color={v === 'Excellent' ? 'green' : v === 'Good' ? 'blue' : 'gold'}>{v}</Tag> },
  { title: 'Actions', render: () => <Button size="small">View</Button> },
];

export default function SuppliersPage() {
  return (
    <div className="stack">
      <PageHeader eyebrow="AgriLink · Sourcing" title="Supplier and Farmer Database" subtitle="Track sourcing partners and their performance" boxed={false} />
      <Hero chips={[{ value: 7, label: 'Partners' }, { value: 4, label: 'Value chains' }, { value: 7, label: 'Buyers' }, { value: 2, label: 'New (30d)' }]} />
      <SectionCard>
        <div className="toolbar">
          <Input size="large" prefix={<Search size={16} color="#9ca3af" />} placeholder="Search suppliers" style={{ maxWidth: 320 }} />
          <Button icon={<Filter size={16} />}>Filters</Button>
          <Button icon={<RotateCcw size={16} />}>Reset</Button>
          <Button icon={<Download size={16} />}>Download</Button>
          <div className="spacer" />
          <Button type="primary" size="large" icon={<Plus size={18} />}>Add New Supplier</Button>
        </div>
        <Table<Supplier> rowKey="id" columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 900 }} />
      </SectionCard>
    </div>
  );
}
