import Marketplace from '@/components/Marketplace';
import { AB_PRODUCTS, AB_PRODUCT_CATEGORIES } from '@/lib/abattoir-data';

export default function AbattoirProductsPage() {
  return (
    <Marketplace
      products={AB_PRODUCTS}
      categories={AB_PRODUCT_CATEGORIES}
    />
  );
}
