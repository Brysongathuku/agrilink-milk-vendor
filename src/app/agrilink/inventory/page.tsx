'use client';

import { Button, Progress, Select, Table, type TableColumnsType } from 'antd';
import { Download, Filter, Plus, RotateCcw } from 'lucide-react';
import { Hero, PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { PESIRA_GREEN } from '@/lib/theme';

type Item = { key: number; chain: string; stock: string; fill: number; suppliers: number; quality: string; latest: string; status: string };

const ROWS: Item[] = [
  { key: 1, chain: 'Raw milk – morning (cooled)', stock: '312 L', fill: 62, suppliers: 6, quality: '1.029 g/ml · Grade A', latest: '21 Nov, 07:20', status: 'Healthy' },
  { key: 2, chain: 'Raw milk – evening (cooled)', stock: '168 L', fill: 34, suppliers: 5, quality: '1.028 g/ml · Grade A', latest: '20 Nov, 17:45', status: 'Healthy' },
  { key: 3, chain: 'Mala (fermenting)', stock: '64 L', fill: 64, suppliers: 1, quality: 'pH 4.5', latest: '19 Nov, 10:00', status: 'Healthy' },
  { key: 4, chain: 'Dairy meal 70 kg (for farmers)', stock: '6 bags', fill: 20, suppliers: 1, quality: '—', latest: '10 Nov, 14:00', status: 'Low stock' },
  { key: 5, chain: 'Milk pouches 500 ml', stock: '1,200 pcs', fill: 48, suppliers: 1, quality: 'Food-grade', latest: '12 Nov, 11:30', status: 'Healthy' },
  { key: 6, chain: 'SteriScrub sanitizer', stock: '10 L', fill: 15, suppliers: 1, quality: '—', latest: '14 Nov, 09:10', status: 'Low stock' },
  { key: 7, chain: 'Alcohol test reagent', stock: '0 L', fill: 0, suppliers: 1, quality: '—', latest: '28 Oct, 08:00', status: 'Critical' },
];

const cols: TableColumnsType<Item> = [
  { title: '#', dataIndex: 'key', width: 50 },
  { title: 'Value Chain', dataIndex: 'chain', render: (v: string) => <span className="strong">{v}</span> },
  {
    title: 'Total Stock',
    dataIndex: 'stock',
    render: (v: string, r) => (
      <div style={{ minWidth: 120 }}>
        {v}
        <Progress percent={r.fill} size="small" showInfo={false} strokeColor={r.fill < 25 ? '#eb6834' : PESIRA_GREEN} />
      </div>
    ),
  },
  { title: 'Suppliers', dataIndex: 'suppliers', align: 'center' },
  { title: 'Avg Quality', dataIndex: 'quality' },
  { title: 'Latest Delivery', dataIndex: 'latest' },
  { title: 'Stock Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Actions', render: () => <Button size="small">Adjust</Button> },
];

export default function InventoryPage() {
  return (
    <div className="stack">
      <PageHeader eyebrow="AgriLink · Inventory" title="Stock" subtitle="Track milk and supplies in stock." boxed={false} />
      <Hero chips={[{ value: 7, label: 'Materials' }, { value: 1, label: 'Critical' }, { value: 2, label: 'Low stock' }, { value: 4, label: 'Healthy' }]} />
      <SectionCard>
        <div className="toolbar">
          <Select size="large" defaultValue="all" style={{ width: 240 }} options={[{ value: 'all', label: 'All Materials' }, { value: 'milk', label: 'Raw milk' }, { value: 'inputs', label: 'Farm inputs' }, { value: 'pack', label: 'Packaging & hygiene' }]} />
          <Button icon={<Filter size={16} />}>Filters</Button>
          <Button icon={<RotateCcw size={16} />}>Reset</Button>
          <Button icon={<Download size={16} />}>Download</Button>
          <div className="spacer" />
          <Button type="primary" size="large" icon={<Plus size={18} />}>Add New Material</Button>
        </div>
        <Table<Item> columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>
    </div>
  );
}
