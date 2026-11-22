'use client';

import { Button, Table, type TableColumnsType } from 'antd';
import { Download, Eye, Plus } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats } from '@/components/ui';
import { kes } from '@/lib/format';

type ReceiptRow = { no: string; customer: string; invoice: string; amount: number; method: string; date: string };

const ROWS: ReceiptRow[] = [
  { no: 'RCT-0907', customer: 'Green Valley Supermarket', invoice: 'INV-2611-05', amount: 40400, method: 'M-Pesa Till · TKK8F1A2LP', date: '21 Nov 2026' },
  { no: 'RCT-0906', customer: 'Kimbo Gardens Hotel', invoice: 'INV-2611-04', amount: 35460, method: 'M-Pesa Till · TKJ2R7C9QZ', date: '20 Nov 2026' },
  { no: 'RCT-0905', customer: 'Githiga Primary School', invoice: 'INV-2611-06', amount: 50400, method: 'Bank transfer', date: '18 Nov 2026' },
  { no: 'RCT-0904', customer: 'Kanjai Hill Academy', invoice: 'INV-2611-02', amount: 108800, method: 'Bank transfer', date: '15 Nov 2026' },
  { no: 'RCT-0903', customer: 'Highland Dairies Ltd', invoice: 'INV-2611-01', amount: 487500, method: 'Bank transfer', date: '14 Nov 2026' },
  { no: 'RCT-0902', customer: 'Kiambu Road Mini-Mart', invoice: 'INV-2611-03', amount: 12600, method: 'Cash', date: '10 Nov 2026' },
  { no: 'RCT-0901', customer: 'Mama Njeri Household', invoice: '—', amount: 7200, method: 'M-Pesa Till · TKD9P3M1XE', date: '01 Nov 2026' },
];

const cols: TableColumnsType<ReceiptRow> = [
  { title: '#', render: (_v, _r, i) => i + 1, width: 50 },
  { title: 'Receipt No.', dataIndex: 'no', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Customer', dataIndex: 'customer' },
  { title: 'Invoice ID', dataIndex: 'invoice' },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number) => <b>{kes(v)}</b> },
  { title: 'Payment Method', dataIndex: 'method' },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Actions', render: () => <Button size="small" icon={<Eye size={14} />}>View</Button> },
];

export default function ReceiptsPage() {
  const total = ROWS.reduce((s, r) => s + r.amount, 0);
  return (
    <div className="stack">
      <PageHeader title="Receipts" subtitle="Track all your received payments" actions={<Button type="primary" size="large" icon={<Plus size={18} />}>Record Receipt</Button>} />
      <Stats>
        <StatCard label="Total Received" value={kes(total)} color="#047857" />
        <StatCard label="Today's Receipts" value={kes(40400)} />
        <StatCard label="Number of Receipts" value={ROWS.length} />
      </Stats>
      <SectionCard>
        <div className="toolbar">
          <Button>Filters</Button>
          <Button>Clear Filters</Button>
          <div className="spacer" />
          <Button icon={<Download size={16} />}>Download CSV</Button>
        </div>
        <Table<ReceiptRow> rowKey="no" columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 900 }} />
      </SectionCard>
    </div>
  );
}
