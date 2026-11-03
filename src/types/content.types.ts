export interface TopicSection {
  title: string;
  subtitle?: string;
  content: string[];
  quote?: {
    text: string;
    author: string;
  };
  highlights?: string[];
  image?: {
    src: string;
    caption: string;
  };
}

export interface Topic {
  id: string;
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  timeframe: string;
  summary: string;
  badge: string;
  heroImage: string;
  keyStats: {
    label: string;
    value: string;
    detail: string;
  }[];
  sections: TopicSection[];
}

export interface Martyr915 {
  order: number;
  name: string;
  birthYear: number;
  gender: "Nam" | "Nữ";
  hometown: string;
  position: string;
  sacrificeDate: string;
}

export interface Tribute {
  id: string;
  author_name: string;
  author_title?: string;
  location?: string;
  message: string;
  created_at: string;
  is_approved: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  category: "all" | "image" | "relic" | "video" | "document";
  thumbnail: string;
  url: string;
  youtubeId?: string;
  year: string;
  location?: string;
  description: string;
  source: string;
  significance?: string;
}

export interface HistoricalEvent {
  year: string;
  date: string;
  title: string;
  location: string;
  description: string;
  category: "military" | "economic" | "memorial" | "diplomatic";
  featured?: boolean;
  image?: string;
  era?: "1954-1964" | "1965-1968" | "1969-1972" | "1973-1975";
}

export interface HistoricalLocation {
  id: string;
  name: string;
  historicName?: string;
  district: string;
  category: "battlefield" | "logistics" | "industry" | "memorial" | "command";
  categoryLabel: string;
  coordinates: {
    x: number; // percentage 0-100 on stylized interactive map
    y: number; // percentage 0-100 on stylized interactive map
  };
  realGeo?: string; // approximate real-world coordinates e.g. "21.579° N, 105.844° E"
  yearRange: string;
  description: string;
  significance: string;
  image?: string;
  relatedSlug?: string;
}
