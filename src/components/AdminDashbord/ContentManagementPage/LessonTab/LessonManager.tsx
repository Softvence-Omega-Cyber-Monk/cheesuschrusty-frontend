import React, { useState } from 'react';
import LessonsTabContent from './LessonsTabContent';
import LessonFormPage from './LessonFormPage';
import { Lesson } from './types';

interface LessonManagerProps {
  lessons: Lesson[];
}

const LessonManager: React.FC<LessonManagerProps> = ({ lessons: initialLessons }) => {
  const [view, setView] = useState<'table' | 'create' | 'edit'>('table');
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const handleOpenCreateModal = () => {
    setSelectedLesson(null);
    setView('create');
  };

  const handleOpenEditModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('edit');
  };

  const handleViewLesson = (lesson: Lesson) => {
    console.log('Viewing lesson:', lesson);
  };

  const handleHistory = (lesson: Lesson) => {
    console.log('Lesson history:', lesson);
  };

  const handleCloseForm = () => {
    setView('table');
    setSelectedLesson(null);
  };

  const handleSaveForm = (formData: Partial<Lesson>, isEditMode: boolean) => {
    if (isEditMode && selectedLesson) {
      const updated = lessons.map((l) =>
        l.id === selectedLesson.id
          ? { ...l, ...formData, lastModified: new Date().toLocaleDateString('en-GB') }
          : l
      );
      setLessons(updated);
    } else {
      const newLesson: Lesson = {
        id: Date.now().toString(), // string id!
        title: formData.title || 'Untitled Lesson',
        description: formData.description || '',
        cards: 0,
        difficulty: formData.difficulty || 'Beginner',
        category: formData.category || 'Reading',
        status: 'Drafted',
        lastModified: new Date().toLocaleDateString('en-GB'),
      };
      setLessons([newLesson, ...lessons]);
    }

    handleCloseForm();
  };

  if (view === 'create' || view === 'edit') {
    return (
      <div className="relative p-6">
        <button
          onClick={handleCloseForm}
          className="absolute top-4 left-4 flex cursor-pointer items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Lessons
        </button>

        <LessonFormPage
          isEditMode={view === 'edit'}
          initialData={selectedLesson || undefined}
          onSave={handleSaveForm}
          onCancel={handleCloseForm}
        />
      </div>
    );
  }

  return (
    <LessonsTabContent
      onOpenCreateModal={handleOpenCreateModal}
      lessons={lessons}
      onView={handleViewLesson}
      onEdit={handleOpenEditModal}
      onHistory={handleHistory}
    />
  );
};

export default LessonManager;




 