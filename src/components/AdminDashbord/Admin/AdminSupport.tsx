 import React from 'react';

const AdminSupport: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Support</h1>
      <p className="text-gray-600 mb-6">
        View and respond to user support tickets and feedback.
      </p>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Issue</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Last Updated</th>
              <th className="py-2 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-3">Alex Brown</td>
              <td className="py-2 px-3">Login issue</td>
              <td className="py-2 px-3 text-yellow-600 font-semibold">Pending</td>
              <td className="py-2 px-3">Oct 12, 2025</td>
              <td className="py-2 px-3 text-right">
                <button className="text-blue-500 hover:underline">View</button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-3">Lily White</td>
              <td className="py-2 px-3">Payment not processed</td>
              <td className="py-2 px-3 text-green-600 font-semibold">Resolved</td>
              <td className="py-2 px-3">Oct 9, 2025</td>
              <td className="py-2 px-3 text-right">
                <button className="text-blue-500 hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSupport;
