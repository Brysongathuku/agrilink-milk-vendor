'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { App, Dropdown, Tooltip, type MenuProps } from 'antd';
import { Beef, Briefcase, Building2, ChevronDown, ChevronUp, GraduationCap, LogOut, Menu, MessageCircle, Milk, Sprout, Store, Tent, X, type LucideIcon } from 'lucide-react';
import { ABATTOIR_NAV, DAIRY_NAV, NAV, PROFILE_GROUPS, PROFILE_HOME, PROFILES, type NavItem } from '@/lib/nav';

const PROFILE_ICONS: Record<string, LucideIcon> = {
  'Milk Vendor': Store,
  Abattoir: Beef,
  'Dairy Farmer': Milk,
  Pastoralist: Tent,
  'Crop Farmer': Sprout,
  'Extension Officer': GraduationCap,
};

const inSection = (path: string, base: string) => path === base || path.startsWith(`${base}/`);

function workspaceFor(path: string): { profile: string; nav: NavItem[]; settings: string; user: { name: string; initials: string } } {
  const me = { name: 'Bryson Gathuku', initials: 'BG' };
  if (inSection(path, '/abattoir')) return { profile: 'Abattoir', nav: ABATTOIR_NAV, settings: '/abattoir/settings', user: me };
  if (inSection(path, '/dairy-farmer'))
    return { profile: 'Dairy Farmer', nav: DAIRY_NAV, settings: '/dairy-farmer/farm', user: { name: 'Grace Wanjiku', initials: 'GW' } };
  return { profile: 'Milk Vendor', nav: NAV, settings: '/agrilink/agency-profile', user: me };
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { message } = App.useApp();

  const { profile, nav, settings: settingsHref, user } = workspaceFor(pathname);
  const ProfileIcon = PROFILE_ICONS[profile] ?? Building2;

  const groupForPath = (p: string) => nav.find((n) => n.children?.some((c) => c.href === p))?.key ?? null;

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const g = groupForPath(pathname);
    return g ? { [g]: true } : {};
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const g = groupForPath(pathname);
    if (g) setOpen((o) => ({ ...o, [g]: true }));
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Every AgriLink profile is listed. Only Milk Vendor and Abattoir open anything for now.
  const profileItems: MenuProps['items'] = PROFILE_GROUPS.map((g) => ({
    type: 'group' as const,
    key: g.label,
    label: g.label,
    children: g.profiles.map((p) => {
      const Icon = PROFILE_ICONS[p] ?? Building2;
      return { key: p, label: p, icon: <Icon size={16} />, className: PROFILE_HOME[p] ? undefined : 'locked-option' };
    }),
  }));

  const userItems: MenuProps['items'] = [
    { key: 'profile', label: <Link href={settingsHref}>Profile</Link>, icon: <Briefcase size={16} /> },
    { type: 'divider' },
    { key: 'logout', label: 'Log Out', icon: <LogOut size={16} />, danger: true },
  ];

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
          <div className="brand-app">
            AgriLink <span className="brand-eco">Livestock</span>
          </div>

          <Dropdown
            trigger={['click']}
            menu={{
              items: profileItems,
              selectable: true,
              selectedKeys: [profile],
              onClick: ({ key }) => {
                const home = PROFILE_HOME[key];
                if (home && key !== profile) router.push(home);
              },
            }}
          >
            <button type="button" className="switcher">
              <span className="switcher-icon">
                <ProfileIcon size={17} />
              </span>
              <span className="switcher-text">
                <span className="switcher-title">{profile}</span>
                <span className="switcher-sub">{PROFILES.length - 1} other accounts</span>
              </span>
              <ChevronDown size={16} className="switcher-chev" />
            </button>
          </Dropdown>
        </div>

        <div className="sidebar-divider" />

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
        </nav>

        <div className="sidebar-user">
          <Dropdown
            trigger={['click']}
            placement="topLeft"
            menu={{
              items: userItems,
              onClick: ({ key }) => {
                if (key === 'logout') message.info('Log out is turned off in the prototype');
              },
            }}
          >
            <button type="button" className="user-card">
              <span className="user-avatar">{user.initials}</span>
              <span className="user-text">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{profile}</span>
              </span>
              <ChevronUp size={16} className="switcher-chev" />
            </button>
          </Dropdown>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button type="button" className="menu-btn" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pesira-logo.png" alt="Pesira" className="topbar-logo" />
          <Tooltip title={user.name}>
            <div className="avatar">{user.initials}</div>
          </Tooltip>
        </header>
        <main className="content">{children}</main>
      </div>

      <button type="button" className="chat-fab" aria-label="Chat" onClick={() => message.info('Support chat is coming soon')}>
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
