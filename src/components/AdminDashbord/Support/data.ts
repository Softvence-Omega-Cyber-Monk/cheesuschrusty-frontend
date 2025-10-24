// import type { Ticket, TicketConversation } from './types';
// import { Priority, Status } from './types';

// export const tickets: Ticket[] = [
//   {
//     id: 'TICK-001',
//     subject: 'Cannot access Pro features after payment',
//     user: { name: 'Marco Rossi', email: 'marco.rossi@email.com', avatar: 'https://picsum.photos/seed/marco/40/40' },
//     priority: Priority.High,
//     status: Status.InProgress,
//     category: 'Billing',
//     lastUpdate: '29/09/2025',
//     responses: 3,
//     created: '2024-09-29 14:30',
//     assignee: 'Anna Verdi'
//   },
//   {
//     id: 'TICK-002',
//     subject: 'Flashcards not loading on mobile app',
//     user: { name: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', avatar: 'https://picsum.photos/seed/giulia/40/40' },
//     priority: Priority.Low,
//     status: Status.InProgress,
//     category: 'Technical',
//     lastUpdate: '29/09/2025',
//     responses: 2,
//     created: '2024-09-29 12:15',
//     assignee: 'Luca Moretti'
//   },
//   {
//     id: 'TICK-003',
//     subject: 'Request for feature: Dark Mode',
//     user: { name: 'Alessandro Russo', email: 'alessandro.russo@email.com', avatar: 'https://picsum.photos/seed/alessandro/40/40' },
//     priority: Priority.Low,
//     status: Status.Resolved,
//     category: 'Feature Request',
//     lastUpdate: '29/09/2025',
//     responses: 1,
//     created: '2024-09-28 18:00',
//     assignee: 'Anna Verdi'
//   },
//   {
//     id: 'TICK-004',
//     subject: 'Typo in Italian grammar lesson',
//     user: { name: 'Sofia Ferrari', email: 'sofia.ferrari@email.com', avatar: 'https://picsum.photos/seed/sofia/40/40' },
//     priority: Priority.Medium,
//     status: Status.InProgress,
//     category: 'Content',
//     lastUpdate: '29/09/2025',
//     responses: 5,
//     created: '2024-09-28 11:45',
//     assignee: 'Luca Moretti'
//   },
//   {
//     id: 'TICK-005',
//     subject: 'How to reset my learning progress?',
//     user: { name: 'Francesco Romano', email: 'francesco.romano@email.com', avatar: 'https://picsum.photos/seed/francesco/40/40' },
//     priority: Priority.Medium,
//     status: Status.Open,
//     category: 'General Inquiry',
//     lastUpdate: '29/09/2025',
//     responses: 0,
//     created: '2024-09-27 09:30',
//     assignee: 'Anna Verdi'
//   },
// ];

// export const conversations: TicketConversation[] = [
//   {
//     ticketId: 'TICK-001',
//     messages: [
//       {
//         id: 1,
//         sender: 'Marco Rossi',
//         role: 'User',
//         timestamp: '2024-09-29 14:30',
//         content: 'Hi, I upgraded to Pro yesterday and made the payment, but I still can\'t access the advanced grammar lessons and unlimited flashcards. My payment was processed successfully according to my bank statement. Can you please help me resolve this issue?',
//         attachment: 'payment-receipt.pdf'
//       },
//       {
//         id: 2,
//         sender: 'Anna Verdi',
//         role: 'Support',
//         timestamp: '2024-09-29 14:45',
//         content: 'Hi Marco, thank you for contacting us. I can see your payment was processed successfully. Let me check your account status and subscription details. I\'ll get back to you within the next hour with a solution.'
//       }
//     ]
//   }
// ];
