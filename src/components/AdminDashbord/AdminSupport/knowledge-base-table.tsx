import type React from "react"
import type { KnowledgeArticle } from "./types"

interface KnowledgeBaseTableProps {
  articles: KnowledgeArticle[]
}

export const KnowledgeBaseTable: React.FC<KnowledgeBaseTableProps> = ({ articles }) => {
  return (
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
          {articles.map((article: KnowledgeArticle, index: number) => (
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
  )
}
