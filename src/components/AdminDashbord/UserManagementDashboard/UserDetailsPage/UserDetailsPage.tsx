// UserDetailsPage.tsx

import React, { useState } from 'react';
import UserInfoCard from './UserInfoCard';
import StatsGrid from './StatsGrid';
import PersonalInformation from './PersonalInformation';
import LearningOverview from './LearningOverview';
import SubscriptionDetails from './SubscriptionDetails';
import { mockUserData, UserData } from './types'; // Import UserData interface

const UserDetailsPage: React.FC = () => {
  // Use state to manage the user data, allowing it to be updated
  const [user, setUser] = useState<UserData>(mockUserData); 

  // Handler function to update a specific field in the user state
  const handlePersonalInformationUpdate = (
    field: 'fullName' | 'email' | 'phone' | 'location',
    value: string
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value, // Safely update the specified field
    }));
  };

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
        
        {/* 1. Top User Info and Status - Now uses the state data */}
        <UserInfoCard user={user} />
        
        {/* 2. Stats Grid */}
        <StatsGrid stats={user.stats} dayStreak={user.dayStreak} />

        {/* 3. Personal Information - Now passes the state data and the update handler */}
        <PersonalInformation 
          user={user} 
          onUpdateField={handlePersonalInformationUpdate} 
        />

        {/* 4. Learning Statistics and Progress */}
        <LearningOverview learning={user.learning} stats={user.stats} />

        {/* 5. Subscription Details */}
        <SubscriptionDetails subscription={user.subscription} />

      </main>
    </div>
  );
};

export default UserDetailsPage;