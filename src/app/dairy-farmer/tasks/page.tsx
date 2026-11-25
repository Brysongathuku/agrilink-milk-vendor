'use client';

import { useState } from 'react';
import { Checkbox, Tag } from 'antd';
import { PageHeader, SectionCard } from '@/components/ui';

type Task = { id: number; task: string; when: string; cow?: string; group: 'Today' | 'This week' | 'Later'; done: boolean };

const TASKS: Task[] = [
  { id: 1, task: 'Morning milking and delivery to Kanjai point', when: '06:30', group: 'Today', done: true },
  { id: 2, task: "Keep Malkia's milk separate (treatment)", when: 'All day', cow: 'Malkia', group: 'Today', done: false },
  { id: 3, task: 'Chop Napier grass for two days', when: 'Afternoon', group: 'Today', done: false },
  { id: 4, task: 'Evening milking and delivery', when: '17:30', group: 'Today', done: false },
  { id: 5, task: 'Heat check', when: '28 Nov', cow: 'Neema', group: 'This week', done: false },
  { id: 6, task: 'Buy 2 bags of dairy meal', when: '28 Nov', group: 'This week', done: false },
  { id: 7, task: 'Heat check', when: '30 Nov', cow: 'Bahati', group: 'This week', done: false },
  { id: 8, task: 'Lumpy skin disease vaccination', when: '01 Dec', cow: 'Zawadi', group: 'Later', done: false },
  { id: 9, task: 'Pregnancy check with the vet', when: '02 Dec', cow: 'Baraka', group: 'Later', done: false },
  { id: 10, task: 'Prepare calving pen', when: '05 Dec', cow: 'Furaha', group: 'Later', done: false },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(TASKS);
  const toggle = (id: number) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  return (
    <div className="stack">
      <PageHeader eyebrow="Farm Management" title="Farm Tasks" subtitle="What needs doing on the farm." boxed={false} />
      {(['Today', 'This week', 'Later'] as const).map((g) => (
        <SectionCard key={g} title={g}>
          {tasks
            .filter((t) => t.group === g)
            .map((t) => (
              <div className="kv" key={t.id} style={{ alignItems: 'center' }}>
                <Checkbox checked={t.done} onChange={() => toggle(t.id)}>
                  <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#9ca3af' : '#111827' }}>{t.task}</span>
                  {t.cow && <Tag style={{ marginLeft: 8 }}>{t.cow}</Tag>}
                </Checkbox>
                <span className="muted" style={{ whiteSpace: 'nowrap' }}>{t.when}</span>
              </div>
            ))}
        </SectionCard>
      ))}
    </div>
  );
}
