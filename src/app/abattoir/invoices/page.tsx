'use client';

import { Button, Table, Tag, type TableColumnsType } from 'antd';
import { Eye, Printer } from 'lucide-react';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { num } from '@/lib/format';

type Inv = { no: string; kind: 'Proforma' | 'Invoice'; customer: string; detail: string; currency: 'KES' | 'USD'; amount: number; paid: number; issued: string; terms: string; due: string; status: string };

const ROWS: Inv[] = [
  { no: 'PF-AB-2611-07', kind: 'Proforma', customer: 'Doha Premium Meats WLL', detail: '1,800 kg chilled goat carcass @ USD 7.40', currency: 'USD', amount: 13320, paid: 0, issued: '23 Nov 2026', terms: 'Letter of credit', due: '—', status: 'Sent' },
  { no: 'PF-AB-2611-06', kind: 'Proforma', customer: 'Muscat Halal Foods LLC', detail: '3,000 kg frozen camel meat @ USD 6.10', currency: 'USD', amount: 18300, paid: 9150, issued: '21 Nov 2026', terms: '50% advance', due: '—', status: 'Partial' },
  { no: 'INV-AB-2611-07', kind: 'Invoice', customer: 'Al Noor Foods Trading LLC', detail: '2,200 kg chilled goat carcass @ USD 7.10', currency: 'USD', amount: 15620, paid: 0, issued: '20 Nov 2026', terms: '30 days', due: '20 Dec 2026', status: 'Unpaid' },
  { no: 'INV-AB-2611-06', kind: 'Invoice', customer: 'Gulf Fresh Meat Co.', detail: '1,500 kg chilled mutton @ USD 6.90', currency: 'USD', amount: 10350, paid: 0, issued: '19 Nov 2026', terms: '14 days', due: '03 Dec 2026', status: 'Unpaid' },
  { no: 'INV-AB-2611-05', kind: 'Invoice', customer: 'Kiamaiko Meat Traders', detail: '350 kg goat carcass @ KES 820', currency: 'KES', amount: 287000, paid: 192500, issued: '23 Nov 2026', terms: '14 days', due: '07 Dec 2026', status: 'Partial' },
  { no: 'INV-AB-2611-04', kind: 'Invoice', customer: 'Garissa University Catering', detail: '400 kg beef (bone-in) @ KES 650', currency: 'KES', amount: 260000, paid: 260000, issued: '22 Nov 2026', terms: '30 days', due: '22 Dec 2026', status: 'Paid' },
  { no: 'INV-AB-2611-03', kind: 'Invoice', customer: 'FreshMart Supermarkets', detail: '950 kg beef quarters @ KES 650 + delivery', currency: 'KES', amount: 312400, paid: 0, issued: '21 Oct 2026', terms: '30 days', due: '20 Nov 2026', status: 'Overdue' },
];

const cols: TableColumnsType<Inv> = [
  { title: 'Number', dataIndex: 'no', render: (v: string, r) => <><span className="strong">{v}</span><div><Tag color={r.kind === 'Proforma' ? 'geekblue' : 'default'} style={{ marginTop: 4 }}>{r.kind}</Tag></div></> },
  { title: 'Customer', dataIndex: 'customer', render: (v: string, r) => <>{v}<div className="muted" style={{ fontSize: 12 }}>{r.detail}</div></> },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number, r) => <b>{r.currency} {num(v)}</b> },
  { title: 'Paid', dataIndex: 'paid', align: 'right', render: (v: number, r) => `${r.currency} ${num(v)}` },
  { title: 'Balance', align: 'right', render: (_v, r) => `${r.currency} ${num(r.amount - r.paid)}` },
  { title: 'Issued', dataIndex: 'issued' },
  { title: 'Terms', dataIndex: 'terms' },
  { title: 'Due date', dataIndex: 'due', render: (v: string, r) => <span style={{ color: r.status === 'Overdue' ? '#b91c1c' : undefined, fontWeight: r.status === 'Overdue' ? 600 : 400 }}>{v}</span> },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
  {
    title: 'Actions',
    render: () => (
      <span style={{ display: 'inline-flex', gap: 6 }}>
        <Button size="small" icon={<Eye size={14} />} />
        <Button size="small" icon={<Printer size={14} />} />
      </span>
    ),
  },
];

export default function AbInvoicesPage() {
  const kes = ROWS.filter((r) => r.currency === 'KES');
  const usd = ROWS.filter((r) => r.currency === 'USD' && r.kind === 'Invoice');
  return (
    <ListPage
      eyebrow="Sales"
      title="Invoices & Proformas"
      subtitle="Proformas go out before an order is confirmed. Invoices carry the credit terms (14 or 30 days) and due date."
      chips={[
        { value: ROWS.filter((r) => r.kind === 'Proforma').length, label: 'Open proformas' },
        { value: 'KES ' + num(kes.reduce((s, r) => s + r.amount - r.paid, 0)), label: 'Unpaid (local)' },
        { value: 'USD ' + num(usd.reduce((s, r) => s + r.amount - r.paid, 0)), label: 'Unpaid (export)' },
        { value: ROWS.filter((r) => r.status === 'Overdue').length, label: 'Overdue' },
      ]}
      addLabel="Create Invoice"
      searchPlaceholder="Search invoice, customer..."
    >
      {(q) => <Table<Inv> rowKey="no" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1450 }} />}
    </ListPage>
  );
}
