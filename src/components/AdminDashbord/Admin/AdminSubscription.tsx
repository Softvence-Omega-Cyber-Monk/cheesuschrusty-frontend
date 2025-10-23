import React from 'react';

const AdminSubscription: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Subscription Management</h1>
      <p className="text-gray-600 mb-6">
        Manage plans, pricing, and active subscriptions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold">Free Plan</h3>
          <p className="text-gray-500 text-sm mb-4">Basic access to lessons and quizzes.</p>
          <p className="text-xl font-bold mb-4">$0</p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Edit Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold">Pro Plan</h3>
          <p className="text-gray-500 text-sm mb-4">
            Unlimited flashcards, premium decks, and ad-free.
          </p>
          <p className="text-xl font-bold mb-4">$12/month</p>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
            Edit Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscription;
