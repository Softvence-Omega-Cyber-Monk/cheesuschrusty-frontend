import React from "react";
import { TeamMember } from "./types";

interface Props {
  teamMembers: TeamMember[];
}

const TeamTable: React.FC<Props> = ({ teamMembers }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {teamMembers.map(member => (
          <tr key={member.id}>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{member.role}</td>
            <td className="px-6 py-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${member.online ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {member.online ? "Online" : "Offline"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TeamTable;
