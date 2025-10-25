
import React from 'react';
import { ADMIN_USERS, ROLE_PERMISSIONS } from './constants';
import { AdminUser, Role } from './types';

const roleColors: Record<Role, string> = {
  [Role.SuperAdmin]: 'bg-red-100 text-red-800',
  [Role.ContentManager]: 'bg-blue-100 text-blue-800',
  [Role.SupportManager]: 'bg-green-100 text-green-800',
};

const UserCard: React.FC<{ user: AdminUser }> = ({ user }) => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4">
    <div className="mb-4 md:mb-0">
      <div className="flex items-center space-x-3">
        <h3 className="text-md font-semibold text-slate-900">{user.name}</h3>
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${roleColors[user.role]}`}>{user.role}</span>
      </div>
      <p className="text-sm text-slate-500">{user.email}</p>
    </div>
    <div className="flex items-center space-x-4 w-full md:w-auto">
      <p className="text-sm text-slate-500 ">Last active: {user.lastActive}</p>
      <button className="text-sm font-medium cursor-pointer text-slate-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 transition">Edit</button>
      <button className="text-sm font-medium cursor-pointer text-slate-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 transition">Remove</button>
    </div>
  </div>
);

const AdminUsers: React.FC = () => {
  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Admin Users & Permissions</h2>
            <p className="text-slate-500 mt-1 text-sm">Manage administrator accounts and their access levels</p>
          </div>
          <button className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Admin User
          </button>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-4 divide-y divide-slate-200">
            {ADMIN_USERS.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLE_PERMISSIONS.map(role => (
            <div key={role.name} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-md font-semibold text-slate-900">{role.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {role.permissions.map(permission => (
                  <li key={permission} className="flex items-start">
                    <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
