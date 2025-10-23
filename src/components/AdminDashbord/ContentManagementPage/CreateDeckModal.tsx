// CreateDeckModal.tsx

import React, { useState } from 'react';
 import { Difficulty } from './types';
 
import Modals from './Modals';
 
interface CreateDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string, description: string, difficulty: Difficulty | '' }) => void;
}

const difficultyLevels: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && difficulty) {
      onSubmit({ title, description, difficulty });
      // Reset form
      setTitle('');
      setDescription('');
      setDifficulty('');
      onClose();
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <Modals isOpen={isOpen} onClose={onClose} title="Create New Flashcard Deck" subtitle="">
      <p className="text-sm text-gray-500 mb-6">Add a new flashcard deck to your Italian learning content</p>
      
      <form onSubmit={handleSubmit}>
        
        {/* Deck Title */}
        <div className="mb-4">
          <label htmlFor="deckTitle" className="block text-sm font-medium text-gray-700 mb-1">Deck Title</label>
          <input
            id="deckTitle"
            type="text"
            placeholder="Enter deck title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Enter deck description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Difficulty Level */}
        <div className="mb-6">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
            required
          >
            <option value="" disabled>Select</option>
            {difficultyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Deck
        </button>
      </form>
    </Modals>
  );
};

export default CreateDeckModal;