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
    const baseClasses = 'py-2 px-4 font-semibold transition-all duration-200 ease-in-out rounded-lg';
    if (activeTab === tab) {
      return `${baseClasses} bg-white text-blue-600 shadow-md`;
    }
    return `${baseClasses} text-slate-600 hover:text-slate-800`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your platform today.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Flashcard Decks" value="127" icon={<BookIcon />} />
          <StatCard title="Published Lessons" value="43" icon={<LessonIcon />} />
          <StatCard title="Total Flashcards" value="3,284" icon={<FlashcardIcon />} />
          <StatCard title="Content Views" value="45,231" icon={<ViewIcon />} />
        </div>

        <main>
          <div className="bg-slate-200/60 p-1 rounded-xl inline-flex items-center mb-6">
            <button onClick={() => setActiveTab('flashcards')} className={getTabClass('flashcards')}>
              Flashcard Decks
            </button>
            <button onClick={() => setActiveTab('lessons')} className={getTabClass('lessons')}>
              Lessons
            </button>
            <button onClick={() => setActiveTab('phrase')} className={getTabClass('phrase')}>
              Phrase of the Day
            </button>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ContentManagementPage;