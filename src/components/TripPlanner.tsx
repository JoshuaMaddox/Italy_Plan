const ITINERARIES = [
  {
    title: 'Route A: South Sicily Circuit (7–10 days)',
    emoji: '🏛️',
    steps: [
      'Day 1–2: Fly to Palermo. Visit Gangi (1,015m) — morning, Petralia Soprana (1,147m) — afternoon. Book with House Troina for Troina visit Day 2.',
      'Day 2–3: Troina (1,121m). Full day. Meet the English-speaking House Troina team. View 2–3 properties. Get renovation cost quotes from their contractor contacts.',
      'Day 4: Mussomeli (765m). Speak to the Case 1 Euro office. Walk the historic centre. View available homes.',
      'Day 5: Sambuca di Sicilia — Zona Saracena (€3 homes). Caltagirone (UNESCO) — 2hrs by car.',
      'Day 6: Salemi + Erice (751m). Erice castle, saltpans of Trapani, Segesta Greek temple nearby.',
      'Day 7+: Return Palermo. Visit immobiliare.it office in Palermo for listings you\'ve shortlisted online.',
    ],
  },
  {
    title: 'Route B: Sardinia Safety-First Tour (5–7 days)',
    emoji: '🏝️',
    steps: [
      'Day 1: Fly to Cagliari or Olbia. Rent a car — essential in Sardinia.',
      'Day 2: Drive north. Ollolai (Nuoro province). Meet Work from Ollolai programme coordinators. View properties.',
      'Day 3: Nulvi (Sassari province). Contact town council in advance for programme details.',
      'Day 4: Bonnanaro and Romana — drive between both (they\'re close). Check Sassari for hospital and train connections.',
      'Day 5–6: Explore Barbagia (interior) and see a €1 property with a local surveyor (geometra). Check renovation contractor rates.',
      'Day 7: Sassari city. Hospital, university, airport. Confirm viability of practical day-to-day life.',
    ],
  },
  {
    title: 'Route C: Central Italy (Accessible, Zones 2–3) — 7 days',
    emoji: '🏔️',
    steps: [
      'Day 1: Fly to Rome (Fiumicino). Train to L\'Aquila (2hrs).',
      'Day 2: Castel del Monte (1,350m, Gran Sasso). Extraordinary medieval hamlet. View the verified listing.',
      'Day 3: Colledimezzo (Chieti) — move-in ready property. Drive 90km. Abruzzo Rural Property agent meets you.',
      'Day 4: Civitella Casanova farmhouse (Pescara hinterland). Castiglione Messer Marino (1,000m) if time allows.',
      'Day 5: Castropignano, Molise — €1 + €27K grant. Meet municipal office. Explore authentic Molise.',
      'Day 6: Umbria — Amelia (Cyclopean walls) or Massa Martana. Train connection to Rome from Orvieto (1hr).',
      'Day 7: Return from Rome.',
    ],
  },
];

const CHECKLIST_PRE = [
  { done: false, text: 'Obtain your Codice Fiscale at the Italian Consulate in your city (free; bring passport + completed form)' },
  { done: false, text: 'Calculate Schengen days remaining at visa-calculator.com' },
  { done: false, text: 'Book a consult with a US-Italy cross-border CPA before travel' },
  { done: false, text: 'Email House Troina (housetroina.it/en) and Case1Euro.it to pre-book viewings' },
  { done: false, text: 'Shortlist 5–8 properties from this site using the filter tool' },
  { done: false, text: 'Download the Italian rail app (Trenitalia or Omio) for regional trains' },
  { done: false, text: 'Research international health insurance (min €30K coverage for potential Digital Nomad Visa)' },
];

const CHECKLIST_IN = [
  { done: false, text: 'Hire a local geometra (surveyor) for any serious contender — typical cost €500–1,500' },
  { done: false, text: 'Visit the municipal office (Comune) in any €1 programme town' },
  { done: false, text: 'Ask locals about renovation contractor availability (can be months wait in popular towns)' },
  { done: false, text: 'Check mobile phone coverage (TIM/Vodafone/WindTre) in rural villages' },
  { done: false, text: 'Test the broadband at any property you seriously consider (fibre availability in rural areas varies)' },
  { done: false, text: 'Have coffee in the town square for 30 minutes — feel the vibe' },
  { done: false, text: 'Ask a local commercialista what their IMU + property management fees would be for that village' },
];

export default function TripPlanner() {
  return (
    <section id="trip" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-stone-900 mb-2">Plan Your Scouting Trip</h2>
      <p className="text-stone-500 mb-8 max-w-2xl">
        Three pre-built itineraries and a preparation checklist for your Italian property hunt.
      </p>

      {/* Itineraries */}
      <div className="space-y-5 mb-12">
        {ITINERARIES.map(it => (
          <div key={it.title} className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="bg-stone-900 text-white px-5 py-3 flex items-center gap-2">
              <span>{it.emoji}</span>
              <h3 className="font-semibold">{it.title}</h3>
            </div>
            <ul className="divide-y divide-stone-100">
              {it.steps.map((step, i) => (
                <li key={i} className="px-5 py-3 text-sm text-stone-600 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-500 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Checklists */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
            <span className="text-amber-500">✈️</span> Before You Go
          </h3>
          <ul className="space-y-2">
            {CHECKLIST_PRE.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                <span className="w-4 h-4 rounded border border-stone-300 flex-shrink-0 mt-0.5" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-stone-900 mb-3 flex items-center gap-2">
            <span className="text-emerald-500">🏠</span> On the Ground
          </h3>
          <ul className="space-y-2">
            {CHECKLIST_IN.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-stone-600">
                <span className="w-4 h-4 rounded border border-stone-300 flex-shrink-0 mt-0.5" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
