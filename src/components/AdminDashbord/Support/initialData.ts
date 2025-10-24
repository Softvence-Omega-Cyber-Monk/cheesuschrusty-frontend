// // src/initialData.ts
// import { Ticket, Message } from './types';

// const TICKET_MESSAGES_1: Message[] = [
//   {
//     sender: "Marco Rossi",
//     role: "User",
//     timestamp: "2024-09-29 14:30",
//     content: "Hi, I upgraded to Pro yesterday and made the payment, but I still can't access the advanced grammar lessons and unlimited flashcards. My payment was processed successfully according to my bank statement. Can you please help me resolve this issue?",
//     attachment: "payment-receipt.pdf"
//   },
//   {
//     sender: "Anna Verdi",
//     role: "Support",
//     timestamp: "2024-09-29 14:45",
//     content: "Hi Marco, thank you for contacting us. I can see your payment was processed successfully. I'll get back to you within the next hour with a solution.",
//   },
// ];

// const TICKET_MESSAGES_2: Message[] = [
//   {
//     sender: "Marco Rossi",
//     role: "User",
//     timestamp: "2024-09-29 15:00",
//     content: "My app keeps crashing when I try to upload new flashcards. It started after the last update.",
//   },
//   {
//     sender: "Support Team",
//     role: "Support",
//     timestamp: "2024-09-29 15:10",
//     content: "We apologize for the inconvenience. Could you please provide your device model and OS version so we can investigate?",
//   },
// ];

// export const initialTickets: Ticket[] = [
//   {
//     id: "TICK-001",
//     subject: "Cannot access Pro features after payment",
//     user: "Marco Rossi",
//     email: "marco.rossi@email.com",
//     priority: "High",
//     category: "In Progress",
//     lastUpdate: "29/09/2025",
//     status: "Open",
//     assignee: "Anna Verdi",
//     joinedDate: "2023-05-15",
//     subscription: "Pro",
//     responses: 3,
//     messages: TICKET_MESSAGES_1,
//   },
//   {
//     id: "TICK-002",
//     subject: "Flashcard sync issue across devices",
//     user: "Maria Bianchi",
//     email: "maria.bianchi@email.com",
//     priority: "Low",
//     category: "Resolved",
//     lastUpdate: "28/09/2025",
//     status: "Resolved",
//     assignee: "John Doe",
//     joinedDate: "2024-01-20",
//     subscription: "Basic",
//     responses: 1,
//     messages: [
//       {
//         sender: "Maria Bianchi",
//         role: "User",
//         timestamp: "2024-09-28 10:00",
//         content: "My flashcards aren't syncing between my phone and tablet.",
//       },
//     ],
//   },
//   {
//     id: "TICK-003",
//     subject: "App crashes on flashcard upload",
//     user: "Marco Rossi",
//     email: "marco.rossi@email.com",
//     priority: "Medium",
//     category: "In Progress",
//     lastUpdate: "29/09/2025",
//     status: "Open",
//     assignee: "Anna Verdi",
//     joinedDate: "2023-05-15",
//     subscription: "Pro",
//     responses: 2,
//     messages: TICKET_MESSAGES_2,
//   },
//   {
//     id: "TICK-004",
//     subject: "Payment failed for premium subscription",
//     user: "Luca Ricci",
//     email: "luca.ricci@email.com",
//     priority: "High",
//     category: "Open",
//     lastUpdate: "29/09/2025",
//     status: "Open",
//     assignee: "Unassigned",
//     joinedDate: "2024-03-01",
//     subscription: "None",
//     responses: 0,
//     messages: [
//       {
//         sender: "Luca Ricci",
//         role: "User",
//         timestamp: "2024-09-29 09:00",
//         content: "Tried to upgrade to premium but my credit card was declined.",
//       },
//     ],
//   },
//   {
//     id: "TICK-005",
//     subject: "Request for new flashcard deck feature",
//     user: "Giulia Sarti",
//     email: "giulia.sarti@email.com",
//     priority: "Low",
//     category: "New Feature",
//     lastUpdate: "27/09/2025",
//     status: "Open",
//     assignee: "Product Team",
//     joinedDate: "2022-11-10",
//     subscription: "Pro",
//     responses: 5,
//     messages: [
//       {
//         sender: "Giulia Sarti",
//         role: "User",
//         timestamp: "2024-09-27 11:00",
//         content: "It would be great if we could import flashcards from Anki!",
//       },
//       {
//         sender: "Support Team",
//         role: "Support",
//         timestamp: "2024-09-27 11:30",
//         content: "Thanks for the suggestion! We'll pass it to our product team.",
//       },
//     ],
//   },
// ];