import React from 'react';
import { Lesson } from './types';
import { StatusBadge, DifficultyBadge } from '../Badges';

interface LessonsTabContentProps {
  onOpenCreateModal: () => void;
  lessons: Lesson[];
  onView: (lesson: Lesson) => void;
  onEdit: (lesson: Lesson) => void;
  onHistory: (lesson: Lesson) => void;
}

const LessonsTabContent: React.FC<LessonsTabContentProps> = ({
  onOpenCreateModal,
  lessons,
  onView,
  onEdit,
  onHistory,
}) => {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 py-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Lessons</h2>
          <p className="text-sm text-gray-500">Manage structured Italian learning lessons.</p>
        </div>
        <button
          onClick={onOpenCreateModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Lesson
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Cards</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Last Modified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {lessons.map((lesson) => (
              <tr key={lesson.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                  <div className="text-xs text-gray-500">{lesson.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.cards}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"><DifficultyBadge difficulty={lesson.difficulty} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={lesson.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lesson.lastModified}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-3 items-center">
                    <button onClick={() => onView(lesson)} title="View" className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button onClick={() => onEdit(lesson)} title="Edit" className="text-gray-400 cursor-pointer hover:text-yellow-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button onClick={() => onHistory(lesson)} title="History" className="text-gray-400 cursor-pointer hover:text-gray-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LessonsTabContent;





 