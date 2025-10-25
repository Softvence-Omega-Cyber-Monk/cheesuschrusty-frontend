 


import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter,   Calendar, Star,   Send, ArrowLeft, Paperclip, CheckCircle } from 'lucide-react';

// --- INTERFACES ---

interface Message {
  sender: string;
  role: 'User' | 'Support';
  time: string;
  message: string;
  attachment?: string;
}

interface Ticket {
  id: string;
  subject: string;
  responses: number;
  user: string;
  email: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'In Progress' | 'Resolved' | 'Open';
  lastUpdate: string;
  // Detail page specific properties
  status?: string;
  joined?: string;
  subscription?: string;
  created?: string;
  lastUpdateTime?: string;
  categoryDetail?: string;
  assignee?: string;
  conversation?: Message[];
  
}

interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  views: number;
  lastEdited: string;
  author: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  ticketsResolved: number;
  status: 'Online' | 'Offline' | 'Busy';
  avgRating: number;
}

type PageType = 'dashboard' | 'detail';
type TabType = 'allTickets' | 'knowledgeBase' | 'teamManagement';

// --- INITIAL DATA ---
// NOTE: I've corrected the structure of the initialTickets to better match the displayed table data
// by making the first 5 entries reflect the table in image_6ccd06.png



const initialTickets: Ticket[] = [
    { id: 'TICK-001', subject: 'Cannot access Pro features after payment', responses: 3, user: 'Marco Rossi', email: 'marco.rossi@email.com', priority: 'High', category: 'In Progress', lastUpdate: '29/09/2025', 
      status: 'Open', joined: '2023-05-15', subscription: 'Pro', created: '2024-09-29 14:30', lastUpdateTime: '2024-09-29 15:45', categoryDetail: 'Billing', assignee: 'Anna Verdi', 
      conversation: [
        { sender: 'Marco Rossi', role: 'User', time: '2024-09-29 14:30', message: 'Hi, I upgraded to Pro yesterday and made the payment, but I still can\'t access the advanced grammar lessons and unlimited flashcards. My payment was processed successfully according to my bank statement. Can you please help me resolve this issue?', attachment: 'payment-receipt.pdf' },
        { sender: 'Anna Verdi', role: 'Support', time: '2024-09-29 14:45', message: 'Hi Marco, thank you for contacting us. I can see your payment was processed successfully. Let me check your account status and subscription details. I\'ll get back to you within the next hour with a solution.' }
      ]
    },
    // The table shows TICK-001 with 3 responses and Low/Resolved/In Progress/Open categories
    { id: 'TICK-001', subject: 'Cannot access Pro features after payment', responses: 3, user: 'Marco Rossi', email: 'marco.rossi@email.com', priority: 'Low', category: 'In Progress', lastUpdate: '29/09/2025' },
    { id: 'TICK-001', subject: 'Cannot access Pro features after payment', responses: 3, user: 'Marco Rossi', email: 'marco.rossi@email.com', priority: 'Low', category: 'Resolved', lastUpdate: '29/09/2025' },
    { id: 'TICK-001', subject: 'Cannot access Pro features after payment', responses: 3, user: 'Marco Rossi', email: 'marco.rossi@email.com', priority: 'Medium', category: 'In Progress', lastUpdate: '29/09/2025' },
    { id: 'TICK-001', subject: 'Cannot access Pro features after payment', responses: 3, user: 'Marco Rossi', email: 'marco.rossi@email.com', priority: 'Medium', category: 'Open', lastUpdate: '29/09/2025' },
    // Other tickets for data population
    { id: 'TICK-006', subject: 'Flashcard deck is loading incorrectly', responses: 1, user: 'Giulia Bianchi', email: 'giulia.bianchi@email.com', priority: 'Medium', category: 'Open', lastUpdate: '30/09/2025' },
    { id: 'TICK-007', subject: 'Request for a new feature: verb conjugation practice', responses: 0, user: 'Luca Esposito', email: 'luca.esposito@email.com', priority: 'Low', category: 'Resolved', lastUpdate: '01/10/2025' },
    { id: 'TICK-008', subject: 'Mobile app crashing on Android 14', responses: 4, user: 'Sofia Ricci', email: 'sofia.ricci@email.com', priority: 'High', category: 'In Progress', lastUpdate: '01/10/2025' },
    { id: 'TICK-009', subject: 'Question about annual subscription renewal', responses: 2, user: 'Davide Gallo', email: 'davide.gallo@email.com', priority: 'Medium', category: 'Open', lastUpdate: '02/10/2025' }
];

const initialKnowledgeArticles: KnowledgeArticle[] = [
    { id: 'KB-01', title: 'Troubleshooting Payment & Access Issues', category: 'Billing', views: 1205, lastEdited: '2025-09-15', author: 'Anna Verdi' },
    { id: 'KB-02', title: 'How to Use the Advanced Grammar Lessons', category: 'Features', views: 890, lastEdited: '2025-09-28', author: 'Marco Gialli' },
    { id: 'KB-03', title: 'Guide to Importing Custom Flashcards', category: 'Flashcards', views: 540, lastEdited: '2025-10-01', author: 'Giulia Bianchi' },
];

const teamMembers: TeamMember[] = [
    { id: 'TM-01', name: 'Anna Verdi', role: 'Senior Agent', email: 'anna.v@corp.com', ticketsResolved: 154, status: 'Online', avgRating: 4.8 },
    { id: 'TM-02', name: 'Marco Gialli', role: 'Billing Specialist', email: 'marco.g@corp.com', ticketsResolved: 82, status: 'Busy', avgRating: 4.5 },
    { id: 'TM-03', name: 'Sofia Ricci', role: 'Technical Support', email: 'sofia.r@corp.com', ticketsResolved: 110, status: 'Online', avgRating: 4.7 },
];


// --- UTILITY COMPONENTS ---

const PriorityTag: React.FC<{ priority: string }> = ({ priority }) => {
    let colorClass;
    switch (priority) {
        case 'High': colorClass = 'bg-red-500'; break;
        case 'Medium': colorClass = 'bg-orange-400'; break;
        case 'Low': colorClass = 'bg-teal-500'; break;
        default: colorClass = 'bg-gray-400'; break;
    }
    return (
        <span className={`${colorClass} text-white px-3 py-1 rounded-full text-xs font-medium`}>
            {priority}
        </span>
    );
};

