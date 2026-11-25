// Demo data for the Dairy Farmer profile.
// Grace Wanjiku is one of the Milk Vendor's suppliers (F-001), so her deliveries, quality readings
// and payments match what the Milk Vendor sees in Farmers and the Transactional Ledger.

import { FARMER_RATE } from '@/lib/data';

export const VENDOR = 'Gathuku Fresh Milk Vendors';

export const DAIRY_FARMER = {
  name: 'Grace Wanjiku',
  initials: 'GW',
  memberNo: 'GDFCS-04418',
  clientCode: '2081',
  accountNo: '2081',
  mpesa: '254712438901',
  phone: '+254 712 438 901',
  location: 'Kanjai, Githunguri Ward, Kiambu County',
  geo: '-1.0581, 36.7795',
  farmSize: '2.5 acres',
  pasture: '1.5 acres Napier grass, 0.5 acres Rhodes grass',
  zeroGrazing: 'Zero-grazing unit, 8 stalls, concrete floor',
  water: 'Borehole + 10,000 L tank',
  route: 'Kanjai Route',
  collection: '06:30 and 17:30 at Kanjai collection point',
  walletBalance: 18640,
  pendingMilk: 3168, // 37 L + 27 L not yet paid
};

export type CowStatus = 'Milking' | 'Dry' | 'In-calf heifer' | 'Heifer' | 'Calf';
export type Cow = {
  tag: string;
  name: string;
  breed: string;
  age: string;
  status: CowStatus;
  lactation: number;
  daysInMilk: number;
  litres: number; // per day
  lastCalving: string;
  nextEvent: string;
  health: string;
};

export const COWS: Cow[] = [
  { tag: 'KE-KBU-D-1104', name: 'Neema', breed: 'Friesian', age: '6 yrs', status: 'Milking', lactation: 4, daysInMilk: 62, litres: 18, lastCalving: '24 Sep 2026', nextEvent: 'Heat check – 28 Nov', health: 'Healthy' },
  { tag: 'KE-KBU-D-1105', name: 'Baraka', breed: 'Friesian', age: '5 yrs', status: 'Milking', lactation: 3, daysInMilk: 118, litres: 15, lastCalving: '30 Jul 2026', nextEvent: 'Pregnancy check – 02 Dec', health: 'Healthy' },
  { tag: 'KE-KBU-D-1106', name: 'Zawadi', breed: 'Ayrshire', age: '4 yrs', status: 'Milking', lactation: 2, daysInMilk: 41, litres: 14, lastCalving: '15 Oct 2026', nextEvent: 'Vaccination (LSD) – 01 Dec', health: 'Healthy' },
  { tag: 'KE-KBU-D-1107', name: 'Malkia', breed: 'Friesian', age: '7 yrs', status: 'Milking', lactation: 5, daysInMilk: 205, litres: 9, lastCalving: '04 May 2026', nextEvent: 'Milk withheld until 26 Nov', health: 'Mastitis – treated' },
  { tag: 'KE-KBU-D-1108', name: 'Bahati', breed: 'Jersey', age: '4 yrs', status: 'Milking', lactation: 2, daysInMilk: 150, litres: 12, lastCalving: '28 Jun 2026', nextEvent: 'Heat check – 30 Nov', health: 'Healthy' },
  { tag: 'KE-KBU-D-1109', name: 'Furaha', breed: 'Ayrshire', age: '6 yrs', status: 'Dry', lactation: 4, daysInMilk: 0, litres: 0, lastCalving: '10 Nov 2025', nextEvent: 'Due to calve – 12 Dec', health: 'Healthy' },
  { tag: 'KE-KBU-D-1110', name: 'Wanjiru', breed: 'Friesian x Boran', age: '2 yrs', status: 'In-calf heifer', lactation: 0, daysInMilk: 0, litres: 0, lastCalving: '—', nextEvent: 'Due to calve – 18 Feb 2027', health: 'Healthy' },
  { tag: 'KE-KBU-D-1111', name: 'Imani', breed: 'Friesian', age: '14 months', status: 'Heifer', lactation: 0, daysInMilk: 0, litres: 0, lastCalving: '—', nextEvent: 'First service – Jan 2027', health: 'Healthy' },
  { tag: 'KE-KBU-D-1112', name: 'Toto', breed: 'Ayrshire', age: '6 weeks', status: 'Calf', lactation: 0, daysInMilk: 0, litres: 0, lastCalving: '—', nextEvent: 'Weaning – Feb 2027', health: 'Healthy' },
];

