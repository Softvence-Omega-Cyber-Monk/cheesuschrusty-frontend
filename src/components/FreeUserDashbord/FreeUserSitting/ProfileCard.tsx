// src/components/settings/ProfileCard.tsx

import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline'; // Requires @heroicons/react

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-red-500 mr-2">📄</span> Profile Information
          </h2>
          <p className="text-sm text-gray-500">Update your personal information and learning profile</p>
        </div>
        <button className="flex items-center cursor-pointer text-indigo-500 hover:text-indigo-600 font-medium text-sm">
          <PencilSquareIcon className="w-4 h-4 mr-1" />
          Edit
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
          MR
        </div>
        <div>
          <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-green-500 rounded-full mr-2">
            Level B1
          </span>
          <span className="inline-block px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full">
            Free
          </span>
          <p className="text-sm text-gray-600 mt-1">
            Learning Italian since March 2024 • 1-day streak
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
          <input
            type="text"
            value="Marco Rossi"
            disabled
            className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
          <input
            type="email"
            value="marco.rossi@email.com"
            disabled
            className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;