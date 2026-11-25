'use client';

import { App, Button, Progress, Table, Tag, type TableColumnsType } from 'antd';
import { TriangleAlert, CircleCheck, ShieldCheck, Upload, CircleX } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { PESIRA_GREEN } from '@/lib/theme';

type Req = { key: string; requirement: string; type: 'Pasteurization proof' | 'Medical certificate' | 'Licence / permit' | 'Equipment'; holder: string; issued: string; expiry: string; status: string; doc: boolean };

const ROWS: Req[] = [
  { key: 'r1', requirement: 'KDB Milk Dealer / Trader licence', type: 'Licence / permit', holder: 'Business', issued: '02 Jan 2026', expiry: '31 Dec 2026', status: 'Valid', doc: true },
  { key: 'r2', requirement: 'Pasteurization proof – batch LOT-MK-2111-AM', type: 'Pasteurization proof', holder: 'Milk ATM retail batch', issued: '21 Nov 2026', expiry: 'Per batch', status: 'Valid', doc: true },
  { key: 'r3', requirement: 'Pasteurization proof – batch LOT-MK-2011-PM', type: 'Pasteurization proof', holder: 'Supermarket pouches', issued: '—', expiry: 'Per batch', status: 'Missing', doc: false },
  { key: 'r4', requirement: 'Medical certificate – milk handler', type: 'Medical certificate', holder: 'Jane Muthoni (milk bar)', issued: '03 Jun 2026', expiry: '03 Dec 2026', status: 'Expiring soon', doc: true },
  { key: 'r5', requirement: 'Medical certificate – grader', type: 'Medical certificate', holder: 'Kevin Mwangi', issued: '14 Aug 2026', expiry: '14 Feb 2027', status: 'Valid', doc: true },
  { key: 'r6', requirement: 'Medical certificate – rider', type: 'Medical certificate', holder: 'Brian Otieno', issued: '10 May 2026', expiry: '10 Nov 2026', status: 'Expired', doc: true },
  { key: 'r7', requirement: 'Milk ATM calibration & premises inspection', type: 'Equipment', holder: 'Milk bar, Githunguri Town', issued: '20 Sep 2026', expiry: '20 Mar 2027', status: 'Valid', doc: true },
];

export default function CompliancePage() {
  const { message } = App.useApp();
  const valid = ROWS.filter((r) => r.status === 'Valid').length;
  const score = Math.round((valid / ROWS.length) * 100);

  const cols: TableColumnsType<Req> = [
    { title: 'Requirement', dataIndex: 'requirement', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Type', dataIndex: 'type', render: (v: string) => <Tag color={v === 'Pasteurization proof' ? 'blue' : v === 'Medical certificate' ? 'purple' : 'default'}>{v}</Tag> },
    { title: 'Applies to', dataIndex: 'holder' },
    { title: 'Issued', dataIndex: 'issued' },
    { title: 'Expiry', dataIndex: 'expiry' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
    {
      title: 'Document',
      render: (_v, r) =>
        r.doc && r.status === 'Valid' ? (
          <Button size="small">View</Button>
        ) : (
          <Button size="small" type="primary" icon={<Upload size={13} />} onClick={() => message.info('Document upload is coming soon')}>
            Upload
          </Button>
        ),
    },
  ];

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Compliance"
        title="Regulatory Compliance"
        subtitle="Track your Kenya Dairy Board licences and certificates."
        actions={<Button type="primary" size="large" icon={<Upload size={18} />}>Upload document</Button>}
      />
      <Stats>
        <StatCard label="Compliance score" value={`${score}%`} icon={<ShieldCheck size={20} color={PESIRA_GREEN} />} foot={<Progress percent={score} showInfo={false} strokeColor={PESIRA_GREEN} size="small" />} />
        <StatCard label="Valid" value={valid} icon={<CircleCheck size={20} color="#047857" />} />
        <StatCard label="Expiring in 30 days" value={ROWS.filter((r) => r.status === 'Expiring soon').length} icon={<TriangleAlert size={20} color="#b45309" />} />
        <StatCard label="Missing / expired" value={ROWS.filter((r) => r.status === 'Missing' || r.status === 'Expired').length} icon={<CircleX size={20} color="#b91c1c" />} />
      </Stats>
      <SectionCard title="KDB requirements tracker">
        <Table<Req> columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>
    </div>
  );
}