// One row per delivery to the milk vendor
export type Delivery = { ref: string; date: string; session: 'AM' | 'PM'; litres: number; density: number; grade: string; buyer: string; status: string; mpesa: string };

export const DELIVERIES: Delivery[] = [
  { ref: 'MC-26112501', date: '25 Nov 2026', session: 'AM', litres: 37, density: 1.029, grade: 'A', buyer: VENDOR, status: 'Pending', mpesa: '—' },
  { ref: 'MC-26112430', date: '24 Nov 2026', session: 'PM', litres: 27, density: 1.028, grade: 'A', buyer: VENDOR, status: 'Pending', mpesa: '—' },
  { ref: 'MC-26112401', date: '24 Nov 2026', session: 'AM', litres: 36, density: 1.029, grade: 'A', buyer: VENDOR, status: 'Paid', mpesa: 'TKN7D2LA40' },
  { ref: 'MC-26112330', date: '23 Nov 2026', session: 'PM', litres: 26, density: 1.029, grade: 'A', buyer: VENDOR, status: 'Paid', mpesa: 'TKM9P0XW55' },
  { ref: 'MC-26112301', date: '23 Nov 2026', session: 'AM', litres: 35, density: 1.028, grade: 'A', buyer: VENDOR, status: 'Paid', mpesa: 'TKM3H6QE71' },
  { ref: 'MC-26112230', date: '22 Nov 2026', session: 'PM', litres: 25, density: 1.027, grade: 'B', buyer: VENDOR, status: 'Paid', mpesa: 'TKL8C1VN26' },
  { ref: 'MC-26112101', date: '21 Nov 2026', session: 'AM', litres: 36, density: 1.029, grade: 'A', buyer: VENDOR, status: 'Paid', mpesa: 'TKL4H2X9QA' },
];

export const deliveryValue = (d: Delivery) => d.litres * FARMER_RATE;

export const WEEK_MILK = [
  { day: 'Wed', produced: 66, delivered: 60 },
  { day: 'Thu', produced: 67, delivered: 61 },
  { day: 'Fri', produced: 65, delivered: 59 },
  { day: 'Sat', produced: 64, delivered: 59 },
  { day: 'Sun', produced: 66, delivered: 60 },
  { day: 'Mon', produced: 68, delivered: 61 },
  { day: 'Tue', produced: 72, delivered: 63 },
];

export type HealthEvent = { date: string; cow: string; type: string; detail: string; by: string; withdrawal: string };
export const HEALTH: HealthEvent[] = [
  { date: '23 Nov 2026', cow: 'Malkia (1107)', type: 'Treatment', detail: 'Mastitis found with CMT test. Intramammary antibiotic, 3 days.', by: 'Dr. Jane Wambui', withdrawal: 'Milk withheld until 26 Nov' },
  { date: '18 Nov 2026', cow: 'Neema (1104)', type: 'Breeding', detail: 'Artificial insemination, Friesian sire.', by: 'Peter Kamau (AI technician)', withdrawal: '—' },
  { date: '12 Nov 2026', cow: 'All milking cows', type: 'Deworming', detail: 'Albendazole drench.', by: 'Grace Wanjiku', withdrawal: 'Milk withheld 3 days (done)' },
  { date: '03 Nov 2026', cow: 'Baraka (1105)', type: 'Pregnancy check', detail: 'Confirmed in calf, about 60 days.', by: 'Dr. Jane Wambui', withdrawal: '—' },
  { date: '15 Oct 2026', cow: 'Zawadi (1106)', type: 'Calving', detail: 'Normal calving. Heifer calf, Toto.', by: 'Grace Wanjiku', withdrawal: 'Colostrum, 5 days (done)' },
  { date: '02 Sep 2026', cow: 'Whole herd', type: 'Vaccination', detail: 'Foot-and-mouth disease vaccine.', by: 'County vet', withdrawal: '—' },
];

export type Feed = { feed: string; perDay: string; source: string; costPerMonth: number; stock: string; status: string };
export const FEEDS: Feed[] = [
  { feed: 'Napier grass (chopped)', perDay: '320 kg', source: 'Own farm', costPerMonth: 4500, stock: 'About 6 weeks left on the plot', status: 'In stock' },
  { feed: 'Dairy meal', perDay: '14 kg', source: `${VENDOR} (on credit)`, costPerMonth: 18600, stock: '2 bags (70 kg)', status: 'Low stock' },
  { feed: 'Rhodes grass hay', perDay: '20 kg', source: 'Local supplier', costPerMonth: 7200, stock: '24 bales', status: 'In stock' },
  { feed: 'Mineral salts', perDay: '0.5 kg', source: 'Agrovet, Githunguri', costPerMonth: 1350, stock: '10 kg', status: 'In stock' },
  { feed: 'Water', perDay: '600 L', source: 'Borehole', costPerMonth: 900, stock: '10,000 L tank', status: 'In stock' },
];

