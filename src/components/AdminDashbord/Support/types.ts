export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Message {
  id: number;
  sender: string;
  role: string;
  timestamp: string;
  content: string;
  attachment?: string;
}

export interface TicketConversation {
  ticketId: string;
  messages: Message[];
}

export interface Ticket {
  id: string;
  subject: string;
  user: User;
  priority: Priority;
  status: Status;
  category: string;
  lastUpdate: string;
  responses: number;
  created: string;
  assignee: string;
}