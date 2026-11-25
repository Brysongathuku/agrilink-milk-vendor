'use client';

import { useState, type ReactNode } from 'react';
import { App, Button, Input } from 'antd';
import { Download, Filter, Plus, Search } from 'lucide-react';
import { Hero, PageHeader } from '@/components/ui';

/** True when any field of the row contains the search text. */
export function rowMatches(row: object, q: string) {
  if (!q.trim()) return true;
  return JSON.stringify(row).toLowerCase().includes(q.trim().toLowerCase());
}

/**
 * Standard list page: header, optional green hero chips or stat cards, a toolbar with search,
 * and the table (rendered by the page through `children`, which receives the search text).
 */
export default function ListPage({
  eyebrow,
  title,
  subtitle,
  chips,
  stats,
  addLabel,
  onAdd,
  searchPlaceholder = 'Search...',
  toolbarExtra,
  note,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  chips?: { value: ReactNode; label: string }[];
  stats?: ReactNode;
  addLabel?: string;
  onAdd?: () => void;
  searchPlaceholder?: string;
  toolbarExtra?: ReactNode;
  note?: ReactNode;
  children: (query: string) => ReactNode;
}) {
  const { message } = App.useApp();
  const [query, setQuery] = useState('');

  return (
    <div className="stack">
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} boxed={false} />
      {chips && <Hero chips={chips} onRefresh={() => message.success('Refreshed')} />}
      {stats}
      <div className="card">
        <div className="toolbar">
          <Input
            size="large"
            allowClear
            prefix={<Search size={16} color="#9ca3af" />}
            placeholder={searchPlaceholder}
            style={{ maxWidth: 340 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {toolbarExtra}
          <Button icon={<Filter size={16} />}>Filters</Button>
          <Button icon={<Download size={16} />} onClick={() => message.success('Preparing your download')}>
            Download
          </Button>
          <div className="spacer" />
          {addLabel && (
            <Button type="primary" size="large" icon={<Plus size={18} />} onClick={onAdd ?? (() => message.info(`${addLabel} is coming soon`))}>
              {addLabel}
            </Button>
          )}
        </div>
        {children(query)}
        {note && <div className="demo-note" style={{ marginTop: 12 }}>{note}</div>}
      </div>
    </div>
  );
}
