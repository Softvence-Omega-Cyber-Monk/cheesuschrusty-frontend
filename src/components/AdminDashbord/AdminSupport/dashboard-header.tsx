"use client"

import React from "react"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  onAddNew?: () => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Content Management
          </h1>
          <p className="text-sm text-gray-600 mt-1 dark:text-gray-400">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition font-medium shadow-sm"
        >
          <Plus size={18} />
          Add New Plan
        </button>
      </div>
    </div>
  )
}
