// // src/components/TicketDetail.tsx
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Ticket, Message } from '../types';

// interface TicketDetailProps {
//   tickets: Ticket[];
//   onAddMessage: (ticketId: string, newMessage: Message) => void;
//   onResolveTicket: (ticketId: string) => void;
// }

// const TicketDetail: React.FC<TicketDetailProps> = ({ tickets, onAddMessage, onResolveTicket }) => {
//   const { id } = useParams<{ id: string }>(); // Get the dynamic part of the URL (e.g., 'TICK-001')
//   const navigate = useNavigate();
//   const ticket = tickets.find(t => t.id === id);

//   const [messageInput, setMessageInput] = useState<string>('');

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (messageInput.trim() && ticket) {
//       const newMessage: Message = {
//         sender: "Anna Verdi", // Assuming support user for this demo
//         role: "Support",
//         timestamp: new Date().toLocaleString('en-GB', {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: false,
//         }).replace(',', ''), // Format like "DD/MM/YYYY HH:MM"
//         content: messageInput,
//       };
//       onAddMessage(ticket.id, newMessage);
//       setMessageInput('');
//     }
//   };

//   const handleResolve = () => {
//     if (ticket) {
//       onResolveTicket(ticket.id);
//       alert(`Ticket ${ticket.id} marked as Resolved!`);
//       navigate('/'); // Optionally navigate back to dashboard
//     }
//   };

//   if (!ticket) {
//     return <div className="p-6 text-red-600 font-semibold">Error: Ticket with ID **{id}** not found.</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center">
//           <button
//             onClick={() => navigate('/')}
//             className="text-gray-600 hover:text-gray-900 mr-3 flex items-center"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//             <span className="sr-only">Back</span>
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">User Management <span className="text-gray-400">/</span> {ticket.user}</h1>
//         </div>
//         <button
//           onClick={handleResolve}
//           disabled={ticket.status === 'Resolved'}
//           className={`px-4 py-2 rounded-md font-semibold text-white ${
//             ticket.status === 'Resolved' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'
//           } transition duration-300`}
//         >
//           Mark As Resolved
//         </button>
//       </div>

//       <div className="text-xl font-semibold text-gray-800 mb-6">Ticket {ticket.id}: {ticket.subject}</div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Conversation Section */}
//         <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversation</h3>
//           <p className="text-gray-600 text-sm mb-4">Messages between user and support team</p>

//           <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//             {ticket.messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex ${message.role === 'User' ? 'justify-start' : 'justify-end'}`}
//               >
//                 <div
//                   className={`max-w-md p-4 rounded-lg shadow ${
//                     message.role === 'User' ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'
//                   }`}
//                 >
//                   <div className="flex justify-between items-center mb-1">
//                     <span className="font-semibold">{message.sender}</span>
//                     <span className="text-xs opacity-75">{message.timestamp}</span>
//                   </div>
//                   <p className={`${message.role === 'User' ? 'text-gray-700' : 'text-white'}`}>{message.content}</p>
//                   {message.attachment && (
//                     <a
//                       href="#"
//                       className={`text-xs ${message.role === 'User' ? 'text-blue-600' : 'text-blue-100'} hover:underline mt-1 block`}
//                       onClick={(e) => { e.preventDefault(); alert(`Downloading ${message.attachment}`); }}
//                     >
//                       {message.attachment}
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Message Input */}
//           <form onSubmit={handleSendMessage} className="mt-4">
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
//               rows={3}
//               placeholder="Write your message here"
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//             ></textarea>
//             <button
//               type="submit"
//               className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>

//         {/* User Information & Ticket Details */}
//         <div className="lg:col-span-1 space-y-6">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">User Information</h3>
//             <div className="flex items-center mb-4">
//               <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg mr-3">
//                 {ticket.user.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900">{ticket.user}</p>
//                 <p className="text-sm text-gray-500">{ticket.email}</p>
//               </div>
//             </div>
//             <p className="flex items-center text-sm text-gray-700 mb-2">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//               Joined: {ticket.joinedDate}
//             </p>
//             <p className="flex items-center text-sm text-gray-700">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Subscription: <span className="font-medium ml-1">{ticket.subscription}</span>
//             </p>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Ticket Details</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center text-sm text-gray-700">
//                 <span>Status</span>
//                 <select
//                   className={`form-select block w-auto py-1 px-2 rounded-md border text-xs focus:ring-blue-500 focus:border-blue-500 ${
//                     ticket.status === 'Resolved' ? 'bg-green-100 border-green-300 text-green-800' :
//                     ticket.status === 'In Progress' ? 'bg-blue-100 border-blue-300 text-blue-800' :
//                     'bg-yellow-100 border-yellow-300 text-yellow-800'
//                   }`}
//                   value={ticket.status}
//                   onChange={(e) => alert(`Status changed to ${e.target.value}`)} // Implement actual status update
//                   disabled={ticket.status === 'Resolved'}
//                 >
//                   <option value="Open">Open</option>
//                   <option value="In Progress">In Progress</option>
//                   <option value="Resolved">Resolved</option>
//                 </select>
//               </div>
//               <div className="flex justify-between items-center text-sm text-gray-700">
//                 <span>Priority</span>
//                 <select
//                   className={`form-select block w-auto py-1 px-2 rounded-md border text-xs focus:ring-blue-500 focus:border-blue-500 ${
//                     ticket.priority === 'High' ? 'bg-red-100 border-red-300 text-red-800' :
//                     ticket.priority === 'Medium' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
//                     'bg-green-100 border-green-300 text-green-800'
//                   }`}
//                   value={ticket.priority}
//                   onChange={(e) => alert(`Priority changed to ${e.target.value}`)} // Implement actual priority update
//                   disabled={ticket.status === 'Resolved'}
//                 >
//                   <option value="High">High</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Low">Low</option>
//                 </select>
//               </div>
//               <div className="flex justify-between items-center text-sm text-gray-700">
//                 <span>Assignee</span>
//                 <select
//                   className="form-select block w-auto py-1 px-2 rounded-md border border-gray-300 text-xs focus:ring-blue-500 focus:border-blue-500"
//                   value={ticket.assignee}
//                   onChange={(e) => alert(`Assignee changed to ${e.target.value}`)} // Implement actual assignee update
//                   disabled={ticket.status === 'Resolved'}
//                 >
//                   <option value="Anna Verdi">Anna Verdi</option>
//                   <option value="John Doe">John Doe</option>
//                   <option value="Unassigned">Unassigned</option>
//                 </select>
//               </div>
//               <div className="flex justify-between items-center text-sm text-gray-700">
//                 <span>Created</span>
//                 <span className="font-medium">{ticket.lastUpdate} 14:30</span> {/* Using lastUpdate for Created for simplicity */}
//               </div>
//               <div className="flex justify-between items-center text-sm text-gray-700">
//                 <span>Last Update</span>
//                 <span className="font-medium">{ticket.lastUpdate} 15:45</span>
//               </div>
//               <div className="flex justify-between items-center text-sm text-gray-700">
//                 <span>Category</span>
//                 <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 font-medium">
//                   {ticket.category}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetail;















