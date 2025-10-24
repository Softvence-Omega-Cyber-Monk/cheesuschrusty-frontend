
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const Security: React.FC = () => {
    const [minLength, setMinLength] = useState(8);
    const [expiry, setExpiry] = useState(90);
    const [requireSpecial, setRequireSpecial] = useState(true);
    const [requireNumbers, setRequireNumbers] = useState(true);
    const [requireUppercase, setRequireUppercase] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState(60);
    const [maxAttempts, setMaxAttempts] = useState(5);
    const [retentionPolicy, setRetentionPolicy] = useState(true);
    const [gdpr, setGdpr] = useState(true);

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-900">Security Settings</h2>
      <p className="text-slate-500 mt-1 text-sm">Configure security policies and access controls</p>

      <form className="mt-8 space-y-8 divide-y divide-slate-200">
        {/* Password Policy */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">Password Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="minLength" className="block text-sm font-medium text-slate-700">Minimum Password Length</label>
              <input type="number" id="minLength" value={minLength} onChange={e => setMinLength(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-slate-700">Password Expiry (days)</label>
              <input type="number" id="expiry" value={expiry} onChange={e => setExpiry(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>
          <div className="space-y-3">
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">Require Special Characters</span><ToggleSwitch checked={requireSpecial} onChange={setRequireSpecial} /></div>
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">Require Numbers</span><ToggleSwitch checked={requireNumbers} onChange={setRequireNumbers} /></div>
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-700">Require Uppercase Letters</span><ToggleSwitch checked={requireUppercase} onChange={setRequireUppercase} /></div>
          </div>
        </div>
        
        {/* Session Management */}
        <div className="pt-8 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900">Session Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="sessionTimeout" className="block text-sm font-medium text-slate-700">Session Timeout (minutes)</label>
              <input type="number" id="sessionTimeout" value={sessionTimeout} onChange={e => setSessionTimeout(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="maxAttempts" className="block text-sm font-medium text-slate-700">Max Login Attempts</label>
              <input type="number" id="maxAttempts" value={maxAttempts} onChange={e => setMaxAttempts(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
          </div>
        </div>

        {/* Data Privacy */}
        <div className="pt-8 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Data Privacy</h3>
            <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Data Retention Policy</h4>
                  <p className="text-sm text-slate-500">Automatically delete inactive user data</p>
                </div>
                <ToggleSwitch checked={retentionPolicy} onChange={setRetentionPolicy} />
            </div>
            <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-slate-800">GDPR Compliance Mode</h4>
                  <p className="text-sm text-slate-500">Enable GDPR compliance features</p>
                </div>
                <ToggleSwitch checked={gdpr} onChange={setGdpr} />
            </div>
        </div>

        <div className="flex justify-start pt-8">
            <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Update Security Settings
            </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
