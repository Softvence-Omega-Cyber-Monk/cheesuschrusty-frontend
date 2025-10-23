// StatsGrid.tsx

import React from 'react';
import { UserData } from './types';

interface StatsGridProps {
  stats: UserData['stats'];
  dayStreak: number;
}

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string | number, subtext: string, growth?: number }> = ({
  icon,
  title,
  value,
  subtext,
  growth
}) => {
  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${title === 'Lessons Completed' ? 'bg-blue-100 text-blue-600' : title === 'Words Learned' ? 'bg-yellow-100 text-yellow-600' : title === 'Day Streak' ? 'bg-green-100 text-green-600' : 'bg-green-100 text-green-600'}`}>
          {icon}
        </div>
        {growth !== undefined && (
          <div className="flex items-center text-xs font-medium text-yellow-600">
            <span className="mr-1">📈</span>
            {growth}% this month
          </div>
        )}
        {title === 'Day Streak' && (
           <div className="flex items-center text-xs font-medium text-green-600">
            <span className="mr-1">✅</span>
            Personal best!
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
        {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
      </div>
    </div>
  );
};


const StatsGrid: React.FC<StatsGridProps> = ({ stats, dayStreak }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <StatCard
        icon={<span className="text-lg">📚</span>}
        title="Lessons Completed"
        value={stats.lessonsCompleted}
        subtext={`${stats.lessonsRemaining} remaining`}
      />
      <StatCard
        icon={<span className="text-lg">💬</span>}
        title="Words Learned"
        value={stats.wordsLearned}
        subtext="Total unique vocabulary"
        growth={stats.wordsGrowth}
      />
      <StatCard
        icon={<span className="text-lg">💡</span>}
        title="Knowledge Score"
        value="A+"
        subtext="Based on practice"
      />
      <StatCard
        icon={<span className="text-lg">🔥</span>}
        title="Day Streak"
        value={dayStreak}
        subtext="Consecutive days studying"
      />
    </div>
  );
};

export default StatsGrid;
