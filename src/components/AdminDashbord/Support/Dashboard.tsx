

// // src/components/Dashboard.tsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Ticket } from '../types';

// interface DashboardProps {
//   tickets: Ticket[];
//   onAddTicket: () => void; // Function to trigger adding a new ticket
// }

// const getPriorityClasses = (priority: Ticket['priority']) => {
//   switch (priority) {
//     case 'High': return 'bg-red-100 text-red-800 border-red-300';
//     case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//     case 'Low': return 'bg-green-100 text-green-800 border-green-300';
//     default: return 'bg-gray-100 text-gray-800 border-gray-300';
//   }
// };

// const getCategoryClasses = (category: string) => {
//   if (category === 'In Progress') return 'bg-blue-100 text-blue-800';
//   if (category === 'Resolved') return 'bg-green-100 text-green-800';
//   if (category === 'Open') return 'bg-yellow-100 text-yellow-800';
//   return 'bg-gray-100 text-gray-800';
// };

// const Dashboard: React.FC<DashboardProps> = ({ tickets, onAddTicket }) => {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <header className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
//           <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your platform today.</p>
//         </div>
//         <button
//           onClick={onAddTicket} // Use onAddTicket prop
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out flex items-center"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//           </svg>
//           Add New Plan
//         </button>
//       </header>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//         <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
//           <p className="text-gray-500 text-sm">Total Tickets</p>
//           <p className="text-2xl font-bold text-gray-900">247</p>
//         </div>
//         <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
//           <p className="text-gray-500 text-sm">Open Tickets</p>
//           <p className="text-2xl font-bold text-gray-900">23</p>
//         </div>
//         <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
//           <p className="text-gray-500 text-sm">Resolved Today</p>
//           <p className="text-2xl font-bold text-gray-900">8</p>
//         </div>
//         <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
//           <p className="text-gray-500 text-sm">Avg Response Time</p>
//           <p className="text-2xl font-bold text-gray-900">2.4 Hours</p>
//         </div>
//         <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
//           <p className="text-gray-500 text-sm">Satisfaction</p>
//           <p className="text-2xl font-bold text-gray-900">4.6/5</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-2 mb-8">
//         <button className="px-4 py-2 text-sm font-medium rounded-md bg-blue-500 text-white shadow-sm">All Tickets</button>
//         <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition duration-150">Knowledge Base</button>
//         <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition duration-150">Team Management</button>
//       </div>

//       {/* Flashcard Decks Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Flashcard Decks</h2>
//         <div className="flex space-x-3">
//           <button className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition duration-150">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
//             </svg>
//             Filter
//           </button>
//           <button
//             onClick={onAddTicket} // Use onAddTicket prop for this button too
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300 ease-in-out flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
//             </svg>
//             Create Ticket
//           </button>
//         </div>
//       </div>

//       {/* Tickets Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
//               <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {tickets.map((ticket) => (
//               <tr key={ticket.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
//                   <div className="text-xs text-gray-500">{ticket.responses} responses</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">{ticket.user}</div>
//                   <div className="text-xs text-gray-500">{ticket.email}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getPriorityClasses(ticket.priority)}`}>
//                     {ticket.priority}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryClasses(ticket.category)}`}>
//                     {ticket.category}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdate}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                   <Link to={`/ticket/${ticket.id}`} className="text-blue-600 hover:text-blue-900">
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex items-center justify-between">
//         <p className="text-sm text-gray-700">Showing 1 to {tickets.length} of 24 orders</p>
//         <div className="flex items-center space-x-2">
//           <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
//             &lt;
//           </button>
//           <button className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-md">
//             1
//           </button>
//           <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
//             2
//           </button>
//           <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
//             3
//           </button>
//           <button className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100">
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


















import React from 'react';
import type { Ticket } from './types';

interface DashboardProps {
  tickets: Ticket[];
  onSelectTicket: (ticketId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ tickets, onSelectTicket }) => {
  return (
    <div className='p-6'>







<div className="  ">

    <div className="    rounded-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div className="mb-4 sm:mb-0">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    Content Management
                </h1>
                <p className="text-base text-gray-600 mt-1">
                    Welcome back! Here's what's happening with your platform today.
                </p>
            </div>

            <button className="flex items-center cursor-pointer space-x-2 bg-primary-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-150 ease-in-out w-full sm:w-auto">
          
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




















      <div className="mt-8 p- bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 ">
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
