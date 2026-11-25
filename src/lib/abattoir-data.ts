// Demo data for the Abattoir profile (modelled on the Northern Abattoirs requirements, Nov 2026).
// Replace with API calls when the backend is ready. Prices are indicative demo values.

export type Species = 'Goat' | 'Sheep' | 'Cattle' | 'Camel';
export const SPECIES: Species[] = ['Goat', 'Sheep', 'Cattle', 'Camel'];

export const USD_KES = 129; // demo exchange rate

// yield = expected carcass ÷ live weight; avgLive in kg; prices per kg
export const SPECIES_INFO: Record<Species, { yield: number; avgLive: number; livePrice: number; localCarcass: number; exportUsd: number }> = {
  Goat: { yield: 0.43, avgLive: 30, livePrice: 300, localCarcass: 820, exportUsd: 7.2 },
  Sheep: { yield: 0.45, avgLive: 32, livePrice: 280, localCarcass: 780, exportUsd: 7.0 },
  Cattle: { yield: 0.52, avgLive: 380, livePrice: 260, localCarcass: 650, exportUsd: 5.4 },
  Camel: { yield: 0.55, avgLive: 420, livePrice: 230, localCarcass: 700, exportUsd: 6.1 },
};

export const SPECIES_COLORS: Record<Species, string> = { Goat: 'green', Sheep: 'blue', Cattle: 'orange', Camel: 'gold' };

/* ---------------- Pastoralists / suppliers ---------------- */
export type Pastoralist = {
  id: string;
  name: string;
  phone: string;
  county: 'Garissa' | 'Wajir' | 'Isiolo';
  area: string;
  market: string;
  geo: string;
  species: Species[];
  supplied: number; // head supplied in last 12 months
  lastSupply: string;
  payout: string;
  status: string;
};

export const PASTORALISTS: Pastoralist[] = [
  { id: 'PST-001', name: 'Abdi Hassan Mohamed', phone: '+254 712 908 114', county: 'Garissa', area: 'Balambala', market: 'Garissa livestock market', geo: '-0.0402, 39.5761', species: ['Goat', 'Cattle'], supplied: 214, lastSupply: '22 Nov 2026', payout: 'Pesira e-wallet', status: 'Active' },
  { id: 'PST-002', name: 'Fatuma Ali Noor', phone: '+254 722 451 330', county: 'Garissa', area: 'Dadaab', market: 'Garissa livestock market', geo: '0.0531, 40.3086', species: ['Goat', 'Sheep'], supplied: 168, lastSupply: '22 Nov 2026', payout: 'Pesira e-wallet', status: 'Active' },
  { id: 'PST-003', name: 'Hussein Ibrahim Aden', phone: '+254 701 337 902', county: 'Wajir', area: 'Habaswein', market: 'Habaswein market', geo: '1.0105, 39.4893', species: ['Camel', 'Goat'], supplied: 96, lastSupply: '20 Nov 2026', payout: 'M-Pesa', status: 'Active' },
  { id: 'PST-004', name: 'Halima Abdullahi Omar', phone: '+254 745 220 671', county: 'Wajir', area: 'Tarbaj', market: 'Wajir livestock market', geo: '2.2167, 40.1500', species: ['Sheep', 'Goat'], supplied: 131, lastSupply: '19 Nov 2026', payout: 'Pesira e-wallet', status: 'Active' },
  { id: 'PST-005', name: 'Galgalo Jarso Boru', phone: '+254 733 806 418', county: 'Isiolo', area: 'Merti', market: 'Isiolo livestock market', geo: '1.0667, 38.6667', species: ['Cattle', 'Camel'], supplied: 74, lastSupply: '18 Nov 2026', payout: 'Pesira e-wallet', status: 'Active' },
  { id: 'PST-006', name: 'Amina Godana Wario', phone: '+254 790 113 547', county: 'Isiolo', area: 'Garbatulla', market: 'Isiolo livestock market', geo: '0.5333, 38.5167', species: ['Goat', 'Sheep'], supplied: 152, lastSupply: '21 Nov 2026', payout: 'M-Pesa', status: 'Active' },
  { id: 'PST-007', name: 'Mohamed Sheikh Abdi', phone: '+254 768 902 255', county: 'Garissa', area: 'Ijara', market: 'Garissa livestock market', geo: '-1.6000, 40.5167', species: ['Cattle'], supplied: 38, lastSupply: '02 Nov 2026', payout: 'Bank transfer', status: 'Inactive' },
];

/* ---------------- Procurement batches ---------------- */
export type Batch = {
  id: string;
  date: string;
  species: Species;
  market: string;
  suppliers: string;
  head: number;
  liveKg: number;
  purchaseCost: number;
  transport: number;
  commission: number;
  route: 'Feedlot' | 'Direct slaughter';
  status: string;
};

