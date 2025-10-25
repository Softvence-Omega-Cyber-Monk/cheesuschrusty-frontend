"use client"

import type React from "react"
import type { Message, Ticket } from "./types"
import { Send, Paperclip } from "lucide-react"

interface ConversationPanelProps {
  ticket: Ticket
  messageInput: string
  onMessageChange: (message: string) => void
  onSendMessage: () => void
}

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  ticket,
  messageInput,
  onMessageChange,
  onSendMessage,
}) => {
  return (
    <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col min-h-full">
      <div className="p-6 ">
        <h2 className="text-xl font-semibold text-gray-900">Conversation</h2>
        <p className="text-sm text-gray-500">Messages between user and support team</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[600px] min-h-[300px]">
        {(ticket.conversation || []).map((msg: Message, index: number) => (
          <div key={index} className={`flex ${msg.role === "User" ? "justify-start" : "justify-end"}`}>
            <div className={`flex items-start max-w-xl ${msg.role === "User" ? "flex-row" : "flex-row-reverse"}`}>
              <div
                className={`h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-sm font-bold text-gray-600 ${
                  msg.role === "User" ? "mr-3" : "ml-3"
                }`}
              >
                {msg.sender
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex flex-col">
                <div className={`text-xs text-gray-500 mb-1 ${msg.role === "User" ? "text-left" : "text-right"}`}>
                  <span className="font-semibold text-gray-800">{msg.sender}</span> · {msg.role} ·{" "}
                  {msg.time.substring(msg.time.lastIndexOf(" ") + 1)}
                </div>
                <div
                  className={`p-4 rounded-xl shadow-sm ${
                    msg.role === "User"
                      ? "bg-gray-100 text-gray-800 rounded-tl-none"
                      : "bg-blue-600 text-white rounded-tr-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                  {msg.attachment && (
                    <a
                      href="#"
                      className={`flex items-center mt-2 text-xs font-medium underline ${
                        msg.role === "User" ? "text-blue-600" : "text-blue-200"
                      }`}
                    >
                      <Paperclip size={12} className="mr-1" />
                      {msg.attachment}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Input */}
      <div className="p-6    ">
        <div className="relative">
          <textarea
            value={messageInput}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Write your message here"
            rows={3}
            className="w-full p-3 bg-gray-50 pr-16 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <button
            onClick={onSendMessage}
            className="absolute bottom-3 right-3 cursor-pointer bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={messageInput.trim() === ""}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
