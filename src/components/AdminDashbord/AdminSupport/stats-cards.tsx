import React from "react"
import type { Ticket } from "./types"

interface StatsCardsProps {
  tickets: Ticket[]
}

export const StatsCards: React.FC<StatsCardsProps> = ({ tickets }) => {
  const openTickets = tickets.filter(
    (t) => t.category === "Open" || t.category === "In Progress"
  ).length

  // Centralized card config for easy scaling
  const stats = [
    { label: "Total Tickets", value: tickets.length },
    { label: "Open Tickets", value: openTickets },
    { label: "Resolved Today", value: 8 },
    { label: "Avg Response Time", value: "2.4 Hours" },
    { label: "Satisfaction", value: "4.6/5" },
  ]

  return (
    <div className="px-8 py-6 dark:bg-gray-800 mb-4 rounded-md">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-gray-100">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
