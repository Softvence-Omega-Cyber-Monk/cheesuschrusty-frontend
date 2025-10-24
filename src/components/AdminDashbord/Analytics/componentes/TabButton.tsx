
import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
        ${isActive
          ? 'bg-indigo-500 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
