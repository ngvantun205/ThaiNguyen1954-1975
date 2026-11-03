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
  year: string;
  description: string;
  source: string;
}

export interface HistoricalEvent {
  year: string;
  date: string;
  title: string;
  location: string;
  description: string;
  category: "military" | "economic" | "memorial" | "diplomatic";
  featured?: boolean;
}
