export interface Property {
  id: number;
  title: string;
  town: string;
  region: string;
  province: string;
  elevation_m: number;
  seismic_zone: 1 | 2 | 3 | 4;
  flood_risk: 'very-low' | 'low' | 'moderate' | 'high';
  tsunami_risk: 'none' | 'very-low' | 'low' | 'moderate' | 'high';
  safety_tier: 'best' | 'very-good' | 'good' | 'moderate';
  beds: number;
  baths: number;
  sqm: number;
  price_eur: number;
  condition: 'move-in-ready' | 'needs-renovation' | 'shell';
  program: '1euro' | null;
  listing_url: string;
  listing_verified: boolean;
  listing_verified_date: string;
  description: string;
  nearest_city: string;
  nearest_city_km: number;
  train_km: number;
  reno_estimate_eur: number;
  tags: string[];
  image: string;
  agent: string;
}

export interface Region {
  id: string;
  name: string;
  seismic_zone: number;
  seismic_label: string;
  seismic_color: string;
  flood_risk: string;
  tsunami_risk: string;
  incentive_programs: string[];
  active_1euro_towns: string[];
  nearest_major_city: string;
  train_access: string;
  hospital: string;
  best_towns: string[];
  summary: string;
  safety_note: string;
}

export interface Agent {
  id: number;
  name: string;
  type: string;
  regions: string[];
  description: string;
  fee: string;
  languages: string[];
  website: string | null;
  phone: string | null;
  email: string | null;
  note: string;
}

export interface Visa {
  id: string;
  name: string;
  italian_name: string;
  status_for_you: 'best-option' | 'available-now' | 'future-option' | 'not-viable';
  status_label: string;
  duration: string;
  income_required: string;
  your_income: string;
  income_type: string;
  requirements: string[];
  apply_at: string;
  processing_time: string;
  family: string;
  path_to_residency: string;
  tax_implications: string;
  airbnb_compatibility: string;
  pros: string[];
  cons: string[];
  official_link: string;
  note?: string;
  strategy?: string;
}

export interface Rates {
  USD: number;
  CNY: number;
  fetchedAt: string;
}

export interface Filters {
  region: string[];
  maxPriceEur: number;
  minBeds: number;
  condition: string[];
  seismicZone: number[];
  programOnly: boolean;
  searchText: string;
}
