import React from 'react';
import { KpiData } from './types';

interface KpiCardProps {
  kpi: KpiData;
}

const KpiCard: React.FC<KpiCardProps> = ({ kpi }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center space-x-4">
      <div className="bg-gray-100 p-3 rounded-full">
        {kpi.icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{kpi.title}</p>
        <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
      </div>
    </div>
  );
};

export default KpiCard;
