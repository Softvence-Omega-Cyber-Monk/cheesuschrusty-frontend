export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Status = 'Published' | 'Drafted';
export type Category =
  | 'Reading'
  | 'Writing'
  | 'Listening'
  | 'Speaking'
  | 'Grammar'
  | 'Vocabulary';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  cards: number;
  difficulty: Difficulty;
  category: Category;
  status: Status;
  lastModified: string;
}

// Alias for backward compatibility
export type ContentItem = Lesson;

// Example mock data
export const mockLessons: Lesson[] = [
  {
    id: '101',
    title: 'Basic Italian Greetings',
    description: 'Essential greetings and polite expressions',
    cards: 25,
    difficulty: 'Beginner',
    category: 'Reading',
    status: 'Published',
    lastModified: '25/09/2025',
  },
  {
    id: '102',
    title: 'Ordering Food in Italian',
    description: 'Common restaurant phrases and interactions',
    cards: 20,
    difficulty: 'Beginner',
    category: 'Speaking',
    status: 'Published',
    lastModified: '26/09/2025',
  },
  {
    id: '103',
    title: 'Everyday Conversations',
    description: 'Short dialogues and practical phrases',
    cards: 30,
    difficulty: 'Intermediate',
    category: 'Listening',
    status: 'Drafted',
    lastModified: '27/09/2025',
  },
  {
    id: '104',
    title: 'Advanced Writing Practice',
    description: 'Compose formal letters and essays in Italian',
    cards: 35,
    difficulty: 'Advanced',
    category: 'Writing',
    status: 'Drafted',
    lastModified: '28/09/2025',
  },
];











 