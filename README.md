# Pesira AgriLink – Milk Vendor

A Next.js 15 (App Router) + Ant Design front end for the **Milk Vendor** profile. It started as a copy of the AgriLink Aggregator profile. All data is demo data; there are no backend calls yet.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/agrilink`, the Analytics dashboard.

Production build: `npm run build && npm start`.

## Stack

- Next.js 15, React 19, TypeScript
- Ant Design 5 (+ `@ant-design/v5-patch-for-react-19`, `@ant-design/nextjs-registry`)
- Recharts 3 for charts, lucide-react for icons
- Brand: Pesira green `#00B57F` (`src/lib/theme.ts`), logo at `public/pesira-logo.png`

## Structure

```
src/
  app/
    layout.tsx, providers.tsx     antd registry + theme (#00B57F)
    agrilink/layout.tsx           sidebar shell
    agrilink/page.tsx             Analytics (Operations & Credit dashboard)
    agrilink/<route>/page.tsx     one folder per page (same slugs as the Aggregator app)
  components/AppShell.tsx         sidebar, profile switcher, top bar, chat button
  components/ui.tsx               PageHeader, StatCard, Hero, StatusTag, SectionCard
  lib/nav.ts                      sidebar menu + profile dropdown
  lib/data.ts                     shared demo data (farmers, customers, products, ledger)
public/products/                  ILRI product photos
```

## Modules

| Sidebar | Pages |
|---|---|
| Analytics | Daily volume & margin tracker, yesterday vs today, monthly production, spoilage & quality alerts, M-Pesa / Deni reconciliation, sales by customer category, SACCO credit readiness |
| Market Place | Overview, Products (ILRI dairy equipment + cart), Orders, Stock Overview |
| Finance | Transactional Ledger (milk-only: farmer, litres, density, quality, paid to farmer, marketplace spend), Credit Rating |
| Sales | Customers (Households, Supermarkets, Hotels, Schools, Off-takers/FMCG), Direct Sales, **Deliveries**, Estimates, Invoices, Receipts |
| Supply & Stock | Suppliers, Inventory, Lots & Expiry, Procurement |
| Finance and Investment | Production Costs (labour, refrigeration, compliance, electricity…), Revenue & Profit |
| Market Access | Insights (Kenya Dairy Board prices, demo data), Market Linkages (by customer category), Supply Requests |
| Profiles | Farmers: primary supplier database, modelled on Githunguri Dairy Farmers Co-operative members (Kiambu), farm-gate KES 49.50/L |
| Community | Engagement (collection/delivery schedule + WhatsApp/SMS wizard) |
| Compliance | Regulatory Compliance (KDB pasteurization proof, medical certificates) |
| Staff & Roles | Users, Roles, Permission Profiles |
| Profile | Settings: Organization, Currency (KES), Language |

The profile dropdown lists every AgriLink profile in normal styling, but only **Milk Vendor** is active. Picking another profile does nothing.

Analytics uses the Pesira Insights colours: teal `#2DB8A9`, orange `#F0A030`, blue `#4A9FD4`. Chart series use teal, orange, purple `#8A63D2` and red `#D9534F`; this set is validated for colour-blind and normal-vision separation.

## Next steps to go live

- Replace the arrays in `src/lib/data.ts` and in each page with API calls.
- Connect the Kenya Dairy Board price feed in `market-insights/page.tsx`.
- Refrigerator, chest freezer and dairy meal prices are indicative. Every other price comes from the ILRI price list.
