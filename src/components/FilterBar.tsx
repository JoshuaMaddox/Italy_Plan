import { SlidersHorizontal, X } from 'lucide-react';
import type { Filters } from '../types';
import { ALL_REGIONS } from '../utils';

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  resultCount: number;
  totalCount: number;
}

export default function FilterBar({ filters, onChange, resultCount, totalCount }: Props) {
  const setField = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleRegion = (region: string) => {
    const next = filters.region.includes(region)
      ? filters.region.filter(r => r !== region)
      : [...filters.region, region];
    setField('region', next);
  };

  const toggleZone = (zone: number) => {
    const next = filters.seismicZone.includes(zone)
      ? filters.seismicZone.filter(z => z !== zone)
      : [...filters.seismicZone, zone];
    setField('seismicZone', next);
  };

  const toggleCondition = (c: string) => {
    const next = filters.condition.includes(c)
      ? filters.condition.filter(x => x !== c)
      : [...filters.condition, c];
    setField('condition', next);
  };

  const isDefault =
    filters.region.length === 0 &&
    filters.maxPriceEur === 80000 &&
    filters.minBeds === 0 &&
    filters.condition.length === 0 &&
    filters.seismicZone.length === 0 &&
    !filters.programOnly &&
    filters.searchText === '';

  const reset = () =>
    onChange({
      region: [], maxPriceEur: 80000, minBeds: 0,
      condition: [], seismicZone: [], programOnly: false, searchText: '',
    });

  const zones = [
    { zone: 4, label: 'Zone 4 (None)', color: 'border-green-400 bg-green-50 text-green-800' },
    { zone: 3, label: 'Zone 3 (Low)', color: 'border-yellow-400 bg-yellow-50 text-yellow-800' },
    { zone: 2, label: 'Zone 2 (Medium)', color: 'border-orange-400 bg-orange-50 text-orange-800' },
    { zone: 1, label: 'Zone 1 (High)', color: 'border-amber-400 bg-amber-50 text-amber-800' },
  ];

  return (
    <div className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Row 1: search + count + reset */}
        <div className="flex items-center gap-3 mb-3">
          <SlidersHorizontal size={16} className="text-stone-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search town, region, feature…"
            value={filters.searchText}
            onChange={e => setField('searchText', e.target.value)}
            className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <span className="text-sm text-stone-500 whitespace-nowrap flex-shrink-0">
            <span className="font-semibold text-stone-900">{resultCount}</span> / {totalCount}
          </span>
          {!isDefault && (
            <button
              onClick={reset}
              className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 border border-stone-200 rounded-lg px-2.5 py-1.5 transition-colors"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>

        {/* Row 2: filters */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {/* Price */}
          <div className="flex items-center gap-2">
            <label className="text-stone-500 whitespace-nowrap">Max price</label>
            <input
              type="range"
              min={1000}
              max={80000}
              step={1000}
              value={filters.maxPriceEur}
              onChange={e => setField('maxPriceEur', Number(e.target.value))}
              className="w-28 accent-stone-700"
            />
            <span className="font-semibold text-stone-900 whitespace-nowrap">
              €{filters.maxPriceEur === 80000 ? '80K+' : (filters.maxPriceEur / 1000).toFixed(0) + 'K'}
            </span>
          </div>

          {/* Beds */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Min beds</span>
            {[0, 1, 2, 3].map(n => (
              <button
                key={n}
                onClick={() => setField('minBeds', n)}
                className={`px-2.5 py-1 rounded-full border transition-colors ${
                  filters.minBeds === n
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>

          {/* Condition */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Condition</span>
            {[
              { value: 'move-in-ready', label: 'Ready' },
              { value: 'needs-renovation', label: 'Reno' },
            ].map(c => (
              <button
                key={c.value}
                onClick={() => toggleCondition(c.value)}
                className={`px-2.5 py-1 rounded-full border transition-colors ${
                  filters.condition.includes(c.value)
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* €1 only */}
          <button
            onClick={() => setField('programOnly', !filters.programOnly)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors ${
              filters.programOnly
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'border-stone-200 text-stone-600 hover:border-stone-400'
            }`}
          >
            €1 Schemes Only
          </button>
        </div>

        {/* Row 3: regions + seismic zone */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
          {/* Regions */}
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs text-stone-400 mr-1">Region:</span>
            {ALL_REGIONS.map(r => (
              <button
                key={r}
                onClick={() => toggleRegion(r)}
                className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                  filters.region.includes(r)
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Seismic zones */}
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-xs text-stone-400 mr-1">Seismic:</span>
            {zones.map(z => (
              <button
                key={z.zone}
                onClick={() => toggleZone(z.zone)}
                className={`text-xs px-2.5 py-0.5 rounded-full border transition-colors ${
                  filters.seismicZone.includes(z.zone)
                    ? z.color + ' font-semibold border-2'
                    : 'border-stone-200 text-stone-500 hover:border-stone-400'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
