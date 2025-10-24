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





// // src/types.ts

// export interface Message {
//   sender: string;
//   role: 'User' | 'Support';
//   timestamp: string;
//   content: string;
//   attachment?: string;
// }

// export interface Ticket {
//   id: string;
//   subject: string;
//   user: string;
//   email: string;
//   priority: 'High' | 'Medium' | 'Low';
//   category: string;
//   lastUpdate: string; // e.g., "2024-09-29"
//   status: 'Open' | 'In Progress' | 'Resolved';
//   assignee: string;
//   joinedDate: string; // e.g., "2023-05-15"
//   subscription: string; // e.g., "Pro"
//   responses: number;
//   messages: Message[];
// }


