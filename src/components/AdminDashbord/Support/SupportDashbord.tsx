// // src/App.tsx
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import TicketDetail from './components/TicketDetail';
// import { initialTickets } from './initialData';
// import { Ticket, Message } from './types';

// const App: React.FC = () => {
//   const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
//   const navigate = useNavigate(); // This must be inside Router, so SupportDashbord is used

//   // Function to add a new ticket (simulated)
//   const handleAddTicket = () => {
//     const newTicketId = `TICK-${(tickets.length + 1).toString().padStart(3, '0')}`;
//     const newTicket: Ticket = {
//       id: newTicketId,
//       subject: "New Blank Ticket",
//       user: "New User",
//       email: "new.user@example.com",
//       priority: "Low",
//       category: "Open",
//       lastUpdate: new Date().toLocaleDateString('en-GB'),
//       status: "Open",
//       assignee: "Unassigned",
//       joinedDate: new Date().toLocaleDateString('en-GB'),
//       subscription: "Basic",
//       responses: 0,
//       messages: [{
//         sender: "System",
//         role: "Support",
//         timestamp: new Date().toLocaleString(),
//         content: "This is a newly created ticket. Please update details.",
//       }],
//     };
//     setTickets(prevTickets => [newTicket, ...prevTickets]); // Add to the beginning
//     alert(`New ticket ${newTicketId} created!`);
//     navigate(`/ticket/${newTicketId}`); // Navigate to the new ticket's detail page
//   };

//   // Function to add a message to a specific ticket
//   const handleAddMessageToTicket = (ticketId: string, newMessage: Message) => {
//     setTickets(prevTickets =>
//       prevTickets.map(ticket =>
//         ticket.id === ticketId
//           ? {
//               ...ticket,
//               messages: [...ticket.messages, newMessage],
//               responses: ticket.responses + 1,
//               lastUpdate: new Date().toLocaleDateString('en-GB'),
//               // Optionally update status if it's currently 'Open' to 'In Progress'
//               status: ticket.status === 'Open' ? 'In Progress' : ticket.status
//             }
//           : ticket
//       )
//     );
//   };

//   // Function to resolve a ticket
//   const handleResolveTicket = (ticketId: string) => {
//     setTickets(prevTickets =>
//       prevTickets.map(ticket =>
//         ticket.id === ticketId
//           ? { ...ticket, status: 'Resolved', category: 'Resolved', lastUpdate: new Date().toLocaleDateString('en-GB') }
//           : ticket
//       )
//     );
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard tickets={tickets} onAddTicket={handleAddTicket} />} />
//       <Route
//         path="/ticket/:id"
//         element={
//           <TicketDetail
//             tickets={tickets}
//             onAddMessage={handleAddMessageToTicket}
//             onResolveTicket={handleResolveTicket}
//           />
//         }
//       />
//     </Routes>
//   );
// };

// // Wrapper component to ensure useNavigate works within Router context
// const SupportDashbord: React.FC = () => (
//   <Router>
//     <App />
//   </Router>
// );

// export default SupportDashbord;