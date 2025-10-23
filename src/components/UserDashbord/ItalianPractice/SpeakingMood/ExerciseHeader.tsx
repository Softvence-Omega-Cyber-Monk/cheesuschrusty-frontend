import React from 'react';
import { Volume2, MessageSquare, BookOpen } from 'lucide-react';
import { ExerciseType } from './types';

interface ExerciseHeaderProps {
  currentExercise: ExerciseType;
  currentPhraseIndex: number;
}

const getExerciseInfo = (type: ExerciseType) => {
  switch (type) {
    case 'pronunciation':
      return {
        title: 'Pronunciation Practice',
        description: 'Listen and repeat the Italian phrases with correct pronunciation.',
        icon: <Volume2 className="text-white" size={20} />,
        exerciseNumber: '1',
      };
    case 'conversation':
      return {
        title: 'Conversation Practice',
        description: 'Practice real conversations with AI feedback.',
        icon: <MessageSquare className="text-white" size={20} />,
        exerciseNumber: '2',
      };
    case 'reading':
      return {
        title: 'Reading Aloud',
        description: 'Practice the text and receive your response and rhythm.',
        icon: <BookOpen className="text-white" size={20} />,
        exerciseNumber: '3',
      };
    default:
      return null;
  }
};

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ currentExercise, currentPhraseIndex }) => {
  const info = getExerciseInfo(currentExercise);
  if (!info) return null;

  const exerciseLabel = currentExercise === 'pronunciation' 
    ? `Exercise ${currentPhraseIndex + 1}/3` 
    : `Exercise ${info.exerciseNumber}/3`;

  return (
    <div className="  rounded-lg   p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            {info.icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{info.title}</h2>
            <p className="text-sm text-gray-600">{info.description}</p>
          </div>
        </div>
        <button className="px-4 py-2 cursor-pointer text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          {exerciseLabel}
        </button>
      </div>
    </div>
  );
};

export default ExerciseHeader;
