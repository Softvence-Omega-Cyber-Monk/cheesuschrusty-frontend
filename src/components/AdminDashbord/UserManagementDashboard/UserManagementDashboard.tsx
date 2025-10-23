
import React, { useState } from 'react';
import StatsCards from '../Overview/AdminStatsCards';
import SearchAndFilters from './SearchAndFilters';
import UserRow, { User } from './UserRow';
import { useNavigate } from 'react-router-dom';

const avatarColors = [
  'bg-yellow-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-400', 'bg-cyan-400',
  'bg-yellow-600', 'bg-amber-500', 'bg-orange-400', 'bg-rose-400', 'bg-gray-400'
];

const UserManagementDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All Role' | 'Pro' | 'Free'>('All Role');
  const [statusFilter, setStatusFilter] = useState<'All Status' | 'Active' | 'Suspended'>('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();

  const users: User[] = [
    { id: 1, name: 'Cody Fisher', email: 'john.doe@email.com', role: 'Pro', status: 'Active', progress: 61, avatar: 'C' },
    { id: 2, name: 'Jerome Bell', email: 'sarah.wilson@email.com', role: 'Free', status: 'Suspended', progress: 18, avatar: 'J' },
    { id: 3, name: 'Jacob Jones', email: 'admin@store.com', role: 'Free', status: 'Active', progress: 61, avatar: 'J' },
    { id: 4, name: 'Albert Flores', email: 'contact@company.com', role: 'Pro', status: 'Active', progress: 50, avatar: 'A' },
    { id: 5, name: 'Theresa Webb', email: 'info@service.org', role: 'Free', status: 'Active', progress: 32, avatar: 'T' },
    { id: 6, name: 'Devon Lane', email: 'support@helpdesk.net', role: 'Free', status: 'Active', progress: 80, avatar: 'D' },
    { id: 7, name: 'Courtney Henry', email: 'marketing@business.com', role: 'Free', status: 'Active', progress: 75, avatar: 'C' },
    { id: 8, name: 'Ralph Edwards', email: 'feedback@community.org', role: 'Pro', status: 'Active', progress: 90, avatar: 'R' },
    { id: 9, name: 'Wade Warren', email: 'sales@ecommerce.com', role: 'Free', status: 'Active', progress: 20, avatar: 'W' },
    { id: 10, name: 'Arlene McCoy', email: 'hello@website.com', role: 'Pro', status: 'Active', progress: 40, avatar: 'A' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Role' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/${id}`);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your platform today.</p>
        </div>

        <StatsCards />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    avatarColor={avatarColors[index % avatarColors.length]}
                    onEdit={() => handleEdit(user.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 cursor-pointer text-gray-600 hover:bg-gray-100 rounded"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 cursor-pointer rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 cursor-pointer text-gray-600 hover:bg-gray-100 rounded"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementDashboard;










 