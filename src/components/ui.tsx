'use client';

import { Button, Tag } from 'antd';
import { RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  upper,
  boxed = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  upper?: boolean;
  boxed?: boolean;
}) {
  const inner = (
    <div className="page-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className={`page-title ${upper ? 'upper' : ''}`}>{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  );
  return boxed ? <div className="card">{inner}</div> : <div style={{ marginBottom: 20 }}>{inner}</div>;
}

export function StatCard({
  label,
  value,
  unit,
  icon,
  foot,
  color,
}: {
  label: string;
  value: ReactNode;
  unit?: string;
  icon?: ReactNode;
  foot?: ReactNode;
  color?: string;
}) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={color ? { color } : undefined}>
        {icon}
        {value}
        {unit && <small>{unit}</small>}
      </div>
      {foot && <div className="stat-foot">{foot}</div>}
    </div>
  );
}

export function Stats({ children }: { children: ReactNode }) {
  return <div className="stats">{children}</div>;
}

export function Hero({ chips, onRefresh }: { chips: { value: ReactNode; label: string }[]; onRefresh?: () => void }) {
  return (
    <div className="hero">
      <div className="hero-chips">
        {chips.map((c) => (
          <div className="hero-chip" key={c.label}>
            <b>{c.value}</b>
            <span>{c.label}</span>
          </div>
        ))}
      </div>
      <Button
        ghost
        icon={<RefreshCw size={16} />}
        onClick={onRefresh}
        style={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)', fontWeight: 600 }}
      >
        Refresh
      </Button>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  paid: 'green',
  completed: 'green',
  delivered: 'green',
  active: 'green',
  compliant: 'green',
  valid: 'green',
  accepted: 'green',
  passed: 'green',
  approved: 'green',
  healthy: 'green',
  'in stock': 'green',
  excellent: 'green',
  good: 'green',
  partial: 'gold',
  pending: 'gold',
  'on hold': 'gold',
  'low stock': 'gold',
  'expiring soon': 'gold',
  scheduled: 'blue',
  'in transit': 'blue',
  'awaiting supplier': 'blue',
  sent: 'blue',
  draft: 'default',
  invited: 'blue',
  open: 'blue',
  unpaid: 'red',
  overdue: 'red',
  rejected: 'red',
  expired: 'red',
  missing: 'red',
  critical: 'red',
  failed: 'red',
  inactive: 'default',
  'deni (credit)': 'volcano',
  fair: 'gold',
  poor: 'red',
};

export function StatusTag({ status }: { status: string }) {
  const color = STATUS_COLORS[status.toLowerCase()] ?? 'default';
  return (
    <Tag color={color} style={{ borderRadius: 999, paddingInline: 10 }}>
      {status}
    </Tag>
  );
}

export function SectionCard({
  title,
  subtitle,
  extra,
  children,
  style,
}: {
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="card" style={style}>
      {(title || extra) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            {title && <h3 className="section-title">{title}</h3>}
            {subtitle && <p className="section-sub">{subtitle}</p>}
          </div>
          {extra}
        </div>
      )}
      {children}
    </div>
  );
}

export function Panel({ icon, title, sub, children, bodyStyle }: { icon?: ReactNode; title: string; sub?: string; children: ReactNode; bodyStyle?: React.CSSProperties }) {
  return (
    <div className="panel">
      <div className="panel-head">
        {icon}
        <h3>{title}</h3>
        {sub && <span className="sub">{sub}</span>}
      </div>
      <div className="panel-body" style={bodyStyle}>{children}</div>
    </div>
  );
}
