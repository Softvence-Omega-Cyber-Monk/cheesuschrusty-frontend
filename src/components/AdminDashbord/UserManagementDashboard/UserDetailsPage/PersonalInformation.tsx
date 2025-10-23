// PersonalInformation.tsx

import React from 'react';
import { UserData } from './types';

interface PersonalInformationProps {
  user: UserData;
}

const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      readOnly
      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const PersonalInformation: React.FC<PersonalInformationProps> = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Personal Information</h3>
      <p className="text-sm text-gray-500 mb-4">User's personal details and contact information</p>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        <InfoField label="Full Name" value={user.fullName} />
        <InfoField label="Email Address" value={user.email} />
        <InfoField label="Phone Number" value={user.phone} />
        <InfoField label="Location" value={user.location} />
      </div>
    </div>
  );
};

export default PersonalInformation;