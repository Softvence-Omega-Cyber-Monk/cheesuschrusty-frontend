// src/components/settings/PreferencesCard.tsx

import React, { useState } from 'react';
import Toggle from './Toggle';

const PreferencesCard: React.FC = () => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [offlineDownload, setOfflineDownload] = useState(false);
  const [reminders, setReminders] = useState(true);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <span className="text-red-500 mr-2">⚙️</span> App Preferences
      </h2>
      <p className="text-sm text-gray-500 mb-4">Customize your learning experience</p>
      
      <div className="space-y-4">
        {/* Auto Play Audio */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-700">Auto Play Audio</h3>
            <p className="text-xs text-gray-500">Automatically play pronunciation examples</p>
          </div>
          <Toggle checked={autoPlay} onChange={setAutoPlay} />
        </div>

        {/* Offline Download */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-700">Offline Download</h3>
            <p className="text-xs text-gray-500">Download lessons for offline practice</p>
          </div>
          <Toggle checked={offlineDownload} onChange={setOfflineDownload} />
        </div>

        {/* Study Reminders */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-700">Study Reminders</h3>
            <p className="text-xs text-gray-500">Daily notifications to maintain your streak</p>
          </div>
          <Toggle checked={reminders} onChange={setReminders} />
        </div>
      </div>
    </div>
  );
};

export default PreferencesCard;