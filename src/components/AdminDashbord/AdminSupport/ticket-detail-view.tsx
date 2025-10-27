"use client"

import type React from "react"
import type { Ticket } from "./types"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { ConversationPanel } from "./conversation-panel"
import { UserInfoSidebar } from "./user-info-sidebar"
import { TicketDetailsSidebar } from "./ticket-details-sidebar"

interface TicketDetailViewProps {
  ticket: Ticket
  messageInput: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
  onMarkAsResolved: () => void
  onBackToDashboard: () => void
}

export const TicketDetailView: React.FC<TicketDetailViewProps> = ({
  ticket,
  messageInput,
  onMessageChange,
  onSendMessage,
  onMarkAsResolved,
  onBackToDashboard,
}) => {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Detail Header */}
      <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            User Management
          </button>

          <button
            onClick={onMarkAsResolved}
            disabled={ticket.status === "Resolved"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              ticket.status === "Resolved"
                ? "bg-green-600 text-white opacity-50 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            }`}
          >
            {ticket.status === "Resolved" && <CheckCircle size={18} />}
            {ticket.status === "Resolved" ? "Resolved" : "Mark As Resolved"}
          </button>
        </div>
      </div>

      {/* Ticket Title */}
      <div className="px-8 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Ticket {ticket.id}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">{ticket.subject}</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex h-full gap-8">
          {/* Conversation Panel (Left) */}
          <ConversationPanel
            ticket={ticket}
            messageInput={messageInput}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
          />

          {/* Sidebar (Right) */}
          <div className="w-80 space-y-6">
            <UserInfoSidebar ticket={ticket} />
            <TicketDetailsSidebar ticket={ticket} />
          </div>
        </div>
      </div>
    </div>
  )
}
