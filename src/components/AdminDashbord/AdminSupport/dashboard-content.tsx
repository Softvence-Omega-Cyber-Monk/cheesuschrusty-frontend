"use client";

import { useState } from "react";
import { Filter, Plus } from "lucide-react";
import type { TabType, Ticket, KnowledgeArticle, TeamMember } from "./types";
import { TabsBar } from "./tabs-bar";
import { TicketsTable } from "./tickets-table";
import { KnowledgeBaseTable } from "./knowledge-base-table";
import { TeamManagementTable } from "./team-management-table";
import { Pagination } from "./pagination";
import { Modal } from "./modal";

interface DashboardContentProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tickets: Ticket[];
  knowledgeArticles: KnowledgeArticle[];
  teamMembers: TeamMember[];
  onViewTicket: (ticket: Ticket) => void;
  onAddTicket: (ticket: Ticket) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  onTabChange,
  tickets,
  knowledgeArticles,
  teamMembers,
  onViewTicket,
  onAddTicket,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    user: "",
    email: "",
    priority: "Low",
    category: "Open",
    status: "Offline", // Added status field
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTicket = () => {
    if (!newTicket.subject || !newTicket.user || !newTicket.email) return;

    const ticket: Ticket = {
      id: `TICK-${Math.floor(Math.random() * 1000)}`,
      subject: newTicket.subject,
      user: newTicket.user,
      email: newTicket.email,
      priority: newTicket.priority as "Low" | "Medium" | "High",
      category: newTicket.category as "Open" | "In Progress" | "Resolved",
      status: newTicket.status, // Use the status field
      responses: 0,
      lastUpdate: new Date().toLocaleDateString("en-GB"),
    };

    onAddTicket(ticket);
    setIsModalOpen(false);
    setNewTicket({ subject: "", user: "", email: "", priority: "Low", category: "Open", status: "Offline" });
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "allTickets":
        return <TicketsTable tickets={tickets} onViewTicket={onViewTicket} />;
      case "knowledgeBase":
        return <KnowledgeBaseTable articles={knowledgeArticles} />;
      case "teamManagement":
        return <TeamManagementTable members={teamMembers} />;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="rounded-xl overflow-hidden shadow-sm">
        {/* Tabs */}
        <TabsBar activeTab={activeTab} onTabChange={onTabChange} />

        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Flashcard Decks
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1 dark:text-gray-400">
              Manage your Italian learning flashcard collections
            </p>
          </div>

          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <button className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium">
              <Filter size={18} />
              Filter
            </button>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 active:bg-blue-800 transition font-medium shadow-sm"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} />
              Create Ticket
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-b-xl p-6 transition-colors duration-300">
          {renderActiveTabContent()}
        </div>

        <Pagination />
      </div>

      {/* Create Ticket Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Ticket">
        <div className="flex flex-col gap-4 p-2">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newTicket.subject}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="text"
            name="user"
            placeholder="User Name"
            value={newTicket.user}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="User Email"
            value={newTicket.email}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <select
            name="priority"
            value={newTicket.priority}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            name="category"
            value={newTicket.category}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Status Selection */}
          <select
            name="status"
            value={newTicket.status}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          <button
            onClick={handleAddTicket}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition font-medium shadow-sm"
          >
            Add Ticket
          </button>
        </div>
      </Modal>
    </div>
  );
};
