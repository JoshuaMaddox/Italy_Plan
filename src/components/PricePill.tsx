import type { Rates } from '../types';
import { fmtEur, fmtUsd, fmtCny } from '../utils';

interface Props {
  priceEur: number;
  rates: Rates;
  compact?: boolean;
}

export default function PricePill({ priceEur, rates, compact = false }: Props) {
  if (compact) {
    return (
      <div>
        <div className="text-xl font-bold text-stone-900">{fmtEur(priceEur)}</div>
        <div className="flex gap-3 text-xs text-stone-500 mt-0.5">
          <span>{fmtUsd(priceEur, rates)}</span>
          <span>{fmtCny(priceEur, rates)}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="text-2xl font-bold text-stone-900">{fmtEur(priceEur)}</span>
      <span className="text-base text-stone-500 font-medium">{fmtUsd(priceEur, rates)}</span>
      <span className="text-base text-stone-400">{fmtCny(priceEur, rates)}</span>
    </div>
  );
}
