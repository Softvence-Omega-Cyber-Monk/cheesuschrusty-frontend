// Badges.tsx

import React from 'react';
import { Difficulty, Status } from './types';

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const color = status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {status}
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  let color = 'bg-blue-100 text-blue-700'; // Beginner
  if (difficulty === 'Intermediate') color = 'bg-green-100 text-green-700';
  if (difficulty === 'Advanced') color = 'bg-yellow-100 text-yellow-700';
  
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
      {difficulty}
    </span>
  );
};