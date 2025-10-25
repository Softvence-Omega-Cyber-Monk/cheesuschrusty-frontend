import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage?: number
  totalPages?: number
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 3 }) => {
  return (
    <div className="px-6 py-4 border-t flex justify-between items-center">
      <p className="text-sm text-gray-600">Showing 1 to 10 of 24 orders</p>
      <div className="flex gap-1 items-center">
        <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg border border-gray-200">
          <ChevronLeft size={18} className="text-gray-400" />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i + 1}
            className={`cursor-pointer px-3 py-1 rounded-lg text-sm font-medium ${
              currentPage === i + 1 ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg border border-gray-200">
          <ChevronRight size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}
