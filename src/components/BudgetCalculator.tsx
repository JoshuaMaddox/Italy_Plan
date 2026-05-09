import { useState } from 'react';
import type { Rates } from '../types';
import { fmtEur, fmtUsd, fmtCny } from '../utils';

interface Props {
  rates: Rates;
}

export default function BudgetCalculator({ rates }: Props) {
  const [price, setPrice] = useState(20000);
  const [reno, setReno] = useState(20000);

  const legal = Math.round(price <= 100 ? 2500 : price * 0.12);
  const totalEur = price + reno + legal;

  return (
    <section id="calculator" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-2">Budget Calculator</h2>
      <p className="text-stone-500 mb-8">Estimate your all-in cost in EUR, USD and CNY.</p>

      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Purchase Price
              <span className="ml-2 font-bold text-stone-900">{fmtEur(price)}</span>
            </label>
            <input
              type="range" min={1} max={75000} step={500}
              value={price} onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-stone-700 mb-1"
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>€1</span><span>€75,000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Renovation Estimate
              <span className="ml-2 font-bold text-stone-900">{fmtEur(reno)}</span>
            </label>
            <input
              type="range" min={0} max={50000} step={500}
              value={reno} onChange={e => setReno(Number(e.target.value))}
              className="w-full accent-stone-700 mb-1"
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>€0</span><span>€50,000</span>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-stone-50 rounded-xl p-4">
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-stone-500">Purchase price</span>
              <span className="font-medium">{fmtEur(price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Renovation estimate</span>
              <span className="font-medium">{fmtEur(reno)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Legal / notary / taxes (~12%)</span>
              <span className="font-medium">{fmtEur(legal)}</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2 mt-2">
              <span className="font-bold text-stone-900">Total All-In</span>
              <span className="font-bold text-stone-900">{fmtEur(totalEur)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-xl p-3 border border-stone-200">
              <div className="text-xs text-stone-400 mb-1">EUR</div>
              <div className="font-bold text-stone-900">{fmtEur(totalEur)}</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-stone-200">
              <div className="text-xs text-stone-400 mb-1">USD</div>
              <div className="font-bold text-stone-900">{fmtUsd(totalEur, rates)}</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-stone-200">
              <div className="text-xs text-stone-400 mb-1">CNY</div>
              <div className="font-bold text-stone-900">{fmtCny(totalEur, rates)}</div>
            </div>
          </div>

          {totalEur * rates.USD > 80000 && (
            <p className="text-xs text-red-500 mt-3 text-center">
              ⚠️ This exceeds your $80K all-in budget threshold
            </p>
          )}
          {totalEur * rates.USD <= 80000 && (
            <p className="text-xs text-emerald-600 mt-3 text-center">
              ✓ Within your $80K all-in budget
            </p>
          )}
        </div>

        <p className="text-xs text-stone-400 mt-3">
          Rates as of {rates.fetchedAt}. Legal/tax estimate: 12% of purchase price (registration tax 9%, notary ~2%, agent commission 3%). Renovation costs are estimates only.
        </p>
      </div>
    </section>
  );
}
