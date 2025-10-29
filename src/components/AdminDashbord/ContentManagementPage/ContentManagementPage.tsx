import React, { useState } from 'react';
import StatCard from './components/StatCard';
import FlashcardDecks from './components/FlashcardDecks';
import Lessons from './components/Lessons';
import PhraseOfTheDay from './components/PhraseOfTheDay';
import { BookIcon, LessonIcon, FlashcardIcon, ViewIcon } from './components/icons';

type Tab = 'flashcards' | 'lessons' | 'phrase';

const ContentManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('flashcards');

  const renderContent = () => {
    switch (activeTab) {
      case 'flashcards':
        return <FlashcardDecks />;
      case 'lessons':
        return <Lessons />;
      case 'phrase':
        return <PhraseOfTheDay />;
      default:
        return <FlashcardDecks />;
    }
  };

  const getTabClass = (tab: Tab) => {
    const baseClasses = 'py-2 px-3 sm:px-4 font-semibold transition-all duration-200 ease-in-out rounded-lg text-sm sm:text-base';
    if (activeTab === tab) {
      return `${baseClasses} bg-white text-blue-600 shadow-md dark:bg-blue-600 dark:text-white`;
    }
    return `${baseClasses} text-slate-600 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200`;
  };

  return (
    <div className="min-h-screen text-slate-800 p-4 sm:p-6 lg:p-8 dark:bg-gray-900 dark:text-gray-200">
      <div className="mx-auto">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-gray-200">Content Management</h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base dark:text-gray-400">Welcome back! Here's what's happening with your platform today.</p>
        </header>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard title="Total Flashcard Decks" value="127" icon={<BookIcon />} />
          <StatCard title="Published Lessons" value="43" icon={<LessonIcon />} />
          <StatCard title="Total Flashcards" value="3,284" icon={<FlashcardIcon />} />
          <StatCard title="Content Views" value="45,231" icon={<ViewIcon />} />
        </div>

        {/* Main Content */}
        <main>
          {/* Tabs Navigation */}
          <div className="bg-slate-200/60 p-1 rounded-xl inline-flex items-center mb-6 w-full sm:w-auto dark:bg-gray-700">
            <button 
              onClick={() => setActiveTab('flashcards')} 
              className={`cursor-pointer flex-1 sm:flex-none text-center ${getTabClass('flashcards')}`}
            >
              Flashcard Decks
            </button>
            <button 
              onClick={() => setActiveTab('lessons')} 
              className={`cursor-pointer flex-1 sm:flex-none text-center ${getTabClass('lessons')}`}
            >
              Lessons
            </button>
            <button 
              onClick={() => setActiveTab('phrase')} 
              className={`cursor-pointer flex-1 sm:flex-none text-center ${getTabClass('phrase')}`}
            >
              Phrase of the Day
            </button>
          </div>
          
          {/* Tab Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ContentManagementPage;