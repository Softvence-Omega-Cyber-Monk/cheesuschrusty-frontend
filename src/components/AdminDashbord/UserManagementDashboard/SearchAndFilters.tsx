

import React from 'react';
import { Search } from 'lucide-react';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: 'All Role' | 'Pro' | 'Free';
  setRoleFilter: React.Dispatch<React.SetStateAction<'All Role' | 'Pro' | 'Free'>>;
  statusFilter: 'All Status' | 'Active' | 'Suspended';
  setStatusFilter: React.Dispatch<React.SetStateAction<'All Status' | 'Active' | 'Suspended'>>;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="rounded-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search ..."
            className="w-full pl-10 bg-white pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'All Role' | 'Pro' | 'Free')}
        >
          <option>All Role</option>
          <option>Pro</option>
          <option>Free</option>
        </select>
        <select
          className="px-4 py-2 border cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'All Status' | 'Active' | 'Suspended')}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Suspended</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilters;







 