import React from "react";
import { Ticket, TeamMember } from "./types";
import { getPriorityColor, getCategoryColor } from "./colors";

interface Props {
  ticket: Ticket;
  teamMembers: TeamMember[];
}

const SidebarTicketDetails: React.FC<Props> = ({ ticket, teamMembers }) => (
  <div className="bg-white border rounded-2xl shadow-sm p-4">
    <h2 className="text-lg font-semibold mb-4 text-gray-900">Ticket Details</h2>
    <div className="space-y-2 text-sm text-gray-700">
      <p>
        <span className="font-medium">Status:</span> {ticket.status}
      </p>
      <p>
        <span className="font-medium">Priority:</span>{" "}
        <span className={`${getPriorityColor(ticket.priority)} text-white px-2 py-1 rounded-full text-xs`}>
          {ticket.priority}
        </span>
      </p>
      <p>
        <span className="font-medium">Category:</span>{" "}
        <span className={`${getCategoryColor(ticket.category)} px-2 py-1 rounded-full text-xs`}>
          {ticket.category}
        </span>
      </p>
      <p>
        <span className="font-medium">Assigned To:</span>{" "}
        {teamMembers.find(m => m.name === ticket.assignedTo)?.name || "Unassigned"}
      </p>
    </div>
  </div>
);

export default SidebarTicketDetails;
