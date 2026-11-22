'use client';

import { Button, Table, type TableColumnsType } from 'antd';
import { Download, Eye, Plus } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';

type Estimate = { no: string; customer: string; item: string; issue: string; expiry: string; status: string; total: number };

const ROWS: Estimate[] = [
  { no: 'EST-0107', customer: 'Kanjai Hill Academy', item: '80 L/day × 20 school days', issue: '21 Nov 2026', expiry: '05 Dec 2026', status: 'Sent', total: 108800 },
  { no: 'EST-0106', customer: 'Kimbo Gardens Hotel', item: '45 L/day, December peak', issue: '19 Nov 2026', expiry: '03 Dec 2026', status: 'Accepted', total: 100440 },
  { no: 'EST-0105', customer: 'Highland Dairies Ltd', item: '7,500 L monthly bulk', issue: '15 Nov 2026', expiry: '29 Nov 2026', status: 'Accepted', total: 487500 },
  { no: 'EST-0104', customer: 'Kiambu Road Mini-Mart', item: '35 L/day pasteurised 500 ml', issue: '12 Nov 2026', expiry: '26 Nov 2026', status: 'Pending', total: 73500 },
  { no: 'EST-0103', customer: 'Githiga Primary School', item: 'Term 1 2027 supply', issue: '10 Nov 2026', expiry: '10 Dec 2026', status: 'Draft', total: 244800 },
  { no: 'EST-0102', customer: 'Green Valley Supermarket', item: 'Mala 500 ml × 600', issue: '05 Nov 2026', expiry: '19 Nov 2026', status: 'Expired', total: 72000 },
  { no: 'EST-0101', customer: 'Mama Njeri Household', item: '3 L/day monthly plan', issue: '01 Nov 2026', expiry: '15 Nov 2026', status: 'Accepted', total: 7200 },
];

const cols: TableColumnsType<Estimate> = [
  { title: '#', render: (_v, _r, i) => i + 1, width: 50 },
  { title: 'Est. No.', dataIndex: 'no', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Customer', dataIndex: 'customer', render: (v: string, r) => <>{v}<div className="muted" style={{ fontSize: 12 }}>{r.item}</div></> },
  { title: 'Issue Date', dataIndex: 'issue' },
  { title: 'Expiry Date', dataIndex: 'expiry' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Total', dataIndex: 'total', align: 'right', render: (v: number) => <b>{kes(v)}</b> },
  { title: 'Actions', render: () => <Button size="small" icon={<Eye size={14} />}>View</Button> },
];

export default function EstimatesPage() {
  const total = ROWS.reduce((s, r) => s + r.total, 0);
  return (
    <div className="stack">
      <PageHeader title="Estimates" subtitle="Create and manage your milk supply estimates" actions={<Button type="primary" size="large" icon={<Plus size={18} />}>Create Estimate</Button>} />
      <Stats>
        <StatCard label="Total Estimates Value" value={kes(total)} />
        <StatCard label="Today's Estimates" value={kes(108800)} />
        <StatCard label="Number of Estimates" value={ROWS.length} />
      </Stats>
      <SectionCard>
        <div className="toolbar">
          <Button>Filters</Button>
          <Button>Clear Filters</Button>
          <div className="spacer" />
          <Button icon={<Download size={16} />}>Download CSV</Button>
        </div>
        <Table<Estimate> rowKey="no" columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 900 }} />
      </SectionCard>
    </div>
  );
}
