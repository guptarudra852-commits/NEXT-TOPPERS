
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

export interface Batch {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  image: string;
  studentsCount: number;
  nextClass: string;
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

export type AppView = 'LANDING' | 'DASHBOARD' | 'LIVE_CLASS' | 'ADMIN_PANEL';
