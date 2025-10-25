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
    <div className="min-h-screen   font-sans flex flex-col">
      {/* Detail Header */}
      <div className="  px-8 py-4  ">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToDashboard}
            className="flex cursor-pointer items-center text-gray-600 hover:text-gray-800 transition font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            User Management
          </button>
          <button
            onClick={onMarkAsResolved}
            className={`bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium ${
              ticket.status === "Resolved" ? "opacity-50 cursor-not-allowed bg-green-600" : ""
            }`}
            disabled={ticket.status === "Resolved"}
          >
            {ticket.status === "Resolved" ? <CheckCircle size={18} /> : null}
            {ticket.status === "Resolved" ? "Resolved" : "Mark As Resolved"}
          </button>
        </div>
      </div>

      {/* Ticket Title */}
      <div className="px-8 py-4  ">
        <h1 className="text-2xl font-semibold text-gray-900">Ticket {ticket.id}</h1>
        <p className="text-lg text-gray-700 mt-1">{ticket.subject}</p>
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
