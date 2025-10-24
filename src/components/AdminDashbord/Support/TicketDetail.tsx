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
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeftIcon />
          User Management
        </button>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket {ticket.id}</h1>
            <p className="text-gray-600 mt-1">{ticket.subject}</p>
          </div>
          <button onClick={() => handleTicketChange('status', Status.Resolved)} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700">
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
            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={!newMessage.trim()}>
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