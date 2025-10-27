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
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-600">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Ticket ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Priority</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Last Update</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {tickets.map((ticket: Ticket, index: number) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-700" onClick={() => onViewTicket(ticket)}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">{ticket.id}</td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{ticket.subject}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{ticket.responses} replies</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 dark:text-gray-200">{ticket.user}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{ticket.email}</div>
              </td>
              <td className="px-6 py-4">
                <PriorityTag priority={ticket.priority} />
              </td>
              <td className="px-6 py-4">
                <CategoryTag category={ticket.category} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{ticket.lastUpdate}</td>
              <td className="px-6 py-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewTicket(ticket)
                  }}
                  className="text-sm text-blue-600 underline hover:text-blue-800 transition font-medium dark:text-blue-400 dark:hover:text-blue-300"
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
