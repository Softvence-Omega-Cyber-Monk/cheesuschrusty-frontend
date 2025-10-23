import React from 'react';
import { Edit2, HelpCircle, Shield, Download, Bell, Zap, LogOut, Sunset, Target } from 'lucide-react';

// Reusable Toggle Switch Component (Included for completeness)
interface ToggleProps {
    defaultChecked: boolean;
}
const ToggleSwitch: React.FC<ToggleProps> = ({ defaultChecked }) => {
    const isChecked = defaultChecked; 
    
    return (
        <div 
            className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                isChecked ? 'bg-indigo-500' : 'bg-gray-300'
            }`}
        >
            <div 
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                    isChecked ? 'transform translate-x-5' : 'transform translate-x-0'
                }`}
            ></div>
        </div>
    );
};

// --- Reusable Panel Component (For the sections) ---
interface PanelProps {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
    children: React.ReactNode;
    iconColor?: string;
}
const SettingsPanel: React.FC<PanelProps> = ({ title, icon, subtitle, children, iconColor = 'text-orange-500' }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center mb-4">
            <span className={`mr-2 ${iconColor}`}>{icon}</span>
            <div>
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
        </div>
        {children}
    </div>
);

// --- The Main Page Component ---
export const UserSettings: React.FC = () => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600 mb-8">Manage your account and app preferences</p>

            <div className="grid grid-cols-12 gap-6">
                
                {/* --- LEFT COLUMN (Profile, Subscription, App Preferences) --- */}
                <div className="col-span-8 space-y-6">
                    
                    {/* 1. Profile Information */}
                    <SettingsPanel
                        title="Profile Information"
                        icon={<Target size={20} />}
                        subtitle="Update your personal information and learning profile"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold border-4 border-white shadow">
                                    MR
                                </div>
                                <div>
                                    <div className="flex space-x-2 mb-1">
                                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Level B1</span>
                                        <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">Premium</span>
                                    </div>
                                    <p className="text-xs text-gray-500">Learning Italian since March 2024 • 7 day streak</p>
                                </div>
                            </div>
                            <button className="flex items-center cursor-pointer text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors">
                                <Edit2 size={16} className="mr-1" /> Edit
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500">Full Name</label>
                                <input type="text" defaultValue="Marco Rossi" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 mt-1" readOnly />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Email Address</label>
                                <input type="email" defaultValue="marco.rossi@email.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 mt-1" readOnly />
                            </div>
                        </div>
                    </SettingsPanel>

                    {/* 2. Subscription Management */}
                    <SettingsPanel
                        title="Subscription Management"
                        icon={<Zap size={20} />}
                        subtitle="Manage your premium subscription and billing"
                    >
                        <div className="p-4 bg-green-50 rounded-lg mb-4 flex justify-between items-center border border-green-200">
                            <div>
                                <h4 className="font-semibold text-green-700">Premium Plan</h4>
                                <p className="text-xs text-green-600">Renewed monthly • Next Renewal: Dec 25, 2024</p>
                            </div>
                            <span className="text-sm font-semibold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                                Active
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">Next billing: $24.99 on December 15, 2024</p>
                        <div className="flex space-x-4">
                            <button className="flex-1 px-6 cursor-pointer py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                Change Plan
                            </button>
                            <button className="flex-1 px-6 py-3 cursor-pointer bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                                Billing History
                            </button>
                        </div>
                    </SettingsPanel>

                    {/* 3. App Preferences */}
                    <SettingsPanel
                        title="App Preferences"
                        icon={<Sunset size={20} />}
                        subtitle="Customize your learning experience"
                        iconColor="text-red-500"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Auto Play Audio</p>
                                    <p className="text-xs text-gray-500">Automatically play pronunciation examples</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Offline Download</p>
                                    <p className="text-xs text-gray-500">Download lessons for offline practice</p>
                                </div>
                                <ToggleSwitch defaultChecked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Study Reminders</p>
                                    <p className="text-xs text-gray-500">Daily notifications to maintain your streak</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                        </div>
                    </SettingsPanel>
                </div>

                {/* --- RIGHT COLUMN (Notifications & Quick Actions) --- */}
                <div className="col-span-4 space-y-6">

                    {/* 4. Notifications */}
                    <SettingsPanel
                        title="Notifications"
                        icon={<Bell size={20} />}
                        subtitle="Control your notification preferences"
                        iconColor="text-orange-500"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Push Notifications</p>
                                    <p className="text-xs text-gray-500">New notifications and reminders</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Weekly Update</p>
                                    <p className="text-xs text-gray-500">Weekly progress reports</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Streak Reminders</p>
                                    <p className="text-xs text-gray-500">Don't break your streak</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 font-medium">Achievement Alerts</p>
                                    <p className="text-xs text-gray-500">New badges and milestones</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                        </div>
                    </SettingsPanel>

                    {/* 5. Quick Actions */}
                    <SettingsPanel
                        title="Quick Actions"
                        icon={<Zap size={20} />}
                        subtitle="Common settings and support options"
                        iconColor="text-orange-500"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-colors">
                                <HelpCircle size={18} className="mr-3 text-blue-500" />
                                Help Centre
                            </div>
                            <div className="flex items-center text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-colors">
                                <Shield size={18} className="mr-3 text-blue-500" />
                                Privacy Policy
                            </div>
                            <div className="flex items-center text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-colors">
                                <Download size={18} className="mr-3 text-blue-500" />
                                Export Data
                            </div>
                        </div>
                    </SettingsPanel>

                    {/* 6. Log Out Button */}
                    <button className="w-full mt-4 flex items-center justify-center cursor-pointer p-4 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors border border-red-200">
                        <LogOut size={20} className="mr-2" />
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;









 