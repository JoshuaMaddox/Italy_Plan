import { CheckCircle2, Clock, XCircle, ExternalLink } from 'lucide-react';
import type { Visa } from '../types';

interface Props {
  visas: Visa[];
}

const STATUS_CONFIG = {
  'best-option': {
    icon: <CheckCircle2 size={18} className="text-emerald-600" />,
    bg: 'bg-emerald-50 border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  'available-now': {
    icon: <CheckCircle2 size={18} className="text-blue-600" />,
    bg: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
  },
  'future-option': {
    icon: <Clock size={18} className="text-amber-600" />,
    bg: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
  },
  'not-viable': {
    icon: <XCircle size={18} className="text-stone-400" />,
    bg: 'bg-stone-50 border-stone-200',
    badge: 'bg-stone-100 text-stone-600',
  },
};

export default function VisaGuide({ visas }: Props) {
  return (
    <section id="visa" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-2">Visa Guide for Americans</h2>
      <p className="text-stone-500 mb-2 max-w-2xl">
        Based on your profile: US passport · $200K/year remote employment for a foreign employer · ~$100K savings.
      </p>
      <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm px-4 py-1.5 mb-8">
        <CheckCircle2 size={14} />
        Your best path: <strong>Digital Nomad Visa</strong> — your income type qualifies
      </div>

      <div className="space-y-4">
        {visas.map(v => {
          const cfg = STATUS_CONFIG[v.status_for_you];
          return (
            <div key={v.id} className={`border rounded-2xl p-5 ${cfg.bg}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  {cfg.icon}
                  <div>
                    <h3 className="font-bold text-stone-900">{v.name}</h3>
                    <p className="text-xs text-stone-500 italic">{v.italian_name}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${cfg.badge}`}>
                  {v.status_label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3 text-sm">
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-wide block mb-1">Duration</span>
                  <span className="text-stone-700">{v.duration}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-wide block mb-1">Income Required</span>
                  <span className="text-stone-700">{v.income_required}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-wide block mb-1">Your Status</span>
                  <span className="text-stone-700 font-medium">{v.your_income}</span>
                </div>
              </div>

              {v.status_for_you !== 'not-viable' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1.5">Requirements</p>
                    <ul className="space-y-1">
                      {v.requirements.slice(0, 4).map((req, i) => (
                        <li key={i} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <span className="text-stone-400 mt-0.5">•</span>{req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-500 uppercase mb-1.5">Pros</p>
                    <ul className="space-y-1">
                      {v.pros.slice(0, 4).map((pro, i) => (
                        <li key={i} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">✓</span>{pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {v.airbnb_compatibility && (
                <div className="flex flex-wrap gap-4 text-xs mt-2 pt-2 border-t border-black/5">
                  <span><span className="text-stone-400">Airbnb: </span>{v.airbnb_compatibility}</span>
                  <span><span className="text-stone-400">Tax: </span>{v.tax_implications.slice(0, 80)}…</span>
                </div>
              )}

              {v.strategy && (
                <div className="mt-3 bg-white/60 rounded-lg p-3 text-xs text-stone-600">
                  <span className="font-semibold text-stone-700">Long-term strategy: </span>{v.strategy}
                </div>
              )}

              <a
                href={v.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 mt-3 underline underline-offset-2"
              >
                Official source <ExternalLink size={10} />
              </a>
            </div>
          );
        })}
      </div>

      {/* Airbnb section */}
      <div className="mt-10 bg-stone-900 text-white rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-3">Airbnb Legal Rental Guide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-amber-300 mb-2">What's Required</h4>
            <ul className="space-y-1.5 text-stone-300">
              <li><span className="text-white font-medium">CIN Code</span> — mandatory since Jan 2025 via Ministry of Tourism portal. Display on property + all ads. Penalty €800–8,000 if missing.</li>
              <li><span className="text-white font-medium">Regional CIR code</span> — register with regional tourism system first, then apply for national CIN.</li>
              <li><span className="text-white font-medium">Tourist tax</span> — €1–3/person/night; Airbnb auto-collects in major cities; you collect manually in rural areas.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-300 mb-2">Tax on Rental Income</h4>
            <ul className="space-y-1.5 text-stone-300">
              <li><span className="text-white font-medium">21% flat tax</span> (cedolare secca) on Airbnb income — Airbnb withholds automatically for 1 property.</li>
              <li><span className="text-white font-medium">26% flat tax</span> if you have 2+ short-term rentals.</li>
              <li><span className="text-white font-medium">US tax treaty</span> prevents double taxation — hire a US-Italy cross-border CPA.</li>
              <li><span className="text-white font-medium">Property manager</span> — typically 20–30% of revenue if you're non-resident.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
