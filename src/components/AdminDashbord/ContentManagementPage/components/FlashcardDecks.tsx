import React, { useState } from 'react';
import { FlashcardDeck, Difficulty, Status, Category } from './types';
import CreateDeckModal from './CreateDeckModal';
import { EyeIcon, PencilIcon, BlockIcon } from './icons'; // Make sure to import your icons

const mockDecks: FlashcardDeck[] = [
  { id: 1, title: 'Basic Italian Greetings', description: 'Essential greetings and polite expressions', cards: 25, difficulty: Difficulty.Beginner, category: Category.Reading, status: Status.Published, lastModified: '29/09/2025' },
  { id: 2, title: 'Ordering Food', description: 'Phrases for restaurants and cafes', cards: 30, difficulty: Difficulty.Beginner, category: Category.Speaking, status: Status.Published, lastModified: '29/09/2025' },
  { id: 3, title: 'Common Verbs', description: 'Conjugations of essential verbs', cards: 50, difficulty: Difficulty.Intermediate, category: Category.Reading, status: Status.Published, lastModified: '29/09/2025' },
  { id: 4, title: 'Past Tense', description: 'Understanding the passato prossimo', cards: 40, difficulty: Difficulty.Advanced, category: Category.Writing, status: Status.Drafted, lastModified: '29/09/2025' },
  { id: 5, title: 'At the Market', description: 'Vocabulary for shopping for groceries', cards: 25, difficulty: Difficulty.Beginner, category: Category.Listening, status: Status.Published, lastModified: '29/09/2025' },
  { id: 6, title: 'Travel Phrases', description: 'Navigating airports and hotels', cards: 35, difficulty: Difficulty.Beginner, category: Category.Speaking, status: Status.Drafted, lastModified: '29/09/2025' },
];

const DifficultyBadge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const colors = {
    [Difficulty.Beginner]: 'bg-blue-100 text-blue-800',
    [Difficulty.Intermediate]: 'bg-teal-100 text-teal-800',
    [Difficulty.Advanced]: 'bg-amber-100 text-amber-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors[difficulty]}`}>{difficulty}</span>;
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const colors = {
    [Status.Published]: 'bg-green-100 text-green-800',
    [Status.Drafted]: 'bg-orange-100 text-orange-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors[status]}`}>{status}</span>;
};

const FlashcardDecks: React.FC = () => {
  const [decks, setDecks] = useState(mockDecks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateDeck = (newDeck: Omit<FlashcardDeck, 'id' | 'cards' | 'lastModified'>) => {
    const newId = Math.max(...decks.map(d => d.id)) + 1;
    const deck: FlashcardDeck = {
        ...newDeck,
        id: newId,
        cards: 0,
        lastModified: new Date().toLocaleDateString('en-GB')
    }
    setDecks([deck, ...decks]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-200">Flashcard Decks</h2>
          <p className="text-slate-500 mt-1 dark:text-gray-400">Manage your Italian learning flashcard collections</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Create Deck
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 ">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 tracking-wider">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Cards</th>
                <th scope="col" className="px-6 py-3">Difficulty</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Last Modified</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {decks.map((deck) => (
                <tr key={deck.id} className="bg-white border-b border-slate-200 hover:bg-slate-50/70">
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <div>{deck.title}</div>
                    <div className="text-xs text-slate-400 font-normal">{deck.description}</div>
                  </td>
                  <td className="px-6 py-4">{deck.cards}</td>
                  <td className="px-6 py-4"><DifficultyBadge difficulty={deck.difficulty} /></td>
                  <td className="px-6 py-4">{deck.category}</td>
                  <td className="px-6 py-4"><StatusBadge status={deck.status} /></td>
                  <td className="px-6 py-4">{deck.lastModified}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-slate-400 cursor-pointer hover:text-blue-600" aria-label="View"><EyeIcon /></button>
                      <button className="text-slate-400 cursor-pointer hover:text-green-600" aria-label="Edit"><PencilIcon /></button>
                      <button className="text-slate-400 cursor-pointer hover:text-red-600" aria-label="Delete"><BlockIcon /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CreateDeckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateDeck} />
    </div>
  );
};

export default FlashcardDecks;
