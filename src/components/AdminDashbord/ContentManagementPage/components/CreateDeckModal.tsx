import React, { useState } from 'react';
import { Difficulty, FlashcardDeck, Category, Status } from './types';

interface CreateDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newDeck: Omit<FlashcardDeck, 'id' | 'cards' | 'lastModified'>) => void;
}

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [category, setCategory] = useState<Category>(Category.Reading);
  const [status, setStatus] = useState<Status>(Status.Drafted);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onCreate({ title, description, difficulty, category, status });
    setTitle('');
    setDescription('');
    setDifficulty(Difficulty.Beginner);
    setCategory(Category.Reading);
    setStatus(Status.Drafted);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Create New Flashcard Deck</h2>
            <p className="text-slate-500 mt-2">Add a new flashcard deck to your Italian learning content</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="deck-title" className="block text-sm font-medium text-slate-700">Deck Title</label>
            <input
              id="deck-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter deck title"
              className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter deck description"
              className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700">Difficulty Level</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
            >
              {Object.values(Difficulty).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
            >
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
            >
              {Object.values(Status).map(stat => (
                <option key={stat} value={stat}>{stat}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Create Deck
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDeckModal;