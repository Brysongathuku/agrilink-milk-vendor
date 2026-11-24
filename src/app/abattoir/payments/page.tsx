'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { SectionCard, StatusTag } from '@/components/ui';
import { num } from '@/lib/format';

type Pay = { no: string; date: string; customer: string; invoice: string; currency: 'KES' | 'USD'; amount: number; method: string; ref: string };

const PAYMENTS: Pay[] = [
  { no: 'RCT-AB-0418', date: '24 Nov 2026', customer: 'Kiamaiko Meat Traders', invoice: 'INV-AB-2611-05', currency: 'KES', amount: 192500, method: 'M-Pesa Paybill', ref: 'TKO2X7RA91' },
  { no: 'RCT-AB-0417', date: '22 Nov 2026', customer: 'Garissa University Catering', invoice: 'INV-AB-2611-04', currency: 'KES', amount: 260000, method: 'Bank transfer', ref: 'EFT 22112601' },
  { no: 'RCT-AB-0416', date: '21 Nov 2026', customer: 'Muscat Halal Foods LLC', invoice: 'PF-AB-2611-06', currency: 'USD', amount: 9150, method: 'SWIFT', ref: 'SWIFT MT103 7741' },
  { no: 'RCT-AB-0415', date: '18 Nov 2026', customer: 'Kuwait Livestock Trading Co.', invoice: 'INV-AB-2611-01', currency: 'USD', amount: 21600, method: 'Letter of credit', ref: 'LC 0045/26' },
  { no: 'RCT-AB-0414', date: '15 Nov 2026', customer: 'Eastleigh Prime Butchery', invoice: 'INV-AB-2610-22', currency: 'KES', amount: 164000, method: 'M-Pesa Paybill', ref: 'TKF8M2QL04' },
  { no: 'RCT-AB-0413', date: '12 Nov 2026', customer: 'Savannah Grill Hotels', invoice: 'INV-AB-2610-19', currency: 'KES', amount: 98400, method: 'Bank transfer', ref: 'EFT 12112603' },
  { no: 'RCT-AB-0412', date: '08 Nov 2026', customer: 'Al Noor Foods Trading LLC', invoice: 'INV-AB-2610-15', currency: 'USD', amount: 14800, method: 'SWIFT', ref: 'SWIFT MT103 7602' },
];

type Debtor = { customer: string; currency: 'KES' | 'USD'; current: number; d1to14: number; d15to30: number; over30: number };
const DEBTORS: Debtor[] = [
  { customer: 'FreshMart Supermarkets', currency: 'KES', current: 0, d1to14: 312400, d15to30: 0, over30: 0 },
  { customer: 'Eastleigh Prime Butchery', currency: 'KES', current: 186000, d1to14: 0, d15to30: 0, over30: 0 },
  { customer: 'Savannah Grill Hotels', currency: 'KES', current: 128700, d1to14: 0, d15to30: 0, over30: 0 },
  { customer: 'Kiamaiko Meat Traders', currency: 'KES', current: 94500, d1to14: 0, d15to30: 0, over30: 0 },
  { customer: 'Al Noor Foods Trading LLC', currency: 'USD', current: 15620, d1to14: 0, d15to30: 0, over30: 0 },
  { customer: 'Gulf Fresh Meat Co.', currency: 'USD', current: 10350, d1to14: 0, d15to30: 0, over30: 0 },
  { customer: 'Muscat Halal Foods LLC', currency: 'USD', current: 9150, d1to14: 0, d15to30: 0, over30: 0 },
];

const payCols: TableColumnsType<Pay> = [
  { title: 'Receipt No.', dataIndex: 'no', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Customer', dataIndex: 'customer' },
  { title: 'Against', dataIndex: 'invoice' },
  { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number, r) => <b>{r.currency} {num(v)}</b> },
  { title: 'Method', dataIndex: 'method', render: (v: string) => <Tag>{v}</Tag> },
  { title: 'Reference', dataIndex: 'ref' },
];

const money = (v: number, r: Debtor) => (v ? `${r.currency} ${num(v)}` : '—');
const debtCols: TableColumnsType<Debtor> = [
  { title: 'Customer', dataIndex: 'customer', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Not yet due', dataIndex: 'current', align: 'right', render: money },
  { title: '1–14 days overdue', dataIndex: 'd1to14', align: 'right', render: (v: number, r) => <span style={{ color: v ? '#b45309' : undefined }}>{money(v, r)}</span> },
  { title: '15–30 days overdue', dataIndex: 'd15to30', align: 'right', render: money },
  { title: 'Over 30 days', dataIndex: 'over30', align: 'right', render: money },
  { title: 'Total', align: 'right', render: (_v, r) => <b>{r.currency} {num(r.current + r.d1to14 + r.d15to30 + r.over30)}</b> },
  { title: 'Status', render: (_v, r) => <StatusTag status={r.d1to14 + r.d15to30 + r.over30 > 0 ? 'Overdue' : 'Open'} /> },
];

export default function PaymentsPage() {
  return (
    <ListPage
      eyebrow="Sales"
      title="Payments & Debtors"
      subtitle="Money received against invoices, and who still owes you by how overdue they are."
      chips={[
        { value: 'KES ' + num(PAYMENTS.filter((p) => p.currency === 'KES').reduce((s, p) => s + p.amount, 0)), label: 'Received (local, Nov)' },
        { value: 'USD ' + num(PAYMENTS.filter((p) => p.currency === 'USD').reduce((s, p) => s + p.amount, 0)), label: 'Received (export, Nov)' },
        { value: 'KES ' + num(721600), label: 'Local debtors' },
        { value: 'USD ' + num(35120), label: 'Export debtors' },
      ]}
      addLabel="Record Payment"
      searchPlaceholder="Search receipts..."
    >
      {(q) => (
        <>
          <Table<Pay> rowKey="no" columns={payCols} dataSource={PAYMENTS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1000 }} />
          <SectionCard title="Debtors ageing" style={{ marginTop: 20, padding: 0, border: 0 }}>
            <Table<Debtor> rowKey="customer" columns={debtCols} dataSource={DEBTORS} pagination={false} scroll={{ x: 1000 }} />
          </SectionCard>
        </>
      )}
    </ListPage>
  );
}
