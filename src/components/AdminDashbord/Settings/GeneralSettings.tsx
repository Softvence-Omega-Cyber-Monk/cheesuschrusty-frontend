
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { LANGUAGES, TIMEZONES } from './constants';

const GeneralSettings: React.FC = () => {
  const [platformName, setPlatformName] = useState('ItalianMaster');
  const [supportEmail, setSupportEmail] = useState('');
  const [platformDescription, setPlatformDescription] = useState('The best platform for learning Italian with interactive flashcards, lessons, and personalized learning paths.');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timezone, setTimezone] = useState('Europe/Rome');
  const [allowUserRegistration, setAllowUserRegistration] = useState(true);
  const [freeTrialPeriod, setFreeTrialPeriod] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-900">Platform Settings</h2>
      <p className="text-slate-500 mt-1 text-sm">General configuration for your Italian learning platform</p>
      
      <form className="mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="platformName" className="block text-sm font-medium text-slate-700">Platform Name</label>
            <input
              type="text"
              id="platformName"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="supportEmail" className="block text-sm font-medium text-slate-700">Support Email</label>
            <input
              type="email"
              id="supportEmail"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              placeholder="Enter title"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="platformDescription" className="block text-sm font-medium text-slate-700">Platform Description</label>
          <textarea
            id="platformDescription"
            rows={4}
            value={platformDescription}
            onChange={(e) => setPlatformDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="defaultLanguage" className="block text-sm font-medium text-slate-700">Default Language</label>
            <select
              id="defaultLanguage"
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {LANGUAGES.map(lang => <option key={lang}>{lang}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-slate-700">Timezone</label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
            </select>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8">
            <h3 className="text-lg font-semibold text-slate-900">Feature Toggles</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Allow User Registration</h4>
                  <p className="text-sm text-slate-500">Enable new users to register for accounts</p>
                </div>
                <ToggleSwitch checked={allowUserRegistration} onChange={setAllowUserRegistration} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Free Trial Period</h4>
                  <p className="text-sm text-slate-500">Offer 7-day free trial for Pro features</p>
                </div>
                <ToggleSwitch checked={freeTrialPeriod} onChange={setFreeTrialPeriod} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Maintenance Mode</h4>
                  <p className="text-sm text-slate-500">Temporarily disable platform access</p>
                </div>
                <ToggleSwitch checked={maintenanceMode} onChange={setMaintenanceMode} />
              </div>
            </div>
        </div>

        <div className="flex justify-start pt-2">
            <button type="button" className="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
