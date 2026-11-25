'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { WALLET_TXNS, type Txn } from '@/lib/dairy-data';
import { kes } from '@/lib/format';

const cols: TableColumnsType<Txn> = [
  { title: 'Date', dataIndex: 'date' },
  { title: 'Description', dataIndex: 'description' },
  { title: 'Type', dataIndex: 'kind', render: (v: Txn['kind']) => (v === 'in' ? <Tag color="green">Money in</Tag> : <Tag color="red">Money out</Tag>) },
  { title: 'Reference', dataIndex: 'ref' },
  {
    title: 'Amount',
    dataIndex: 'amount',
    align: 'right',
    render: (v: number, r) => <b style={{ color: r.kind === 'in' ? '#047857' : '#b91c1c' }}>{r.kind === 'in' ? '+' : '−'} {kes(v, v % 1 ? 2 : 0)}</b>,
  },
];

export default function DairyTransactions() {
  const moneyIn = WALLET_TXNS.filter((t) => t.kind === 'in').reduce((s, t) => s + t.amount, 0);
  const moneyOut = WALLET_TXNS.filter((t) => t.kind === 'out').reduce((s, t) => s + t.amount, 0);
  return (
    <ListPage
      eyebrow="My Wallet"
      title="Transactions"
      subtitle="Milk payments, deductions and withdrawals."
      chips={[
        { value: kes(moneyIn, 2), label: 'Money in' },
        { value: kes(moneyOut), label: 'Money out' },
        { value: WALLET_TXNS.length, label: 'Transactions' },
        { value: 'Daily', label: 'Milk payments' },
      ]}
      searchPlaceholder="Search transactions..."
    >
      {(q) => <Table<Txn> rowKey={(r) => r.ref + r.date} columns={cols} dataSource={WALLET_TXNS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 800 }} />}
    </ListPage>
  );
}
