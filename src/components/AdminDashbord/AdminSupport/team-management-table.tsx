import type React from "react"
import type { TeamMember } from "./types"
import { Star } from "lucide-react"

interface TeamManagementTableProps {
  members: TeamMember[]
}

export const TeamManagementTable: React.FC<TeamManagementTableProps> = ({ members }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Online":
        return "bg-green-500"
      case "Busy":
        return "bg-orange-500"
      case "Offline":
        return "bg-gray-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Member</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Tickets Resolved</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Avg. Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {members.map((member: TeamMember, index: number) => (
            <tr key={index} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{member.name}</div>
                <div className="text-xs text-gray-500">{member.email}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">{member.role}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{member.ticketsResolved}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                {member.avgRating.toFixed(1)}
              </td>
              <td className="px-6 py-4">
                <span className={`h-2 w-2 rounded-full inline-block mr-2 ${getStatusColor(member.status)}`}></span>
                <span className="text-sm text-gray-900">{member.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}