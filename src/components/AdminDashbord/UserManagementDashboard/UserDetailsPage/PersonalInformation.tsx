// PersonalInformation.tsx

import React from 'react';
import { UserData } from './types';

// Define a type for the editable fields for better type safety
type EditableUserFields = 'fullName' | 'email' | 'phone' | 'location';

interface PersonalInformationProps {
  user: UserData;
  // Handler to update a specific field in the parent state
  onUpdateField: (field: EditableUserFields, value: string) => void;
}

// Separate component for a single editable text field
interface InfoFieldProps {
  label: string;
  fieldKey: EditableUserFields;
  value: string;
  onUpdate: (field: EditableUserFields, value: string) => void;
}

const InfoField: React.FC<InfoFieldProps> = ({ label, fieldKey, value, onUpdate }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      // Call the parent's update handler directly with the field key and new value
      onChange={(e) => onUpdate(fieldKey, e.target.value)} 
      className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
    />
  </div>
);

const PersonalInformation: React.FC<PersonalInformationProps> = ({ user, onUpdateField }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm mb-6 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 border-b pb-3 mb-4">Personal Information</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">User's personal details and contact information</p>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        <InfoField 
          label="Full Name" 
          fieldKey="fullName"
          value={user.fullName} 
          onUpdate={onUpdateField} 
        />
        <InfoField 
          label="Email Address" 
          fieldKey="email"
          value={user.email} 
          onUpdate={onUpdateField} 
        />
        <InfoField 
          label="Phone Number" 
          fieldKey="phone"
          value={user.phone} 
          onUpdate={onUpdateField} 
        />
        <InfoField 
          label="Location" 
          fieldKey="location"
          value={user.location} 
          onUpdate={onUpdateField} 
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
