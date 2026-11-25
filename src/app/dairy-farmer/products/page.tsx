import Marketplace from '@/components/Marketplace';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data';

// Farmers see the dairy inputs and tools; cooling equipment is for milk vendors.
const FARM_PRODUCTS = PRODUCTS.filter((p) => p.category !== 'Cooling & Infrastructure');
const FARM_CATEGORIES = PRODUCT_CATEGORIES.filter((c) => c.name !== 'Cooling & Infrastructure');

export default function DairyProductsPage() {
  return <Marketplace products={FARM_PRODUCTS} categories={FARM_CATEGORIES} />;
}
