import Marketplace from '@/components/Marketplace';
import { AB_PRODUCTS, AB_PRODUCT_CATEGORIES } from '@/lib/abattoir-data';

export default function AbattoirProductsPage() {
  return (
    <Marketplace
      products={AB_PRODUCTS}
      categories={AB_PRODUCT_CATEGORIES}
      defaultHeading="Tools for Pastoralists & Slaughterhouses"
      note="All prices are indicative demo prices in KES, to be confirmed with suppliers."
    />
  );
}