export const BATCHES: Batch[] = [
  { id: 'BT-2611-07', date: '22 Nov 2026', species: 'Goat', market: 'Garissa livestock market', suppliers: 'Abdi Hassan, Fatuma Ali', head: 120, liveKg: 3540, purchaseCost: 1062000, transport: 48000, commission: 24000, route: 'Feedlot', status: 'In feedlot' },
  { id: 'BT-2611-06', date: '21 Nov 2026', species: 'Sheep', market: 'Isiolo livestock market', suppliers: 'Amina Godana', head: 60, liveKg: 1890, purchaseCost: 529200, transport: 31000, commission: 12000, route: 'Direct slaughter', status: 'In lairage' },
  { id: 'BT-2611-05', date: '20 Nov 2026', species: 'Camel', market: 'Habaswein market', suppliers: 'Hussein Ibrahim', head: 8, liveKg: 3390, purchaseCost: 779700, transport: 56000, commission: 16000, route: 'Feedlot', status: 'In feedlot' },
  { id: 'BT-2611-04', date: '19 Nov 2026', species: 'Goat', market: 'Wajir livestock market', suppliers: 'Halima Abdullahi', head: 90, liveKg: 2610, purchaseCost: 783000, transport: 52000, commission: 18000, route: 'Direct slaughter', status: 'Slaughtered' },
  { id: 'BT-2611-03', date: '18 Nov 2026', species: 'Cattle', market: 'Isiolo livestock market', suppliers: 'Galgalo Jarso', head: 14, liveKg: 5250, purchaseCost: 1365000, transport: 64000, commission: 28000, route: 'Feedlot', status: 'In lairage' },
  { id: 'BT-2611-02', date: '16 Nov 2026', species: 'Goat', market: 'Garissa livestock market', suppliers: 'Abdi Hassan', head: 150, liveKg: 4380, purchaseCost: 1314000, transport: 55000, commission: 30000, route: 'Feedlot', status: 'Slaughtered' },
  { id: 'BT-2611-01', date: '14 Nov 2026', species: 'Cattle', market: 'Garissa livestock market', suppliers: 'Abdi Hassan, Mohamed Sheikh', head: 10, liveKg: 3820, purchaseCost: 993200, transport: 46000, commission: 20000, route: 'Feedlot', status: 'Slaughtered' },
];

/* ---------------- Animal register (one row per tag) ---------------- */
export type Animal = { tag: string; species: Species; sex: string; age: string; batch: string; supplier: string; buyWeight: number; stage: string; location: string; health: string };

export const ANIMALS: Animal[] = [
  { tag: 'KE-GRS-G-04182', species: 'Goat', sex: 'Male', age: '18 months', batch: 'BT-2611-07', supplier: 'Abdi Hassan Mohamed', buyWeight: 31, stage: 'Feedlot', location: 'Pen 2', health: 'Healthy' },
  { tag: 'KE-GRS-G-04183', species: 'Goat', sex: 'Female', age: '2 years', batch: 'BT-2611-07', supplier: 'Fatuma Ali Noor', buyWeight: 28, stage: 'Feedlot', location: 'Pen 2', health: 'Under treatment' },
  { tag: 'KE-ISL-S-01207', species: 'Sheep', sex: 'Male', age: '14 months', batch: 'BT-2611-06', supplier: 'Amina Godana Wario', buyWeight: 33, stage: 'Lairage', location: 'Lairage B', health: 'Healthy' },
  { tag: 'KE-WJR-C-00311', species: 'Camel', sex: 'Male', age: '5 years', batch: 'BT-2611-05', supplier: 'Hussein Ibrahim Aden', buyWeight: 428, stage: 'Feedlot', location: 'Camel pen', health: 'Healthy' },
  { tag: 'KE-ISL-B-00986', species: 'Cattle', sex: 'Male', age: '3 years', batch: 'BT-2611-03', supplier: 'Galgalo Jarso Boru', buyWeight: 376, stage: 'Lairage', location: 'Lairage A', health: 'Healthy' },
  { tag: 'KE-WJR-G-02540', species: 'Goat', sex: 'Male', age: '20 months', batch: 'BT-2611-04', supplier: 'Halima Abdullahi Omar', buyWeight: 29, stage: 'Slaughtered', location: 'Chiller 1', health: 'Passed inspection' },
  { tag: 'KE-GRS-B-00774', species: 'Cattle', sex: 'Female', age: '4 years', batch: 'BT-2611-01', supplier: 'Mohamed Sheikh Abdi', buyWeight: 362, stage: 'Slaughtered', location: 'Chiller 2', health: 'Partial condemnation' },
];

