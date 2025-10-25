import React from "react";
import { Ticket, TeamMember } from "./types";
import { ArrowLeft, ChevronRight } from "lucide-react";
import ConversationBox from "./ConversationBox";
import SidebarUserInfo from "./SidebarUserInfo";
import SidebarTicketDetails from "./SidebarTicketDetails";

interface Props {
  ticket: Ticket;
  onBack: () => void;
  onSendMessage: (msg: string) => void;
  messageInput: string;
  setMessageInput: (v: string) => void;
  teamMembers: TeamMember[];
}

const TicketDetail: React.FC<Props> = ({
  ticket,
  onBack,
  onSendMessage,
  messageInput,
  setMessageInput,
  teamMembers
}) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white border-b px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <button onClick={onBack} className="hover:text-gray-700 flex items-center gap-1">
          <ArrowLeft size={16} className="text-gray-500" />
          Tickets
        </button>
        <ChevronRight size={16} />
        <span className="text-gray-900">Ticket {ticket.id}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Ticket {ticket.id}</h1>
          <p className="text-sm text-gray-500 mt-1">{ticket.subject}</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Mark As Resolved
        </button>
      </div>
    </div>

    <div className="px-8 py-6 grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <ConversationBox
          conversation={ticket.conversation || []}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          onSendMessage={onSendMessage}
        />
      </div>

      <div className="space-y-6">
        <SidebarUserInfo ticket={ticket} />
        <SidebarTicketDetails ticket={ticket} teamMembers={teamMembers} />
      </div>
    </div>
  </div>
);

export default TicketDetail;
