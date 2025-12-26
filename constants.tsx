
import React from 'react';
import { Batch, User, UserRole } from './types';

export const MOCK_USER_STUDENT: User = {
  id: 'u1',
  name: 'Alex Johnson',
  role: UserRole.STUDENT,
  avatar: 'https://picsum.photos/seed/alex/100/100'
};

export const MOCK_USER_ADMIN: User = {
  id: 'a1',
  name: 'Dr. Sarah Smith',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/sarah/100/100'
};

export const BATCHES: Batch[] = [
  {
    id: 'b1',
    name: 'Physics Excellence 2024',
    subject: 'Physics',
    teacher: 'Dr. Sarah Smith',
    image: 'https://picsum.photos/seed/physics/400/225',
    studentsCount: 1240,
    nextClass: 'Today, 4:00 PM'
  },
  {
    id: 'b2',
    name: 'Organic Chemistry Mastery',
    subject: 'Chemistry',
    teacher: 'Prof. Mark Lee',
    image: 'https://picsum.photos/seed/chemistry/400/225',
    studentsCount: 850,
    nextClass: 'Tomorrow, 10:00 AM'
  },
  {
    id: 'b3',
    name: 'Advanced Calculus Bootcamp',
    subject: 'Mathematics',
    teacher: 'James Wilson',
    image: 'https://picsum.photos/seed/math/400/225',
    studentsCount: 2100,
    nextClass: 'Monday, 2:00 PM'
  }
];
