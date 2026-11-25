'use client';

import { useState } from 'react';
import { App, Form, Input, InputNumber, Modal, Select, Table, Tag, type TableColumnsType } from 'antd';
import ListPage, { rowMatches } from '@/components/ListPage';
import { StatusTag } from '@/components/ui';
import { ANIMALS, BATCHES, PASTORALISTS, SPECIES, SPECIES_COLORS, type Animal, type Species } from '@/lib/abattoir-data';

const STAGE_COLORS: Record<string, string> = { Feedlot: 'cyan', Lairage: 'blue', Slaughtered: 'purple' };

export default function ReceivingPage() {
  const { message } = App.useApp();
  const [rows, setRows] = useState<Animal[]>(ANIMALS);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const cols: TableColumnsType<Animal> = [
    { title: 'Tag No.', dataIndex: 'tag', render: (v: string) => <span className="strong" style={{ whiteSpace: 'nowrap' }}>{v}</span> },
    { title: 'Species', dataIndex: 'species', render: (v: Species) => <Tag color={SPECIES_COLORS[v]}>{v}</Tag> },
    { title: 'Sex / age', render: (_v, r) => `${r.sex}, ${r.age}` },
    { title: 'Batch', dataIndex: 'batch' },
    { title: 'Supplier', dataIndex: 'supplier' },
    { title: 'Weight at purchase', dataIndex: 'buyWeight', align: 'right', render: (v: number) => `${v} kg` },
    { title: 'Stage', dataIndex: 'stage', render: (v: string) => <Tag color={STAGE_COLORS[v] ?? 'default'}>{v}</Tag> },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Health', dataIndex: 'health', render: (v: string) => <StatusTag status={v === 'Healthy' || v === 'Passed inspection' ? 'Passed' : v === 'Under treatment' ? 'On hold' : 'Partial'} /> },
  ];

  return (
    <>
      <ListPage
        eyebrow="Livestock Sourcing"
        title="Receiving & Tagging"
        subtitle="Register and tag animals as they arrive."
        chips={[
          { value: rows.length, label: 'Animals shown' },
          { value: rows.filter((r) => r.stage === 'Feedlot').length, label: 'In feedlot' },
          { value: rows.filter((r) => r.stage === 'Lairage').length, label: 'In lairage' },
          { value: rows.filter((r) => r.stage === 'Slaughtered').length, label: 'Slaughtered' },
        ]}
        addLabel="Receive Animal"
        onAdd={() => setOpen(true)}
        searchPlaceholder="Search tag, batch, supplier..."
      >
        {(q) => <Table<Animal> rowKey="tag" columns={cols} dataSource={rows.filter((r) => rowMatches(r, q))} pagination={false} scroll={{ x: 1200 }} />}
      </ListPage>

      <Modal
        title="Receive & tag animal"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Save"
        onOk={() =>
          form.validateFields().then((v) => {
            setRows((r) => [{ ...v, location: v.stage === 'Feedlot' ? 'Pen 1' : 'Lairage A', health: 'Healthy' }, ...r]);
            form.resetFields();
            setOpen(false);
            message.success(`Animal ${v.tag} received`);
          })
        }
      >
        <Form form={form} layout="vertical" initialValues={{ species: 'Goat', sex: 'Male', stage: 'Feedlot', tag: 'KE-GRS-G-04200' }}>
          <div className="grid-2" style={{ gap: 12 }}>
            <Form.Item name="tag" label="Tag number" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="species" label="Species"><Select options={SPECIES.map((s) => ({ value: s, label: s }))} /></Form.Item>
            <Form.Item name="sex" label="Sex"><Select options={['Male', 'Female'].map((s) => ({ value: s, label: s }))} /></Form.Item>
            <Form.Item name="age" label="Age" rules={[{ required: true }]}><Input placeholder="e.g. 18 months" /></Form.Item>
            <Form.Item name="batch" label="Batch" rules={[{ required: true }]}><Select options={BATCHES.map((b) => ({ value: b.id, label: `${b.id} · ${b.species}` }))} /></Form.Item>
            <Form.Item name="supplier" label="Supplier" rules={[{ required: true }]}><Select showSearch options={PASTORALISTS.map((p) => ({ value: p.name, label: p.name }))} /></Form.Item>
            <Form.Item name="buyWeight" label="Weight at purchase (kg)" rules={[{ required: true }]}><InputNumber min={1} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="stage" label="Send to">
              <Select options={[{ value: 'Feedlot', label: 'Feedlot' }, { value: 'Lairage', label: 'Direct slaughter (lairage)' }]} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
