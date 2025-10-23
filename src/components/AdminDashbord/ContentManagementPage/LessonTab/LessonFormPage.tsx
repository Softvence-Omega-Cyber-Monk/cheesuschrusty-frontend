import React, { useState, useEffect } from 'react';
import { Lesson, Difficulty, Category } from './types';

interface LessonFormPageProps {
  isEditMode?: boolean;
  initialData?: Lesson;
  onSave: (formData: Partial<Lesson>, isEditMode: boolean) => void;
  onCancel: () => void;
}

const LessonFormPage: React.FC<LessonFormPageProps> = ({ isEditMode = false, initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [difficulty, setDifficulty] = useState<Difficulty>(initialData?.difficulty || 'Beginner');
  const [category, setCategory] = useState<Category>(initialData?.category || 'Reading');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setDifficulty(initialData.difficulty);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, difficulty, category }, isEditMode);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{isEditMode ? 'Edit Lesson' : 'Create Lesson'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option>Reading</option>
            <option>Writing</option>
            <option>Listening</option>
            <option>Speaking</option>
            <option>Grammar</option>
            <option>Vocabulary</option>
          </select>
        </div>

        <div className="flex space-x-3 pt-2">
          <button type="submit" className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {isEditMode ? 'Save Changes' : 'Create Lesson'}
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonFormPage;








 