/* ---------------- Customers (local + export) ---------------- */
export type CustomerType = 'Butcheries' | 'Hotels & Restaurants' | 'Supermarkets' | 'Institutions' | 'Export buyers';
export const CUSTOMER_TYPES: CustomerType[] = ['Butcheries', 'Hotels & Restaurants', 'Supermarkets', 'Institutions', 'Export buyers'];
export const CUSTOMER_TYPE_COLORS: Record<CustomerType, string> = {
  Butcheries: 'red',
  'Hotels & Restaurants': 'purple',
  Supermarkets: 'blue',
  Institutions: 'gold',
  'Export buyers': 'green',
};

export type AbCustomer = { id: string; name: string; type: CustomerType; country: string; city: string; contact: string; terms: string; currency: 'KES' | 'USD'; balance: number };

export const AB_CUSTOMERS: AbCustomer[] = [
  { id: 'AC-001', name: 'Eastleigh Prime Butchery', type: 'Butcheries', country: 'Kenya', city: 'Nairobi', contact: '+254 711 402 988', terms: '14 days', currency: 'KES', balance: 186000 },
  { id: 'AC-002', name: 'Kiamaiko Meat Traders', type: 'Butcheries', country: 'Kenya', city: 'Nairobi', contact: '+254 722 615 207', terms: '14 days', currency: 'KES', balance: 94500 },
  { id: 'AC-003', name: 'Savannah Grill Hotels', type: 'Hotels & Restaurants', country: 'Kenya', city: 'Garissa', contact: '+254 733 290 551', terms: '30 days', currency: 'KES', balance: 128700 },
  { id: 'AC-004', name: 'FreshMart Supermarkets', type: 'Supermarkets', country: 'Kenya', city: 'Nairobi', contact: '+254 709 811 300', terms: '30 days', currency: 'KES', balance: 312400 },
  { id: 'AC-005', name: 'Garissa University Catering', type: 'Institutions', country: 'Kenya', city: 'Garissa', contact: '+254 745 908 112', terms: '30 days', currency: 'KES', balance: 0 },
  { id: 'AC-006', name: 'Al Noor Foods Trading LLC', type: 'Export buyers', country: 'United Arab Emirates', city: 'Dubai', contact: '+971 4 555 0192', terms: '30 days', currency: 'USD', balance: 15620 },
  { id: 'AC-007', name: 'Gulf Fresh Meat Co.', type: 'Export buyers', country: 'Saudi Arabia', city: 'Riyadh', contact: '+966 11 555 0418', terms: '14 days', currency: 'USD', balance: 10350 },
];

/* ---------------- Marketplace: pastoralist + slaughterhouse tools ---------------- */
export const AB_PRODUCT_CATEGORIES = [
  { name: 'Tagging & Weighing', image: '/products/abattoir/ear-tags.jpg' },
  { name: 'Animal Health', image: '/products/abattoir/vaccination-syringe.jpg' },
  { name: 'Feeding & Water', image: '/products/abattoir/water-trough.jpg' },
  { name: 'Slaughter Equipment', image: '/products/abattoir/bone-saw.jpg' },
  { name: 'Hygiene & Safety', image: '/products/abattoir/protective-kit.jpg' },
];

