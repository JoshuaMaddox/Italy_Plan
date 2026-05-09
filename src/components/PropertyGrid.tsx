import type { Property, Rates, Filters } from '../types';
import PropertyCard from './PropertyCard';

interface Props {
  properties: Property[];
  rates: Rates;
  filters: Filters;
}

export function applyFilters(properties: Property[], filters: Filters): Property[] {
  return properties.filter(p => {
    if (filters.region.length > 0 && !filters.region.includes(p.region)) return false;
    if (p.price_eur > filters.maxPriceEur && p.price_eur > 1) return false;
    if (p.beds < filters.minBeds) return false;
    if (filters.condition.length > 0 && !filters.condition.includes(p.condition)) return false;
    if (filters.seismicZone.length > 0 && !filters.seismicZone.includes(p.seismic_zone)) return false;
    if (filters.programOnly && p.program !== '1euro') return false;
    if (filters.searchText) {
      const q = filters.searchText.toLowerCase();
      const haystack = [p.title, p.town, p.region, p.province, ...p.tags, p.description].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export default function PropertyGrid({ properties, rates, filters }: Props) {
  const filtered = applyFilters(properties, filters);

  if (filtered.length === 0) {
    return (
      <div className="text-center py-24 text-stone-400">
        <p className="text-2xl mb-2">No properties match your filters</p>
        <p className="text-sm">Try relaxing the seismic zone, price, or region filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filtered.map(p => (
        <PropertyCard key={p.id} property={p} rates={rates} />
      ))}
    </div>
  );
}

