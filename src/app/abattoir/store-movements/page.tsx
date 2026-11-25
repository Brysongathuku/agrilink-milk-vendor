'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';

type Row = { doc: string; type: 'Goods received' | 'Issue to production' | 'Return to stores' | 'Dispatch'; date: string; item: string; qty: string; from: string; to: string; ref: string; by: string };

const TYPE_COLORS: Record<Row['type'], string> = { 'Goods received': 'green', 'Issue to production': 'blue', 'Return to stores': 'purple', Dispatch: 'orange' };

const ROWS: Row[] = [
  { doc: 'DSN-2611-040', type: 'Dispatch', date: '24 Nov, 22:00', item: 'Goat carcass', qty: '200 kg', from: 'Chiller 1', to: 'Eastleigh Prime Butchery', ref: 'ORD-2611-013', by: 'Stores officer' },
  { doc: 'PRN-2611-053', type: 'Return to stores', date: '24 Nov, 15:45', item: 'Goat offals', qty: '51 kg', from: 'Slaughter floor', to: 'Offal freezer', ref: 'BT-2611-08', by: 'Production' },
  { doc: 'PRN-2611-052', type: 'Return to stores', date: '24 Nov, 15:40', item: 'Goat carcasses', qty: '16 pcs · 206.1 kg', from: 'Slaughter floor', to: 'Chiller 1', ref: 'BT-2611-08', by: 'Production' },
  { doc: 'ISN-2611-044', type: 'Issue to production', date: '24 Nov, 13:30', item: 'Live goats', qty: '16 head · 446 kg', from: 'Lairage A', to: 'Slaughter floor', ref: 'ORD-2611-013', by: 'Stores officer' },
  { doc: 'GRN-2611-034', type: 'Goods received', date: '23 Nov, 15:05', item: 'Live goats', qty: '16 head · 478 kg', from: 'Fatuma Ali Noor', to: 'Lairage A', ref: 'BT-2611-08', by: 'Stores officer' },
  { doc: 'ISN-2611-043', type: 'Issue to production', date: '23 Nov, 07:00', item: 'Rhodes grass hay', qty: '18 bales', from: 'Feed store', to: 'Feedlot pens 1–2', ref: 'BT-2611-07', by: 'Feedlot' },
  { doc: 'GRN-2611-033', type: 'Goods received', date: '22 Nov, 11:20', item: 'Rhodes grass hay', qty: '120 bales', from: 'Bura Irrigation Farmers', to: 'Feed store', ref: 'PO-303', by: 'Stores officer' },
];

const cols: TableColumnsType<Row> = [
  { title: 'Document', dataIndex: 'doc', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Type', dataIndex: 'type', render: (v: Row['type']) => <Tag color={TYPE_COLORS[v]}>{v}</Tag> },
  { title: 'Date', dataIndex: 'date' },
  { title: 'Item', dataIndex: 'item' },
  { title: 'Quantity', dataIndex: 'qty' },
  { title: 'From', dataIndex: 'from' },
  { title: 'To', dataIndex: 'to' },
  { title: 'Reference', dataIndex: 'ref' },
  { title: 'Recorded by', dataIndex: 'by' },
];

export default function StoreMovementsPage() {
  return (
    <ListPage
      eyebrow="Stores"
      title="Store Movements"
      subtitle="Goods received, issues to production, returns to stores and dispatches."
      chips={[
        { value: ROWS.filter((r) => r.type === 'Goods received').length, label: 'Received' },
        { value: ROWS.filter((r) => r.type === 'Issue to production').length, label: 'Issued' },
        { value: ROWS.filter((r) => r.type === 'Return to stores').length, label: 'Returned' },
        { value: ROWS.filter((r) => r.type === 'Dispatch').length, label: 'Dispatched' },
      ]}
      addLabel="New Movement"
      searchPlaceholder="Search document, item, reference..."
    >
      {(q) => <Table<Row> rowKey="doc" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1200 }} />}
    </ListPage>
  );
}
