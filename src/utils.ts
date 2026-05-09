import type { Rates } from './types';

export function fmtEur(eur: number): string {
  if (eur <= 1) return '€1';
  return '€' + eur.toLocaleString('en-US');
}

export function fmtUsd(eur: number, rates: Rates): string {
  const usd = Math.round(eur * rates.USD);
  if (usd <= 1) return '$1';
  return '$' + usd.toLocaleString('en-US');
}

export function fmtCny(eur: number, rates: Rates): string {
  const cny = Math.round(eur * rates.CNY);
  if (cny <= 1) return '¥1';
  return '¥' + cny.toLocaleString('en-US');
}

export function allInEur(priceEur: number, renoEur: number): number {
  const legal = Math.round(priceEur <= 100 ? 2500 : priceEur * 0.12);
  return priceEur + renoEur + legal;
}

export function allInUsd(priceEur: number, renoEur: number, rates: Rates): string {
  return fmtUsd(allInEur(priceEur, renoEur), rates);
}

export const SEISMIC_COLORS: Record<number, string> = {
  1: 'bg-amber-100 text-amber-800 border-amber-200',
  2: 'bg-orange-100 text-orange-800 border-orange-200',
  3: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  4: 'bg-green-100 text-green-800 border-green-200',
};

export const SEISMIC_DOT: Record<number, string> = {
  1: 'bg-amber-500',
  2: 'bg-orange-500',
  3: 'bg-yellow-500',
  4: 'bg-green-500',
};

export const SEISMIC_LABELS: Record<number, string> = {
  1: 'Zone 1 — High seismic',
  2: 'Zone 2 — Medium seismic',
  3: 'Zone 3 — Low seismic',
  4: 'Zone 4 — No seismic risk',
};

export const CONDITION_LABELS: Record<string, string> = {
  'move-in-ready': 'Move-in Ready',
  'needs-renovation': 'Needs Renovation',
  'shell': 'Shell Only',
};

export const CONDITION_COLORS: Record<string, string> = {
  'move-in-ready': 'bg-emerald-100 text-emerald-800',
  'needs-renovation': 'bg-blue-100 text-blue-800',
  'shell': 'bg-gray-100 text-gray-800',
};

export const SAFETY_TIER_LABELS: Record<string, string> = {
  'best': '★★★★★ Safest',
  'very-good': '★★★★☆ Very Safe',
  'good': '★★★☆☆ Good',
  'moderate': '★★☆☆☆ Moderate',
};

export const ALL_REGIONS = [
  'Sicily', 'Sardinia', 'Abruzzo', 'Molise',
  'Puglia', 'Campania', 'Basilicata', 'Umbria',
  'Marche', 'Tuscany', 'Piedmont', 'Lombardy',
];
