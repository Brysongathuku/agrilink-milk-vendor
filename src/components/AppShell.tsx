'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Select, Tooltip, App } from 'antd';
import { ChevronDown, ChevronUp, LogOut, Menu, MessageCircle, X } from 'lucide-react';
import { ABATTOIR_NAV, NAV, PROFILE_HOME, PROFILE_OPTIONS } from '@/lib/nav';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { message } = App.useApp();

  const isAbattoir = pathname === '/abattoir' || pathname.startsWith('/abattoir/');
  const profile = isAbattoir ? 'Abattoir' : 'Milk Vendor';
  const nav = isAbattoir ? ABATTOIR_NAV : NAV;

  const groupForPath = (p: string) =>
    nav.find((n) => n.children?.some((c) => c.href === p))?.key ?? null;

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const g = groupForPath(pathname);
    return g ? { [g]: true } : {};
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const g = groupForPath(pathname);
    if (g) setOpen((o) => ({ ...o, [g]: true }));
    setMobileOpen(false); // close the mobile menu after navigating
  }, [pathname]);

  return (
    <div className="shell">
      {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <button type="button" className="sidebar-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <X size={22} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pesira-logo.png" alt="Pesira" className="brand-logo" />
          <div className="brand-app">AgriLink</div>
          <div className="brand-role">{profile}</div>
          {/* Every AgriLink profile is listed; only Milk Vendor and Abattoir are active, the rest do nothing. */}
          <Select
            className="profile-select"
            size="large"
            value={profile}
            options={PROFILE_OPTIONS}
            onChange={(v: string) => {
              const home = PROFILE_HOME[v];
              if (home && v !== profile) router.push(home);
            }}
            popupMatchSelectWidth
          />
        </div>

        <nav className="nav">
          {nav.map((item) => {
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
          <button type="button" className="menu-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pesira-logo.png" alt="Pesira" className="topbar-logo" />
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
