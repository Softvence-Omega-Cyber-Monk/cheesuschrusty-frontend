
// CreateContentModal.tsx
import React, { useState } from 'react';
import { Difficulty } from './types';
import Modal from './Modals';

interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; difficulty: Difficulty }) => void;
}

const difficultyLevels: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

const CreateContentModal: React.FC<CreateContentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      onSubmit({ title, description, difficulty });
      setTitle('');
      setDescription('');
      setDifficulty('Beginner');
      onClose();
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Flashcard Deck"
      subtitle="Add a new flashcard deck to your Italian learning content"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="Deck Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="border p-2 rounded">
          {difficultyLevels.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 cursor-pointer text-white p-2 rounded">Create Deck</button>
      </form>
    </Modal>
  );
};

export default CreateContentModal;








 