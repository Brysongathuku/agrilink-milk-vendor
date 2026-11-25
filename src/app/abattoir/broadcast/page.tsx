'use client';

import { useMemo, useState } from 'react';
import { App, Button, Checkbox, Input, Table, type TableColumnsType } from 'antd';
import { MessageSquare, Send } from 'lucide-react';
import { PageHeader, SectionCard, StatusTag } from '@/components/ui';
import { PASTORALISTS } from '@/lib/abattoir-data';

type Log = { key: string; date: string; channel: string; audience: string; recipients: number; message: string; status: string };

const LOGS: Log[] = [
  { key: 'g1', date: '24 Nov 2026, 07:00', channel: 'SMS', audience: 'Garissa pastoralists', recipients: 3, message: 'Bei ya leo Garissa: Mbuzi KES 300/kg uzito hai, Ng\'ombe KES 260/kg. Tunanunua Jumanne na Ijumaa.', status: 'Delivered' },
  { key: 'g2', date: '21 Nov 2026, 07:00', channel: 'WhatsApp', audience: 'All pastoralists', recipients: 7, message: 'This week we buy goats at KES 295/kg live weight and sheep at KES 265/kg. Bring tagged animals to Garissa market.', status: 'Delivered' },
  { key: 'g3', date: '18 Nov 2026, 07:00', channel: 'SMS', audience: 'Wajir pastoralists', recipients: 2, message: 'Camels wanted at Habaswein: KES 228/kg live weight, collection Thursday.', status: 'Delivered' },
  { key: 'g4', date: '14 Nov 2026, 07:00', channel: 'SMS', audience: 'Isiolo pastoralists', recipients: 2, message: 'Payment for batch BT-2611-03 sent to your Pesira e-wallet. Asante!', status: 'Delivered' },
];

const logCols: TableColumnsType<Log> = [
  { title: 'Sent', dataIndex: 'date' },
  { title: 'Channel', dataIndex: 'channel' },
  { title: 'Audience', dataIndex: 'audience' },
  { title: 'Recipients', dataIndex: 'recipients', align: 'right' },
  { title: 'Message', dataIndex: 'message', width: 420 },
  { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
];

export default function BroadcastPage() {
  const { message } = App.useApp();
  const [channel, setChannel] = useState<'sms' | 'whatsapp'>('sms');
  const [counties, setCounties] = useState<string[]>(['Garissa', 'Wajir', 'Isiolo']);
  const [text, setText] = useState('Bei ya wiki hii: Mbuzi KES 300/kg, Kondoo KES 270/kg, Ng\'ombe KES 260/kg, Ngamia KES 230/kg (uzito hai). Malipo kupitia Pesira e-wallet.');
  const [logs, setLogs] = useState<Log[]>(LOGS);

  const recipients = useMemo(() => PASTORALISTS.filter((p) => p.status === 'Active' && counties.includes(p.county)), [counties]);

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Community"
        title="Live-Weight Price Broadcast"
        subtitle="Send prices and updates to pastoralists by SMS or WhatsApp."
        boxed={false}
      />
      <div className="grid-main">
        <SectionCard title="Compose broadcast">
          <div className="grid-2" style={{ gap: 12, marginBottom: 16 }}>
            <div className={`channel-card sms ${channel === 'sms' ? 'selected' : ''}`} style={{ padding: 20 }} onClick={() => setChannel('sms')}>
              <MessageSquare size={24} />
              <div><b>SMS</b><div style={{ fontSize: 13 }}>Works on any phone</div></div>
            </div>
            <div className={`channel-card wa ${channel === 'whatsapp' ? 'selected' : ''}`} style={{ padding: 20 }} onClick={() => setChannel('whatsapp')}>
              <MessageSquare size={24} />
              <div><b>WhatsApp</b><div style={{ fontSize: 13 }}>Smartphones</div></div>
            </div>
          </div>
          <div className="stat-label" style={{ marginBottom: 6 }}>Counties</div>
          <Checkbox.Group value={counties} onChange={(v) => setCounties(v as string[])} options={['Garissa', 'Wajir', 'Isiolo']} />
          <div className="stat-label" style={{ margin: '16px 0 6px' }}>Message</div>
          <Input.TextArea rows={5} value={text} onChange={(e) => setText(e.target.value)} showCount maxLength={channel === 'sms' ? 320 : 1000} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, gap: 10, flexWrap: 'wrap' }}>
            <span className="muted">{recipients.length} active pastoralists will receive this</span>
            <Button
              type="primary"
              size="large"
              icon={<Send size={16} />}
              disabled={!recipients.length || !text.trim()}
              onClick={() => {
                setLogs((l) => [
                  { key: `g${Date.now()}`, date: 'Just now', channel: channel === 'sms' ? 'SMS' : 'WhatsApp', audience: counties.join(', '), recipients: recipients.length, message: text, status: 'Sent' },
                  ...l,
                ]);
                message.success(`Broadcast sent to ${recipients.length} pastoralists`);
              }}
            >
              Send broadcast
            </Button>
          </div>
        </SectionCard>
        <SectionCard title="Recipients">
          {recipients.map((r) => (
            <div className="kv" key={r.id}><span>{r.name}<span className="muted"> · {r.area}</span></span><span className="muted">{r.phone}</span></div>
          ))}
        </SectionCard>
      </div>
      <SectionCard title="Broadcast log">
        <Table<Log> rowKey="key" columns={logCols} dataSource={logs} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>
    </div>
  );
}
