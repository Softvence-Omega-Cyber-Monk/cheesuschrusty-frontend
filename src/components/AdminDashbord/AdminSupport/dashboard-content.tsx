import { useState } from "react"
import { Filter, Plus } from "lucide-react"
import type { TabType, Ticket, KnowledgeArticle, TeamMember } from "./types"
import { TabsBar } from "./tabs-bar"
import { TicketsTable } from "./tickets-table"
import { KnowledgeBaseTable } from "./knowledge-base-table"
import { TeamManagementTable } from "./team-management-table"
import { Pagination } from "./pagination"
import { Modal } from "./modal"

interface DashboardContentProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  tickets: Ticket[]
  knowledgeArticles: KnowledgeArticle[]
  teamMembers: TeamMember[]
  onViewTicket: (ticket: Ticket) => void
  onAddTicket: (ticket: Ticket) => void
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    user: "",
    email: "",
    priority: "Low",
    category: "Open",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewTicket((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTicket = () => {
    if (!newTicket.subject || !newTicket.user || !newTicket.email) return

    const ticket: Ticket = {
      id: `TICK-${Math.floor(Math.random() * 1000)}`,
      subject: newTicket.subject,
      user: newTicket.user,
      email: newTicket.email,
      priority: newTicket.priority as "Low" | "Medium" | "High",
      category: newTicket.category as "Open" | "In Progress" | "Resolved",
      responses: 0,
      lastUpdate: new Date().toLocaleDateString("en-GB"),
    }

    onAddTicket(ticket)
    setIsModalOpen(false)
    setNewTicket({ subject: "", user: "", email: "", priority: "Low", category: "Open" })
  }

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "allTickets":
        return <TicketsTable tickets={tickets} onViewTicket={onViewTicket} />
      case "knowledgeBase":
        return <KnowledgeBaseTable articles={knowledgeArticles} />
      case "teamManagement":
        return <TeamManagementTable members={teamMembers} />
      default:
        return null
    }
  }

  return (
    <div className="px-8 pb-8">
      <div className="rounded-xl">
        <TabsBar activeTab={activeTab} onTabChange={onTabChange} />

        <div className="px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Flashcard Decks</h2>
            <p className="text-sm text-gray-500 mt-1">Manage your Italian learning flashcard collections</p>
          </div>
          <div className="flex gap-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition font-medium">
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

        {renderActiveTabContent()}
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
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <input
            type="text"
            name="user"
            placeholder="User Name"
            value={newTicket.user}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="User Email"
            value={newTicket.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <select
            name="priority"
            value={newTicket.priority}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            name="category"
            value={newTicket.category}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
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
  )
}













// import type React from "react"
// import { Filter, Plus } from "lucide-react"
// import type { TabType, Ticket, KnowledgeArticle, TeamMember } from "./types"
// import { TabsBar } from "./tabs-bar"
// import { TicketsTable } from "./tickets-table"
// import { KnowledgeBaseTable } from "./knowledge-base-table"
// import { TeamManagementTable } from "./team-management-table"
// import { Pagination } from "./pagination"

// interface DashboardContentProps {
//   activeTab: TabType
//   onTabChange: (tab: TabType) => void
//   tickets: Ticket[]
//   knowledgeArticles: KnowledgeArticle[]
//   teamMembers: TeamMember[]
//   onViewTicket: (ticket: Ticket) => void
// }

// export const DashboardContent: React.FC<DashboardContentProps> = ({
//   activeTab,
//   onTabChange,
//   tickets,
//   knowledgeArticles,
//   teamMembers,
//   onViewTicket,
// }) => {
//   const renderActiveTabContent = () => {
//     switch (activeTab) {
//       case "allTickets":
//         return <TicketsTable tickets={tickets} onViewTicket={onViewTicket} />
//       case "knowledgeBase":
//         return <KnowledgeBaseTable articles={knowledgeArticles} />
//       case "teamManagement":
//         return <TeamManagementTable members={teamMembers} />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="px-8 pb-8">
//       <div className="rounded-xl">
//         {/* Tabs Bar */}
//         <TabsBar activeTab={activeTab} onTabChange={onTabChange} />

//         {/* Flashcard Decks Section */}
//         <div className="px-6 py-5 flex justify-between items-center">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">Flashcard Decks</h2>
//             <p className="text-sm text-gray-500 mt-1">Manage your Italian learning flashcard collections</p>
//           </div>
//           <div className="flex gap-3">
//             <button className="border cursor-pointer border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition font-medium">
//               <Filter size={18} />
//               <select name="" id="">
//                 {" "}
//                 Priority
//               </select>
//               <option value="">high</option>
//             </button>
//             <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition font-medium">
//               <Plus size={18} />
//               Create Ticket
//             </button>
//           </div>
//         </div>

//         {/* Dynamic Table Content */}
//         {renderActiveTabContent()}

//         {/* Pagination */}
//         <Pagination />
//       </div>
//     </div>
//   )
// }
