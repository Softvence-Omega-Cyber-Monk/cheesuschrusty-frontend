"use client"

import type React from "react"
import type { Ticket } from "./types"
import { PriorityTag } from "./priority-tag"
import { CategoryTag } from "./category-tag"

interface TicketsTableProps {
  tickets: Ticket[]
  onViewTicket: (ticket: Ticket) => void
}

export const TicketsTable: React.FC<TicketsTableProps> = ({ tickets, onViewTicket }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
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
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket: Ticket, index: number) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewTicket(ticket)}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                <div className="text-xs text-gray-500">{ticket.responses} replies</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{ticket.user}</div>
                <div className="text-xs text-gray-500">{ticket.email}</div>
              </td>
              <td className="px-6 py-4">
                <PriorityTag priority={ticket.priority} />
              </td>
              <td className="px-6 py-4">
                <CategoryTag category={ticket.category} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{ticket.lastUpdate}</td>
              <td className="px-6 py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewTicket(ticket)
                  }}
                  className="text-sm text-blue-600 underline hover:text-blue-800 transition font-medium"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
