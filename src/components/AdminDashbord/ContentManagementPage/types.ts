
// types.ts
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Status = 'Published' | 'Drafted';
export type Category = 'Reading' | 'Writing' | 'Listening' | 'Speaking' | 'Grammar' | 'Vocabulary';

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  cards: number;
  difficulty: Difficulty;
  category: Category;
  status: Status;
  lastModified: string; // Date string
}

export interface Stats {
  totalDecks: number;
  publishedLessons: number;
  totalFlashcards: number;
  contentViews: number;
}

export const mockStats: Stats = {
  totalDecks: 127,
  publishedLessons: 43,
  totalFlashcards: 3284,
  contentViews: 45231,
};

export const mockDecks: ContentItem[] = [
  { id: '1', title: 'Basic Italian Greetings', description: 'Essential greetings and polite expressions', cards: 25, difficulty: 'Beginner', category: 'Reading', status: 'Published', lastModified: '25/09/2025' },
  { id: '2', title: 'Intermediate Verbs', description: 'Common verb conjugations', cards: 40, difficulty: 'Intermediate', category: 'Grammar', status: 'Published', lastModified: '25/09/2025' },
  { id: '3', title: 'Advanced Idioms', description: 'Idiomatic expressions for fluency', cards: 15, difficulty: 'Advanced', category: 'Speaking', status: 'Drafted', lastModified: '25/09/2025' },
];

export const mockLessons: ContentItem[] = [
  { id: '101', title: 'Basic Italian Greetings', description: 'Essential greetings', cards: 25, difficulty: 'Beginner', category: 'Reading', status: 'Published', lastModified: '25/09/2025' },
  { id: '102', title: 'Intermediate Verbs', description: 'Verb conjugations', cards: 30, difficulty: 'Intermediate', category: 'Grammar', status: 'Drafted', lastModified: '25/09/2025' },
];




 