
// ContentManagementPage.tsx
import React, { useState } from 'react';
import StatCard from './StatCard';
import CreateContentModal from './CreateContentModal';
import FlashcardsTabContent from './FlashcardsTabContent';
import {
  mockStats,
  mockDecks,
   
  ContentItem,
  Difficulty,
} from './types';

type ActiveTab = 'Flashcard Decks' | 'Lessons' | 'Phrase of the Day';

const ContentManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Flashcard Decks');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [decks, setDecks] = useState<ContentItem[]>(mockDecks);

  const openDeckModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateContent = (data: { title: string; description: string; difficulty: Difficulty }) => {
    const newDeck: ContentItem = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      cards: 0,
      difficulty: data.difficulty,
      category: 'Vocabulary',
      status: 'Drafted',
      lastModified: new Date().toLocaleDateString('en-GB'),
    };
    setDecks([newDeck, ...decks]);
    closeModal();
  };

  const tabs: ActiveTab[] = ['Flashcard Decks', 'Lessons', 'Phrase of the Day'];

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
       <StatCard
  title="Total Flashcard Decks"
  value={mockStats.totalDecks}
  icon={<span className="text-xl">📚</span>}
  iconColor="text-blue-600"
/>
<StatCard
  title="Published Lessons"
  value={mockStats.publishedLessons}
  icon={<span className="text-xl">✅</span>}
  iconColor="text-green-600"
/>
<StatCard
  title="Total Flashcards"
  value={mockStats.totalFlashcards}
  icon={<span className="text-xl">🎴</span>}
  iconColor="text-yellow-600"
/>
<StatCard
  title="Content Views"
  value={mockStats.contentViews}
  icon={<span className="text-xl">👁️</span>}
  iconColor="text-red-600"
/>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm cursor-pointer font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Flashcard Decks' && (
          <FlashcardsTabContent decks={decks} onOpenCreateModal={openDeckModal} />
        )}

        {activeTab === 'Lessons' && <div>Lessons management here</div>}
        {activeTab === 'Phrase of the Day' && <div>Phrase of the Day content here</div>}
      </div>

      {isModalOpen && (
        <CreateContentModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleCreateContent}
        />
      )}
    </div>
  );
};

export default ContentManagementPage;







 