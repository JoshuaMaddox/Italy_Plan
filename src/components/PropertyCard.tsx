import { useState } from 'react';
import { MapPin, ExternalLink, ChevronRight, Train } from 'lucide-react';
import type { Property, Rates } from '../types';
import { CONDITION_LABELS, CONDITION_COLORS, allInUsd } from '../utils';
import SafetyBadge from './SafetyBadge';
import PricePill from './PricePill';
import PropertyModal from './PropertyModal';

interface Props {
  property: Property;
  rates: Rates;
}

export default function PropertyCard({ property: p, rates }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-stone-100 overflow-hidden flex flex-col transition-shadow">
        {/* Image */}
        <div className="relative h-44 bg-stone-200 flex-shrink-0">
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={e => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/italy${p.id}/600/400`; }}
          />
          <div className="absolute bottom-2 left-2 flex gap-1.5">
            <SafetyBadge zone={p.seismic_zone} />
          </div>
          {p.program === '1euro' && (
            <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              €1 SCHEME
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Location */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2">{p.title}</h3>
              <p className="text-stone-400 text-xs flex items-center gap-0.5 mt-0.5">
                <MapPin size={10} /> {p.town}, {p.region}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-3">
            <PricePill priceEur={p.price_eur} rates={rates} compact />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-stone-500 mb-3">
            <span>{p.beds}b / {p.baths}ba</span>
            <span>{p.sqm} m²</span>
            <span>{p.elevation_m}m elev.</span>
            <span className="flex items-center gap-0.5"><Train size={10} /> {p.train_km}km to train</span>
          </div>

          {/* Condition + all-in */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${CONDITION_COLORS[p.condition]}`}>
              {CONDITION_LABELS[p.condition]}
            </span>
            <span className="text-xs text-stone-400">
              All-in est. {allInUsd(p.price_eur, p.reno_estimate_eur, rates)}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3 flex-1">
            {p.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-stone-50 text-stone-500 px-2 py-0.5 rounded-full border border-stone-100">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 flex items-center justify-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              Details <ChevronRight size={12} />
            </button>
            <a
              href={p.listing_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 bg-stone-900 hover:bg-stone-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              Listing <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <PropertyModal property={p} rates={rates} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
