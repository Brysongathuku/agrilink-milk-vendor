'use client';

import { useState } from 'react';
import { App, Button, Checkbox, Form, Input, Modal, Select, Steps, Table, TimePicker, type TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import { Clock, MessageSquare, Plus, Radio, ScrollText, Send } from 'lucide-react';
import { SectionCard, StatusTag } from '@/components/ui';
import { CUSTOMERS, FARMERS } from '@/lib/data';

type Slot = { key: string; route: string; type: 'Farmer collection' | 'Customer delivery'; am: string; pm: string; centre: string; people: number; status: string };

const INITIAL: Slot[] = [
  { key: 's1', route: 'Kanjai Route', type: 'Farmer collection', am: '06:30', pm: '17:30', centre: 'Kanjai collection point', people: 2, status: 'Active' },
  { key: 's2', route: 'Ikinu Route', type: 'Farmer collection', am: '06:45', pm: '17:45', centre: 'Gathangari shopping centre', people: 2, status: 'Active' },
  { key: 's3', route: 'Ngewa Route', type: 'Farmer collection', am: '07:00', pm: '18:00', centre: 'Nyaga chief\'s camp', people: 1, status: 'Active' },
  { key: 's4', route: 'Komothai Route', type: 'Farmer collection', am: '07:15', pm: '—', centre: 'Kambui stage', people: 1, status: 'Active' },
  { key: 's5', route: 'Town drop-offs', type: 'Customer delivery', am: '07:00', pm: '16:30', centre: 'Supermarkets & households', people: 3, status: 'Active' },
  { key: 's6', route: 'Schools run', type: 'Customer delivery', am: '08:15', pm: '—', centre: 'Githiga Primary, Kanjai Hill Academy', people: 2, status: 'Active' },
  { key: 's7', route: 'Bulk off-take', type: 'Customer delivery', am: '09:30', pm: '—', centre: 'Highland Dairies, Ruiru', people: 1, status: 'Active' },
];

export default function EngagementPage() {
  const { message } = App.useApp();
  const [step, setStep] = useState(0);
  const [channel, setChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [audience, setAudience] = useState<'farmers' | 'customers'>('farmers');
  const [selected, setSelected] = useState<string[]>([]);
  const [text, setText] = useState('Habari! Kuanzia Jumatatu, milk collection at Kanjai will be at 6:30 AM and 5:30 PM. Please have your milk ready and cans clean. – Milk Vendor');
  const [slots, setSlots] = useState<Slot[]>(INITIAL);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const people = audience === 'farmers' ? FARMERS.map((f) => ({ id: f.id, name: f.name, phone: f.phone })) : CUSTOMERS.map((c) => ({ id: c.id, name: c.name, phone: c.phone }));

  const slotCols: TableColumnsType<Slot> = [
    { title: 'Route', dataIndex: 'route', render: (v: string) => <span className="strong">{v}</span> },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Morning', dataIndex: 'am' },
    { title: 'Evening', dataIndex: 'pm' },
    { title: 'Point / customers', dataIndex: 'centre' },
    { title: 'Contacts', dataIndex: 'people', align: 'right' },
    { title: 'Status', dataIndex: 'status', render: (v: string) => <StatusTag status={v} /> },
    {
      title: 'Notify',
      render: (_v, r) => (
        <Button
          size="small"
          icon={<Send size={13} />}
          onClick={() => {
            setAudience(r.type === 'Farmer collection' ? 'farmers' : 'customers');
            setText(`Reminder: ${r.route} ${r.type.toLowerCase()} is at ${r.am}${r.pm !== '—' ? ` and ${r.pm}` : ''}. – Milk Vendor`);
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Message
        </Button>
      ),
    },
  ];

  return (
    <div className="stack">
      <div
        className="card"
        style={{ background: 'linear-gradient(100deg, #0f172a 0%, #1f2937 60%, #374151 100%)', color: '#fff', border: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <div style={{ color: '#9ca3af', fontSize: 14 }}>Community Engagement Center</div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>Set collection & delivery times and keep farmers and customers informed.</div>
        </div>
        <Button size="large" icon={<ScrollText size={18} />}>View Logs</Button>
      </div>

      <SectionCard
        title="Collection & Delivery Schedule"
        subtitle="Times farmers bring milk and when you deliver to customers"
        extra={<Button type="primary" icon={<Plus size={16} />} onClick={() => setOpen(true)}>Set delivery time</Button>}
      >
        <Table<Slot> columns={slotCols} dataSource={slots} pagination={false} scroll={{ x: 1000 }} />
      </SectionCard>

      <SectionCard>
        <Steps
          current={step}
          onChange={setStep}
          items={[
            { title: 'Channel', description: 'Communication method' },
            { title: 'Audience', description: 'Recipient source' },
            { title: 'Recipients', description: 'Select numbers' },
            { title: 'Message', description: 'Compose' },
            { title: 'Review', description: 'Confirm & send' },
          ]}
        />
        <div style={{ marginTop: 28, minHeight: 220 }}>
          {step === 0 && (
            <>
              <h3 className="section-title"><Radio size={18} style={{ verticalAlign: -3 }} /> COMMUNICATION CHANNELS</h3>
              <div className="grid-2">
                <div className={`channel-card wa ${channel === 'whatsapp' ? 'selected' : ''}`} onClick={() => setChannel('whatsapp')}>
                  <MessageSquare size={28} />
                  <div><b style={{ fontSize: 17 }}>WhatsApp</b><div>Direct messaging</div></div>
                </div>
                <div className={`channel-card sms ${channel === 'sms' ? 'selected' : ''}`} onClick={() => setChannel('sms')}>
                  <MessageSquare size={28} />
                  <div><b style={{ fontSize: 17 }}>SMS</b><div>Text messaging</div></div>
                </div>
              </div>
            </>
          )}
          {step === 1 && (
            <Select
              size="large"
              style={{ width: 360 }}
              value={audience}
              onChange={(v) => { setAudience(v as 'farmers' | 'customers'); setSelected([]); }}
              options={[{ value: 'farmers', label: `Farmers (${FARMERS.length})` }, { value: 'customers', label: `Customers (${CUSTOMERS.length})` }]}
            />
          )}
          {step === 2 && (
            <>
              <Checkbox
                checked={selected.length === people.length}
                indeterminate={selected.length > 0 && selected.length < people.length}
                onChange={(e) => setSelected(e.target.checked ? people.map((p) => p.id) : [])}
              >
                Select all
              </Checkbox>
              <Checkbox.Group style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10, marginTop: 14 }} value={selected} onChange={(v) => setSelected(v as string[])}>
                {people.map((p) => (
                  <Checkbox key={p.id} value={p.id}>{p.name} <span className="muted">· {p.phone}</span></Checkbox>
                ))}
              </Checkbox.Group>
            </>
          )}
          {step === 3 && <Input.TextArea rows={5} value={text} onChange={(e) => setText(e.target.value)} showCount maxLength={channel === 'sms' ? 320 : 1000} />}
          {step === 4 && (
            <div>
              <div className="kv"><span className="muted">Channel</span><b>{channel === 'sms' ? 'SMS' : 'WhatsApp'}</b></div>
              <div className="kv"><span className="muted">Audience</span><b>{audience === 'farmers' ? 'Farmers' : 'Customers'}</b></div>
              <div className="kv"><span className="muted">Recipients</span><b>{selected.length || people.length}</b></div>
              <div className="kv"><span className="muted">Message</span><span style={{ maxWidth: 520, textAlign: 'right' }}>{text}</span></div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
          {step < 4 ? (
            <Button type="primary" onClick={() => setStep((s) => s + 1)}>Next</Button>
          ) : (
            <Button type="primary" icon={<Send size={16} />} onClick={() => { message.success(`Message queued to ${selected.length || people.length} recipients`); setStep(0); }}>
              Send
            </Button>
          )}
        </div>
      </SectionCard>

      <Modal
        title={<><Clock size={18} style={{ verticalAlign: -3 }} /> Set delivery / collection time</>}
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save"
        onOk={() =>
          form.validateFields().then((v) => {
            setSlots((s) => [
              ...s,
              { key: `s${Date.now()}`, route: v.route, type: v.type, am: v.am ? v.am.format('HH:mm') : '—', pm: v.pm ? v.pm.format('HH:mm') : '—', centre: v.centre ?? '—', people: 0, status: 'Active' },
            ]);
            form.resetFields();
            setOpen(false);
            message.success('Schedule saved. Use "Message" to notify everyone.');
          })
        }
      >
        <Form form={form} layout="vertical" initialValues={{ type: 'Customer delivery', am: dayjs().hour(7).minute(0) }}>
          <Form.Item name="route" label="Route / name" rules={[{ required: true }]}><Input placeholder="e.g. Ruiru drop-offs" /></Form.Item>
          <Form.Item name="type" label="Type"><Select options={[{ value: 'Farmer collection', label: 'Farmer collection' }, { value: 'Customer delivery', label: 'Customer delivery' }]} /></Form.Item>
          <div className="grid-2" style={{ gap: 12 }}>
            <Form.Item name="am" label="Morning time"><TimePicker format="HH:mm" style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="pm" label="Evening time"><TimePicker format="HH:mm" style={{ width: '100%' }} /></Form.Item>
          </div>
          <Form.Item name="centre" label="Collection point / customers"><Input /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
