// ============================================================
// Type Definitions — Shared types
// ============================================================

// --- Lead / Form ---
export interface Lead {
  id: string;
  name: string;
  phone: string;
  need: string;
  address?: string;
  package?: string;
  note?: string;
  consent: boolean;
  source: 'website' | 'landing_page' | 'zalo' | 'telegram';
  status: 'new' | 'contacted' | 'converted' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// --- Service / Product ---
export interface ServicePackage {
  id: string;
  slug: string;
  name: string;
  category: 'internet' | 'tv' | 'camera' | 'combo';
  price: number;
  originalPrice?: number;
  downloadSpeed?: number;
  uploadSpeed?: number;
  devices?: number;
  hasMesh: boolean;
  suitableFor: string;
  promotion?: string;
  features: string[];
  isBestSeller: boolean;
}

// --- Blog / Article ---
export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: Author;
  category: 'local-seo' | 'problem-solving' | 'commercial' | 'trending';
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  readingTime: number;
  ogImage: string;
}

export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

// --- API Response ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}
