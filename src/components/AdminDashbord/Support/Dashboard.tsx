import React from 'react';
import type { Ticket } from './types';

interface DashboardProps {
  tickets: Ticket[];
  onSelectTicket: (ticketId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tickets, onSelectTicket }) => {
  return (
    <div>







<div className="p-4 sm:p-8">

    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white rounded-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div className="mb-4 sm:mb-0">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    Content Management
                </h1>
                <p className="text-base text-gray-600 mt-1">
                    Welcome back! Here's what's happening with your platform today.
                </p>
            </div>

            <button className="flex items-center space-x-2 bg-primary-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-150 ease-in-out w-full sm:w-auto">
          
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
                <span>Add New Plan</span>
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Tickets</p>
                <p className="text-4xl font-bold text-gray-900">247</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Open Tickets</p>
                <p className="text-4xl font-bold text-gray-900">23</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Resolved Today</p>
                <p className="text-4xl font-bold text-gray-900">8</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Avg Response Time</p>
                <p className="text-4xl font-bold text-gray-900">2.4 <span className="text-2xl font-normal">Hours</span></p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Satisfaction</p>
                <p className="text-4xl font-bold text-gray-900">4.6/5</p>
            </div>

        </div>
    </div>

</div>




















      <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Priority</th>
                <th scope="col" className="px-6 py-3">Assignee</th>
                <th scope="col" className="px-6 py-3">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="bg-white border-b border-slate-200 hover:bg-slate-50/70 cursor-pointer" onClick={() => onSelectTicket(ticket.id)}>
                  <td className="px-6 py-4 font-medium text-slate-900">{ticket.subject}</td>
                  <td className="px-6 py-4">{ticket.user.name}</td>
                  <td className="px-6 py-4">{ticket.status}</td>
                  <td className="px-6 py-4">{ticket.priority}</td>
                  <td className="px-6 py-4">{ticket.assignee}</td>
                  <td className="px-6 py-4">{ticket.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
