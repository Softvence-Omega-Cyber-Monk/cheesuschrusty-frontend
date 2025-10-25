"use client"

import type React from "react"
import type { TabType } from "./types"

interface TabsBarProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const TabsBar: React.FC<TabsBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="p-4 rounded-t-xl flex justify-between items-center">
      <div className="flex gap-2 p-2 bg-gray-200 rounded-lg inline-flex">
        <button
          onClick={() => onTabChange("allTickets")}
          className={`px-4 py-2 text-sm font-medium cursor-pointer rounded-md transition ${
            activeTab === "allTickets" ? "bg-white shadow-md text-gray-800" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          All Tickets
        </button>
        <button
          onClick={() => onTabChange("knowledgeBase")}
          className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition ${
            activeTab === "knowledgeBase" ? "bg-white shadow-md text-gray-800" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Knowledge Base
        </button>
        <button
          onClick={() => onTabChange("teamManagement")}
          className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition ${
            activeTab === "teamManagement" ? "bg-white shadow-md text-gray-800" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Team Management
        </button>
      </div>
    </div>
  )
}
