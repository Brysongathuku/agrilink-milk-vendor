'use client';

import { Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { SPECIES_COLORS, USD_KES, type Species } from '@/lib/abattoir-data';
import { num } from '@/lib/format';

type Row = { id: string; buyer: string; country: string; species: Species; product: string; kg: number; usdPerKg: number; incoterm: string; shipBy: string; payment: string; status: string };

const ROWS: Row[] = [
  { id: 'EXP-2611-07', buyer: 'Al Noor Foods Trading LLC', country: 'UAE (Dubai)', species: 'Goat', product: 'Chilled goat carcass, skin-off', kg: 2400, usdPerKg: 7.2, incoterm: 'CIF Dubai', shipBy: '27 Nov 2026', payment: '30 days', status: 'Scheduled' },
  { id: 'EXP-2611-06', buyer: 'Gulf Fresh Meat Co.', country: 'Saudi Arabia (Riyadh)', species: 'Sheep', product: 'Chilled mutton carcass', kg: 1600, usdPerKg: 7.0, incoterm: 'FOB Nairobi', shipBy: '29 Nov 2026', payment: '14 days', status: 'Scheduled' },
  { id: 'EXP-2611-05', buyer: 'Doha Premium Meats WLL', country: 'Qatar (Doha)', species: 'Goat', product: 'Chilled goat carcass', kg: 1800, usdPerKg: 7.4, incoterm: 'CIF Doha', shipBy: '04 Dec 2026', payment: 'Letter of credit', status: 'Pending' },
  { id: 'EXP-2611-04', buyer: 'Muscat Halal Foods LLC', country: 'Oman (Muscat)', species: 'Camel', product: 'Frozen camel meat, deboned', kg: 3000, usdPerKg: 6.1, incoterm: 'CIF Mombasa → Sohar', shipBy: '10 Dec 2026', payment: '50% advance', status: 'Pending' },
  { id: 'EXP-2611-03', buyer: 'Al Noor Foods Trading LLC', country: 'UAE (Dubai)', species: 'Goat', product: 'Chilled goat carcass, skin-off', kg: 2200, usdPerKg: 7.1, incoterm: 'CIF Dubai', shipBy: '20 Nov 2026', payment: '30 days', status: 'Delivered' },
  { id: 'EXP-2611-02', buyer: 'Gulf Fresh Meat Co.', country: 'Saudi Arabia (Riyadh)', species: 'Sheep', product: 'Chilled mutton carcass', kg: 1500, usdPerKg: 6.9, incoterm: 'FOB Nairobi', shipBy: '19 Nov 2026', payment: '14 days', status: 'Delivered' },
  { id: 'EXP-2611-01', buyer: 'Kuwait Livestock Trading Co.', country: 'Kuwait', species: 'Cattle', product: 'Frozen beef cuts', kg: 4000, usdPerKg: 5.4, incoterm: 'CIF Mombasa → Shuwaikh', shipBy: '08 Nov 2026', payment: 'Paid', status: 'Completed' },
];

const usd = (r: Row) => r.kg * r.usdPerKg;

const cols: TableColumnsType<Row> = [
  { title: 'Export No.', dataIndex: 'id', render: (v: string) => <span className="strong">{v}</span> },
  { title: 'Buyer', dataIndex: 'buyer', render: (v: string, r) => <>{v}<div className="muted" style={{ fontSize: 12 }}>{r.country}</div></> },
  { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
  { title: 'Product', dataIndex: 'product' },
  { title: 'Quantity', dataIndex: 'kg', align: 'right', render: (v: number) => `${num(v)} kg` },
  { title: 'Price', dataIndex: 'usdPerKg', align: 'right', render: (v: number) => `USD ${v.toFixed(2)}/kg` },
  { title: 'Value', align: 'right', render: (_v, r) => <><b>USD {num(usd(r))}</b><div className="muted" style={{ fontSize: 12 }}>≈ KES {num(usd(r) * USD_KES)}</div></> },
  { title: 'Incoterm', dataIndex: 'incoterm' },
  { title: 'Ship by', dataIndex: 'shipBy' },
  { title: 'Payment', dataIndex: 'payment' },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function ExportOrdersPage() {
  const open = ROWS.filter((r) => r.status === 'Scheduled' || r.status === 'Pending');
  return (
    <ListPage
      eyebrow="Dispatch & Export"
      title="Export Orders"
      subtitle="Chilled and frozen meat orders from buyers in the Middle East, invoiced in USD."
      chips={[
        { value: open.length, label: 'Open export orders' },
        { value: num(open.reduce((s, r) => s + r.kg, 0)) + ' kg', label: 'To ship' },
        { value: 'USD ' + num(open.reduce((s, r) => s + usd(r), 0)), label: 'Open value' },
        { value: 5, label: 'Destination countries' },
      ]}
      addLabel="New Export Order"
      searchPlaceholder="Search buyer, country, product..."
      note={`Demo exchange rate: 1 USD = KES ${USD_KES}.`}
    >
      {(q) => <Table<Row> rowKey="id" columns={cols} dataSource={ROWS.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1500 }} />}
    </ListPage>
  );
}
