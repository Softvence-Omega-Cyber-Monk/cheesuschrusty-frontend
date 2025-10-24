import React, { useState } from 'react';
import { Lesson, Difficulty, Status, Category, LessonAccess } from './types';
import CreateLessonForm from './CreateLessonForm';
import { EyeIcon, PencilIcon, BlockIcon } from './icons';


const mockLessons: Lesson[] = [
  { id: 1, title: 'Basic Italian Greetings', description: 'Essential greetings and polite expressions', cards: 25, difficulty: Difficulty.Beginner, category: Category.Reading, status: Status.Published, lastModified: '29/09/2025', estimatedDuration: '15 mins', content: [], access: LessonAccess.Free},
  { id: 2, title: 'Ordering Food', description: 'Phrases for restaurants and cafes', cards: 30, difficulty: Difficulty.Beginner, category: Category.Speaking, status: Status.Published, lastModified: '29/09/2025', estimatedDuration: '20 mins', content: [], access: LessonAccess.Free},
  { id: 3, title: 'Common Verbs', description: 'Conjugations of essential verbs', cards: 50, difficulty: Difficulty.Intermediate, category: Category.Reading, status: Status.Published, lastModified: '29/09/2025', estimatedDuration: '30 mins', content: [], access: LessonAccess.Premium},
  // FIX: Corrected typo from Difficulty.Advance to Difficulty.Advanced.
  { id: 4, title: 'Past Tense', description: 'Understanding the passato prossimo', cards: 40, difficulty: Difficulty.Advanced, category: Category.Writing, status: Status.Drafted, lastModified: '29/09/2025', estimatedDuration: '45 mins', content: [], access: LessonAccess.Premium},
];

const DifficultyBadge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const colors = {
    [Difficulty.Beginner]: 'bg-blue-100 text-blue-800',
    [Difficulty.Intermediate]: 'bg-teal-100 text-teal-800',
    // FIX: Corrected typo from Difficulty.Advance to Difficulty.Advanced.
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


const Lessons: React.FC = () => {
    const [lessons, setLessons] = useState(mockLessons);
    const [isCreating, setIsCreating] = useState(false);

    const handleSaveLesson = (newLesson: Omit<Lesson, 'id' | 'status' | 'lastModified'>) => {
        const lesson: Lesson = {
            ...newLesson,
            id: lessons.length + 1,
            status: Status.Drafted,
            lastModified: new Date().toLocaleDateString('en-GB')
        };
        setLessons([lesson, ...lessons]);
        setIsCreating(false);
    }
    
    if (isCreating) {
        return <CreateLessonForm onSave={handleSaveLesson} onCancel={() => setIsCreating(false)} />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Lessons</h2>
                    <p className="text-slate-500 mt-1">Manage structured Italian learning lessons</p>
                </div>
                <button onClick={() => setIsCreating(true)} className="bg-blue-600 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    Create Lesson
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
                            {lessons.map((lesson) => (
                                <tr key={lesson.id} className="bg-white border-b border-slate-200 hover:bg-slate-50/70">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div>{lesson.title}</div>
                                        <div className="text-xs text-slate-400 font-normal">{lesson.description}</div>
                                    </td>
                                    <td className="px-6 py-4">{lesson.cards}</td>
                                    <td className="px-6 py-4"><DifficultyBadge difficulty={lesson.difficulty} /></td>
                                    <td className="px-6 py-4">{lesson.category}</td>
                                    <td className="px-6 py-4"><StatusBadge status={lesson.status} /></td>
                                    <td className="px-6 py-4">{lesson.lastModified}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <button className="text-slate-400 cursor-pointer hover:text-blue-600"><EyeIcon /></button>
                                            <button className="text-slate-400 cursor-pointer hover:text-green-600"><PencilIcon /></button>
                                            <button className="text-slate-400 cursor-pointer hover:text-red-600"><BlockIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Lessons;