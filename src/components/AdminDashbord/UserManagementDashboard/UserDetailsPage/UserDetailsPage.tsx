// UserDetailsPage.tsx

import React from 'react';
import UserInfoCard from './UserInfoCard';
import StatsGrid from './StatsGrid';
import PersonalInformation from './PersonalInformation';
import LearningOverview from './LearningOverview';
import SubscriptionDetails from './SubscriptionDetails';
import { mockUserData } from './types'; // Import the mock data

const UserDetailsPage: React.FC = () => {
  const user = mockUserData; // Use the mock data for the page

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <header className="mb-6">
        <p className="text-sm text-gray-500">
          User Management &gt; <span className="font-medium text-gray-700">{user.fullName}</span>
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mt-1">User Details</h1>
        <p className="text-md text-gray-500">Comprehensive user information and management</p>
      </header>

      <main className="max-w-7xl mx-auto">
        
        {/* 1. Top User Info and Status */}
        <UserInfoCard user={user} />
        
        {/* 2. Stats Grid */}
        <StatsGrid stats={user.stats} dayStreak={user.dayStreak} />

        {/* 3. Personal Information */}
        <PersonalInformation user={user} />

        {/* 4. Learning Statistics and Progress */}
        <LearningOverview learning={user.learning} stats={user.stats} />

        {/* 5. Subscription Details */}
        <SubscriptionDetails subscription={user.subscription} />

      </main>
    </div>
  );
};

export default UserDetailsPage;