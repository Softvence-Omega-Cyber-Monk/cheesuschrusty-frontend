// UserInfoCard.tsx

import React from 'react';
import { UserData } from './types'; // Assuming types.ts is in the same directory

interface UserInfoCardProps {
  user: UserData;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  // Helper for icons (using basic unicode characters for simplicity)
  const Icon = ({ children }: { children: React.ReactNode }) => (
    <span className="text-gray-400 mr-2 text-base">{children}</span>
  );

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm relative mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          {/* Avatar Placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500 mr-6">
            {user.fullName.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">{user.fullName}</h2>
            <p className="text-sm text-gray-500">User ID: {user.id}</p>
            <div className="flex mt-1">
              {/* Status and Membership Badges */}
              <span className="text-xs font-medium mr-2 px-3 py-1 rounded-full bg-green-100 text-green-700">
                {user.status === 'Active' ? 'Active' : 'Account Status'}
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {user.memberType}
              </span>
            </div>
          </div>
        </div>
        
        {/* Suspended Badge */}
        {user.status === 'Suspended' && (
          <div className="absolute top-6 right-6 px-4 py-1.5 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-full">
            SUSPENDED ACCOUNT
          </div>
        )}
      </div>

      {/* Contact and Activity Details */}
      <div className="grid grid-cols-4 gap-4 mt-6 text-sm text-gray-600 border-t pt-4">
        <p className="flex items-center">
          <Icon>📧</Icon> {user.email}
        </p>
        <p className="flex items-center">
          <Icon>📞</Icon> {user.phone}
        </p>
        <p className="flex items-center">
          <Icon>📍</Icon> {user.location}
        </p>
        <p className="flex items-center">
          <Icon>🔥</Icon> {user.dayStreak} day streak
        </p>
        <p className="flex items-center">
          <Icon>📅</Icon> Joined {user.joinDate}
        </p>
        <p className="flex items-center col-span-2">
          <Icon>⏰</Icon> Last active {user.lastActive}
        </p>
      </div>
    </div>
  );
};

export default UserInfoCard;