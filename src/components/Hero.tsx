interface Props {
  onBrowse: () => void;
  onVisa: () => void;
}

export default function Hero({ onBrowse, onVisa }: Props) {
  return (
    <div
      className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1c1917 0%, #292524 40%, #1e3a5f 100%)',
      }}
    >
      {/* Overlay texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1400&q=60")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        {/* Overline */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          50 Verified Active Listings · Updated May 2026
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-bold text-white leading-tight mb-4">
          Find Your
          <span className="block text-amber-300 italic">Italian Home</span>
        </h1>

        <p className="text-white/70 text-lg sm:text-xl mb-3 max-w-xl mx-auto">
          2-bed village homes from €1 — researched and verified for Josh & Family
        </p>

        <p className="text-white/50 text-sm mb-8">
          Budget $35K–$80K all-in · Safe from floods, earthquakes & tsunamis · Legal Airbnb rental
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 text-sm mb-10">
          {[
            { value: '50', label: 'Verified Listings' },
            { value: '8', label: 'Regions' },
            { value: '30+', label: '€1 Schemes' },
            { value: '3', label: 'Currencies' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-amber-300">{s.value}</div>
              <div className="text-white/60 text-xs">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onBrowse}
            className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-8 py-3.5 rounded-xl shadow-lg transition-colors text-sm"
          >
            Browse All 50 Homes ↓
          </button>
          <button
            onClick={onVisa}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Visa Guide for Americans
          </button>
        </div>
      </div>

      {/* Seismic zone legend */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-xs text-white/50">
        {[
          { z: 4, label: 'Zone 4 None', dot: 'bg-green-400' },
          { z: 3, label: 'Zone 3 Low', dot: 'bg-yellow-400' },
          { z: 2, label: 'Zone 2 Medium', dot: 'bg-orange-400' },
          { z: 1, label: 'Zone 1 High', dot: 'bg-amber-400' },
        ].map(item => (
          <span key={item.z} className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${item.dot}`} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
