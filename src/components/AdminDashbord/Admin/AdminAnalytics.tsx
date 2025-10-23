import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminAnalytics {
  month: string;
  activeUsers: number;
  sessions: number;
}

const data: AdminAnalytics[] = [
  { month: 'Jan', activeUsers: 400, sessions: 240 },
  { month: 'Feb', activeUsers: 420, sessions: 250 },
  { month: 'Mar', activeUsers: 460, sessions: 280 },
  { month: 'Apr', activeUsers: 480, sessions: 300 },
  { month: 'May', activeUsers: 500, sessions: 320 },
];

const AdminAnalytics: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <p className="text-gray-600 mb-6">
        Get insights into user engagement, learning activity, and growth.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Monthly Engagement</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="activeUsers" fill="#6366f1" />
            <Bar dataKey="sessions" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
