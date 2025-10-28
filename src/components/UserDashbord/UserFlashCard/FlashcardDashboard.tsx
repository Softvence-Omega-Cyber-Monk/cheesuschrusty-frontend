import React, { useState } from "react";
import { Play, RotateCw, ChevronLeft, ChevronRight } from "lucide-react";

interface TopicCardProps {
  title: string;
  onStart: (title: string) => void;
  onResume: () => void;
  role: string;
  isUnlocked: boolean;
  onUnlock: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  onStart,
  onResume,
  role,
  isUnlocked,
  onUnlock,
}) => {
  const totalCards = title.includes("Verbs") ? 250 : 150;
  const mastered = Math.floor(totalCards * 0.59);
  const due = 61;

  const handleCardClick = () => {
    if (role === "freeuser" && !isUnlocked) {
      onUnlock();
    }
  };

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div
      className="relative cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
      onClick={handleCardClick}
    >
      {/* Card content */}
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col dark:bg-gray-900 h-full">
        <h3 className="text-base sm:text-lg font-bold text-gray-600 dark:text-gray-200 line-clamp-2">
          {title}
        </h3>

        <div className="flex justify-between text-xs sm:text-sm mt-3 mb-3 sm:mb-4 text-gray-600 dark:text-gray-200">
          <p className="dark:text-gray-200">Total Cards</p>
          <span className="font-semibold text-gray-800 dark:text-gray-200">{totalCards}</span>
        </div>

        <div className="flex justify-between text-xs sm:text-sm mb-2">
          <p className="dark:text-gray-200">Mastered</p>
          <span className="font-semibold text-green-600 dark:text-gray-200">{mastered} (59%)</span>
        </div>

        <div className="flex justify-between text-xs sm:text-sm mb-4">
          <p className="dark:text-gray-200">Due</p>
          <span className="font-semibold text-red-600 dark:text-gray-200">{due}</span>
        </div>

        <div className="flex flex-col xs:flex-row gap-2 xs:gap-2 mt-auto pt-2">
          <button
            onClick={(e) => handleButtonClick(e, onResume)}
            className="flex-1 cursor-pointer flex items-center justify-center px-2 xs:px-3 py-2 text-xs xs:text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <RotateCw size={14} className="mr-1 xs:mr-1" />
            <span className="truncate">Resume</span>
          </button>
          <button
            onClick={(e) => handleButtonClick(e, () => onStart(title))}
            className="flex-1 cursor-pointer flex items-center justify-center px-2 xs:px-3 py-2 text-xs xs:text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Play size={14} className="mr-1 xs:mr-1" />
            <span className="truncate">Start</span>
          </button>
        </div>
      </div>

      {/* Lock overlay */}
      {role === "freeuser" && !isUnlocked && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center p-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium">
              Click to Unlock
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================
// Main Dashboard Component
// ==========================
interface FlashcardDashboardProps {
  onStartPractice: (topicTitle: string) => void;
  topics: string[];
}

export const FlashcardDashboard: React.FC<FlashcardDashboardProps> = ({
  onStartPractice,
  topics,
}) => {
  const allTopics = [...topics];

  const userData = localStorage.getItem("userData");
  const { role } = userData ? JSON.parse(userData) : { role: "freeuser" };

  const [unlockedCards, setUnlockedCards] = useState<string[]>([]);

  const handleUnlock = (title: string) => {
    setUnlockedCards((prev) => [...prev, title]);
  };

  // ✅ Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 6;

  const totalPages = Math.ceil(allTopics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const currentTopics = allTopics.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate visible page numbers for pagination
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="mx-auto p-3 xs:p-4 sm:p-5 lg:p-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          Advance Flashcard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-3xl">
          Master Italian vocabulary with spaced repetition
        </p>
      </div>

      {/* ========== Topic Grid ========== */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {currentTopics.map((topic, index) => (
          <TopicCard
            key={index}
            title={topic}
            onStart={onStartPractice}
            onResume={() => console.log(`Resuming ${topic}`)}
            role={role}
            isUnlocked={unlockedCards.includes(topic)}
            onUnlock={() => handleUnlock(topic)}
          />
        ))}
      </div>

      {/* ✅ Pagination Controls */}
      {allTopics.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 text-gray-700 dark:text-gray-300 mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm order-2 sm:order-1">
            Total Topics:{" "}
            <span className="font-semibold">{allTopics.length}</span>
          </p>

          <div className="flex items-center gap-2 sm:gap-3 order-1 sm:order-2">
            {/* Mobile Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`sm:hidden p-2 rounded-lg border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            {/* Desktop Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`hidden sm:flex items-center px-4 py-2 rounded-lg border text-sm ${
                currentPage === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>

            {/* Page Numbers - Hidden on mobile, visible on tablet+ */}
            <div className="hidden xs:flex items-center gap-1 sm:gap-2">
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Mobile Page Indicator */}
            <span className="xs:hidden text-sm font-medium text-center">
              Page {currentPage} of {totalPages}
            </span>

            {/* Mobile Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`sm:hidden p-2 rounded-lg border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              <ChevronRight size={16} />
            </button>

            {/* Desktop Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`hidden sm:flex items-center px-4 py-2 rounded-lg border text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-blue-600 border-blue-300 hover:bg-blue-50"
              }`}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* ========== Stats Section ========== */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
          Previously Completed Sessions
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
          Review your study progress and performance.
        </p>

        <div className="grid grid-cols-2 min-[480px]:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">3</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Sessions Completed</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">123</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Cards Studied</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">22</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Average Score</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">86%</div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};










// import React, { useState } from "react";
// import {  Play, RotateCw } from "lucide-react";

// interface TopicCardProps {
//   title: string;
//   onStart: (title: string) => void;
//   onResume: () => void;
//   role: string;
//   isUnlocked: boolean;
//   onUnlock: () => void;
// }

// const TopicCard: React.FC<TopicCardProps> = ({
//   title,
//   onStart,
//   onResume,
//   role,
//   isUnlocked,
//   onUnlock,
// }) => {
//   const totalCards = title.includes("Verbs") ? 250 : 150;
//   const mastered = Math.floor(totalCards * 0.59);
//   const due = 61;

//   return (
//     <div className="relative" onClick={role === "freeuser" && !isUnlocked ? onUnlock : undefined}>
//       {/* Card content */}
//       <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col cursor-pointer">
//         <h3 className="text-lg font-bold text-gray-900">{title}</h3>

//         <div className="flex justify-between text-sm mt-3 mb-4 text-gray-600">
//           <p>Total Cards</p>
//           <span className="font-semibold text-gray-800">{totalCards}</span>
//         </div>

//         <div className="flex justify-between text-sm mb-2">
//           <p>Mastered</p>
//           <span className="font-semibold text-green-600">{mastered} (59%)</span>
//         </div>

//         <div className="flex justify-between text-sm mb-4">
//           <p>Due</p>
//           <span className="font-semibold text-red-600">{due}</span>
//         </div>

//         <div className="flex space-x-2 mt-auto pt-2">
//           <button
//             onClick={onResume}
//             className="flex-1 cursor-pointer flex items-center justify-center px-3 py-2 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
//           >
//             <RotateCw size={16} className="mr-1" />
//             Resume Session
//           </button>
//           <button
//             onClick={() => onStart(title)}
//             className="flex-1 cursor-pointer flex items-center justify-center px-3 py-2 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <Play size={16} className="mr-1" />
//             Start
//           </button>
//         </div>
//       </div>

//       {/* Lock overlay for free users (if not unlocked) */}
//       {role === "freeuser" && !isUnlocked && (
//         <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] rounded-xl flex flex-col items-center justify-center">
//           {/* <Lock className="text-gray-700 opacity-80" size={28} /> */}
//           <p className="text-gray-700 text-sm font-medium mt-1">Click to Unlock</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Dashboard
// interface FlashcardDashboardProps {
//   onStartPractice: (topicTitle: string) => void;
//   topics: string[];
// }

// export const FlashcardDashboard: React.FC<FlashcardDashboardProps> = ({
//   onStartPractice,
//   topics,
// }) => {
//   const allTopics = [ ...topics];

//   const userData = localStorage.getItem("userData");
//   const { role } = userData ? JSON.parse(userData) : { role: "freeuser" };

//   // Track which cards are unlocked
//   const [unlockedCards, setUnlockedCards] = useState<string[]>([]);

//   const handleUnlock = (title: string) => {
//     setUnlockedCards((prev) => [...prev, title]);
//   };

//   return (
//     <div className="mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-900 mb-2">Advance Flashcard</h1>
//       <p className="text-gray-600 mb-8">Master Italian vocabulary with spaced repetition</p>

//       {/* Topic Grid */}
//       <div className="grid grid-cols-3 gap-6 mb-12">
//         {allTopics.map((topic, index) => (
//           <TopicCard
//             key={index}
//             title={topic}
//             onStart={onStartPractice}
//             onResume={() => console.log(`Resuming ${topic}`)}
//             role={role}
//             isUnlocked={unlockedCards.includes(topic)}
//             onUnlock={() => handleUnlock(topic)}
//           />
//         ))}
//       </div>

//       {/* Stats Section */}
//       <h2 className="text-xl font-bold text-gray-900 mb-4">
//         Previously Completed Sessions
//       </h2>
//       <p className="text-gray-600 mb-6">
//         Master Italian vocabulary with spaced repetition
//       </p>

//       <div className="grid grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="text-3xl font-bold text-indigo-600 mb-1">3</div>
//           <p className="text-sm text-gray-600">Number of Sessions Completed</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="text-3xl font-bold text-red-600 mb-1">123</div>
//           <p className="text-sm text-gray-600">Total Cards Studied</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="text-3xl font-bold text-green-600 mb-1">22</div>
//           <p className="text-sm text-gray-600">Average Score</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="text-3xl font-bold text-indigo-600 mb-1">86%</div>
//           <p className="text-sm text-gray-600">Success Rate</p>
//         </div>
//       </div>
//     </div>
//   );
// };









