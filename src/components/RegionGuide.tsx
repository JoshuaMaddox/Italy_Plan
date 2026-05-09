import { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, Train, Hospital } from 'lucide-react';
import type { Region } from '../types';
import { SEISMIC_COLORS, SEISMIC_DOT } from '../utils';

interface Props {
  regions: Region[];
}

export default function RegionGuide({ regions }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="regions" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-2">Regional Safety Guide</h2>
      <p className="text-stone-500 mb-8 max-w-2xl">
        Each region has a distinct seismic, flood and tsunami risk profile. Use this guide to understand
        the trade-offs before shortlisting properties.
      </p>

      <div className="space-y-3">
        {regions.map(r => (
          <div key={r.id} className="border border-stone-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === r.id ? null : r.id)}
              className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-stone-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${SEISMIC_COLORS[r.seismic_zone as 1|2|3|4]}`}
                >
                  <span className={`w-2 h-2 rounded-full ${SEISMIC_DOT[r.seismic_zone as 1|2|3|4]}`} />
                  Zone {r.seismic_zone}
                </span>
                <span className="font-semibold text-stone-900">{r.name}</span>
              </div>
              <div className="flex items-center gap-3">
                {r.active_1euro_towns.length > 0 && (
                  <span className="hidden sm:inline text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-1 rounded-full">
                    {r.active_1euro_towns.length} €1 towns
                  </span>
                )}
                {open === r.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {open === r.id && (
              <div className="border-t border-stone-100 p-4 bg-stone-50">
                <p className="text-stone-600 text-sm leading-relaxed mb-4">{r.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                      <ShieldCheck size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-stone-700">Flood risk: </span>
                        <span className="text-stone-600">{r.flood_risk}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <ShieldCheck size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-stone-700">Tsunami risk: </span>
                        <span className="text-stone-600">{r.tsunami_risk}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Train size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-stone-700">Train access: </span>
                        <span className="text-stone-600">{r.train_access}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Hospital size={14} className="text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-stone-700">Hospitals: </span>
                        <span className="text-stone-600">{r.hospital}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {r.active_1euro_towns.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Active €1 Towns</p>
                        <div className="flex flex-wrap gap-1.5">
                          {r.active_1euro_towns.map(t => (
                            <span key={t} className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2 mt-3">Top Picks</p>
                    <ul className="space-y-1">
                      {r.best_towns.map(t => (
                        <li key={t} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">•</span>{t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800">
                  <span className="font-semibold">Safety note: </span>{r.safety_note}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
