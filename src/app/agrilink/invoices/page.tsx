'use client';

import { useState } from 'react';
import { App, Button, DatePicker, Form, Input, Modal, Select, Table, type TableColumnsType } from 'antd';
import { Download, Eye, Plus } from 'lucide-react';
import { PageHeader, SectionCard, StatCard, Stats, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';

type Invoice = { no: string; customer: string; issue: string; due: string; total: number; paid: number; status: string };

const ROWS: Invoice[] = [
  { no: 'INV-2611-07', customer: 'Highland Dairies Ltd', issue: '15 Nov 2026', due: '30 Nov 2026', total: 112500, paid: 0, status: 'Unpaid' },
  { no: 'INV-2611-06', customer: 'Githiga Primary School', issue: '01 Nov 2026', due: '30 Nov 2026', total: 81600, paid: 50400, status: 'Partial' },
  { no: 'INV-2611-05', customer: 'Green Valley Supermarket', issue: '14 Nov 2026', due: '21 Nov 2026', total: 58800, paid: 40400, status: 'Partial' },
  { no: 'INV-2611-04', customer: 'Kimbo Gardens Hotel', issue: '07 Nov 2026', due: '21 Nov 2026', total: 45360, paid: 35460, status: 'Partial' },
  { no: 'INV-2611-03', customer: 'Kiambu Road Mini-Mart', issue: '31 Oct 2026', due: '07 Nov 2026', total: 16800, paid: 12600, status: 'Overdue' },
  { no: 'INV-2611-02', customer: 'Kanjai Hill Academy', issue: '01 Nov 2026', due: '15 Nov 2026', total: 108800, paid: 108800, status: 'Paid' },
  { no: 'INV-2611-01', customer: 'Highland Dairies Ltd', issue: '31 Oct 2026', due: '15 Nov 2026', total: 487500, paid: 487500, status: 'Paid' },
];

const cols: TableColumnsType<Invoice> = [
  { title: '#', render: (_v, _r, i) => i + 1, width: 50 },
  { title: 'Invoice No.', dataIndex: 'no', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Customer', dataIndex: 'customer' },
  { title: 'Issue Date', dataIndex: 'issue' },
  { title: 'Due Date', dataIndex: 'due' },
  { title: 'Total Amount', dataIndex: 'total', align: 'right', render: (v: number) => kes(v) },
  { title: 'Amount Paid', dataIndex: 'paid', align: 'right', render: (v: number) => kes(v) },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  { title: 'Actions', render: () => <Button size="small" icon={<Eye size={14} />}>View</Button> },
];

export default function InvoicesPage() {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const total = ROWS.reduce((s, r) => s + r.total, 0);
  const paid = ROWS.reduce((s, r) => s + r.paid, 0);
  return (
    <div className="stack">
      <PageHeader title="Invoices" subtitle="Track and manage your invoices" actions={<Button type="primary" size="large" icon={<Plus size={18} />} onClick={() => setOpen(true)}>Create Invoice</Button>} />
      <Stats>
        <StatCard label="Total Invoiced" value={kes(total)} />
        <StatCard label="Today's Invoices" value={kes(0)} />
        <StatCard label="Total Paid" value={kes(paid)} color="#047857" />
        <StatCard label="Total Unpaid" value={kes(total - paid)} color="#b91c1c" />
      </Stats>
      <SectionCard>
        <div className="toolbar">
          <Button>Filters</Button>
          <Button>Clear Filters</Button>
          <div className="spacer" />
          <Button icon={<Download size={16} />}>Download CSV</Button>
        </div>
        <Table<Invoice> rowKey="no" columns={cols} dataSource={ROWS} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>
      <Modal
        title="CREATE INVOICE FROM ESTIMATE"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Create Invoice"
        onOk={() => {
          setOpen(false);
          message.success('Invoice created (demo)');
        }}
      >
        <Form layout="vertical">
          <Form.Item label="Estimate">
            <Select placeholder="Select an Estimate" options={['EST-0107 · Kanjai Hill Academy', 'EST-0106 · Kimbo Gardens Hotel', 'EST-0105 · Highland Dairies Ltd'].map((e) => ({ value: e, label: e }))} />
          </Form.Item>
          <div className="grid-2" style={{ gap: 12 }}>
            <Form.Item label="Issue Date"><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item label="Due Date"><DatePicker style={{ width: '100%' }} /></Form.Item>
          </div>
          <Form.Item label="Status">
            <Select defaultValue="Unpaid" options={['Unpaid', 'Partial', 'Paid'].map((s) => ({ value: s, label: s }))} />
          </Form.Item>
          <Form.Item label="Notes (Optional)"><Input.TextArea rows={3} placeholder="Enter notes..." /></Form.Item>
          <Form.Item label="Terms (Optional)"><Input.TextArea rows={3} placeholder="Enter terms and conditions..." /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
