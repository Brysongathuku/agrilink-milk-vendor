'use client';

import { App, Button, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { DAIRY_FARMER, WALLET_TXNS } from '@/lib/dairy-data';
import { kes, num } from '@/lib/format';

export default function EWalletPage() {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(5000);
  const f = DAIRY_FARMER;

  return (
    <div className="stack">
      <div className="page-head">
        <div>
          <h1 className="page-title">Farm Wallet</h1>
          <p className="page-sub">Your farm wallet is active and ready to use.</p>
        </div>
        <span className="wallet-active">● Wallet active</span>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div>
          <div className="wallet-card">
            <div className="wallet-brand">PESIRA</div>
            <div className="wallet-sub">FARM WALLET</div>
            <div className="wallet-label">WALLET BALANCE</div>
            <div className="wallet-balance"><small>KES</small> {num(f.walletBalance, 2)}</div>
            <div className="wallet-name">{f.name.toUpperCase()}</div>
            <div className="wallet-code">Client code. {f.clientCode}</div>
            <div className="wallet-dots"><span /><span /></div>
          </div>
          <div className="wallet-facts">
            <div><div className="wallet-fact-label">PENDING MILK</div><div className="wallet-fact-value">{kes(f.pendingMilk)}</div></div>
            <div><div className="wallet-fact-label">PRODUCT</div><div className="wallet-fact-value">FARM-KES</div></div>
            <div><div className="wallet-fact-label">STATUS</div><div className="wallet-fact-value" style={{ color: '#00B57F' }}>Active</div></div>
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div className="panel-head" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ textTransform: 'uppercase', fontSize: 17 }}>Wallet details</h3>
            <Button size="small" icon={<RotateCw size={13} />}>Refresh</Button>
          </div>
          <div className="panel-body">
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="wallet-detail"><div className="wallet-fact-label">CLIENT CODE</div><div className="wallet-fact-value">{f.clientCode}</div></div>
              <div className="wallet-detail"><div className="wallet-fact-label">ACCOUNT NUMBER</div><div className="wallet-fact-value">{f.accountNo}</div></div>
            </div>
            <div className="wallet-fact-label" style={{ marginTop: 18 }}>M-PESA LINKED</div>
            <span className="wallet-mpesa">● {f.mpesa}</span>
            <Button type="primary" block size="large" style={{ marginTop: 18 }} onClick={() => setOpen(true)}>
              Withdraw funds
            </Button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="panel-head" style={{ justifyContent: 'space-between' }}>
          <h3 style={{ textTransform: 'uppercase', fontSize: 17 }}>Transaction history</h3>
          <Button size="small" icon={<RotateCw size={13} />}>Refresh</Button>
        </div>
        <div className="panel-body">
          {WALLET_TXNS.slice(0, 5).map((t) => (
            <div className="kv" key={t.ref + t.date}>
              <span>
                {t.description}
                <div className="muted" style={{ fontSize: 12 }}>{t.date} · {t.ref}</div>
              </span>
              <b style={{ color: t.kind === 'in' ? '#047857' : '#b91c1c', whiteSpace: 'nowrap' }}>
                {t.kind === 'in' ? '+' : '−'} {kes(t.amount, t.amount % 1 ? 2 : 0)}
              </b>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Withdraw to M-Pesa"
        open={open}
        onCancel={() => setOpen(false)}
        okText="Withdraw"
        onOk={() => {
          setOpen(false);
          message.success(`${kes(amount)} is on its way to ${f.mpesa}`);
        }}
      >
        <p className="muted">Available: {kes(f.walletBalance)}</p>
        <InputNumber size="large" prefix="KES" min={100} max={f.walletBalance} value={amount} onChange={(v) => setAmount(Number(v) || 0)} style={{ width: '100%' }} />
      </Modal>
    </div>
  );
}
