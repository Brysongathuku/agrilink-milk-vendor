'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Select, Tooltip, App } from 'antd';
import { ChevronDown, ChevronUp, LogOut, MessageCircle } from 'lucide-react';
import { NAV, PROFILE_OPTIONS } from '@/lib/nav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { message } = App.useApp();

  const groupForPath = (p: string) =>
    NAV.find((n) => n.children?.some((c) => c.href === p))?.key ?? null;

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const g = groupForPath(pathname);
    return g ? { [g]: true } : {};
  });

  useEffect(() => {
    const g = groupForPath(pathname);
    if (g) setOpen((o) => ({ ...o, [g]: true }));
  }, [pathname]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pesira-logo.png" alt="Pesira" className="brand-logo" />
          <div className="brand-app">AgriLink</div>
          <div className="brand-role">Milk Vendor</div>
          {/* Every AgriLink profile is listed; only Milk Vendor is active, so picking another one does nothing. */}
          <Select
            className="profile-select"
            size="large"
            value="Milk Vendor"
            options={PROFILE_OPTIONS}
            onChange={() => undefined}
            popupMatchSelectWidth
          />
        </div>

        <nav className="nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            if (!item.children) {
              const active = pathname === item.href;
              return (
                <Link key={item.key} href={item.href!} className={`nav-item ${active ? 'active' : ''}`}>
                  <Icon size={20} strokeWidth={1.7} />
                  <span>{item.label}</span>
                </Link>
              );
            }
            const isOpen = !!open[item.key];
            const hasActive = item.children.some((c) => c.href === pathname);
            return (
              <div key={item.key}>
                <button
                  type="button"
                  className={`nav-item nav-parent ${hasActive ? 'parent-active' : ''}`}
                  onClick={() => setOpen((o) => ({ ...o, [item.key]: !o[item.key] }))}
                >
                  <Icon size={20} strokeWidth={1.7} />
                  <span>{item.label}</span>
                  {isOpen ? <ChevronUp size={18} className="chev" /> : <ChevronDown size={18} className="chev" />}
                </button>
                {isOpen && (
                  <div className="nav-children">
                    {item.children.map((c) => {
                      const CIcon = c.icon;
                      const active = pathname === c.href;
                      return (
                        <Link key={c.href} href={c.href} className={`nav-child ${active ? 'active' : ''}`}>
                          <CIcon size={19} strokeWidth={1.7} />
                          <span>{c.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <div className="nav-divider" />
          <button type="button" className="nav-item logout" onClick={() => message.info('Demo mode: log out is disabled')}>
            <LogOut size={20} strokeWidth={1.7} />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <Tooltip title="Bryson Gathuku">
            <div className="avatar">BG</div>
          </Tooltip>
        </header>
        <main className="content">{children}</main>
      </div>

      <button type="button" className="chat-fab" aria-label="Chat" onClick={() => message.info('Support chat coming soon')}>
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