const CategoryTag: React.FC<{ category: string }> = ({ category }) => {
    let colorClass;
    switch (category) {
        case 'In Progress': colorClass = 'text-blue-600 bg-blue-100/70'; break;
        case 'Resolved': colorClass = 'text-green-600 bg-green-100/70'; break;
        case 'Open': colorClass = 'text-pink-600 bg-pink-100/70'; break;
        default: colorClass = 'text-gray-600 bg-gray-100/70'; break;
    }
    return (
        <span className={`${colorClass} px-3 py-1 rounded-full text-xs font-medium`}>
            {category}
        </span>
    );
};

// --- MAIN COMPONENT ---

const SupportDashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(initialTickets[0]); // Default to TICK-001 for detail view
    const [messageInput, setMessageInput] = useState<string>('');
    const [activeTab, setActiveTab] = useState<TabType>('allTickets');
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [knowledgeArticles,  ] = useState<KnowledgeArticle[]>(initialKnowledgeArticles);

    // --- Helper Functions ---

    const handleViewTicket = (ticket: Ticket): void => {
        setSelectedTicket(ticket);
        setCurrentPage('detail');
    };

    const handleBackToDashboard = (): void => {
        setCurrentPage('dashboard');
        setSelectedTicket(null);
        setMessageInput('');
    };

    // const handleCreateNewTicket = (): void => {
    //     const newTicketId = `TICK-${(tickets.length + 1).toString().padStart(3, '0')}`;
    //     const currentTime = new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
    //     const currentDate = new Date().toLocaleDateString('en-GB');

    //     const newTicket: Ticket = {
    //         id: newTicketId,
    //         subject: 'New manually created ticket',
    //         responses: 0,
    //         user: 'System Agent',
    //         email: 'agent.create@corp.com',
    //         priority: 'Medium',
    //         category: 'Open',
    //         lastUpdate: currentDate,
    //         status: 'Open',
    //         joined: new Date().toLocaleDateString('en-US'),
    //         subscription: 'Basic',
    //         created: currentTime,
    //         lastUpdateTime: currentTime,
    //         categoryDetail: 'General',
    //         assignee: 'Unassigned',
    //         conversation: [
    //             {
    //                 sender: 'System Agent',
    //                 role: 'Support',
    //                 time: new Date().toTimeString().substring(0, 5),
    //                 message: `Ticket ${newTicketId} created manually. Awaiting user details.`,
    //             }
    //         ]
    //     };

    //     // Add the new ticket to the state and automatically view it
    //     setTickets(prevTickets => [newTicket, ...prevTickets]);
    //     handleViewTicket(newTicket);
    // };

    const handleSendMessage = (): void => {
        if (messageInput.trim() === '' || !selectedTicket) return;

        const now = new Date();
        const newMessage: Message = {
            sender: selectedTicket.assignee || 'Support Agent',
            role: 'Support',
            time: now.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
            message: messageInput.trim(),
        };

        const updatedTickets = tickets.map(t => 
            t.id === selectedTicket.id && t.lastUpdate === selectedTicket.lastUpdate // Use a more robust check for the row/ticket instance
                ? {
                    ...t,
                    conversation: [...(t.conversation || []), newMessage],
                    responses: (t.responses || 0) + 1,
                    lastUpdate: now.toLocaleDateString('en-GB'),
                    lastUpdateTime: now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                  }
                : t
        );

        setTickets(updatedTickets);
        // Find the newly updated ticket to keep the detail view in sync
        const updatedSelectedTicket = updatedTickets.find(t => 
            t.id === selectedTicket.id && 
            t.lastUpdate !== selectedTicket.lastUpdate // Assuming only the most recent one changed
        ) || selectedTicket; 
        
        setSelectedTicket(updatedSelectedTicket);
        setMessageInput('');
    };

  
    const handleMarkAsResolved = (): void => {
    if (!selectedTicket) return;

    const updatedTickets = tickets.map(t =>
        t.id === selectedTicket.id && t.lastUpdate === selectedTicket.lastUpdate
            ? ({
                  ...t,
                  status: 'Resolved', // Assuming 'Resolved' is a valid status string
                  category: 'Resolved', // Assuming 'Resolved' is a valid category string
              } as Ticket) // <-- Type Assertion added here
            : t
    );
    setTickets(updatedTickets);
    setSelectedTicket(prev => prev ? { ...prev, status: 'Resolved', category: 'Resolved' } : null);
};
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Online': return 'bg-green-500';
            case 'Busy': return 'bg-orange-500';
            case 'Offline': return 'bg-gray-500';
            default: return 'bg-gray-400';
        }
    };


    // --- Tab Content Rendering ---

    const renderActiveTabContent = () => {
        switch (activeTab) {
            case 'allTickets':
                return (
                    // Tickets Table
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Ticket ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Update</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tickets.map((ticket: Ticket, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewTicket(ticket)}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                                            <div className="text-xs text-gray-500">{ticket.responses} replies</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{ticket.user}</div>
                                            <div className="text-xs text-gray-500">{ticket.email}</div>
                                        </td>
                                        <td className="px-6 py-4"><PriorityTag priority={ticket.priority} /></td>
                                        <td className="px-6 py-4"><CategoryTag category={ticket.category} /></td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{ticket.lastUpdate}</td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleViewTicket(ticket); }}
                                                className="text-sm text-blue-600 underline hover:text-blue-800 transition font-medium"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'knowledgeBase':
                return (
                    // Knowledge Base Table (Simplified for space)
                    <div className="overflow-x-auto">
                         <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Views</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Edited</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Author</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {knowledgeArticles.map((article: KnowledgeArticle, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-purple-600 bg-purple-100/70 px-3 py-1 rounded-full text-xs font-medium">
                                                {article.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{article.views.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{article.lastEdited}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{article.author}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case 'teamManagement':
                return (
                    // Team Management Table (Simplified for space)
                    <div className="overflow-x-auto">
                         <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Member</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Tickets Resolved</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Avg. Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {teamMembers.map((member: TeamMember, index: number) => (
                                    <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                            <div className="text-xs text-gray-500">{member.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{member.role}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{member.ticketsResolved}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-1">
                                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                            {member.avgRating.toFixed(1)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`h-2 w-2 rounded-full inline-block mr-2 ${getStatusColor(member.status)}`}></span>
                                            <span className="text-sm text-gray-900">{member.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            default:
                return null;
        }
    };


    // --- DASHBOARD PAGE RENDER ---
    if (currentPage === 'dashboard') {
        return (
            <div className="min-h-screen   font-sans">
                {/* Header */}
                <div className="  px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your platform today.</p>
                        </div>
                        {/* The image shows an 'Add New Plan' button in the header */}
                        <button 
                            // Using handleCreateNewArticle to represent "Add New Plan" / "New Article" for demonstration
                            
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium"
                        >
                            <Plus size={18} />
                            Add New Plan
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="px-8 py-6">
                    <div className="grid grid-cols-5 gap-4">
                        {/* Stat Cards */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-md text-gray-600 mb-1">Total Tickets</p>
                            <p className="text-4xl font-semibold">{tickets.length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-md text-gray-600 mb-1">Open Tickets</p>
                            <p className="text-4xl font-semibold">{tickets.filter(t => t.category === 'Open' || t.category === 'In Progress').length}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-md text-gray-600 mb-1">Resolved Today</p>
                            <p className="text-4xl font-semibold">8</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-md text-gray-600 mb-1">Avg Response Time</p>
                            <p className="text-4xl font-semibold">2.4 Hours</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <p className="text-md text-gray-600 mb-1">Satisfaction</p>
                            <p className="text-4xl font-semibold">4.6/5</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="px-8 pb-8">
                    <div className="  rounded-xl ">
                        {/* Tabs Bar */}
                        <div className="p-4 rounded-t-xl flex justify-between items-center">
                            <div className="flex gap-2  p-2 bg-gray-200 rounded-lg inline-flex">
                                <button
                                    onClick={() => setActiveTab('allTickets')}
                                    className={`px-4 py-2 text-sm font-medium cursor-pointer rounded-md transition ${
                                        activeTab === 'allTickets' ? 'bg-white shadow-md text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    All Tickets
                                </button>
                                <button
                                    onClick={() => setActiveTab('knowledgeBase')}
                                    className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition ${
                                        activeTab === 'knowledgeBase' ? 'bg-white shadow-md text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    Knowledge Base
                                </button>
                                <button
                                    onClick={() => setActiveTab('teamManagement')}
                                    className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-md transition ${
                                        activeTab === 'teamManagement' ? 'bg-white shadow-md text-gray-800' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    Team Management
                                </button>
                            </div>
                        </div>

                        {/* Flashcard Decks Section (Replicating the visual block from the image) */}
                        <div className="px-6 py-5   flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Flashcard Decks</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your Italian learning flashcard collections</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="border cursor-pointer border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition font-medium">
                                    <Filter size={18} />
                                  <select name="" id=""> Priority</select>
                                  <option value="">high</option>
                                </button>
                                <button 
                                    
                                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium"
                                >
                                    <Plus size={18} />
                                    Create Ticket
                                </button>
                            </div>
                        </div>

                        {/* Dynamic Table Content */}
                        {renderActiveTabContent()}

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t flex justify-between items-center">
                            <p className="text-sm text-gray-600">Showing 1 to 10 of 24 orders</p>
                            <div className="flex gap-1 items-center">
                                <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg border border-gray-200">
                                    <ChevronLeft size={18} className="text-gray-400" />
                                </button>
                                <button className=" cursor-pointer px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md">1</button>
                                <button className=" cursor-pointer px-3 py-1 hover:bg-gray-100 rounded-lg text-sm text-gray-600">2</button>
                                <button className=" cursor-pointer px-3 py-1 hover:bg-gray-100 rounded-lg text-sm text-gray-600">3</button>
                                <button className=" cursor-pointer p-2 hover:bg-gray-100 rounded-lg border border-gray-200">
                                    <ChevronRight size={18} className="text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    // --- TICKET DETAIL PAGE RENDER ---
    if (currentPage === 'detail' && selectedTicket) {
        const ticket = selectedTicket;

        return (
            <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
                {/* Detail Header */}
                <div className="bg-white px-8 py-4 border-b shadow-sm">
                    <div className="flex items-center justify-between">
                        <button onClick={handleBackToDashboard} className="flex  cursor-pointer items-center text-gray-600 hover:text-gray-800 transition font-medium">
                            <ArrowLeft size={20} className="mr-2" />
                            User Management
                        </button>
                        <button 
                            onClick={handleMarkAsResolved}
                            className={`bg-blue-600 text-white  cursor-pointer px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium ${ticket.status === 'Resolved' ? 'opacity-50 cursor-not-allowed bg-green-600' : ''}`}
                            disabled={ticket.status === 'Resolved'}
                        >
                            {ticket.status === 'Resolved' ? <CheckCircle size={18} /> : null}
                            {ticket.status === 'Resolved' ? 'Resolved' : 'Mark As Resolved'}
                        </button>
                    </div>
                </div>

                {/* Ticket Title */}
                <div className="px-8 py-4 bg-white border-b">
                    <h1 className="text-2xl font-semibold text-gray-900">Ticket {ticket.id}</h1>
                    <p className="text-lg text-gray-700 mt-1">{ticket.subject}</p>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="flex h-full gap-8">
                        
                        {/* Conversation Panel (Left) */}
                        <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col min-h-full">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">Conversation</h2>
                                <p className="text-sm text-gray-500">Messages between user and support team</p>
                            </div>
                            
                            {/* Messages */}
                            <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[600px] min-h-[300px]">
                                {(ticket.conversation || []).map((msg, index) => (
                                    <div key={index} className={`flex ${msg.role === 'User' ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`flex items-start max-w-xl ${msg.role === 'User' ? 'flex-row' : 'flex-row-reverse'}`}>
                                            <div className={`h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-sm font-bold text-gray-600 ${msg.role === 'User' ? 'mr-3' : 'ml-3'}`}>
                                                {msg.sender.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex flex-col">
                                                <div className={`text-xs text-gray-500 mb-1 ${msg.role === 'User' ? 'text-left' : 'text-right'}`}>
                                                    <span className="font-semibold text-gray-800">{msg.sender}</span> · {msg.role} · {msg.time.substring(msg.time.lastIndexOf(' ') + 1)}
                                                </div>
                                                <div className={`p-4 rounded-xl shadow-sm ${msg.role === 'User' ? 'bg-gray-100 text-gray-800 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                                                    <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                                                    {msg.attachment && (
                                                        <a href="#" className={`flex items-center mt-2 text-xs font-medium underline ${msg.role === 'User' ? 'text-blue-600' : 'text-blue-200'}`}>
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
                            <div className="p-6 border-t bg-gray-50">
                                <div className="relative">
                                    <textarea
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        placeholder="Write your message here"
                                        rows={3}
                                        className="w-full p-3 pr-16 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="absolute bottom-3 right-3 cursor-pointer bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:bg-gray-400"
                                        disabled={messageInput.trim() === ''}
                                        aria-label="Send message"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Right) */}
                        <div className="w-80 space-y-6">
                            
                            {/* User Information */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">User Information</h2>
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600 font-bold text-lg">
                                        {ticket.user[0]}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{ticket.user}</p>
                                        <p className="text-sm text-gray-500">{ticket.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <p className="flex items-center"><Calendar size={16} className="mr-2 text-gray-400" /> **Joined:** {ticket.joined || 'N/A'}</p>
                                    <p className="flex items-center"><Star size={16} className="mr-2 text-gray-400" /> **Subscription:** <span className="font-medium ml-1 text-green-600">{ticket.subscription || 'Basic'}</span></p>
                                </div>
                            </div>

                            {/* Ticket Details */}
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-4">Ticket Details</h2>
                                <div className="space-y-3 text-sm text-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Status</span>
                                        <CategoryTag category={ticket.status || 'N/A'} />
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Priority</span>
                                        <PriorityTag priority={ticket.priority} />
                                    </div>
                                    <p className="flex justify-between items-center">
                                        <span className="text-gray-500">Assignee</span>
                                        <span className="font-medium">{ticket.assignee || 'Unassigned'}</span>
                                    </p>
                                    <p className="flex justify-between items-center">
                                        <span className="text-gray-500">Created</span>
                                        <span className="font-medium">{ticket.created || 'N/A'}</span>
                                    </p>
                                    <p className="flex justify-between items-center">
                                        <span className="text-gray-500">Last Update</span>
                                        <span className="font-medium">{ticket.lastUpdateTime || 'N/A'}</span>
                                    </p>
                                    <p className="flex justify-between items-center">
                                        <span className="text-gray-500">Category</span>
                                        <span className="font-medium">{ticket.categoryDetail || 'N/A'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 text-center">
            Loading Dashboard...
        </div>
    );
};

export default SupportDashboard;

















// import React, { useState } from "react";
// import { Ticket, TeamMember, KnowledgeArticle } from "./types";
// import TicketsTable from "./TicketsTable";
// import KnowledgeBaseTable from "./KnowledgeBaseTable";
// import TeamTable from "./TeamTable";
// import TicketDetail from "./TicketDetail";

// const SupportDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"tickets" | "knowledge" | "team">("tickets");
//   const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
//   const [messageInput, setMessageInput] = useState("");

//   const tickets: Ticket[] = [
//     { id: "T123", subject: "Login issue", user: "John Doe", email: "john@example.com", priority: "High", category: "Technical", lastUpdate: "2025-10-21", responses: 3, status: "Open", created: "2025-10-20", assignedTo: "Alice" }
//   ];

//   const articles: KnowledgeArticle[] = [
//     { id: "A1", title: "How to reset password", category: "Account", lastUpdate: "2025-09-12", views: 420 }
//   ];

//   const teamMembers: TeamMember[] = [
//     { id: "1", name: "Alice", role: "Support Agent", online: true },
//     { id: "2", name: "Bob", role: "Tech Lead", online: false }
//   ];

//   const onSendMessage = (msg: string) => {
//     console.log("Sent:", msg);
//     setMessageInput("");
//   };

//   if (selectedTicket)
//     return (
//       <TicketDetail
//         ticket={selectedTicket}
//         onBack={() => setSelectedTicket(null)}
//         onSendMessage={onSendMessage}
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         teamMembers={teamMembers}
//       />
//     );

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Support Dashboard</h1>

//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveTab("tickets")}
//           className={`px-4 py-2 rounded-lg ${activeTab === "tickets" ? "bg-blue-600 text-white" : "bg-white border"}`}
//         >
//           Tickets
//         </button>
//         <button
//           onClick={() => setActiveTab("knowledge")}
//           className={`px-4 py-2 rounded-lg ${activeTab === "knowledge" ? "bg-blue-600 text-white" : "bg-white border"}`}
//         >
//           Knowledge Base
//         </button>
//         <button
//           onClick={() => setActiveTab("team")}
//           className={`px-4 py-2 rounded-lg ${activeTab === "team" ? "bg-blue-600 text-white" : "bg-white border"}`}
//         >
//           Team
//         </button>
//       </div>

//       {activeTab === "tickets" && <TicketsTable tickets={tickets} onViewTicket={setSelectedTicket} />}
//       {activeTab === "knowledge" && <KnowledgeBaseTable articles={articles} />}
//       {activeTab === "team" && <TeamTable teamMembers={teamMembers} />}
//     </div>
//   );
// };

// export default SupportDashboard;















//  import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Plus, Filter, User, BookOpen, Clock, Mail, Calendar, Star, FileText, Send, ArrowLeft } from 'lucide-react';

// interface Message {
//   sender: string;
//   role: 'User' | 'Support';
//   time: string;
//   message: string;
//   attachment?: string;
// }

// interface Ticket {
//   id: string;
//   subject: string;
//   responses: number;
//   user: string;
//   email: string;
//   priority: 'High' | 'Medium' | 'Low';
//   category: 'In Progress' | 'Resolved' | 'Open';
//   lastUpdate: string;
//   status?: string;
//   joined?: string;
//   subscription?: string;
//   created?: string;
//   lastUpdateTime?: string;
//   categoryDetail?: string;
//   assignee?: string;
//   conversation?: Message[];
// }

// interface KnowledgeArticle {
//   id: string;
//   title: string;
//   category: string;
//   views: number;
//   lastEdited: string;
//   author: string;
// }

// interface TeamMember {
//   id: string;
//   name: string;
//   role: string;
//   email: string;
//   ticketsResolved: number;
//   status: 'Online' | 'Offline' | 'Busy';
//   avgRating: number;
// }

// type PageType = 'dashboard' | 'detail';
// type TabType = 'allTickets' | 'knowledgeBase' | 'teamManagement';


// const initialTickets: Ticket[] = [
//     {
//       id: 'TICK-001',
//       subject: 'Cannot access Pro features after payment',
//       responses: 3,
//       user: 'Marco Rossi',
//       email: 'marco.rossi@email.com',
//       priority: 'High',
//       category: 'In Progress',
//       lastUpdate: '29/09/2025',
//       status: 'Open',
//       joined: '2023-05-15',
//       subscription: 'Pro',
//       created: '2024-09-29 14:30',
//       lastUpdateTime: '2024-09-29 15:45',
//       categoryDetail: 'Billing',
//       assignee: 'Anna Verdi',
//       conversation: [
//         {
//           sender: 'Marco Rossi',
//           role: 'User',
//           time: '2024-09-29 14:30',
//           message: 'Hi, I upgraded to Pro yesterday and made the payment, but I still can\'t access the advanced grammar lessons and unlimited flashcards. My payment was processed successfully according to my bank statement. Can you please help me resolve this issue?',
//           attachment: 'payment-receipt.pdf'
//         },
//         {
//           sender: 'Anna Verdi',
//           role: 'Support',
//           time: '2024-09-29 14:45',
//           message: 'Hi Marco, thank you for contacting us. I can see your payment was processed successfully. Let me check your account status and subscription details. I\'ll get back to you within the next hour with a solution.'
//         }
//       ]
//     },
//     {
//       id: 'TICK-002',
//       subject: 'Flashcard deck is loading incorrectly',
//       responses: 1,
//       user: 'Giulia Bianchi',
//       email: 'giulia.bianchi@email.com',
//       priority: 'Medium',
//       category: 'Open',
//       lastUpdate: '30/09/2025',
//       status: 'Open',
//       conversation: [
//         {
//           sender: 'Giulia Bianchi',
//           role: 'User',
//           time: '2024-09-30 09:00',
//           message: 'When I try to open my custom flashcard deck, it just shows a loading spinner forever. I tried clearing my cache but it did not help.',
//         }
//       ]
//     },
//     {
//       id: 'TICK-003',
//       subject: 'Request for a new feature: verb conjugation practice',
//       responses: 0,
//       user: 'Luca Esposito',
//       email: 'luca.esposito@email.com',
//       priority: 'Low',
//       category: 'Resolved',
//       lastUpdate: '01/10/2025',
//       status: 'Resolved',
//       conversation: []
//     },
//     {
//       id: 'TICK-004',
//       subject: 'Mobile app crashing on Android 14',
//       responses: 4,
//       user: 'Sofia Ricci',
//       email: 'sofia.ricci@email.com',
//       priority: 'High',
//       category: 'In Progress',
//       lastUpdate: '01/10/2025',
//       status: 'In Progress',
//       conversation: [
//         {
//             sender: 'Sofia Ricci',
//             role: 'User',
//             time: '2024-10-01 10:00',
//             message: 'The mobile app crashes every time I open the settings menu on my Samsung device with Android 14. I cant update my profile because of this.'
//         },
//         {
//             sender: 'Marco Gialli',
//             role: 'Support',
//             time: '2024-10-01 11:30',
//             message: 'Thank you for reporting this critical bug. We are aware of an issue affecting Android 14 users and our dev team is actively working on a hotfix. We will notify you as soon as the update is available.'
//         }
//       ]
//     },
//     {
//       id: 'TICK-005',
//       subject: 'Question about annual subscription renewal',
//       responses: 2,
//       user: 'Davide Gallo',
//       email: 'davide.gallo@email.com',
//       priority: 'Medium',
//       category: 'Open',
//       lastUpdate: '02/10/2025',
//       status: 'Open',
//       conversation: []
//     }
// ];

// const initialKnowledgeArticles: KnowledgeArticle[] = [
//     { id: 'KB-01', title: 'Troubleshooting Payment & Access Issues', category: 'Billing', views: 1205, lastEdited: '2025-09-15', author: 'Anna Verdi' },
//     { id: 'KB-02', title: 'How to Use the Advanced Grammar Lessons', category: 'Features', views: 890, lastEdited: '2025-09-28', author: 'Marco Gialli' },
//     { id: 'KB-03', title: 'Guide to Importing Custom Flashcards', category: 'Flashcards', views: 540, lastEdited: '2025-10-01', author: 'Giulia Bianchi' },
//     { id: 'KB-04', title: 'Supported Devices and System Requirements', category: 'Technical', views: 320, lastEdited: '2025-09-10', author: 'Luca Esposito' },
// ];

// const teamMembers: TeamMember[] = [
//     { id: 'TM-01', name: 'Anna Verdi', role: 'Senior Agent', email: 'anna.v@corp.com', ticketsResolved: 154, status: 'Online', avgRating: 4.8 },
//     { id: 'TM-02', name: 'Marco Gialli', role: 'Billing Specialist', email: 'marco.g@corp.com', ticketsResolved: 82, status: 'Busy', avgRating: 4.5 },
//     { id: 'TM-03', name: 'Sofia Ricci', role: 'Technical Support', email: 'sofia.r@corp.com', ticketsResolved: 110, status: 'Online', avgRating: 4.7 },
//     { id: 'TM-04', name: 'Davide Gallo', role: 'Support Agent', email: 'davide.g@corp.com', ticketsResolved: 65, status: 'Offline', avgRating: 4.3 },
// ];

// const SupportDashbord: React.FC = () => {
//     const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
//     const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
//     const [messageInput, setMessageInput] = useState<string>('');
//     const [activeTab, setActiveTab] = useState<TabType>('allTickets');
    
//     // Use useState for data that can be modified (new tickets/articles)
//     const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
//     const [knowledgeArticles, setKnowledgeArticles] = useState<KnowledgeArticle[]>(initialKnowledgeArticles);


//     // --- Creation Handlers ---

//     const handleCreateNewTicket = (): void => {
//         const newTicketId = `TICK-${(tickets.length + 1).toString().padStart(3, '0')}`;
//         const currentDate = new Date().toLocaleDateString('en-GB');

//         const newTicket: Ticket = {
//             id: newTicketId,
//             subject: 'New manually created ticket',
//             responses: 0,
//             user: 'System Agent',
//             email: 'agent.create@corp.com',
//             priority: 'Medium',
//             category: 'Open',
//             lastUpdate: currentDate,
//             status: 'Open',
//             created: new Date().toLocaleString(),
//             conversation: [
//                 {
//                     sender: 'System Agent',
//                     role: 'Support',
//                     time: new Date().toTimeString().substring(0, 5),
//                     message: `Ticket ${newTicketId} created manually. Awaiting user details.`,
//                 }
//             ]
//         };

//         // Add the new ticket to the state and automatically view it
//         setTickets(prevTickets => [newTicket, ...prevTickets]);
//         handleViewTicket(newTicket);
//         console.log(`Created new ticket: ${newTicket.id}`);
//     };

//     const handleCreateNewArticle = (): void => {
//         const newArticleId = `KB-${(knowledgeArticles.length + 1).toString().padStart(2, '0')}`;
//         const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

//         const newArticle: KnowledgeArticle = {
//             id: newArticleId,
//             title: 'Draft: New Knowledge Base Topic',
//             category: 'Draft',
//             views: 0,
//             lastEdited: currentDate,
//             author: 'Anna Verdi', // Default author
//         };

//         // Add the new article to the state
//         setKnowledgeArticles(prevArticles => [newArticle, ...prevArticles]);
//         setActiveTab('knowledgeBase'); // Stay on the Knowledge Base tab
//         console.log(`Created new knowledge article: ${newArticle.id}`);
//     };


//     // --- General Helper Functions ---

//     const handleViewTicket = (ticket: Ticket): void => {
//         setSelectedTicket(ticket);
//         setCurrentPage('detail');
//     };

//     const handleBackToDashboard = (): void => {
//         setCurrentPage('dashboard');
//         setSelectedTicket(null);
//         setMessageInput('');
//     };

//     const handleSendMessage = (): void => {
//         if (messageInput.trim() === '' || !selectedTicket) return;

//         const newMessage: Message = {
//             sender: selectedTicket.assignee || 'Support Agent',
//             role: 'Support',
//             time: new Date().toISOString().substring(0, 16).replace('T', ' '),
//             message: messageInput.trim(),
//         };

//         // Find the index of the selected ticket
//         const ticketIndex = tickets.findIndex(t => t.id === selectedTicket.id);

//         if (ticketIndex !== -1) {
//             const updatedTickets = [...tickets];
//             const updatedConversation = [...(selectedTicket.conversation || []), newMessage];

//             // Update the ticket in the main state array
//             updatedTickets[ticketIndex] = {
//                 ...selectedTicket,
//                 conversation: updatedConversation,
//                 responses: (selectedTicket.responses || 0) + 1,
//                 lastUpdate: new Date().toLocaleDateString('en-GB') 
//             };

//             setTickets(updatedTickets);
//             setSelectedTicket(updatedTickets[ticketIndex]); // Update selected ticket for immediate detail view refresh
//         }

//         setMessageInput('');
//     };


//     const getPriorityColor = (priority: string): string => {
//         switch (priority) {
//             case 'High': return 'bg-red-500';
//             case 'Medium': return 'bg-orange-400';
//             case 'Low': return 'bg-teal-500';
//             default: return 'bg-gray-400';
//         }
//     };

//     const getCategoryColor = (category: string): string => {
//         switch (category) {
//             case 'In Progress': return 'text-blue-600 bg-blue-50';
//             case 'Resolved': return 'text-green-600 bg-green-50';
//             case 'Open': return 'text-pink-600 bg-pink-50';
//             default: return 'text-gray-600 bg-gray-50';
//         }
//     };

//     const getStatusColor = (status: string): string => {
//         switch (status) {
//             case 'Online': return 'bg-green-500';
//             case 'Busy': return 'bg-orange-500';
//             case 'Offline': return 'bg-gray-500';
//             default: return 'bg-gray-400';
//         }
//     };

//     // --- Tab Content Rendering ---

//     const renderActiveTabContent = () => {
//         switch (activeTab) {
//             case 'allTickets':
//                 return (
//                     // Tickets Table
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 border-b">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Ticket ID</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Subject</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">User</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Update</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y">
//                                 {tickets.map((ticket: Ticket, index: number) => (
//                                     <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewTicket(ticket)}>
//                                         <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.id}</td>
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
//                                             <div className="text-xs text-gray-500">{ticket.responses} responses</div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm text-gray-900">{ticket.user}</div>
//                                             <div className="text-xs text-gray-500">{ticket.email}</div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <span className={`${getPriorityColor(ticket.priority)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
//                                                 {ticket.priority}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <span className={`${getCategoryColor(ticket.category)} px-3 py-1 rounded-full text-xs font-medium`}>
//                                                 {ticket.category}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 text-sm text-gray-500">{ticket.lastUpdate}</td>
//                                         <td className="px-6 py-4">
//                                             <button 
//                                                 onClick={(e) => { e.stopPropagation(); handleViewTicket(ticket); }}
//                                                 className="text-sm text-gray-900 underline hover:text-blue-600 transition"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 );

//             case 'knowledgeBase':
//                 return (
//                     // Knowledge Base Table
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 border-b">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Views</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Edited</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Author</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y">
//                                 {knowledgeArticles.map((article: KnowledgeArticle, index: number) => (
//                                     <tr key={index} className="hover:bg-gray-50 cursor-pointer">
//                                         <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.id}</td>
//                                         <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
//                                         <td className="px-6 py-4">
//                                             <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-medium">
//                                                 {article.category}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 text-sm text-gray-500">{article.views.toLocaleString()}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-500">{article.lastEdited}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-900">{article.author}</td>
//                                         <td className="px-6 py-4">
//                                             <button className="text-sm text-gray-900 underline hover:text-blue-600 transition">
//                                                 Edit
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 );

//             case 'teamManagement':
//                 return (
//                     // Team Management Table
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead className="bg-gray-50 border-b">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Member</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Tickets Resolved</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Avg. Rating</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y">
//                                 {teamMembers.map((member: TeamMember, index: number) => (
//                                     <tr key={index} className="hover:bg-gray-50 cursor-pointer">
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm font-medium text-gray-900">{member.name}</div>
//                                             <div className="text-xs text-gray-500">{member.email}</div>
//                                         </td>
//                                         <td className="px-6 py-4 text-sm text-gray-900">{member.role}</td>
//                                         <td className="px-6 py-4 text-sm text-gray-500">{member.ticketsResolved}</td>
//                                         <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-1">
//                                             <Star size={14} className="text-yellow-400 fill-yellow-400" />
//                                             {member.avgRating.toFixed(1)}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <span className={`h-2 w-2 rounded-full inline-block mr-2 ${getStatusColor(member.status)}`}></span>
//                                             <span className="text-sm text-gray-900">{member.status}</span>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <button className="text-sm text-gray-900 underline hover:text-blue-600 transition">
//                                                 Profile
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 );

//             default:
//                 return null;
//         }
//     };

//     // --- Dashboard Page ---
//     if (currentPage === 'dashboard') {
//         return (
//             <div className="min-h-screen bg-gray-50">
//                 {/* Header */}
//                 <div className="bg-white border-b px-8 py-6">
//                     <div className="flex justify-between items-center">
//                         <div>
//                             <h1 className="text-2xl font-semibold text-gray-900">Support Dashboard</h1>
//                             <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your support today.</p>
//                         </div>
//                         {/* **NEW TICKET BUTTON (DASHBOARD HEADER)** */}
//                         <button 
//                             onClick={handleCreateNewTicket} // <--- Added Handler
//                             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
//                         >
//                             <Plus size={18} />
//                             Create New Ticket
//                         </button>
//                     </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="px-8 py-6">
//                     <div className="grid grid-cols-5 gap-4">
//                         <div className="bg-white p-4 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">Total Tickets</p>
//                             <p className="text-3xl font-semibold">{tickets.length}</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">Open Tickets</p>
//                             <p className="text-3xl font-semibold">{tickets.filter(t => t.category === 'Open' || t.category === 'In Progress').length}</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">Resolved Today</p>
//                             <p className="text-3xl font-semibold">8</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">Avg Response Time</p>
//                             <p className="text-3xl font-semibold">2.4 Hours</p>
//                         </div>
//                         <div className="bg-white p-4 rounded-lg">
//                             <p className="text-xs text-gray-500 mb-1">Satisfaction</p>
//                             <p className="text-3xl font-semibold">4.6/5</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="px-8">
//                     <div className="flex gap-1 bg-gray-100 p-1 rounded-lg inline-flex">
//                         <button
//                             onClick={() => setActiveTab('allTickets')}
//                             className={`px-4 py-2 text-sm font-medium rounded-md transition ${
//                                 activeTab === 'allTickets' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-white'
//                             }`}
//                         >
//                             All Tickets
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('knowledgeBase')}
//                             className={`px-4 py-2 text-sm font-medium rounded-md transition ${
//                                 activeTab === 'knowledgeBase' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-white'
//                             }`}
//                         >
//                             Knowledge Base
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('teamManagement')}
//                             className={`px-4 py-2 text-sm font-medium rounded-md transition ${
//                                 activeTab === 'teamManagement' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:bg-white'
//                             }`}
//                         >
//                             Team Management
//                         </button>
//                     </div>
//                 </div>

//                 {/* Dynamic Section */}
//                 <div className="px-8 py-6">
//                     <div className="bg-white rounded-lg shadow-sm">
//                         <div className="p-6 border-b">
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <h2 className="text-lg font-semibold text-gray-900">
//                                         {activeTab === 'allTickets' && 'Open & In-Progress Tickets'}
//                                         {activeTab === 'knowledgeBase' && 'Managed Articles'}
//                                         {activeTab === 'teamManagement' && 'Support Team Overview'}
//                                     </h2>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         {activeTab === 'allTickets' && 'View and manage all customer support requests.'}
//                                         {activeTab === 'knowledgeBase' && 'Manage your self-service knowledge articles.'}
//                                         {activeTab === 'teamManagement' && 'Monitor agent performance and status.'}
//                                     </p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     {activeTab !== 'teamManagement' && (
//                                         <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition">
//                                             <Filter size={18} />
//                                             Filter
//                                         </button>
//                                     )}
//                                     {activeTab === 'allTickets' && (
//                                         <button 
//                                             onClick={handleCreateNewTicket} // <--- Added Handler
//                                             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
//                                         >
//                                             <Plus size={18} />
//                                             Create Ticket
//                                         </button>
//                                     )}
//                                     {activeTab === 'knowledgeBase' && (
//                                         <button 
//                                             onClick={handleCreateNewArticle} // <--- Added Handler (for 'new plane'/article)
//                                             className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
//                                         >
//                                             <Plus size={18} />
//                                             New Article
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Table/Content for the active tab */}
//                         {renderActiveTabContent()}

//                         {/* Pagination (Only for allTickets - simplified for other tabs for brevity) */}
//                         {activeTab === 'allTickets' && (
//                             <div className="px-6 py-4 border-t flex justify-between items-center">
//                                 <p className="text-sm text-gray-600">Showing 1 to {tickets.length} of {tickets.length} tickets</p>
//                                 <div className="flex gap-2">
//                                     <button className="p-2 hover:bg-gray-100 rounded">
//                                         <ChevronLeft size={18} className="text-gray-400" />
//                                     </button>
//                                     <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
//                                     <button className="p-2 hover:bg-gray-100 rounded">
//                                         <ChevronRight size={18} className="text-gray-600" />
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
                        
//                         {activeTab !== 'allTickets' && (
//                             <div className="px-6 py-4 border-t">
//                                 <p className="text-sm text-gray-600">Showing {activeTab === 'knowledgeBase' ? knowledgeArticles.length : teamMembers.length} records</p>
//                             </div>
//                         )}

//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // --- Detail Page ---
//     if (!selectedTicket) return null;

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="bg-white border-b px-8 py-4 sticky top-0 z-10">
//                 <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//                     <button onClick={handleBackToDashboard} className="hover:text-gray-700 flex items-center gap-1">
//                         <ArrowLeft size={16} className="text-gray-500"/>
//                         Tickets
//                     </button>
//                     <ChevronRight size={16} />
//                     <span className="text-gray-900">Ticket {selectedTicket.id}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                     <div>
//                         <h1 className="text-2xl font-semibold text-gray-900">Ticket {selectedTicket.id}</h1>
//                         <p className="text-sm text-gray-500 mt-1">{selectedTicket.subject}</p>
//                     </div>
//                     <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
//                         Mark As Resolved
//                     </button>
//                 </div>
//             </div>

//             <div className="px-8 py-6">
//                 <div className="grid grid-cols-3 gap-6">
//                     {/* Conversation (Fixed and Uncommented) */}
//                     <div className="col-span-2 bg-white rounded-lg shadow-sm flex flex-col">
//                         <div className="p-6 border-b">
//                             <h2 className="text-lg font-semibold text-gray-900">Conversation</h2>
//                             <p className="text-sm text-gray-500 mt-1">Messages between user and support team</p>
//                         </div>
                        
//                         {/* Conversation Messages */}
//                         <div className="p-6 space-y-6 max-h-[calc(100vh-320px)] overflow-y-auto flex-grow">
//                             {selectedTicket.conversation && selectedTicket.conversation.length > 0 ? (
//                                 selectedTicket.conversation.map((msg: Message, idx: number) => (
//                                     <div key={idx} className={`flex ${msg.role === 'Support' ? 'justify-end' : 'justify-start'}`}>
//                                         <div className={`max-w-[80%] flex flex-col ${msg.role === 'Support' ? 'items-end' : 'items-start'}`}>
//                                             {/* Header with Sender and Time */}
//                                             <div className="flex items-center gap-2 mb-2">
//                                                 {msg.role === 'User' && <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center"><User size={14} className="p-0.5 text-gray-600" /></div>}
//                                                 <span className="font-medium text-xs text-gray-700">{msg.sender}</span>
//                                                 <span className="text-xs text-gray-500">({msg.role})</span>
//                                                 <span className="text-xs text-gray-400 ml-2"><Clock size={10} className="inline mr-1"/> {msg.time.split(' ')[1]}</span>
//                                                 {msg.role === 'Support' && <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><Mail size={14} className="p-0.5 text-white" /></div>}
//                                             </div>
//                                             {/* Message Bubble */}
//                                             <div className={`${msg.role === 'Support' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-900 rounded-tl-none'} p-3 rounded-xl shadow-sm`}>
//                                                 <p className="text-sm">{msg.message}</p>
//                                                 {msg.attachment && (
//                                                     <a href="#" className={`mt-2 text-xs flex items-center gap-1 font-medium ${msg.role === 'Support' ? 'text-blue-200' : 'text-blue-600'} hover:underline`}>
//                                                         <FileText size={14} /> {msg.attachment}
//                                                     </a>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="text-center py-10 text-gray-500">
//                                     <p>No conversation history for this ticket yet. Be the first to reply!</p>
//                                 </div>
//                             )}
//                         </div>
                        
//                         {/* Message Input */}
//                         <div className="p-6 border-t flex items-center gap-3">
//                             <input 
//                                 type="text" 
//                                 placeholder="Write your message here"
//                                 value={messageInput}
//                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageInput(e.target.value)}
//                                 onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
//                                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button
//                                 onClick={handleSendMessage}
//                                 className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition disabled:bg-gray-400"
//                                 disabled={messageInput.trim() === ''}
//                                 title="Send Message"
//                             >
//                                 <Send size={20} />
//                             </button>
//                         </div>
//                     </div>
                    

//                     {/* Sidebar */}
//                     <div className="col-span-1 space-y-6">
//                         {/* User Information */}
//                         <div className="bg-white rounded-lg shadow-sm p-6">
//                             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><User size={18}/> User Information</h3>
//                             <div className="flex items-center gap-3 mb-4">
//                                 <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white text-xl font-bold">{selectedTicket.user ? selectedTicket.user.charAt(0) : 'U'}</div>
//                                 <div>
//                                     <p className="font-medium text-gray-900">{selectedTicket.user}</p>
//                                     <p className="text-sm text-gray-500">{selectedTicket.email}</p>
//                                 </div>
//                             </div>
//                             <div className="space-y-2">
//                                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                                     <Calendar size={14} className="text-gray-500"/>
//                                     <span className="text-gray-500">Joined: <span className="font-medium text-gray-900">{selectedTicket.joined || 'N/A'}</span></span>
//                                 </div>
//                                 <div className="flex items-center gap-2 text-sm text-gray-700">
//                                     <Star size={14} className="text-gray-500"/>
//                                     <span className="text-gray-500">Subscription: <span className="font-medium text-gray-900">{selectedTicket.subscription || 'Basic'}</span></span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Ticket Details */}
//                         <div className="bg-white rounded-lg shadow-sm p-6">
//                             <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><BookOpen size={18}/> Ticket Details</h3>
//                             <div className="space-y-4">
//                                 <div>
//                                     <p className="text-xs text-gray-500 mb-1">Status</p>
//                                     <select defaultValue={selectedTicket.status} className="w-full p-2 border rounded-lg text-sm bg-gray-50">
//                                         <option>Open</option>
//                                         <option>In Progress</option>
//                                         <option>Pending User</option>
//                                         <option>Resolved</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-500 mb-1">Priority</p>
//                                     <select defaultValue={selectedTicket.priority} className="w-full p-2 border rounded-lg text-sm bg-gray-50">
//                                         <option>High</option>
//                                         <option>Medium</option>
//                                         <option>Low</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-500 mb-1">Assignee</p>
//                                     <select defaultValue={selectedTicket.assignee} className="w-full p-2 border rounded-lg text-sm bg-gray-50">
//                                         <option>{selectedTicket.assignee || 'Unassigned'}</option>
//                                         {teamMembers.map(member => (
//                                             <option key={member.id}>{member.name}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-500 mb-1">Created</p>
//                                     <p className="text-sm text-gray-900 font-medium">{selectedTicket.created || 'N/A'}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-500 mb-1">Last Update</p>
//                                     <p className="text-sm text-gray-900 font-medium">{selectedTicket.lastUpdateTime || selectedTicket.lastUpdate}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-xs text-gray-500 mb-1">Category</p>
//                                     <div className="bg-gray-100 px-3 py-2 rounded text-sm text-gray-900 font-medium">
//                                         {selectedTicket.categoryDetail || 'General'}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SupportDashbord;