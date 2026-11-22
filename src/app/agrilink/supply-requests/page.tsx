'use client';

import { Button, Input, Table, Tag, type TableColumnsType } from 'antd';
import { FileText, RefreshCw, Search, RotateCcw } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { CATEGORY_COLORS, type CustomerCategory } from '@/lib/data';

type Req = { id: string; chain: string; corporate: string; category: CustomerCategory; qty: number; deadline: string; status: string };

const ROWS: Req[] = [
  { id: 'SR-101', chain: 'Dairy – raw milk (cooled)', corporate: 'Highland Dairies Ltd', category: 'Off-takers/FMCG', qty: 7500, deadline: '30 Nov 2026', status: 'Accepted' },
  { id: 'SR-102', chain: 'Dairy – raw milk', corporate: 'Mlima Foods (yoghurt)', category: 'Off-takers/FMCG', qty: 9000, deadline: '15 Dec 2026', status: 'Pending' },
  { id: 'SR-103', chain: 'Dairy – pasteurised 500 ml', corporate: 'Summit Fresh Supermarkets', category: 'Supermarkets', qty: 4500, deadline: '05 Dec 2026', status: 'Pending' },
  { id: 'SR-104', chain: 'Dairy – fresh milk', corporate: 'Ikinu Boys High School', category: 'Schools', qty: 2400, deadline: '06 Jan 2027', status: 'Open' },
  { id: 'SR-105', chain: 'Dairy – fresh milk', corporate: 'Ruaka Ridge Lodge', category: 'Hotels', qty: 1200, deadline: '20 Dec 2026', status: 'Open' },
  { id: 'SR-106', chain: 'Dairy – mala', corporate: 'Green Valley Supermarket', category: 'Supermarkets', qty: 600, deadline: '28 Nov 2026', status: 'Rejected' },
  { id: 'SR-107', chain: 'Dairy – raw milk', corporate: 'Highland Dairies Ltd', category: 'Off-takers/FMCG', qty: 7000, deadline: '31 Oct 2026', status: 'Completed' },
];

const cols: TableColumnsType<Req> = [
  { title: '#', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Value Chain', dataIndex: 'chain', sorter: (a, b) => a.chain.localeCompare(b.chain) },
  { title: 'Corporate', dataIndex: 'corporate', render: (v: string, r) => <>{v} <Tag color={CATEGORY_COLORS[r.category]}>{r.category}</Tag></> },
  { title: 'Quantity (L)', dataIndex: 'qty', align: 'right', render: (v: number) => v.toLocaleString() },
  { title: 'Deadline', dataIndex: 'deadline' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Actions', render: () => <Button size="small">View</Button> },
];

export default function SupplyRequestsPage() {
  return (
    <div className="stack">
      <PageHeader title="Supply Requests" subtitle="Manage and track milk supply requests between corporates and your business" />
      <SectionCard>
        <div className="toolbar">
          <Input prefix={<Search size={16} color="#9ca3af" />} placeholder="Search requests..." style={{ maxWidth: 420 }} />
          <Button icon={<RotateCcw size={16} />}>Clear</Button>
          <Button icon={<FileText size={16} />}>Export CSV</Button>
          <Tag color="blue" style={{ padding: '6px 12px', fontSize: 13 }}>{ROWS.length} TOTAL REQUESTS</Tag>
          <div className="spacer" />
          <Button icon={<RefreshCw size={16} />}>Refresh</Button>
        </div>
        <Table<Req> rowKey="id" columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 900 }} />
      </SectionCard>
    </div>
  );
}
