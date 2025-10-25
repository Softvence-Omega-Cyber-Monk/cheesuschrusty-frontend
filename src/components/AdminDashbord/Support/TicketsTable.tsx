import React from "react";
import { Ticket } from "./types";
import { getPriorityColor, getCategoryColor } from "./colors";

interface TicketsTableProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onViewTicket }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Ticket ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">User</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Update</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {tickets.map(ticket => (
          <tr key={ticket.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewTicket(ticket)}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
            <td className="px-6 py-4">
              <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
              <div className="text-xs text-gray-500">{ticket.responses} responses</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-900">{ticket.user}</div>
              <div className="text-xs text-gray-500">{ticket.email}</div>
            </td>
            <td className="px-6 py-4">
              <span className={`${getPriorityColor(ticket.priority)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                {ticket.priority}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className={`${getCategoryColor(ticket.category)} px-3 py-1 rounded-full text-xs font-medium`}>
                {ticket.category}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">{ticket.lastUpdate}</td>
            <td className="px-6 py-4">
              <button
                onClick={(e) => { e.stopPropagation(); onViewTicket(ticket); }}
                className="text-sm text-gray-900 underline hover:text-blue-600 transition"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TicketsTable;
