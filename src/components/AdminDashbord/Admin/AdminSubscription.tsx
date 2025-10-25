import { useState } from 'react';
import KpiCard from '../SubscriptionManagement/KpiCard';
import PlanCard from '../SubscriptionManagement/PlanCard';
import AddNewPlanModal from '../SubscriptionManagement/AddNewPlanModal';
import { Plan, KpiData } from '../SubscriptionManagement/types';
import { MoneyIcon, CrownIcon, ChartIcon, UserIcon, PlusIcon } from '../SubscriptionManagement/icons';

const initialKpiData: KpiData[] = [
  { title: 'Monthly Revenue', value: '€6,847', icon: <MoneyIcon /> },
  { title: 'Active Subscriptions', value: '912', icon: <CrownIcon /> },
  { title: 'Conversion Rate', value: '32.1%', icon: <ChartIcon /> },
  { title: 'Avg. Revenue Per User', value: '€7.51', icon: <UserIcon /> },
];

const initialPlans: Plan[] = [
  {
    id: 1,
    title: 'Free Plan',
    description: 'Perfect for getting started with Italian',
    price: 0,
    period: 'month',
    activeUsers: 1935,
    features: ['Basic flashcards', 'Limited lessons', 'Community access'],
  },
  {
    id: 2,
    title: 'Pro Plan',
    description: 'Complete Italian learning experience',
    price: 9.99,
    period: 'month',
    activeUsers: 912,
    features: ['Unlimited flashcards', 'All lessons', 'Offline access', 'Progress tracking', 'Priority support'],
  },
];

function AdminSubscription() {
  const [kpiData] = useState<KpiData[]>(initialKpiData);
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPlan = (newPlanData: Omit<Plan, 'id' | 'activeUsers'>) => {
    const newPlan: Plan = {
      ...newPlanData,
      id: Math.max(...plans.map(p => p.id)) + 1,
      activeUsers: 0,
    };
    setPlans([...plans, newPlan]);
  };

  return (
    <div className="  min-h-screen font-sans text-gray-800">
      <div className="container mx-auto  pt-6  ">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform today.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 flex items-center cursor-pointer justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            <PlusIcon />
            Add New Plan
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <KpiCard key={kpi.title} kpi={kpi} />
          ))}
        </section>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </main>
      </div>

      {isModalOpen && (
        <AddNewPlanModal 
          onClose={() => setIsModalOpen(false)} 
          onAddPlan={handleAddPlan} 
        />
      )}
    </div>
  );
}

export default AdminSubscription;