export const AB_PRODUCTS = [
  { id: 'AP-01', image: '/products/abattoir/ear-tags.jpg', stock: 340, name: 'Livestock Ear Tags + Applicator', category: 'Tagging & Weighing', seller: 'Pesira Partner Store', description: 'Numbered tamper-proof ear tags with applicator pliers. Links every animal to its supplier for traceability.', variants: [{ label: 'Pack of 50 + applicator', price: 2800 }, { label: 'Pack of 100 + applicator', price: 4500 }] },
  { id: 'AP-02', image: '/products/abattoir/weigh-band.jpg', stock: 520, name: 'Heart-Girth Weigh Band', category: 'Tagging & Weighing', seller: 'Pesira Partner Store', description: 'Measuring tape that estimates live weight from chest girth. Helps pastoralists price animals fairly at market.', variants: [{ label: 'Goat & sheep band', price: 650 }, { label: 'Cattle & camel band', price: 950 }] },
  { id: 'AP-03', image: '/products/abattoir/platform-scale.jpg', stock: 14, name: 'Digital Livestock Platform Scale', category: 'Tagging & Weighing', seller: 'Pesira Partner Store', description: 'Cage-and-platform scale for weighing live animals at buying centres, feedlots and lairage.', variants: [{ label: '300 kg (shoats)', price: 48000 }, { label: '1,000 kg (cattle & camels)', price: 95000 }] },
  { id: 'AP-04', image: '/products/abattoir/vaccination-syringe.jpg', stock: 210, name: 'Automatic Vaccination Syringe', category: 'Animal Health', seller: 'Pesira Partner Store', description: 'Self-refilling syringe for fast, accurate doses during PPR, CCPP and FMD vaccination campaigns.', variants: [{ label: '50 ml', price: 2900 }] },
  { id: 'AP-05', image: '/products/abattoir/drenching-gun.jpg', stock: 180, name: 'Drenching Gun', category: 'Animal Health', seller: 'Pesira Partner Store', description: 'Measured-dose applicator for dewormers and oral treatments.', variants: [{ label: '30 ml', price: 3800 }] },
  { id: 'AP-06', image: '/products/abattoir/knapsack-sprayer.jpg', stock: 95, name: 'Knapsack Acaricide Sprayer', category: 'Animal Health', seller: 'Pesira Partner Store', description: 'Hand-pump sprayer for tick and parasite control on the herd.', variants: [{ label: '16 L', price: 4200 }] },
  { id: 'AP-07', image: '/products/abattoir/water-trough.jpg', stock: 60, name: 'Portable Water Trough', category: 'Feeding & Water', seller: 'Pesira Partner Store', description: 'Heavy-duty plastic trough for watering animals in holding grounds and feedlots.', variants: [{ label: '200 L', price: 6500 }] },
  { id: 'AP-08', image: '/products/abattoir/captive-bolt.jpg', stock: 6, name: 'Captive Bolt Stunner', category: 'Slaughter Equipment', seller: 'Pesira Partner Store', description: 'Cartridge-powered stunner for humane handling before slaughter.', variants: [{ label: 'Non-penetrating', price: 165000 }] },
  { id: 'AP-09', image: '/products/abattoir/bone-saw.jpg', stock: 4, name: 'Electric Bone Saw', category: 'Slaughter Equipment', seller: 'Pesira Partner Store', description: 'Stainless steel band saw for cutting bones, carcass quarters and frozen meat.', variants: [{ label: '1.5 kW', price: 145000 }] },
  { id: 'AP-10', image: '/products/abattoir/knife-set.jpg', stock: 40, name: 'Butcher Knife Set + Sharpening Steel', category: 'Slaughter Equipment', seller: 'Pesira Partner Store', description: 'Stainless steel sticking, skinning and boning knives with a sharpening steel and scabbard.', variants: [{ label: '5-piece set', price: 9500 }] },
  { id: 'AP-13', image: '/products/abattoir/probe-thermometer.jpg', stock: 120, name: 'Core Probe Thermometer', category: 'Hygiene & Safety', seller: 'Pesira Partner Store', description: 'Checks carcass core temperature in the chiller and at dispatch for the cold chain.', variants: [{ label: '-50 to 300 °C', price: 3500 }] },
  { id: 'AP-14', image: '/products/abattoir/protective-kit.jpg', stock: 70, name: 'Butcher Protective Kit', category: 'Hygiene & Safety', seller: 'Pesira Partner Store', description: 'Chain-mail glove, waterproof apron and gumboots for slaughter-floor staff.', variants: [{ label: 'Per worker', price: 12000 }] },
];

/* ---------------- Analytics ---------------- */
export const WEEKLY_SLAUGHTER = [
  { day: 'Mon', Goat: 64, Sheep: 22, Cattle: 6, Camel: 2 },
  { day: 'Tue', Goat: 72, Sheep: 18, Cattle: 8, Camel: 1 },
  { day: 'Wed', Goat: 58, Sheep: 26, Cattle: 5, Camel: 3 },
  { day: 'Thu', Goat: 80, Sheep: 30, Cattle: 7, Camel: 2 },
  { day: 'Fri', Goat: 90, Sheep: 28, Cattle: 9, Camel: 4 },
  { day: 'Sat', Goat: 76, Sheep: 24, Cattle: 6, Camel: 2 },
  { day: 'Sun', Goat: 40, Sheep: 12, Cattle: 3, Camel: 1 },
];

export const PIPELINE = [
  { stage: 'Bought (in transit)', head: 46 },
  { stage: 'Feedlot', head: 212 },
  { stage: 'Lairage', head: 88 },
  { stage: 'Slaughter today', head: 94 },
  { stage: 'Carcasses in chiller', head: 131 },
];

// Monthly revenue in KES millions (export converted at USD_KES)
export const MONTHLY_REVENUE = [
  { month: 'Jun', local: 6.8, export: 4.1 },
  { month: 'Jul', local: 7.2, export: 4.6 },
  { month: 'Aug', local: 7.0, export: 5.2 },
  { month: 'Sep', local: 7.9, export: 5.0 },
  { month: 'Oct', local: 8.4, export: 6.3 },
  { month: 'Nov', local: 8.9, export: 7.1 },
];
