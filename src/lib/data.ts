// Demo data for the Milk Vendor profile. Replace with API calls when the backend is wired.

export type CustomerCategory = 'Households' | 'Supermarkets' | 'Hotels' | 'Schools' | 'Off-takers/FMCG';
export const CUSTOMER_CATEGORIES: CustomerCategory[] = ['Households', 'Supermarkets', 'Hotels', 'Schools', 'Off-takers/FMCG'];
export const CATEGORY_COLORS: Record<CustomerCategory, string> = {
  Households: 'cyan',
  Supermarkets: 'blue',
  Hotels: 'purple',
  Schools: 'gold',
  'Off-takers/FMCG': 'green',
};

/* ---------------- Farmers (primary supplier database) ----------------
 * Modelled on Githunguri Dairy Farmers Co-operative Society members (Githunguri, Kiambu County):
 * wards Githunguri, Ikinu, Ngewa, Komothai and Githiga; farm-gate price about KES 49.50 per litre. */
export type Farmer = {
  id: string;
  memberNo: string; // Githunguri Dairy Farmers Co-operative member number
  name: string;
  phone: string;
  gender: 'Male' | 'Female';
  county: string;
  ward: string;
  village: string;
  cows: number;
  avgDailyLitres: number;
  avgDensity: number;
  route: string;
  lastDelivery: string;
  status: 'Active' | 'Inactive';
};

export const FARMERS: Farmer[] = [
  { id: 'F-001', memberNo: 'GDFCS-04418', name: 'Grace Wanjiku', phone: '+254 712 438 901', gender: 'Female', county: 'Kiambu', ward: 'Githunguri', village: 'Kanjai', cows: 6, avgDailyLitres: 68, avgDensity: 1.029, route: 'Kanjai Route', lastDelivery: '21 Nov 2026, 06:40', status: 'Active' },
  { id: 'F-002', memberNo: 'GDFCS-11702', name: 'Joseph Maina', phone: '+254 722 315 774', gender: 'Male', county: 'Kiambu', ward: 'Ngewa', village: 'Nyaga', cows: 4, avgDailyLitres: 46, avgDensity: 1.028, route: 'Ngewa Route', lastDelivery: '21 Nov 2026, 06:55', status: 'Active' },
  { id: 'F-003', memberNo: 'GDFCS-02931', name: 'Esther Nyokabi', phone: '+254 701 662 109', gender: 'Female', county: 'Kiambu', ward: 'Ikinu', village: 'Gathangari', cows: 8, avgDailyLitres: 94, avgDensity: 1.030, route: 'Ikinu Route', lastDelivery: '21 Nov 2026, 07:05', status: 'Active' },
  { id: 'F-004', memberNo: 'GDFCS-16655', name: 'Peter Kariuki', phone: '+254 733 208 516', gender: 'Male', county: 'Kiambu', ward: 'Komothai', village: 'Kambui', cows: 5, avgDailyLitres: 52, avgDensity: 1.026, route: 'Komothai Route', lastDelivery: '21 Nov 2026, 07:20', status: 'Active' },
  { id: 'F-005', memberNo: 'GDFCS-20387', name: 'Lucy Wambui', phone: '+254 745 930 227', gender: 'Female', county: 'Kiambu', ward: 'Githiga', village: 'Kiganjo', cows: 3, avgDailyLitres: 31, avgDensity: 1.027, route: 'Githiga Route', lastDelivery: '20 Nov 2026, 17:45', status: 'Active' },
  { id: 'F-006', memberNo: 'GDFCS-07264', name: 'Samuel Gitonga', phone: '+254 768 114 590', gender: 'Male', county: 'Kiambu', ward: 'Githunguri', village: 'Kiairia', cows: 7, avgDailyLitres: 81, avgDensity: 1.029, route: 'Kanjai Route', lastDelivery: '21 Nov 2026, 06:30', status: 'Active' },
  { id: 'F-007', memberNo: 'GDFCS-25119', name: 'Mary Wairimu', phone: '+254 790 527 336', gender: 'Female', county: 'Kiambu', ward: 'Ikinu', village: 'Mukuyu', cows: 2, avgDailyLitres: 18, avgDensity: 1.025, route: 'Ikinu Route', lastDelivery: '18 Nov 2026, 17:30', status: 'Inactive' },
];

/* ---------------- Customers ---------------- */
export type Customer = {
  id: string;
  name: string;
  category: CustomerCategory;
  contact: string;
  phone: string;
  location: string;
  dailyLitres: number;
  paymentTerms: string;
  balance: number;
};

