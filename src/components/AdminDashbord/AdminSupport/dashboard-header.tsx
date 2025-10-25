"use client"

import type React from "react"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  onAddNew?: () => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your platform today.</p>
        </div>
        <button
          onClick={onAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium"
        >
          <Plus size={18} />
          Add New Plan
        </button>
      </div>
    </div>
  )
}
