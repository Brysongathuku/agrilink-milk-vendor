import {
  ArrowLeftRight,
  ChartColumn,
  Boxes,
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
  Calculator,
  Tag,
  Wheat,
  Warehouse,
  Beef,
  Snowflake,
  Ship,
  FileCheck,
  Globe,
  Wallet,
  Megaphone,
  Settings,
  Factory,
  CloudSun,
  CreditCard,
  Stethoscope,
  Tractor,
  HeartPulse,
  ListTodo,
  Milk,
  MapPin,
  Route,
  CalendarDays,
  HandCoins,
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
];

const A = '/abattoir';

export const ABATTOIR_NAV: NavItem[] = [
  { key: 'ab-analytics', label: 'Analytics', icon: House, href: A },
  {
    key: 'ab-market',
    label: 'Market Place',
    icon: ShoppingBag,
    children: [
      { label: 'Products', href: `${A}/products`, icon: Package },
      { label: 'My Orders', href: `${A}/marketplace-orders`, icon: Truck },
    ],
  },
  {
    key: 'ab-finance',
    label: 'Finance',
    icon: Landmark,
    children: [
      { label: 'Operating Expenses', href: `${A}/expenses`, icon: Receipt },
      { label: 'Creditors & Payouts', href: `${A}/payables`, icon: HandCoins },
      { label: 'Cost & Profit', href: `${A}/profitability`, icon: ChartColumn },
    ],
  },
  {
    key: 'ab-sales',
    label: 'Sales',
    icon: TrendingUp,
    children: [
      { label: 'Customers', href: `${A}/customers`, icon: Users },
      { label: 'Invoices & Proformas', href: `${A}/invoices`, icon: FileText },
      { label: 'Payments & Debtors', href: `${A}/payments`, icon: Wallet },
    ],
  },
  {
    key: 'ab-orders',
    label: 'Orders & Planning',
    icon: ClipboardList,
    children: [
      { label: 'Client Orders', href: `${A}/orders`, icon: ClipboardList },
      { label: 'Live Animal Planner', href: `${A}/planner`, icon: Calculator },
      { label: 'Slaughter Schedule', href: `${A}/slaughter-schedule`, icon: CalendarDays },
      { label: 'Trace Order / Animal', href: `${A}/trace`, icon: Route },
    ],
  },
  {
    key: 'ab-sourcing',
    label: 'Livestock Sourcing',
    icon: Truck,
    children: [
      { label: 'Pastoralists', href: `${A}/pastoralists`, icon: Users },
      { label: 'Procurement Batches', href: `${A}/procurement`, icon: ListOrdered },
      { label: 'Receiving & Tagging', href: `${A}/animals`, icon: Tag },
    ],
  },
  {
    key: 'ab-processing',
    label: 'Processing',
    icon: Factory,
    children: [
      { label: 'Feedlot', href: `${A}/feedlot`, icon: Wheat },
      { label: 'Lairage', href: `${A}/lairage`, icon: Warehouse },
      { label: 'Slaughter', href: `${A}/slaughter`, icon: Beef },
      { label: 'Cold Store', href: `${A}/cold-store`, icon: Snowflake },
    ],
  },
  {
    key: 'ab-stores',
    label: 'Stores',
    icon: Boxes,
    children: [
      { label: 'Store Movements', href: `${A}/store-movements`, icon: ArrowLeftRight },
      { label: 'Stock Balances', href: `${A}/stock`, icon: Boxes },
    ],
  },
  {
    key: 'ab-dispatch',
    label: 'Dispatch & Export',
    icon: Ship,
    children: [
      { label: 'Dispatch & Delivery', href: `${A}/dispatch`, icon: Truck },
      { label: 'Export Orders', href: `${A}/export-orders`, icon: Globe },
      { label: 'Shipments & Documents', href: `${A}/shipments`, icon: FileCheck },
    ],
  },
  {
    key: 'ab-access',
    label: 'Market Access',
    icon: Store,
    children: [{ label: 'Price Insights', href: `${A}/price-insights`, icon: ChartColumn }],
  },
  {
    key: 'ab-community',
    label: 'Community',
    icon: MessageSquare,
    children: [{ label: 'Price Broadcast', href: `${A}/broadcast`, icon: Megaphone }],
  },
  {
    key: 'ab-compliance',
    label: 'Compliance',
    icon: Shield,
    children: [{ label: 'Licences & Certificates', href: `${A}/compliance`, icon: Scale }],
  },
  {
    key: 'ab-staff',
    label: 'Staff & Roles',
    icon: UserCog,
    children: [
      { label: 'Users', href: `${A}/users`, icon: Users },
      { label: 'Department Access', href: `${A}/access`, icon: Settings },
    ],
  },
];

const D = '/dairy-farmer';

export const DAIRY_NAV: NavItem[] = [
  { key: 'df-weather', label: 'Weather', icon: CloudSun, href: `${D}/weather` },
  {
    key: 'df-market',
    label: 'Marketplace',
    icon: Store,
    children: [{ label: 'Products', href: `${D}/products`, icon: Package }],
  },
  {
    key: 'df-wallet',
    label: 'My Wallet',
    icon: Wallet,
    children: [
      { label: 'E-Wallet', href: `${D}/e-wallet`, icon: CreditCard },
      { label: 'Transactions', href: `${D}/transactions`, icon: ArrowLeftRight },
    ],
  },
  { key: 'df-officers', label: 'Extension Officers', icon: Stethoscope, href: `${D}/extension` },
  {
    key: 'df-farm',
    label: 'Farm Management',
    icon: Tractor,
    children: [
      { label: 'Farm Overview', href: D, icon: House },
      { label: 'My Farm', href: `${D}/farm`, icon: MapPin },
      { label: 'My Herd', href: `${D}/herd`, icon: Users },
      { label: 'Milk Records', href: `${D}/milk-records`, icon: Milk },
      { label: 'Breeding & Health', href: `${D}/health`, icon: HeartPulse },
      { label: 'Feeding', href: `${D}/feeding`, icon: Wheat },
      { label: 'Farm Tasks', href: `${D}/tasks`, icon: ListTodo },
      { label: 'Milk Buyers', href: `${D}/milk-buyers`, icon: Link2 },
      { label: 'Farm to Fork', href: `${D}/farm-to-fork`, icon: Route },
    ],
  },
];

// Livestock ecosystem profiles, grouped as in the profile switcher.
// Only Milk Vendor, Abattoir and Dairy Farmer open a workspace for now.
export const PROFILE_GROUPS: { label: string; profiles: string[] }[] = [
  { label: 'Farmers', profiles: ['Dairy Farmer', 'Pastoralist', 'Crop Farmer'] },
  { label: 'Businesses', profiles: ['Milk Vendor', 'Abattoir', 'Aggregator', 'Agribusiness', 'Agroprocessor'] },
  { label: 'Advisors', profiles: ['Extension Officer'] },
];

export const PROFILES = PROFILE_GROUPS.flatMap((g) => g.profiles);

export const PROFILE_HOME: Record<string, string> = {
  'Milk Vendor': '/agrilink',
  Abattoir: '/abattoir',
  'Dairy Farmer': '/dairy-farmer',
};
