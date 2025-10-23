// FreeUserStatCard.tsx
import React from 'react';

interface StatCardProps {
  icon: string; // Unicode or an Icon component
  title: string;
  value: string;
  subValue?: string;
  iconBgColor: string; // Tailwind class like 'bg-orange-100'
  iconTextColor: string; // Tailwind class like 'text-orange-500'
}

const FreeUserStatCard: React.FC<StatCardProps> = ({ icon, title, value, subValue, iconBgColor, iconTextColor }) => (
  <div className="bg-white p-5 rounded-xl shadow-custom flex items-center justify-between min-h-[96px]">
    <div>
      <h3 className="text-sm text-gray-500 font-medium mb-1">{title}</h3>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
      {subValue && <p className="text-xs text-gray-400">{subValue}</p>}
    </div>
    <div className={`p-2 rounded-full ${iconBgColor} ${iconTextColor}`}>
      <span className="text-xl leading-none">{icon}</span>
    </div>
  </div>
);

export default FreeUserStatCard;