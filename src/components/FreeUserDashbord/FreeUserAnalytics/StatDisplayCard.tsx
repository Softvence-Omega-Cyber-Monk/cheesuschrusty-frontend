import React from 'react';

// Define the props interface for type safety
interface StatDisplayCardProps {
  title: string;
  value: string;
  icon: React.ReactNode; // Can accept an SVG, an image, or a simple text icon
}

const StatDisplayCard: React.FC<StatDisplayCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex-1 min-w-0 p-6 bg-white rounded-xl shadow-md flex items-center justify-between transition-shadow hover:shadow-lg">
      <div className="flex flex-col">
        {/* Metric Value */}
        <p className="text-4xl font-bold text-gray-800 mb-1">{value}</p>
        {/* Metric Title */}
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
      {/* Icon Display */}
      <div className="text-3xl text-indigo-500 ml-4">
        {icon}
      </div>
    </div>
  );
};

export default StatDisplayCard;