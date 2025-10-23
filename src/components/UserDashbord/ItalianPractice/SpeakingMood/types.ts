// types.ts
export type ExerciseType = 'pronunciation' | 'conversation' | 'reading' | 'complete';

export interface Phrase {
  italian: string;
  english: string;
  phonetic: string;
}

export interface ConversationMessage {
  italian: string;
  english: string;
}

export interface ConversationData {
  title: string;
  description: string;
  waiterMessages: ConversationMessage[];
  userResponses: string[];
}
