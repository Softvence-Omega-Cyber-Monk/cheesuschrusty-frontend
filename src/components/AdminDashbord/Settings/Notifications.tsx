
import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

const NotificationItem: React.FC<{
    title: string;
    description: string;
    toggled: boolean;
    onToggle: (checked: boolean) => void;
}> = ({ title, description, toggled, onToggle }) => (
    <div className="flex items-center justify-between">
        <div>
            <h4 className="text-sm font-medium text-slate-800">{title}</h4>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <ToggleSwitch checked={toggled} onChange={onToggle} />
    </div>
);


const Notifications: React.FC = () => {
    const [newUserReg, setNewUserReg] = useState(true);
    const [paymentNotifications, setPaymentNotifications] = useState(true);
    const [supportAlerts, setSupportAlerts] = useState(true);
    const [analyticsSummary, setAnalyticsSummary] = useState(false);
    const [welcomeEmail, setWelcomeEmail] = useState(true);
    const [learningReminders, setLearningReminders] = useState(true);
    const [achievementNotifications, setAchievementNotifications] = useState(true);

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900">Notification Settings</h2>
        <p className="text-slate-500 mt-1 text-sm">Configure system notifications and alerts</p>

        <div className="mt-8 space-y-8 divide-y divide-slate-200">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Email Notifications</h3>
                <NotificationItem title="New User Registration" description="Get notified when new users register" toggled={newUserReg} onToggle={setNewUserReg} />
                <NotificationItem title="Payment Notifications" description="Alerts for successful and failed payments" toggled={paymentNotifications} onToggle={setPaymentNotifications} />
                <NotificationItem title="Support Ticket Alerts" description="New support tickets and urgent issues" toggled={supportAlerts} onToggle={setSupportAlerts} />
                <NotificationItem title="Daily Analytics Summary" description="Daily email with key metrics" toggled={analyticsSummary} onToggle={setAnalyticsSummary} />
            </div>

            <div className="pt-8 space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">User Communication</h3>
                <NotificationItem title="Welcome Email" description="Send welcome email to new users" toggled={welcomeEmail} onToggle={setWelcomeEmail} />
                <NotificationItem title="Learning Reminders" description="Send study reminders to inactive users" toggled={learningReminders} onToggle={setLearningReminders} />
                <NotificationItem title="Achievement Notifications" description="Celebrate user milestones and achievements" toggled={achievementNotifications} onToggle={setAchievementNotifications} />
            </div>
        </div>

        <div className="flex justify-start pt-8 mt-4">
            <button type="button" className="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Save Notification Settings
            </button>
        </div>
    </div>
  );
};

export default Notifications;
