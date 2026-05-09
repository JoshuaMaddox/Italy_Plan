import { useState } from 'react';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import PropertyGrid, { applyFilters } from './components/PropertyGrid';
import RegionGuide from './components/RegionGuide';
import VisaGuide from './components/VisaGuide';
import AgentDirectory from './components/AgentDirectory';
import BudgetCalculator from './components/BudgetCalculator';
import TripPlanner from './components/TripPlanner';
import propertiesRaw from './data/properties.json';
import regionsRaw from './data/regions.json';
import agentsRaw from './data/agents.json';
import visasRaw from './data/visa.json';
import ratesRaw from './data/rates.json';
import type { Property, Region, Agent, Visa, Rates, Filters } from './types';

const properties = propertiesRaw as Property[];
const regions = regionsRaw as Region[];
const agents = agentsRaw as Agent[];
const visas = visasRaw as Visa[];
const rates = ratesRaw as Rates;

const DEFAULT_FILTERS: Filters = {
  region: [],
  maxPriceEur: 80000,
  minBeds: 0,
  condition: [],
  seismicZone: [],
  programOnly: false,
  searchText: '',
};

const NAV_LINKS = [
  { href: '#properties', label: 'Properties' },
  { href: '#regions', label: 'Regions' },
  { href: '#visa', label: 'Visa' },
  { href: '#agents', label: 'Agents' },
  { href: '#calculator', label: 'Budget' },
  { href: '#trip', label: 'Trip' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const resultCount = applyFilters(properties, filters).length;

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-12">
          <a href="#" className="font-bold text-stone-900 text-sm tracking-tight">
            Italian Home Hunt
          </a>
          <div className="hidden sm:flex items-center gap-5">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-stone-500 hover:text-stone-900 transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <Hero
        onBrowse={() => scrollTo('properties')}
        onVisa={() => scrollTo('visa')}
      />

      {/* Properties section */}
      <section id="properties" className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-stone-900 mb-2">50 Verified Listings</h2>
        <p className="text-stone-500 mb-6 max-w-2xl">
          Every listing confirmed active as of May 2026. Prices shown in EUR, USD and CNY at today's rates.
        </p>
        <FilterBar
          filters={filters}
          onChange={setFilters}
          resultCount={resultCount}
          totalCount={properties.length}
        />
        <PropertyGrid properties={properties} rates={rates} filters={filters} />
      </section>

      <div className="border-t border-stone-200" />
      <RegionGuide regions={regions} />

      <div className="border-t border-stone-200" />
      <VisaGuide visas={visas} />

      <div className="border-t border-stone-200" />
      <AgentDirectory agents={agents} />

      <div className="border-t border-stone-200" />
      <BudgetCalculator rates={rates} />

      <div className="border-t border-stone-200" />
      <TripPlanner />

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-stone-900 text-stone-400 text-xs py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-white">Italian Home Hunt</span>
            {' '}· 50 verified listings · {regions.length} regions
          </div>
          <div className="text-center sm:text-right">
            <div>Listings verified May 2026 · Rates as of {rates.fetchedAt}</div>
            <div className="mt-1 text-stone-500">For personal research use only. Verify all listings before travel.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
