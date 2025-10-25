import type React from "react"
import type { Ticket } from "./types"

interface StatsCardsProps {
  tickets: Ticket[]
}

export const StatsCards: React.FC<StatsCardsProps> = ({ tickets }) => {
  const openTickets = tickets.filter((t) => t.category === "Open" || t.category === "In Progress").length

  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-md text-gray-600 mb-1">Total Tickets</p>
          <p className="text-4xl font-semibold">{tickets.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-md text-gray-600 mb-1">Open Tickets</p>
          <p className="text-4xl font-semibold">{openTickets}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-md text-gray-600 mb-1">Resolved Today</p>
          <p className="text-4xl font-semibold">8</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-md text-gray-600 mb-1">Avg Response Time</p>
          <p className="text-4xl font-semibold">2.4 Hours</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-md text-gray-600 mb-1">Satisfaction</p>
          <p className="text-4xl font-semibold">4.6/5</p>
        </div>
      </div>
    </div>
  )
}
