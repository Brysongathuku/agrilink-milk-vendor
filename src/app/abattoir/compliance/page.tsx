'use client';

import { App, Button, Progress, Table, Tag, type TableColumnsType } from 'antd';
import { CircleCheck, CircleX, ShieldCheck, TriangleAlert, Upload } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { PESIRA_GREEN } from '@/lib/theme';

type Req = { key: string; requirement: string; type: string; authority: string; appliesTo: string; issued: string; expiry: string; status: string; doc: boolean };

const ROWS: Req[] = [
  { key: 'c1', requirement: 'Slaughterhouse licence', type: 'Licence', authority: 'Directorate of Veterinary Services', appliesTo: 'Abattoir premises', issued: '05 Jan 2026', expiry: '31 Dec 2026', status: 'Valid', doc: true },
  { key: 'c2', requirement: 'NEMA licence – effluent & waste', type: 'Environment', authority: 'NEMA', appliesTo: 'Waste treatment', issued: '12 Feb 2026', expiry: '11 Feb 2027', status: 'Valid', doc: true },
  { key: 'c3', requirement: 'County single business permit', type: 'Licence', authority: 'County Government of Garissa', appliesTo: 'Business', issued: '15 Jan 2026', expiry: '31 Dec 2026', status: 'Expiring soon', doc: true },
  { key: 'c4', requirement: 'Halal certificate', type: 'Certification', authority: 'Halal certification body', appliesTo: 'Slaughter process', issued: '01 Mar 2026', expiry: '28 Feb 2027', status: 'Valid', doc: true },
  { key: 'c5', requirement: 'Export abattoir approval', type: 'Export', authority: 'Directorate of Veterinary Services', appliesTo: 'Export to Gulf markets', issued: '20 Apr 2026', expiry: '19 Apr 2027', status: 'Valid', doc: true },
  { key: 'c6', requirement: 'Livestock movement permits', type: 'Movement', authority: 'County Veterinary Office', appliesTo: 'Batch BT-2611-07 (120 goats)', issued: '22 Nov 2026', expiry: 'Per movement', status: 'Valid', doc: true },
  { key: 'c7', requirement: 'Medical certificates – meat handlers', type: 'Staff health', authority: 'Public Health Office', appliesTo: '14 of 16 handlers', issued: 'Various', expiry: 'Every 6 months', status: 'Missing', doc: false },
  { key: 'c8', requirement: 'Veterinary health certificate', type: 'Export', authority: 'Directorate of Veterinary Services', appliesTo: 'Shipment SHP-2611-07', issued: '—', expiry: 'Per shipment', status: 'Pending', doc: false },
];

export default function AbCompliancePage() {
  const { message } = App.useApp();
  const valid = ROWS.filter((r) => r.status === 'Valid').length;
  const score = Math.round((valid / ROWS.length) * 100);

  const cols: TableColumnsType<Req> = [
    { title: 'Requirement', dataIndex: 'requirement', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Type', dataIndex: 'type', render: (v: string) => <Tag color={v === 'Export' ? 'green' : v === 'Certification' ? 'blue' : v === 'Staff health' ? 'purple' : 'default'}>{v}</Tag> },
    { title: 'Authority', dataIndex: 'authority' },
    { title: 'Applies to', dataIndex: 'appliesTo' },
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
        title="Licences & Certificates"
        subtitle="Track your licences, permits and certificates."
        actions={<Button type="primary" size="large" icon={<Upload size={18} />}>Upload document</Button>}
      />
      <Stats>
        <StatCard label="Compliance score" value={`${score}%`} icon={<ShieldCheck size={20} color={PESIRA_GREEN} />} foot={<Progress percent={score} showInfo={false} strokeColor={PESIRA_GREEN} size="small" />} />
        <StatCard label="Valid" value={valid} icon={<CircleCheck size={20} color="#047857" />} />
        <StatCard label="Expiring in 60 days" value={ROWS.filter((r) => r.status === 'Expiring soon').length} icon={<TriangleAlert size={20} color="#b45309" />} />
        <StatCard label="Missing / pending" value={ROWS.filter((r) => r.status === 'Missing' || r.status === 'Pending').length} icon={<CircleX size={20} color="#b91c1c" />} />
      </Stats>
      <SectionCard title="Requirements tracker">
        <Table<Req> columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 1300 }} />
      </SectionCard>
    </div>
  );
}
