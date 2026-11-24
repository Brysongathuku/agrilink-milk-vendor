import Marketplace from '@/components/Marketplace';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/data';

export default function ProductsPage() {
  return (
    <Marketplace
      products={PRODUCTS}
      categories={PRODUCT_CATEGORIES}
      note="Prices from the ILRI dairy equipment list. Refrigerator, chest freezer and dairy meal prices are indicative."
    />
  );
}
