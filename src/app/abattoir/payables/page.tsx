'use client';

import { useState } from 'react';
import { App, Button, Popconfirm, Table, Tag, type TableColumnsType } from 'antd';
import { Wallet } from 'lucide-react';
import ListPage, { rowMatches } from '@/components/ListPage';
import { SectionCard, StatusTag } from '@/components/ui';
import { kes } from '@/lib/format';

type Bill = { key: string; payee: string; type: 'Pastoralist' | 'Feed supplier' | 'Transporter'; for: string; amount: number; paid: number; due: string; method: string };
type Payout = { key: string; date: string; payee: string; amount: number; method: string; ref: string };

const BILLS: Bill[] = [
  { key: 'b1', payee: 'Fatuma Ali Noor', type: 'Pastoralist', for: '16 goats · BT-2611-08', amount: 138600, paid: 0, due: 'On delivery', method: 'Pesira e-wallet' },
  { key: 'b2', payee: 'Hussein Ibrahim Aden', type: 'Pastoralist', for: '8 camels · BT-2611-05', amount: 779700, paid: 500000, due: '30 Nov 2026', method: 'M-Pesa' },
  { key: 'b3', payee: 'Bura Irrigation Farmers', type: 'Feed supplier', for: '120 bales hay · PO-303', amount: 54000, paid: 0, due: '06 Dec 2026', method: 'Bank transfer' },
  { key: 'b4', payee: 'Garissa Livestock Transporters', type: 'Transporter', for: 'Garissa → abattoir, 3 trips', amount: 48000, paid: 0, due: '30 Nov 2026', method: 'M-Pesa' },
  { key: 'b5', payee: 'Abdi Hassan Mohamed', type: 'Pastoralist', for: '60 goats · BT-2611-07', amount: 531000, paid: 531000, due: 'On delivery', method: 'Pesira e-wallet' },
];

const PAYOUTS: Payout[] = [
  { key: 'p1', date: '22 Nov 2026', payee: 'Abdi Hassan Mohamed', amount: 531000, method: 'Pesira e-wallet', ref: 'PSW-88213' },
  { key: 'p2', date: '21 Nov 2026', payee: 'Hussein Ibrahim Aden', amount: 500000, method: 'M-Pesa', ref: 'TKN4R8WQ12' },
  { key: 'p3', date: '19 Nov 2026', payee: 'Halima Abdullahi Omar', amount: 783000, method: 'Pesira e-wallet', ref: 'PSW-88140' },
];

const TYPE_COLORS: Record<Bill['type'], string> = { Pastoralist: 'green', 'Feed supplier': 'gold', Transporter: 'blue' };

export default function PayablesPage() {
  const { message } = App.useApp();
  const [bills, setBills] = useState<Bill[]>(BILLS);
  const [payouts, setPayouts] = useState<Payout[]>(PAYOUTS);

  const pay = (b: Bill) => {
    const amount = b.amount - b.paid;
    setBills((all) => all.map((x) => (x.key === b.key ? { ...x, paid: x.amount } : x)));
    setPayouts((p) => [{ key: `p${Date.now()}`, date: 'Today', payee: b.payee, amount, method: b.method, ref: 'Processing' }, ...p]);
    message.success(`${kes(amount)} sent to ${b.payee}`);
  };

  const cols: TableColumnsType<Bill> = [
    { title: 'Payee', dataIndex: 'payee', render: (v: string, r) => <><span className="strong">{v}</span><div><Tag color={TYPE_COLORS[r.type]} style={{ marginTop: 4 }}>{r.type}</Tag></div></> },
    { title: 'For', dataIndex: 'for' },
    { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number) => kes(v) },
    { title: 'Paid', dataIndex: 'paid', align: 'right', render: (v: number) => kes(v) },
    { title: 'Balance', align: 'right', render: (_v, r) => <b>{kes(r.amount - r.paid)}</b> },
    { title: 'Due', dataIndex: 'due' },
    { title: 'Pay by', dataIndex: 'method' },
    { title: 'Status', render: (_v, r) => <StatusTag status={r.paid >= r.amount ? 'Paid' : r.paid > 0 ? 'Partial' : 'Unpaid'} /> },
    {
      title: '',
      render: (_v, r) =>
        r.paid < r.amount ? (
          <Popconfirm title={`Pay ${kes(r.amount - r.paid)} to ${r.payee}?`} okText="Pay now" onConfirm={() => pay(r)}>
            <Button size="small" type="primary" icon={<Wallet size={14} />}>Pay</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const payoutCols: TableColumnsType<Payout> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Paid to', dataIndex: 'payee' },
    { title: 'Amount', dataIndex: 'amount', align: 'right', render: (v: number) => <b>{kes(v)}</b> },
    { title: 'Method', dataIndex: 'method' },
    { title: 'Reference', dataIndex: 'ref' },
  ];

  const owed = (t?: Bill['type']) => bills.filter((b) => !t || b.type === t).reduce((s, b) => s + b.amount - b.paid, 0);

  return (
    <ListPage
      eyebrow="Finance"
      title="Creditors & Payouts"
      subtitle="What you owe pastoralists and suppliers, and what you've paid."
      chips={[
        { value: kes(owed()), label: 'Total owed' },
        { value: kes(owed('Pastoralist')), label: 'Pastoralists' },
        { value: kes(owed('Feed supplier')), label: 'Feed suppliers' },
        { value: kes(owed('Transporter')), label: 'Transport' },
      ]}
      searchPlaceholder="Search payee..."
    >
      {(q) => (
        <>
          <Table<Bill> rowKey="key" columns={cols} dataSource={bills.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1100 }} />
          <SectionCard title="Recent payouts" style={{ marginTop: 20, padding: 0, border: 0 }}>
            <Table<Payout> rowKey="key" columns={payoutCols} dataSource={payouts} pagination={false} scroll={{ x: 700 }} />
          </SectionCard>
        </>
      )}
    </ListPage>
  );
}
