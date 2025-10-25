export interface Message {
  sender: string
  role: "User" | "Support"
  time: string
  message: string
  attachment?: string
}

export interface Ticket {
  id: string
  subject: string
  responses: number
  user: string
  email: string
  priority: "High" | "Medium" | "Low"
  category: "In Progress" | "Resolved" | "Open"
  lastUpdate: string
  status?: string
  joined?: string
  subscription?: string
  created?: string
  lastUpdateTime?: string
  categoryDetail?: string
  assignee?: string
  conversation?: Message[]
}

export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  views: number
  lastEdited: string
  author: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  ticketsResolved: number
  status: "Online" | "Offline" | "Busy"
  avgRating: number
}

export type PageType = "dashboard" | "detail"
export type TabType = "allTickets" | "knowledgeBase" | "teamManagement"
