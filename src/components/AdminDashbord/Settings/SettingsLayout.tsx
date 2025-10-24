
import React, { useState } from 'react';
import GeneralSettings from './GeneralSettings';
import AdminUsers from './AdminUsers';
import Notifications from './Notifications';
import Security from './Security';
import Branding from './Branding';

type Tab = 'General' | 'Admin Users' | 'Notifications' | 'Security' | 'Branding';

const SettingsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('General');

  const tabs: Tab[] = ['General', 'Admin Users', 'Notifications', 'Security', 'Branding'];

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return <GeneralSettings />;
      case 'Admin Users':
        return <AdminUsers />;
      case 'Notifications':
        return <Notifications />;
      case 'Security':
        return <Security />;
      case 'Branding':
        return <Branding />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage platform settings, security, and administrative preferences.
        </p>
      </header>
      
      <div className="mb-6">
        <nav className="bg-slate-100 p-1 rounded-lg inline-flex items-center space-x-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-transparent text-slate-600 hover:bg-white/70 hover:text-slate-900'
              } whitespace-nowrap py-2 px-3 rounded-md font-medium text-sm transition-all duration-200`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default SettingsLayout;