export const CUSTOMERS: Customer[] = [
  { id: 'C-001', name: 'Mama Njeri Household', category: 'Households', contact: 'Njeri Kamau', phone: '+254 711 204 551', location: 'Githunguri Town', dailyLitres: 3, paymentTerms: 'M-Pesa on delivery', balance: 0 },
  { id: 'C-002', name: 'Green Valley Supermarket', category: 'Supermarkets', contact: 'Daniel Mwangi', phone: '+254 722 880 143', location: 'Githunguri Town', dailyLitres: 120, paymentTerms: '7 days', balance: 18400 },
  { id: 'C-003', name: 'Kimbo Gardens Hotel', category: 'Hotels', contact: 'Agnes Muthoni', phone: '+254 703 455 920', location: 'Kambui', dailyLitres: 45, paymentTerms: '14 days', balance: 9900 },
  { id: 'C-004', name: 'Githiga Primary School', category: 'Schools', contact: 'Mr. James Ndirangu', phone: '+254 734 671 008', location: 'Githiga', dailyLitres: 60, paymentTerms: 'Monthly (term)', balance: 31200 },
  { id: 'C-005', name: 'Highland Dairies Ltd', category: 'Off-takers/FMCG', contact: 'Procurement Desk', phone: '+254 709 300 400', location: 'Ruiru', dailyLitres: 250, paymentTerms: '15 days', balance: 112500 },
  { id: 'C-006', name: 'Kiambu Road Mini-Mart', category: 'Supermarkets', contact: 'Ann Wanjiru', phone: '+254 757 219 664', location: 'Kiambu Road', dailyLitres: 35, paymentTerms: '7 days', balance: 4200 },
  { id: 'C-007', name: 'Kanjai Hill Academy', category: 'Schools', contact: 'Bursar', phone: '+254 720 518 337', location: 'Kanjai', dailyLitres: 80, paymentTerms: 'Monthly (term)', balance: 0 },
];

/* ---------------- Marketplace products (ILRI list) ---------------- */
export type ProductCategory =
  | 'Testing & Quality Control'
  | 'Handling & Storage'
  | 'Cooling & Infrastructure'
  | 'Hygiene & Sanitation'
  | 'Animal Feeds';

export const PRODUCT_CATEGORIES: { name: ProductCategory; image?: string }[] = [
  { name: 'Testing & Quality Control', image: '/products/lactometer.jpg' },
  { name: 'Handling & Storage', image: '/products/milk-churn.jpg' },
  { name: 'Cooling & Infrastructure', image: '/products/milk-chiller.jpg' },
  { name: 'Hygiene & Sanitation', image: '/products/steriscrub.jpg' },
  { name: 'Animal Feeds' },
];

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image?: string;
  seller: string;
  variants: { label: string; price: number }[];
  stock: number;
  indicative?: boolean; // price not from the ILRI list
};

