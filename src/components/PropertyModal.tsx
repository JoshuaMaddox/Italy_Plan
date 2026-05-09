import { X, MapPin, Train, Building2, Ruler, ExternalLink, CheckCircle, ShieldAlert } from 'lucide-react';
import type { Property, Rates } from '../types';
import {
  fmtEur, allInEur, allInUsd,
  SEISMIC_LABELS, CONDITION_LABELS, CONDITION_COLORS,
} from '../utils';
import SafetyBadge from './SafetyBadge';
import PricePill from './PricePill';

interface Props {
  property: Property;
  rates: Rates;
  onClose: () => void;
}

export default function PropertyModal({ property: p, rates, onClose }: Props) {
  const totalEur = allInEur(p.price_eur, p.reno_estimate_eur);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden">
        {/* Image */}
        <div className="relative h-56 bg-stone-200">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          >
            <X size={18} />
          </button>
          {p.program === '1euro' && (
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              €1 HOUSE PROGRAMME
            </span>
          )}
        </div>

        <div className="p-6">
          {/* Title & Location */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900 leading-tight">{p.title}</h2>
              <p className="text-stone-500 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {p.town}, {p.province} · {p.region}
              </p>
            </div>
            <SafetyBadge zone={p.seismic_zone} size="md" />
          </div>

          {/* Price block */}
          <div className="bg-stone-50 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Listing Price</p>
                <PricePill priceEur={p.price_eur} rates={rates} />
              </div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-1">Est. All-In Cost</p>
                <div>
                  <div className="text-xl font-bold text-emerald-700">{fmtEur(totalEur)}</div>
                  <div className="flex gap-3 text-xs text-stone-500 mt-0.5">
                    <span>{allInUsd(p.price_eur, p.reno_estimate_eur, rates)}</span>
                    <span>¥{Math.round(totalEur * rates.CNY).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            {p.reno_estimate_eur > 0 && (
              <p className="text-xs text-stone-400 mt-2">
                Includes purchase + ~{fmtEur(p.reno_estimate_eur)} est. renovation + ~12% legal/notary fees
              </p>
            )}
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-sm">
            <div className="bg-stone-50 rounded-lg p-2.5 text-center">
              <div className="font-bold text-stone-900">{p.beds} bed / {p.baths} bath</div>
              <div className="text-stone-500 text-xs">Rooms</div>
            </div>
            <div className="bg-stone-50 rounded-lg p-2.5 text-center">
              <div className="font-bold text-stone-900">{p.sqm} m²</div>
              <div className="text-stone-500 text-xs">Living area</div>
            </div>
            <div className="bg-stone-50 rounded-lg p-2.5 text-center">
              <div className="font-bold text-stone-900">{p.elevation_m}m</div>
              <div className="text-stone-500 text-xs">Elevation</div>
            </div>
            <div className="bg-stone-50 rounded-lg p-2.5 text-center">
              <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${CONDITION_COLORS[p.condition]}`}>
                {CONDITION_LABELS[p.condition]}
              </span>
              <div className="text-stone-500 text-xs mt-1">Condition</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-stone-600 text-sm leading-relaxed mb-4">{p.description}</p>

          {/* Safety details */}
          <div className="border border-stone-100 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-stone-800 mb-2 flex items-center gap-2">
              <ShieldAlert size={16} /> Safety Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex flex-col gap-1">
                <span className="text-stone-400 uppercase tracking-wide">Seismic</span>
                <span className="font-medium">{SEISMIC_LABELS[p.seismic_zone]}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-stone-400 uppercase tracking-wide">Flood Risk</span>
                <span className="font-medium capitalize">{p.flood_risk.replace('-', ' ')}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-stone-400 uppercase tracking-wide">Tsunami Risk</span>
                <span className="font-medium capitalize">{p.tsunami_risk.replace('-', ' ')}</span>
              </div>
            </div>
          </div>

          {/* Access */}
          <div className="flex flex-wrap gap-3 text-xs text-stone-500 mb-4">
            <span className="flex items-center gap-1">
              <Building2 size={12} /> Nearest city: {p.nearest_city} ({p.nearest_city_km}km)
            </span>
            <span className="flex items-center gap-1">
              <Train size={12} /> Train station: ~{p.train_km}km
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={12} /> Agent: {p.agent}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {p.tags.map(tag => (
              <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Verification & CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={p.listing_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              View Live Listing <ExternalLink size={16} />
            </a>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2">
              <CheckCircle size={14} />
              <span>Verified {p.listing_verified_date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
