// ============================================================
// Type Definitions — Shared types
// ============================================================

// --- Lead / Form ---
export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  service: string;
  address?: string;
  package?: string;
  notes?: string;
  consent: boolean;
  consentText?: string;
  source: 'WEBSITE' | 'LANDING_PAGE' | 'ZALO' | 'TELEGRAM';
  status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'CANCELLED';
  ip?: string;
  visitorId?: string;
  userAgent?: string;
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
