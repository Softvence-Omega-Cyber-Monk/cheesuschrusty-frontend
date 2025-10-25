import React from "react";
import { KnowledgeArticle } from "./types";

interface Props {
  articles: KnowledgeArticle[];
}

const KnowledgeBaseTable: React.FC<Props> = ({ articles }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Update</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Views</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {articles.map(article => (
          <tr key={article.id} className="hover:bg-gray-50 cursor-pointer">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{article.category}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{article.lastUpdate}</td>
            <td className="px-6 py-4 text-sm text-gray-500">{article.views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default KnowledgeBaseTable;
