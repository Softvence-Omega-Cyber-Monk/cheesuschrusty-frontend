

// StatCard.tsx

import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconColor }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center border border-gray-100">
      <div>
        <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
        <p className="text-sm text-gray-500 mt-1">{title}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor} bg-opacity-10`} style={{ color: iconColor }}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;




 