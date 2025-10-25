import type React from "react"
import type { Ticket } from "./types"
import { Calendar, Star } from "lucide-react"

interface UserInfoSidebarProps {
  ticket: Ticket
}

export const UserInfoSidebar: React.FC<UserInfoSidebarProps> = ({ ticket }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">User Information</h2>
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600 font-bold text-lg">
          {ticket.user[0]}
        </div>
        <div>
          <p className="font-medium text-gray-900">{ticket.user}</p>
          <p className="text-sm text-gray-500">{ticket.email}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm text-gray-700">
        <p className="flex items-center">
          <Calendar size={16} className="mr-2 text-gray-400" /> **Joined:** {ticket.joined || "N/A"}
        </p>
        <p className="flex items-center">
          <Star size={16} className="mr-2 text-gray-400" /> **Subscription:**{" "}
          <span className="font-medium ml-1 text-green-600">{ticket.subscription || "Basic"}</span>
        </p>
      </div>
    </div>
  )
}