import React, { useState } from 'react';
import type { Ticket, TicketConversation, Message } from './types';
import { Status, Priority } from './types';
import { ArrowLeftIcon, PaperclipIcon, CalendarIcon, SubscriptionIcon } from './Icons';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isSupport = message.role === 'Support';
  return (
    <div className={`flex items-start gap-4 ${isSupport ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full ${isSupport ? 'bg-blue-200' : 'bg-gray-300'}`}></div>
      <div className={`flex flex-col ${isSupport ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 ${isSupport ? 'flex-row-reverse' : ''}`}>
             <p className="font-semibold">{message.sender}</p>
             <span className={`text-xs px-2 py-0.5 rounded-md bg-gray-200 text-gray-600`}>{message.role}</span>
             <p className="text-sm text-gray-500">{message.timestamp}</p>
        </div>
        <div className={`mt-2 p-4 rounded-lg max-w-lg ${isSupport ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.attachment && (
            <div className="mt-3 flex items-center gap-2 text-sm bg-gray-200/20 p-2 rounded-md cursor-pointer hover:bg-gray-200/30">
              <PaperclipIcon className={`${isSupport ? 'text-white' : 'text-gray-500'}`} />
              <span className={`${isSupport ? 'text-white' : 'text-gray-700'}`}>{message.attachment}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


interface TicketDetailProps {
  ticket: Ticket;
  conversation: TicketConversation;
  onBack: () => void;
  onUpdateTicket: (ticket: Ticket) => void;
  onAddMessage: (ticketId: string, content: string) => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, conversation, onBack, onUpdateTicket, onAddMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const ASSIGNEES = ['Anna Verdi', 'Luca Moretti', 'Unassigned'];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onAddMessage(ticket.id, newMessage.trim());
      setNewMessage('');
    }
  };
  
  const handleTicketChange = (field: keyof Ticket, value: any) => {
    onUpdateTicket({ ...ticket, [field]: value });
  };
  
  return (
    <div className="space-y-6">
      <header>
        <button onClick={onBack} className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeftIcon />
          User Management
        </button>
        <div className="flex cursor-pointer flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket {ticket.id}</h1>
            <p className="text-gray-600 mt-1">{ticket.subject}</p>
          </div>
          <button onClick={() => handleTicketChange('status', Status.Resolved)} className="bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700">
            Mark As Resolved
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold">Conversation</h2>
            <p className="text-sm text-gray-500">Messages between user and support team</p>
            <div className="mt-6 space-y-6">
              {conversation.messages.map((msg: Message) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </div>
          </div>
          <form onSubmit={handleSendMessage} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full bg-gray-50 border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-700 placeholder-gray-500"
              rows={3}
              placeholder="Write your message here"
            ></textarea>
            <button type="submit" className="bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={!newMessage.trim()}>
              Send
            </button>
          </form>
        </main>
        
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg">User Information</h3>
            <div className="mt-4 flex items-center gap-4">
              <img src={ticket.user.avatar} alt={ticket.user.name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium">{ticket.user.name}</p>
                <p className="text-sm text-gray-500">{ticket.user.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CalendarIcon />
                <span>Joined: 2023-05-15</span>
              </div>
              <div className="flex items-center gap-2">
                <SubscriptionIcon />
                <span>Subscription: Pro</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-lg">Ticket Details</h3>
            <div className="mt-4 space-y-4 text-sm">
                <div>
                    <label className="text-gray-500">Status</label>
                    <select value={ticket.status} onChange={(e) => handleTicketChange('status', e.target.value as Status)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50">
                        {Object.values(Status).map((s: Status) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-gray-500">Priority</label>
                    <select value={ticket.priority} onChange={(e) => handleTicketChange('priority', e.target.value as Priority)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50">
                        {Object.values(Priority).map((p: Priority) => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-gray-500">Assignee</label>
                    <select value={ticket.assignee} onChange={(e) => handleTicketChange('assignee', e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-50">
                        {ASSIGNEES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                 <div>
                    <p className="text-gray-500">Created</p>
                    <p className="text-gray-800 mt-1 font-medium">{ticket.created}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Last Update</p>
                    <p className="text-gray-800 mt-1 font-medium">2024-09-29 15:45</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Category</p>
                    <p className="text-gray-800 mt-1 font-medium">{ticket.category}</p>
                 </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TicketDetail;