export const PRODUCTS: Product[] = [
  { id: 'P-01', stock: 194, name: 'Lactometer', category: 'Testing & Quality Control', image: '/products/lactometer.jpg', seller: 'ILRI Dairy Inputs', description: 'Measures milk density at collection to detect added water and confirm quality.', variants: [{ label: 'Standard glass body', price: 1100 }] },
  { id: 'P-02', stock: 320, name: 'Milk Sieve / Strainer', category: 'Testing & Quality Control', image: '/products/milk-sieve.jpg', seller: 'ILRI Dairy Inputs', description: 'Filters out physical impurities during aggregation before milk goes into cans.', variants: [{ label: 'Standard', price: 1000 }] },
  { id: 'P-03', stock: 85, name: 'Hygiene & Testing Kit (CMT)', category: 'Testing & Quality Control', image: '/products/cmt-kit.jpg', seller: 'ILRI Dairy Inputs', description: 'California Mastitis Test kit for screening milk from individual cows at the farm.', variants: [{ label: 'CMT kit', price: 4000 }] },
  { id: 'P-04', stock: 60, name: 'Dairy Thermometer', category: 'Testing & Quality Control', image: '/products/thermometer.jpg', seller: 'ILRI Dairy Inputs', description: 'Veterinary / dairy probe for checking milk temperature at reception and in storage.', variants: [{ label: 'Veterinary / dairy probe', price: 2999 }] },
  { id: 'P-05', stock: 240, name: 'Milk Dipper', category: 'Testing & Quality Control', image: '/products/milk-dipper.jpg', seller: 'ILRI Dairy Inputs', description: 'Stainless steel sampling dipper for taking test samples from cans.', variants: [{ label: 'Stainless steel sampling dipper', price: 650 }] },
  {
    id: 'P-06', stock: 150, name: 'Milk Churn (Can)', category: 'Handling & Storage', image: '/products/milk-churn.jpg', seller: 'ILRI Dairy Inputs', description: 'Aluminium / stainless steel milk cans for collection and transport.',
    variants: [
      { label: '10 L (Aluminium/Steel)', price: 3900 },
      { label: '20 L (Food-grade Aluminium)', price: 7500 },
      { label: '25 L (Heavy Aluminium)', price: 8800 },
      { label: '30 L (Aluminium/Stainless)', price: 11200 },
      { label: '50 L (Heavy duty, lockable)', price: 16500 },
    ],
  },
  { id: 'P-07', stock: 210, name: 'Milk Bucket', category: 'Handling & Storage', image: '/products/milk-bucket.jpg', seller: 'ILRI Dairy Inputs', description: 'Food-grade bucket for milking and short transfers.', variants: [{ label: '20 L', price: 3500 }] },
  { id: 'P-08', stock: 400, name: 'Milk Jug', category: 'Handling & Storage', image: '/products/milk-jug.jpg', seller: 'ILRI Dairy Inputs', description: 'Plastic or aluminium jug for measuring and pouring retail portions.', variants: [{ label: '3 – 5 L (Plastic/Aluminium)', price: 1200 }] },
  {
    id: 'P-09', stock: 500, name: 'Milk Scoop / Measure', category: 'Handling & Storage', image: '/products/milk-scoop.jpg', seller: 'ILRI Dairy Inputs', description: 'Calibrated scoops for accurate retail measures.',
    variants: [
      { label: '¼ Litre', price: 800 },
      { label: '½ Litre', price: 1100 },
      { label: '1 Litre', price: 1300 },
    ],
  },
  { id: 'P-10', stock: 6, name: 'Milk Chiller', category: 'Cooling & Infrastructure', image: '/products/milk-chiller.jpg', seller: 'ILRI Dairy Inputs', description: 'Bulk milk cooler that brings milk to 4 °C quickly and cuts afternoon spoilage.', variants: [{ label: 'Standard', price: 250000 }] },
  { id: 'P-11', stock: 18, name: 'Milk ATM / Dispenser', category: 'Cooling & Infrastructure', image: '/products/milk-atm.jpg', seller: 'ILRI Dairy Inputs', description: 'Refrigerated self-service dispenser for retail sales with metered pouring.', variants: [{ label: '50 Litre', price: 15000 }] },
  { id: 'P-12', stock: 12, name: 'Refrigerator', category: 'Cooling & Infrastructure', seller: 'Pesira Partner Store', description: 'Upright commercial display fridge for packed milk and mala at the outlet.', variants: [{ label: 'Upright display, ~300 L', price: 68000 }] },
  { id: 'P-13', stock: 9, name: 'Chest Freezer', category: 'Cooling & Infrastructure', seller: 'Pesira Partner Store', description: 'Chest freezer for ice packs and frozen dairy stock.', variants: [{ label: '~300 L', price: 58000 }] },
  { id: 'P-14', stock: 130, name: 'SteriScrub Dairy Sanitizer', category: 'Hygiene & Sanitation', image: '/products/steriscrub.jpg', seller: 'ILRI Dairy Inputs', description: 'Dairy-grade sanitizer for cans, buckets and the milk ATM.', variants: [{ label: '5 Litre (market average)', price: 2500 }] },
  { id: 'P-15', stock: 2000, name: 'Dairy Meal', category: 'Animal Feeds', seller: 'Pesira Partner Store', description: 'Concentrate feed supplied to farmers on credit and recovered from milk payments.', variants: [{ label: '70 kg bag', price: 3100 }] },
];

/* ---------------- Analytics ---------------- */
export const WEEKLY_OPS = [
  { day: 'Mon', collections: 425, retail: 180, bulk: 225, spoilage: 12 },
  { day: 'Tue', collections: 450, retail: 190, bulk: 240, spoilage: 14 },
  { day: 'Wed', collections: 410, retail: 170, bulk: 222, spoilage: 9 },
  { day: 'Thu', collections: 480, retail: 205, bulk: 255, spoilage: 15 },
  { day: 'Fri', collections: 505, retail: 215, bulk: 270, spoilage: 13 },
  { day: 'Sat', collections: 520, retail: 230, bulk: 268, spoilage: 16 },
  { day: 'Sun', collections: 545, retail: 240, bulk: 280, spoilage: 22 },
];

