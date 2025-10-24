
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const contentPerformanceData = [
  { name: 'Basic Greetings', views: 2500, completion: 1900 },
  { name: 'Food & Restaurants', views: 2200, completion: 1700 },
  { name: 'Travel Phrases', views: 1800, completion: 1400 },
  { name: 'Verb Conjugations', views: 1500, completion: 1100 },
  { name: 'Italian Culture', views: 1200, completion: 950 },
  { name: 'Numbers & Time', views: 1150, completion: 900 },
];

const ContentPerformanceView: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Content Performance</h3>
      <p className="text-sm text-gray-500 mb-6">Views, completion rates, and ratings for top content</p>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <BarChart
            data={contentPerformanceData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                }}
            />
            <Legend wrapperStyle={{fontSize: "14px"}} />
            <Bar dataKey="views" fill="#8b5cf6" name="Views" />
            <Bar dataKey="completion" fill="#14b8a6" name="Completions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ContentPerformanceView;
