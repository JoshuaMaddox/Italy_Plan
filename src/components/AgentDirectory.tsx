import { ExternalLink, Phone } from 'lucide-react';
import type { Agent } from '../types';

interface Props {
  agents: Agent[];
}

const TYPE_LABELS: Record<string, string> = {
  'buyer-agent': 'Buyer\'s Agent',
  'full-service': 'Full Service',
  'municipal-programme': 'Municipal Programme',
  'programme-directory': 'Programme Directory',
  'listing-portal': 'Listing Portal',
  'airbnb-management': 'Airbnb Management',
  'tax-professional': 'Tax Professional',
  'legal': 'Legal / Notary',
};

const TYPE_COLORS: Record<string, string> = {
  'buyer-agent': 'bg-blue-100 text-blue-800',
  'full-service': 'bg-violet-100 text-violet-800',
  'municipal-programme': 'bg-emerald-100 text-emerald-800',
  'programme-directory': 'bg-teal-100 text-teal-800',
  'listing-portal': 'bg-stone-100 text-stone-700',
  'airbnb-management': 'bg-orange-100 text-orange-800',
  'tax-professional': 'bg-amber-100 text-amber-800',
  'legal': 'bg-rose-100 text-rose-800',
};

export default function AgentDirectory({ agents }: Props) {
  return (
    <section id="agents" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-2">Property Finders & Services</h2>
      <p className="text-stone-500 mb-8 max-w-2xl">
        Trusted agents, portals and service providers — from buyer's agents who find the property
        to Airbnb managers who run it while you're home.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {agents.map(a => (
          <div key={a.id} className="border border-stone-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-stone-900 text-sm leading-snug">{a.name}</h3>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${TYPE_COLORS[a.type] || 'bg-stone-100 text-stone-700'}`}>
                {TYPE_LABELS[a.type] || a.type}
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-3">{a.description}</p>

            <div className="space-y-1 text-xs text-stone-500 mb-3">
              <div><span className="font-medium text-stone-700">Fee: </span>{a.fee}</div>
              <div><span className="font-medium text-stone-700">Languages: </span>{a.languages.join(', ')}</div>
              <div><span className="font-medium text-stone-700">Regions: </span>{a.regions.join(', ')}</div>
            </div>

            {a.note && (
              <div className="bg-stone-50 rounded-lg px-3 py-2 text-xs text-stone-600 mb-3 italic">
                {a.note}
              </div>
            )}

            <div className="flex gap-2">
              {a.website && (
                <a
                  href={a.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs bg-stone-900 hover:bg-stone-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Website <ExternalLink size={10} />
                </a>
              )}
              {a.phone && (
                <a
                  href={`tel:${a.phone}`}
                  className="flex items-center gap-1 text-xs border border-stone-200 hover:border-stone-400 text-stone-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Phone size={10} /> {a.phone}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
