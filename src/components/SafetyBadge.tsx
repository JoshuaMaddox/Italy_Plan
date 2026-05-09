import { SEISMIC_COLORS, SEISMIC_DOT, SEISMIC_LABELS } from '../utils';

interface Props {
  zone: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md';
}

export default function SafetyBadge({ zone, size = 'sm' }: Props) {
  const base = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${base} ${SEISMIC_COLORS[zone]}`}>
      <span className={`w-2 h-2 rounded-full ${SEISMIC_DOT[zone]}`} />
      {size === 'sm' ? `Zone ${zone}` : SEISMIC_LABELS[zone]}
    </span>
  );
}