export type Txn = { date: string; description: string; ref: string; amount: number; kind: 'in' | 'out' };
export const WALLET_TXNS: Txn[] = [
  { date: '24 Nov 2026', description: `Milk payment – 36 L (AM) · ${VENDOR}`, ref: 'TKN7D2LA40', amount: 1782, kind: 'in' },
  { date: '23 Nov 2026', description: `Milk payment – 26 L (PM) · ${VENDOR}`, ref: 'TKM9P0XW55', amount: 1287, kind: 'in' },
  { date: '23 Nov 2026', description: `Milk payment – 35 L (AM) · ${VENDOR}`, ref: 'TKM3H6QE71', amount: 1732.5, kind: 'in' },
  { date: '22 Nov 2026', description: `Milk payment – 25 L (PM) · ${VENDOR}`, ref: 'TKL8C1VN26', amount: 1237.5, kind: 'in' },
  { date: '21 Nov 2026', description: 'Dairy meal deduction – 1 bag (70 kg)', ref: 'MC-26112102', amount: 3100, kind: 'out' },
  { date: '21 Nov 2026', description: `Milk payment – 36 L (AM) · ${VENDOR}`, ref: 'TKL4H2X9QA', amount: 1782, kind: 'in' },
  { date: '20 Nov 2026', description: 'Withdrawal to M-Pesa 254712438901', ref: 'WD-58214', amount: 10000, kind: 'out' },
  { date: '15 Nov 2026', description: 'Livestock insurance premium', ref: 'INS-2081-11', amount: 1450, kind: 'out' },
];

export type Buyer = { name: string; type: string; price: number; payment: string; distance: string; status: string };
export const MILK_BUYERS: Buyer[] = [
  { name: VENDOR, type: 'Milk vendor', price: 49.5, payment: 'Daily to wallet', distance: '0.8 km (Kanjai point)', status: 'Current buyer' },
  { name: 'Githunguri Dairy Farmers Co-op', type: 'Co-operative', price: 49.5, payment: 'Monthly, on the 4th', distance: '3.2 km', status: 'Member' },
  { name: 'Kiambu Fresh Dairies', type: 'Processor', price: 51, payment: 'Every 15 days', distance: '12 km', status: 'Open' },
  { name: 'Ruiru Milk Bar', type: 'Milk bar', price: 55, payment: 'Cash on delivery', distance: '18 km', status: 'Open' },
];

export type Officer = { name: string; role: string; area: string; phone: string; lastVisit: string; rating: number };
export const OFFICERS: Officer[] = [
  { name: 'Dr. Jane Wambui', role: 'Veterinary officer', area: 'Githunguri', phone: '+254 722 640 118', lastVisit: '23 Nov 2026', rating: 4.8 },
  { name: 'Peter Kamau', role: 'AI technician', area: 'Githunguri, Ikinu', phone: '+254 711 905 332', lastVisit: '18 Nov 2026', rating: 4.6 },
  { name: 'Lucy Muthoni', role: 'Dairy extension officer', area: 'Githunguri Sub-county', phone: '+254 733 218 470', lastVisit: '06 Nov 2026', rating: 4.7 },
  { name: 'Samuel Njuguna', role: 'Feed & fodder advisor', area: 'Kiambu County', phone: '+254 701 552 093', lastVisit: '14 Oct 2026', rating: 4.4 },
];

export const WEATHER = [
  { day: 'Today', icon: 'sun', high: 24, low: 12, rain: 10, note: 'Dry and sunny' },
  { day: 'Thu', icon: 'cloudSun', high: 23, low: 13, rain: 20, note: 'Partly cloudy' },
  { day: 'Fri', icon: 'rain', high: 20, low: 13, rain: 70, note: 'Afternoon showers' },
  { day: 'Sat', icon: 'rain', high: 19, low: 12, rain: 80, note: 'Heavy rain in the evening' },
  { day: 'Sun', icon: 'cloud', high: 21, low: 12, rain: 40, note: 'Cloudy' },
  { day: 'Mon', icon: 'cloudSun', high: 23, low: 11, rain: 15, note: 'Partly cloudy' },
  { day: 'Tue', icon: 'sun', high: 25, low: 12, rain: 5, note: 'Sunny' },
];
