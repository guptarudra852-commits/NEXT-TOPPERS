
export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

export type MaterialCategory = 'NOTES' | 'DPP' | 'TEST' | 'PYQ';

export interface StudyMaterial {
  id: string;
  title: string;
  category: MaterialCategory;
  fileCount: number;
  batchId: string;
  url?: string;
}

export interface Batch {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  image: string;
  studentsCount: number;
  nextClass: string;
  progress: number;
  price?: string;
  validity?: string;
  tag?: 'BESTSELLER' | 'NEW' | 'FAST FILLING';
  isFree?: boolean;
  materials?: StudyMaterial[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  isAdmin?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: Record<number, number>;
  isActive: boolean;
}

export interface SiteConfig {
  heroBanner: string;
  trendingBanners: string[];
}

export type AppView = 'LANDING' | 'DASHBOARD' | 'LIVE_CLASS' | 'ADMIN_PANEL' | 'STUDY_MATERIAL';
