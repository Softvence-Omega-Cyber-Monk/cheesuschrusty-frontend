import type React from "react"
import type { Ticket } from "./types"
import { Calendar, Star } from "lucide-react"

interface UserInfoSidebarProps {
  ticket: Ticket
}

export const UserInfoSidebar: React.FC<UserInfoSidebarProps> = ({ ticket }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
        User Information
      </h2>

      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-300 font-bold text-lg">
          {ticket.user[0]}
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{ticket.user}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{ticket.email}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <p className="flex items-center text-gray-700 dark:text-gray-200">
          <Calendar size={16} className="mr-2 text-gray-400 dark:text-gray-400" /> 
          <span className="font-medium">Joined:</span> {ticket.joined || "N/A"}
        </p>
        <p className="flex items-center text-gray-700 dark:text-gray-200">
          <Star size={16} className="mr-2 text-gray-400 dark:text-gray-400" /> 
          <span className="font-medium">Subscription:</span>{" "}
          <span className="ml-1 font-medium text-green-600 dark:text-green-400">{ticket.subscription || "Basic"}</span>
        </p>
      </div>
    </div>
  )
}
