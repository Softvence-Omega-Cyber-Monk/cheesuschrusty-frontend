import React from 'react';

const AdminSettings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="text-gray-600 mb-6">
        Configure your account, notifications, and application preferences.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-sm max-w-xl">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Name</label>
            <input
              type="text"
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              defaultValue="Darlene Robertson"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
              defaultValue="admin@b1italian.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notification Preferences</label>
            <select className="mt-1 w-full border rounded px-3 py-2 text-sm">
              <option>Email only</option>
              <option>Push notifications</option>
              <option>Both</option>
              <option>None</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
