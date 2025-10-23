// src/components/settings/SubscriptionCard.tsx

import React from 'react';

const SubscriptionCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="text-yellow-500 mr-2">💰</span> Subscription Management
      </h2>
      <p className="text-sm text-gray-500 mb-4">Manage your premium subscription and billing</p>
      
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <h3 className="font-semibold text-indigo-800 flex items-center">
          <span className="text-lg mr-2">👑</span> Unlock Pro
        </h3>
        <p className="text-sm text-indigo-700 mb-3">
          Unlimited practice, advanced analytics, and personalized feedback
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-150">
          Try 7 Days Free
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;