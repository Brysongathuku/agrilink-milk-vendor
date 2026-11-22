import {
  ArrowLeftRight,
  ChartColumn,
  Boxes,
  Briefcase,
  ClipboardList,
  DollarSign,
  FileText,
  House,
  Landmark,
  LayoutGrid,
  Link2,
  MessageSquare,
  Package,
  PackageCheck,
  PiggyBank,
  Receipt,
  Scale,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Store,
  TrendingUp,
  Truck,
  User,
  UserCog,
  Users,
  ListOrdered,
  type LucideIcon,
} from 'lucide-react';

export type NavChild = { label: string; href: string; icon: LucideIcon };
export type NavItem = { key: string; label: string; icon: LucideIcon; href?: string; children?: NavChild[] };

const B = '/agrilink';

export const NAV: NavItem[] = [
  { key: 'analytics', label: 'Analytics', icon: House, href: B },
  {
    key: 'market',
    label: 'Market Place',
    icon: ShoppingBag,
    children: [
      { label: 'Overview', href: `${B}/marketplace-overview`, icon: LayoutGrid },
      { label: 'Products', href: `${B}/products`, icon: Package },
      { label: 'Orders', href: `${B}/orders`, icon: Truck },
      { label: 'Stock Overview', href: `${B}/stock-overview`, icon: ClipboardList },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: Landmark,
    children: [
      { label: 'Transactional Ledgers', href: `${B}/transactions`, icon: ArrowLeftRight },
      { label: 'Credit Rating', href: `${B}/credit-rating`, icon: PiggyBank },
    ],
  },
  {
    key: 'sales',
    label: 'Sales',
    icon: TrendingUp,
    children: [
      { label: 'Customers', href: `${B}/buyers`, icon: Users },
      { label: 'Direct Sales', href: `${B}/sales`, icon: ShoppingCart },
      { label: 'Deliveries', href: `${B}/deliveries`, icon: Truck },
      { label: 'Estimates', href: `${B}/estimates`, icon: ClipboardList },
      { label: 'Invoices', href: `${B}/invoices`, icon: FileText },
      { label: 'Receipts', href: `${B}/receipts`, icon: DollarSign },
    ],
  },
  {
    key: 'raw',
    label: 'Supply & Stock',
    icon: Boxes,
    children: [
      { label: 'Suppliers', href: `${B}/suppliers`, icon: Truck },
      { label: 'Inventory', href: `${B}/inventory`, icon: ClipboardList },
      { label: 'Lots & Expiry', href: `${B}/lots`, icon: PackageCheck },
      { label: 'Procurement', href: `${B}/procurement`, icon: ListOrdered },
    ],
  },
  {
    key: 'fin-invest',
    label: 'Finance and Investment',
    icon: DollarSign,
    children: [
      { label: 'Production Costs', href: `${B}/production-costs`, icon: Receipt },
      { label: 'Revenue & Profit', href: `${B}/revenue-tracking`, icon: TrendingUp },
    ],
  },
  {
    key: 'access',
    label: 'Market Access',
    icon: Store,
    children: [
      { label: 'Insights', href: `${B}/market-insights`, icon: ChartColumn },
      { label: 'Market Linkages', href: `${B}/market-linkages`, icon: Link2 },
      { label: 'Supply Requests', href: `${B}/supply-requests`, icon: Truck },
    ],
  },
  {
    key: 'profiles',
    label: 'Profiles',
    icon: Users,
    children: [{ label: 'Farmers', href: `${B}/agrilink-farmers`, icon: User }],
  },
  {
    key: 'community',
    label: 'Community',
    icon: MessageSquare,
    children: [{ label: 'Engagement', href: `${B}/engage-community`, icon: MessageSquare }],
  },
  {
    key: 'compliance',
    label: 'Compliance',
    icon: Shield,
    children: [{ label: 'Regulatory Compliance', href: `${B}/compliance-tracking`, icon: Scale }],
  },
  {
    key: 'staff',
    label: 'Staff & Roles',
    icon: UserCog,
    children: [
      { label: 'Users', href: `${B}/users`, icon: Users },
      { label: 'Roles', href: `${B}/roles`, icon: Shield },
      { label: 'Permission Profiles', href: `${B}/permission-profiles`, icon: UserCog },
    ],
  },
  { key: 'profile', label: 'Profile', icon: Briefcase, href: `${B}/agency-profile` },
];

// Profile switcher: only Milk Vendor is active; the rest are listed but disabled.
export const PROFILE_OPTIONS = [
  'Milk Vendor',
  'Aggregator',
  'Farmer',
  'Agronomists',
  'Infarm Investor',
  'Agribusiness',
  'Agroprocessor',
  'Seed producer',
  'SACCO',
].map((p) => ({ value: p, label: p, className: p === 'Milk Vendor' ? undefined : 'locked-option' }));
