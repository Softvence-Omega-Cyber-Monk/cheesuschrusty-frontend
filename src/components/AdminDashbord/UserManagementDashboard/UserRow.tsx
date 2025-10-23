
import React from 'react';
import { Edit2, Ban } from 'lucide-react';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Pro' | 'Free';
  status: 'Active' | 'Suspended';
  progress: number;
  avatar: string;
}

interface UserRowProps {
  user: User;
  avatarColor: string;
  onEdit?: () => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, avatarColor, onEdit }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${avatarColor} flex items-center justify-center text-white font-semibold text-sm mr-3`}>
            {user.avatar}
          </div>
          <span className="text-sm font-medium text-gray-900">{user.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`text-sm font-medium ${user.role === 'Pro' ? 'text-orange-500' : 'text-gray-600'}`}>
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.progress}%</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="text-blue-600 cursor-pointer hover:text-blue-800">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="text-red-600 cursor-pointer hover:text-red-800">
            <Ban className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;






 