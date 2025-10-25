import type React from "react"

interface PriorityTagProps {
  priority: string
}

export const PriorityTag: React.FC<PriorityTagProps> = ({ priority }) => {
  let colorClass
  switch (priority) {
    case "High":
      colorClass = "bg-red-500"
      break
    case "Medium":
      colorClass = "bg-orange-400"
      break
    case "Low":
      colorClass = "bg-teal-500"
      break
    default:
      colorClass = "bg-gray-400"
      break
  }
  return <span className={`${colorClass} text-white px-3 py-1 rounded-full text-xs font-medium`}>{priority}</span>
}
