'use client';

import { useMemo, useState } from 'react';
import { App, Badge, Button, Drawer, InputNumber, Modal } from 'antd';
import { ArrowRight, Search, ShoppingCart, SlidersHorizontal, Trash2 } from 'lucide-react';
export type MarketProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  image?: string;
  seller: string;
  variants: { label: string; price: number }[];
  stock: number;
  indicative?: boolean;
};
type Product = MarketProduct;
import { kes } from '@/lib/format';

type CartLine = { key: string; product: Product; variant: string; price: number; qty: number };

const priceFrom = (p: Product) => Math.min(...p.variants.map((v) => v.price));
const priceTo = (p: Product) => Math.max(...p.variants.map((v) => v.price));

function ProductImage({ p }: { p: Product }) {
  return (
    <div className="mp-img">
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.image} alt={p.name} />
      ) : (
        <div className="letter" aria-hidden="true">{p.name.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
}

function ProductCard({ p, onAdd, onView }: { p: Product; onAdd: (p: Product, variant: string, price: number) => void; onView: (p: Product) => void }) {
  const multi = p.variants.length > 1;
  return (
    <div className="mp-card">
      <ProductImage p={p} />
      <div className="mp-body">
        <div className="mp-cat">{p.category}</div>
        <div className="mp-name">{p.name}</div>
        <div className="mp-desc">{p.description}</div>
        <div className="mp-divider" />
        <div className="mp-price">
          {kes(priceFrom(p))}
          {multi && <span className="to"> – {kes(priceTo(p))}</span>}
        </div>
        <div className="mp-meta">
          <span className="dot" />
          {p.stock.toLocaleString()} in stock
          {p.indicative && <span className="tag">Indicative price</span>}
        </div>
        {multi ? (
          <button type="button" className="mp-btn view" onClick={() => onView(p)}>
            <ArrowRight size={16} /> View product
          </button>
        ) : (
          <button type="button" className="mp-btn add" onClick={() => onAdd(p, p.variants[0].label, p.variants[0].price)}>
            <ShoppingCart size={16} /> Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default function Marketplace({
  products,
  categories,
  defaultHeading = 'Top Deals of the Day',
  note,
}: {
  products: MarketProduct[];
  categories: { name: string; image?: string }[];
  defaultHeading?: string;
  note?: string;
}) {
  const { message } = App.useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [min, setMin] = useState<number | null>(500);
  const [max, setMax] = useState<number | null>(300000);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [viewing, setViewing] = useState<Product | null>(null);
  const [variant, setVariant] = useState('');
  const [qty, setQty] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (q && !`${p.name} ${p.category} ${p.seller}`.toLowerCase().includes(q)) return false;
      return p.variants.some((v) => (min == null || v.price >= min) && (max == null || v.price <= max));
    });
  }, [products, query, category, min, max]);

  const add = (product: Product, v: string, price: number, n = 1) => {
    const key = `${product.id}|${v}`;
    setCart((c) => {
      const found = c.find((l) => l.key === key);
      return found ? c.map((l) => (l.key === key ? { ...l, qty: l.qty + n } : l)) : [...c, { key, product, variant: v, price, qty: n }];
    });
    message.success(`${product.name} added to cart`);
  };

  const openView = (p: Product) => {
    setViewing(p);
    setVariant(p.variants[0].label);
    setQty(1);
  };

  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => s + l.qty * l.price, 0);
  const viewingPrice = viewing?.variants.find((v) => v.label === variant)?.price ?? 0;

  return (
    <div className="card" style={{ padding: '26px 24px' }}>
      <div className="mp-head">
        <h1 className="mp-title">MARKETPLACE</h1>
        <Badge count={count} color="#00B57F" offset={[-6, 2]}>
          <button type="button" className={`mp-cart ${count ? 'has-items' : ''}`} onClick={() => setCartOpen(true)}>
            Cart <ShoppingCart size={22} />
          </button>
        </Badge>
      </div>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <label className="mp-search">
          <Search size={17} color="#9ca3af" />
          <input placeholder="Search by product, category or seller" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="mp-range">
          <SlidersHorizontal size={16} />
          <span style={{ marginRight: 4 }}>Price range</span>
          <InputNumber prefix="KES" value={min} onChange={(v) => setMin(v)} min={0} style={{ width: 130 }} />
          <span style={{ color: '#9ca3af' }}>–</span>
          <InputNumber prefix="KES" value={max} onChange={(v) => setMax(v)} min={0} style={{ width: 150 }} />
        </div>
      </div>

      <h2 className="mp-section-title">Categories</h2>
      <div className="categories">
        {categories.map((c) => (
          <div key={c.name} className={`category ${category === c.name ? 'selected' : ''}`} onClick={() => setCategory((cur) => (cur === c.name ? null : c.name))}>
            <div className="circle">
              {c.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image} alt={c.name} />
              ) : (
                <span className="letter">{c.name.charAt(0)}</span>
              )}
            </div>
            {c.name}
          </div>
        ))}
      </div>

      <h2 className="mp-section-title">{category ?? defaultHeading}</h2>
      {filtered.length ? (
        <div className="products">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={add} onView={openView} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6b7280', fontSize: 14 }}>
          No products match <strong>&quot;{query}&quot;</strong>
          <div style={{ marginTop: 12 }}>
            <Button type="primary" onClick={() => { setQuery(''); setCategory(null); setMin(0); setMax(null); }}>Reset search</Button>
          </div>
        </div>
      )}
      {note && <p className="mp-note">{note}</p>}

      <Modal open={!!viewing} onCancel={() => setViewing(null)} footer={null} width={560} title={null}>
        {viewing && (
          <div>
            <div className="mp-img" style={{ borderRadius: 8, overflow: 'hidden', marginTop: 24 }}>
              {viewing.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={viewing.image} alt={viewing.name} style={{ objectFit: 'contain', background: '#fff' }} />
              ) : (
                <div className="letter">{viewing.name.charAt(0)}</div>
              )}
            </div>
            <div className="mp-cat" style={{ marginTop: 16 }}>{viewing.category}</div>
            <div className="mp-name" style={{ fontSize: '1.2rem' }}>{viewing.name}</div>
            <p style={{ fontSize: 14, color: '#6b7280', margin: '0 0 14px' }}>{viewing.description}</p>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Choose a size</div>
            {viewing.variants.map((v) => (
              <div key={v.label} className={`mp-variant ${variant === v.label ? 'selected' : ''}`} onClick={() => setVariant(v.label)}>
                <span>{v.label}</span>
                <b>{kes(v.price)}</b>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
              <InputNumber min={1} value={qty} onChange={(v) => setQty(Number(v) || 1)} style={{ width: 80 }} />
              <button
                type="button"
                className="mp-btn add"
                onClick={() => {
                  add(viewing, variant, viewingPrice, qty);
                  setViewing(null);
                }}
              >
                <ShoppingCart size={16} /> Add to cart · {kes(viewingPrice * qty)}
              </button>
            </div>
            <div className="mp-meta" style={{ marginTop: 12, marginBottom: 0 }}>
              <span className="dot" /> {viewing.stock.toLocaleString()} in stock · Sold by {viewing.seller}
            </div>
          </div>
        )}
      </Modal>

      <Drawer title={`Cart (${count})`} open={cartOpen} onClose={() => setCartOpen(false)} width={420}>
        {cart.length === 0 ? (
          <p style={{ color: '#6b7280' }}>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((l) => (
              <div key={l.key} className="kv" style={{ alignItems: 'center', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{l.product.name}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{l.variant}</div>
                </div>
                <InputNumber min={1} value={l.qty} style={{ width: 64 }} onChange={(v) => setCart((c) => c.map((x) => (x.key === l.key ? { ...x, qty: Number(v) || 1 } : x)))} />
                <b style={{ width: 100, textAlign: 'right' }}>{kes(l.qty * l.price)}</b>
                <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => setCart((c) => c.filter((x) => x.key !== l.key))} />
              </div>
            ))}
            <div className="kv" style={{ fontSize: 16, marginTop: 10 }}>
              <b>Total</b>
              <b>{kes(total)}</b>
            </div>
            <Button
              type="primary"
              block
              size="large"
              style={{ marginTop: 16 }}
              onClick={() => {
                message.success('Order placed (demo). It will appear under Market Place › Orders.');
                setCart([]);
                setCartOpen(false);
              }}
            >
              Checkout with M-Pesa
            </Button>
          </>
        )}
      </Drawer>
    </div>
  );
}
