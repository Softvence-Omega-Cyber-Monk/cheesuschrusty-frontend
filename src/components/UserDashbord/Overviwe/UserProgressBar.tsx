import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string; // optional, default to #111827
}

export const UserProgressBar: React.FC<ProgressBarProps> = ({ value, max, color = '#111827' }) => {
  const percentage = Math.min((value / max) * 100, 100); // limit to 100%
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="h-3 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      />
    </div>
  );
};

