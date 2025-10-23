// ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  label: string;
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, progress }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm text-gray-700">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="mt-1 h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;