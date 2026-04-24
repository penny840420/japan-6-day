export type SpotCategory = 'food' | 'activity' | 'shopping' | 'scenery' | 'hotel' | 'transport';

export interface Spot {
  id: string;
  name: string;
  time?: string;
  description: string;
  category: SpotCategory;
  tips?: string[];
  image?: string;
  location?: { lat: number; lng: number };
  googleMapsUrl?: string;
  parkingUrl?: string;
}

export interface Souvenir {
  name: string;
  image: string;
  location?: string;
  googleMapsUrl?: string;
}

export interface HourlyWeather {
  hour: string;
  temp: number;
  condition: '晴' | '雨' | '陰';
}

export interface DayPlan {
  day: number;
  date: string;
  city: string;
  spots: Spot[];
  summary: {
    travelTime: string;
    spotCount: number;
  };
  outfitAdvice: string;
  weather: {
    condition: '晴' | '雨' | '陰';
    temp: { max: number; min: number };
    rainProb: string;
    hourly?: HourlyWeather[];
  };
  souvenirs?: Souvenir[];
}

export interface Friend {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  day: number;
  amount: number;
  category: string;
  note: string;
  payerId: string;
  splitWithIds: string[];
}
