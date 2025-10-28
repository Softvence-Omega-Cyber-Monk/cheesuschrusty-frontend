import React from 'react';
import { Edit2, HelpCircle, Shield, Download, Bell, Zap, LogOut, Sunset, Target } from 'lucide-react';

// Reusable Toggle Switch Component with Dark Mode
interface ToggleProps {
    defaultChecked: boolean;
}
const ToggleSwitch: React.FC<ToggleProps> = ({ defaultChecked }) => {
    const isChecked = defaultChecked; 
    
    return (
        <div 
            className={`w-12 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                isChecked 
                    ? 'bg-indigo-500 dark:bg-indigo-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
            }`}
        >
            <div 
                className={`w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                    isChecked ? 'transform translate-x-5' : 'transform translate-x-0'
                }`}
            ></div>
        </div>
    );
};

// --- Reusable Panel Component with Dark Mode ---
interface PanelProps {
    title: string;
    icon: React.ReactNode;
    subtitle: string;
    children: React.ReactNode;
    iconColor?: string;
}
const SettingsPanel: React.FC<PanelProps> = ({ title, icon, subtitle, children, iconColor = 'text-orange-500 dark:text-orange-400' }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="flex items-center mb-4">
            <span className={`mr-2 ${iconColor}`}>{icon}</span>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
        </div>
        {children}
    </div>
);

// --- The Main Page Component ---
export const UserSettings: React.FC = () => {
    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account and app preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* --- LEFT COLUMN (Profile, Subscription, App Preferences) --- */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* 1. Profile Information */}
                    <SettingsPanel
                        title="Profile Information"
                        icon={<Target size={20} />}
                        subtitle="Update your personal information and learning profile"
                        iconColor="text-blue-500 dark:text-blue-400"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold border-4 border-white dark:border-gray-800 shadow">
                                    MR
                                </div>
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-1">
                                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">Level B1</span>
                                        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold px-3 py-1 rounded-full">Premium</span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Learning Italian since March 2024 • 7 day streak</p>
                                </div>
                            </div>
                            <button className="flex items-center cursor-pointer text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                <Edit2 size={16} className="mr-1" /> Edit
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400">Full Name</label>
                                <input 
                                    type="text" 
                                    defaultValue="Marco Rossi" 
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mt-1 transition-colors duration-200" 
                                    readOnly 
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 dark:text-gray-400">Email Address</label>
                                <input 
                                    type="email" 
                                    defaultValue="marco.rossi@email.com" 
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mt-1 transition-colors duration-200" 
                                    readOnly 
                                />
                            </div>
                        </div>
                    </SettingsPanel>

                    {/* 2. Subscription Management */}
                    <SettingsPanel
                        title="Subscription Management"
                        icon={<Zap size={20} />}
                        subtitle="Manage your premium subscription and billing"
                        iconColor="text-purple-500 dark:text-purple-400"
                    >
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4 flex justify-between items-center border border-green-200 dark:border-green-800">
                            <div>
                                <h4 className="font-semibold text-green-700 dark:text-green-400">Premium Plan</h4>
                                <p className="text-xs text-green-600 dark:text-green-300">Renewed monthly • Next Renewal: Dec 25, 2024</p>
                            </div>
                            <span className="text-sm font-semibold text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-800 px-3 py-1 rounded-full">
                                Active
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Next billing: $24.99 on December 15, 2024</p>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                            <button className="flex-1 px-6 cursor-pointer py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                                Change Plan
                            </button>
                            <button className="flex-1 px-6 py-3 cursor-pointer bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                Billing History
                            </button>
                        </div>
                    </SettingsPanel>

                    {/* 3. App Preferences */}
                    <SettingsPanel
                        title="App Preferences"
                        icon={<Sunset size={20} />}
                        subtitle="Customize your learning experience"
                        iconColor="text-red-500 dark:text-red-400"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Auto Play Audio</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Automatically play pronunciation examples</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Offline Download</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Download lessons for offline practice</p>
                                </div>
                                <ToggleSwitch defaultChecked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Study Reminders</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Daily notifications to maintain your streak</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                        </div>
                    </SettingsPanel>
                </div>

                {/* --- RIGHT COLUMN (Notifications & Quick Actions) --- */}
                <div className="lg:col-span-4 space-y-6">

                    {/* 4. Notifications */}
                    <SettingsPanel
                        title="Notifications"
                        icon={<Bell size={20} />}
                        subtitle="Control your notification preferences"
                        iconColor="text-orange-500 dark:text-orange-400"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Push Notifications</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">New notifications and reminders</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Weekly Update</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Weekly progress reports</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Streak Reminders</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Don't break your streak</p>
                                </div>
                                <ToggleSwitch defaultChecked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-700 dark:text-gray-300 font-medium">Achievement Alerts</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">New badges and milestones</p>
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
                        iconColor="text-yellow-500 dark:text-yellow-400"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <HelpCircle size={18} className="mr-3 text-blue-500 dark:text-blue-400" />
                                Help Centre
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Shield size={18} className="mr-3 text-blue-500 dark:text-blue-400" />
                                Privacy Policy
                            </div>
                            <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Download size={18} className="mr-3 text-blue-500 dark:text-blue-400" />
                                Export Data
                            </div>
                        </div>
                    </SettingsPanel>

                    {/* 6. Log Out Button */}
                    <button className="w-full mt-4 flex items-center justify-center cursor-pointer p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold rounded-xl hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors border border-red-200 dark:border-red-800">
                        <LogOut size={20} className="mr-2" />
                        Log Out
                    </button>

                    {/* App Version */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            App Version 2.4.1 • LinguaLearn
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;