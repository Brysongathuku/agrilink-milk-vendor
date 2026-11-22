export const kes = (n: number, digits = 0) =>
  `KES ${n.toLocaleString('en-KE', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

export const num = (n: number, digits = 0) =>
  n.toLocaleString('en-KE', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const litres = (n: number) => `${num(n)} L`;

export const pct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;
