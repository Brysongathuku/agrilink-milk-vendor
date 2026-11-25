'use client';

import { useState } from 'react';
import { App, Button, Switch, Table, type TableColumnsType } from 'antd';
import { PageHeader } from '@/components/ui';

const DEPARTMENTS = ['Management', 'Finance', 'Procurement', 'Stores', 'Production', 'Quality', 'Marketing'] as const;
type Dept = (typeof DEPARTMENTS)[number];

const MODULES = [
  'Analytics',
  'Orders & Planning',
  'Livestock Sourcing',
  'Feedlot & Lairage',
  'Slaughter & Cold Store',
  'Dispatch & Export',
  'Sales & Invoices',
  'Finance & Profit',
  'Market Place',
  'Compliance',
  'Staff & Roles',
];

const DEFAULT: Record<Dept, string[]> = {
  Management: MODULES,
  Finance: ['Analytics', 'Sales & Invoices', 'Finance & Profit', 'Market Place'],
  Procurement: ['Orders & Planning', 'Livestock Sourcing', 'Market Place'],
  Stores: ['Orders & Planning', 'Livestock Sourcing', 'Feedlot & Lairage', 'Slaughter & Cold Store', 'Dispatch & Export'],
  Production: ['Feedlot & Lairage', 'Slaughter & Cold Store'],
  Quality: ['Feedlot & Lairage', 'Slaughter & Cold Store', 'Compliance'],
  Marketing: ['Analytics', 'Orders & Planning', 'Dispatch & Export', 'Sales & Invoices'],
};

const FIN_DEFAULT: Record<Dept, boolean> = { Management: true, Finance: true, Procurement: false, Stores: false, Production: false, Quality: false, Marketing: false };

type Row = { module: string };

export default function DepartmentAccessPage() {
  const { message } = App.useApp();
  const [access, setAccess] = useState<Record<Dept, string[]>>(DEFAULT);
  const [fin, setFin] = useState<Record<Dept, boolean>>(FIN_DEFAULT);

  const toggle = (d: Dept, m: string, on: boolean) =>
    setAccess((a) => ({ ...a, [d]: on ? [...a[d], m] : a[d].filter((x) => x !== m) }));

  const cols: TableColumnsType<Row> = [
    { title: 'Module', dataIndex: 'module', fixed: 'left', width: 190, render: (v: string) => <span className="strong">{v}</span> },
    ...DEPARTMENTS.map((d) => ({
      title: d,
      key: d,
      align: 'center' as const,
      render: (_v: unknown, r: Row) => <Switch size="small" checked={access[d].includes(r.module)} onChange={(on) => toggle(d, r.module, on)} />,
    })),
  ];

  const finRow: TableColumnsType<{ label: string }> = [
    { title: '', dataIndex: 'label', fixed: 'left', width: 190, render: (v: string) => <span className="strong">{v}</span> },
    ...DEPARTMENTS.map((d) => ({
      title: d,
      key: d,
      align: 'center' as const,
      render: () => <Switch size="small" checked={fin[d]} onChange={(on) => setFin((f) => ({ ...f, [d]: on }))} />,
    })),
  ];

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Staff & Roles"
        title="Department Access"
        subtitle="Choose what each department can see."
        actions={<Button type="primary" size="large" onClick={() => message.success('Access saved')}>Save access</Button>}
      />
      <div className="card">
        <h3 className="section-title">Modules by department</h3>
        <Table<Row> rowKey="module" columns={cols} dataSource={MODULES.map((m) => ({ module: m }))} pagination={false} size="middle" scroll={{ x: 1000 }} />
      </div>
      <div className="card">
        <h3 className="section-title">Financial figures</h3>
        <p className="section-sub">Turn off to hide prices, costs and profit from that department.</p>
        <Table<{ label: string }> rowKey="label" columns={finRow} dataSource={[{ label: 'Can see financial figures' }]} pagination={false} size="middle" scroll={{ x: 1000 }} />
      </div>
    </div>
  );
}
