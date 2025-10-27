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
      responses: 0,
      lastUpdate: new Date().toLocaleDateString("en-GB"),
    };

    onAddTicket(ticket);
    setIsModalOpen(false);
    setNewTicket({ subject: "", user: "", email: "", priority: "Low", category: "Open" });
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
    <div className="px-8 pb-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="rounded-xl">
        <TabsBar activeTab={activeTab} onTabChange={onTabChange} />

        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Flashcard Decks</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your Italian learning flashcard collections
            </p>
          </div>

          <div className="flex gap-3">
            <button className="border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-medium">
              <Filter size={18} />
              Filter
            </button>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={18} />
              Create Ticket
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-b-xl p-6 transition-colors duration-300">
          {renderActiveTabContent()}
        </div>

        <Pagination />
      </div>

      {/* Create Ticket Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Ticket">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={newTicket.subject}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-2 w-full transition-colors duration-300"
          />
          <input
            type="text"
            name="user"
            placeholder="User Name"
            value={newTicket.user}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="User Email"
            value={newTicket.email}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-2 w-full"
          />
          <select
            name="priority"
            value={newTicket.priority}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-2 w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            name="category"
            value={newTicket.category}
            onChange={handleInputChange}
            className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg p-2 w-full"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={handleAddTicket}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Ticket
          </button>
        </div>
      </Modal>
    </div>
  );
};
