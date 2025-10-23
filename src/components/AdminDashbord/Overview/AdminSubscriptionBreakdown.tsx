import React from 'react';

 
const AdminSubscriptionBreakdown: React.FC = () => (
  <div className="bg-white p-6 rounded-lg  ">
    <h2 className="text-2xl font-semibold mb-4 md:pr-40">Subscription Breakdown</h2>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-700"></div>
          <span className="text-base font-semibold text-[#696D77]">
            Free Users
          </span>
        </div>
        <div className="text-right">
          <div className="font-semibold text-base text-[#3C424E]">10,245</div>
          <div className="text-xs text-gray-500">51.2%</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-base font-semibold text-[#696D77]">
            Premium Users
          </span>
        </div>
        <div className="text-right">
          <div className="font-semibold text-[#3C424E]">8,241</div>
          <div className="text-xs text-gray-500">48.8%</div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminSubscriptionBreakdown;