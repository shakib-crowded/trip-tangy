export type TabKey = "flight" | "hotel" | "holidays";

export type Tab = {
  key: TabKey;
  label: string;
};

export interface AirportRecord {
  id: string;
  name: string;
  iata_code: string;
  icao_code?: string;
  municipality?: string;
  iso_country?: string;
  iso_region?: string;
  type?: string;
  latitude_deg?: number;
  longitude_deg?: number;
  keywords?: string;
}



export interface PaxState {
  adults: number;
  children: number;
  infants: number;
}

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

