import type React from "react"

interface CategoryTagProps {
  category: string
}

export const CategoryTag: React.FC<CategoryTagProps> = ({ category }) => {
  let colorClass
  switch (category) {
    case "In Progress":
      colorClass = "text-blue-600 bg-blue-100/70"
      break
    case "Resolved":
      colorClass = "text-green-600 bg-green-100/70"
      break
    case "Open":
      colorClass = "text-pink-600 bg-pink-100/70"
      break
    default:
      colorClass = "text-gray-600 bg-gray-100/70"
      break
  }
  return <span className={`${colorClass} px-3 py-1 rounded-full text-xs font-medium`}>{category}</span>
}
