import React from 'react';
import { Plan } from './types';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{plan.title}</h3>
          <p className="text-gray-500">{plan.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">
            {plan.price === 0 ? '€0' : `€${plan.price.toFixed(2)}/${plan.period}`}
          </p>
          <p className="text-sm text-blue-600 font-semibold">{plan.activeUsers} active users</p>
        </div>
      </div>
      
      <div className="grow">
        <h4 className="font-semibold text-gray-700 mb-2">Features</h4>
        <ul className="space-y-2 text-gray-600">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-gray-400 mr-3">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button className="w-full cursor-pointer sm:w-auto px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-colors">
          Edit Plan
        </button>
      </div>
    </div>
  );
};

export default PlanCard;