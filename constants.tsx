
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
    name: 'ABHAY 9th & 10th',
    subject: 'Foundation',
    teacher: 'Team NextToppers',
    image: 'https://nexttoppers.com/uploads/banners/1723812833.webp',
    studentsCount: 15400,
    nextClass: 'Today, 5:00 PM',
    progress: 0,
    price: '₹999',
    validity: 'June 2025',
    tag: 'BESTSELLER',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 'b2',
    name: 'NIRBHAY PRO CUET',
    subject: 'Entrance',
    teacher: 'Expert Faculty',
    image: 'https://nexttoppers.com/uploads/banners/1723812850.webp',
    studentsCount: 8500,
    nextClass: 'Tomorrow, 10:00 AM',
    progress: 0,
    price: '₹1,299',
    validity: 'Till Exam',
    tag: 'FAST FILLING',
    createdAt: new Date('2024-02-10').toISOString()
  },
  {
    id: 'b3',
    name: 'UP/BIHAR BOARD 12th',
    subject: 'Science',
    teacher: 'State Experts',
    image: 'https://nexttoppers.com/uploads/banners/1723812875.webp',
    studentsCount: 21000,
    nextClass: 'Monday, 2:00 PM',
    progress: 0,
    price: '₹799',
    validity: '2025 Boards',
    tag: 'NEW',
    createdAt: new Date('2024-03-01').toISOString()
  }
];