export const MONTHLY_PRODUCTION = [
  { month: 'Jan', litres: 11240 }, { month: 'Feb', litres: 10380 }, { month: 'Mar', litres: 11920 },
  { month: 'Apr', litres: 13650 }, { month: 'May', litres: 14820 }, { month: 'Jun', litres: 14110 },
  { month: 'Jul', litres: 12960 }, { month: 'Aug', litres: 12540 }, { month: 'Sep', litres: 13210 },
  { month: 'Oct', litres: 14480 }, { month: 'Nov', litres: 15630 },
];

export const SESSION_COMPARE = [
  { session: 'Morning', yesterday: 295, today: 312 },
  { session: 'Evening', yesterday: 225, today: 233 },
];

export const SALES_BY_CATEGORY: { category: CustomerCategory; litres: number; revenue: number }[] = [
  { category: 'Off-takers/FMCG', litres: 7250, revenue: 471250 },
  { category: 'Supermarkets', litres: 4620, revenue: 323400 },
  { category: 'Schools', litres: 3480, revenue: 236640 },
  { category: 'Hotels', litres: 1350, revenue: 97200 },
  { category: 'Households', litres: 2110, revenue: 168800 },
];

/* ---------------- Milk ledger ---------------- */
export const FARMER_RATE = 49.5; // KES paid per litre — Githunguri co-op farm-gate price, 2026

export const MILK_LEDGER = [
  { ref: 'MC-26112101', date: '21 Nov 2026', session: 'AM', farmer: 'Grace Wanjiku', litres: 36, density: 1.029, grade: 'A', deduction: 0, mpesa: 'TKL4H2X9QA', status: 'Paid' },
  { ref: 'MC-26112102', date: '21 Nov 2026', session: 'AM', farmer: 'Esther Nyokabi', litres: 51, density: 1.030, grade: 'A', deduction: 3100, mpesa: 'TKL4H3B1RD', status: 'Paid' },
  { ref: 'MC-26112103', date: '21 Nov 2026', session: 'AM', farmer: 'Peter Kariuki', litres: 28, density: 1.026, grade: 'B', deduction: 0, mpesa: '—', status: 'Pending' },
  { ref: 'MC-26112104', date: '21 Nov 2026', session: 'AM', farmer: 'Samuel Gitonga', litres: 44, density: 1.029, grade: 'A', deduction: 1550, mpesa: 'TKL4H5Z7PM', status: 'Paid' },
  { ref: 'MC-26112105', date: '21 Nov 2026', session: 'AM', farmer: 'Joseph Maina', litres: 25, density: 1.028, grade: 'A', deduction: 0, mpesa: 'TKL4H6C2WE', status: 'Paid' },
  { ref: 'MC-26112006', date: '20 Nov 2026', session: 'PM', farmer: 'Lucy Wambui', litres: 15, density: 1.027, grade: 'B', deduction: 0, mpesa: '—', status: 'Pending' },
  { ref: 'MC-26112007', date: '20 Nov 2026', session: 'PM', farmer: 'Mary Wairimu', litres: 9, density: 1.024, grade: 'Rejected', deduction: 0, mpesa: '—', status: 'Rejected' },
];

export const MARKETPLACE_SPEND = [
  { ref: 'MP-0412', date: '19 Nov 2026', item: 'Milk Churn (Can) 50 L', seller: 'ILRI Dairy Inputs', qty: 2, amount: 33000, method: 'M-Pesa', status: 'Paid' },
  { ref: 'MP-0411', date: '17 Nov 2026', item: 'Lactometer', seller: 'ILRI Dairy Inputs', qty: 2, amount: 2200, method: 'M-Pesa', status: 'Paid' },
  { ref: 'MP-0409', date: '14 Nov 2026', item: 'SteriScrub Dairy Sanitizer 5 L', seller: 'ILRI Dairy Inputs', qty: 3, amount: 7500, method: 'Cash', status: 'Paid' },
  { ref: 'MP-0405', date: '10 Nov 2026', item: 'Dairy Meal 70 kg', seller: 'Pesira Partner Store', qty: 10, amount: 31000, method: 'M-Pesa', status: 'Paid' },
  { ref: 'MP-0401', date: '06 Nov 2026', item: 'Milk ATM / Dispenser 50 L', seller: 'ILRI Dairy Inputs', qty: 1, amount: 15000, method: 'Bank transfer', status: 'Paid' },
  { ref: 'MP-0398', date: '03 Nov 2026', item: 'Milk Sieve / Strainer', seller: 'ILRI Dairy Inputs', qty: 4, amount: 4000, method: 'M-Pesa', status: 'Paid' },
  { ref: 'MP-0413', date: '21 Nov 2026', item: 'Dairy Thermometer', seller: 'ILRI Dairy Inputs', qty: 1, amount: 2999, method: 'M-Pesa', status: 'Pending' },
];
