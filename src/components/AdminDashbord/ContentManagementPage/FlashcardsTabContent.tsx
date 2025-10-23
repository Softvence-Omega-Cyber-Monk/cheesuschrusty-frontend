
// FlashcardsTabContent.tsx
import React from 'react';
import { ContentItem } from './types';

interface FlashcardsTabContentProps {
  decks: ContentItem[];
  onOpenCreateModal: () => void;
}

const FlashcardsTabContent: React.FC<FlashcardsTabContentProps> = ({ decks, onOpenCreateModal }) => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={onOpenCreateModal} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded">Create Deck</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Cards</th>
            <th className="px-4 py-2 border">Difficulty</th>
            <th className="px-4 py-2 border">Category</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{deck.title}</td>
              <td className="px-4 py-2 border">{deck.cards}</td>
              <td className="px-4 py-2 border">{deck.difficulty}</td>
              <td className="px-4 py-2 border">{deck.category}</td>
              <td className="px-4 py-2 border">{deck.status}</td>
              <td className="px-4 py-2 border">{deck.lastModified}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlashcardsTabContent;











 






// import React, { useState } from 'react';
// import toast from 'react-hot-toast';
// // Assuming these are styled Tailwind components that take 'difficulty' or 'status' as a prop
// // and render the appropriately styled badge (e.g., blue for 'Beginner', green for 'Published').
// import { StatusBadge, DifficultyBadge } from './Badges'; 

// interface ContentItem {
//   id: string;
//   title: string;
//   description: string;
//   cards: number;
//   difficulty: 'Beginner' | 'Intermediate' | 'Advance'; 
//   category: 'Reading' | 'Writing' | 'Listening' | 'Speaking'; // Updated category type
//   status: 'Published' | 'Drafted'; 
//   lastModified: string;
// }

// const DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advance'];
// const STATUS_OPTIONS = ['Published', 'Drafted'];
// // New array for Category options
// const CATEGORY_OPTIONS = ['Reading', 'Writing', 'Listening', 'Speaking'];

// // Initial data to better match the design image
// const initialDecks: ContentItem[] = [
//   { id: '1', title: 'Basic Italian Greetings', description: 'Essential greetings and polite expressions', cards: 25, difficulty: 'Beginner', category: 'Reading', status: 'Published', lastModified: '29/09/2025' },
//   { id: '2', title: 'Basic Italian Greetings', description: 'Essential greetings and polite expressions', cards: 25, difficulty: 'Intermediate', category: 'Listening', status: 'Published', lastModified: '29/09/2025' },
//   { id: '3', title: 'Basic Italian Greetings', description: 'Essential greetings and polite expressions', cards: 25, difficulty: 'Beginner', category: 'Speaking', status: 'Drafted', lastModified: '29/09/2025' },
// ];

// const getTodayDate = () => {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };

// const FlashcardsTabContent: React.FC = () => {
//   const [decks, setDecks] = useState<ContentItem[]>(initialDecks);

//   const [selectedDeck, setSelectedDeck] = useState<ContentItem | null>(null);
//   const [modalType, setModalType] = useState<'add' | 'edit' | 'view' | 'delete' | null>(null);

//   const [formData, setFormData] = useState<Omit<ContentItem, 'id'>>({
//     title: '',
//     description: '',
//     cards: 0,
//     difficulty: 'Beginner',
//     category: 'Reading', // Set initial category to first option
//     status: 'Drafted',
//     lastModified: '',
//   });

//   const openModal = (type: 'add' | 'edit' | 'view' | 'delete', deck?: ContentItem) => {
//     setModalType(type);
//     setSelectedDeck(deck || null);

//     if (type === 'edit' && deck) {
//       setFormData({ ...deck });
//     } else if (type === 'add') {
//       setFormData({
//         title: '',
//         description: '',
//         cards: 0,
//         difficulty: 'Beginner',
//         category: 'Reading',
//         status: 'Drafted',
//         lastModified: getTodayDate(),
//       });
//     }
//   };

//   const closeModal = () => {
//     setModalType(null);
//     setSelectedDeck(null);
//   };

//   const handleAdd = () => {
//     // Basic validation
//     if (!formData.title || formData.cards <= 0) {
//       toast.error('Title and Cards ( > 0) are required.');
//       return;
//     }

//     const newDeck = { ...formData, id: Date.now().toString() } as ContentItem;
//     setDecks([...decks, newDeck]);
//     toast.success('Deck added successfully!');
//     closeModal();
//   };

//   const handleEdit = () => {
//     if (!selectedDeck) return;

//     // Update the lastModified date on edit
//     const updatedDeck = { ...formData, lastModified: getTodayDate() };

//     setDecks(decks.map(d => (d.id === selectedDeck.id ? { ...d, ...updatedDeck } : d)));
//     toast.success('Deck updated successfully!');
//     closeModal();
//   };

//   const handleDelete = () => {
//     if (!selectedDeck) return;
//     setDecks(decks.filter(d => d.id !== selectedDeck.id));
//     toast.success('Deck deleted successfully!');
//     closeModal();
//   };

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 py-2">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">Flashcard Decks</h2>
//           <p className="text-sm text-gray-500">Manage your Italian learning flashcard collections.</p>
//         </div>
//         <button
//           onClick={() => openModal('add')}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
//         >
//           <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
//           Create Deck
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Title</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Cards</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Difficulty</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Category</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Last Modified</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {decks.map(deck => (
//               <tr key={deck.id} className="hover:bg-gray-50">
//                 {/* Title and Description */}
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{deck.title}</div>
//                   <div className="text-xs text-gray-500">{deck.description}</div>
//                 </td>
//                 {/* Cards */}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deck.cards}</td>
//                 {/* Difficulty Badge */}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <DifficultyBadge difficulty={deck.difficulty} />
//                 </td>
//                 {/* Category */}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deck.category}</td>
//                 {/* Status Badge */}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <StatusBadge status={deck.status} />
//                 </td>
//                 {/* Last Modified */}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{deck.lastModified}</td>
//                 {/* Action Icons */}
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <div className="flex space-x-3 items-center">
//                     {/* View Icon (Eye) */}
//                     <button onClick={() => openModal('view', deck)} title="View" className="text-gray-400 hover:text-blue-600">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
//                     </button>
//                     {/* Edit Icon (Pencil) */}
//                     <button onClick={() => openModal('edit', deck)} title="Edit" className="text-gray-400 hover:text-yellow-600">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
//                     </button>
//                     {/* Delete Icon (Trash) */}
//                     <button onClick={() => openModal('delete', deck)} title="Delete" className="text-gray-400 hover:text-red-600">
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Dynamic Add/Edit/View Modal */}
//       {(modalType === 'add' || modalType === 'edit' || modalType === 'view') && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto relative">
//             <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//             </button>

//             {/* View Mode */}
//             {modalType === 'view' && selectedDeck && (
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-800 mb-4">View Deck: {selectedDeck.title}</h3>
//                 <div className="space-y-3 text-gray-700">
//                   <p><strong>Description:</strong> {selectedDeck.description}</p>
//                   <p><strong>Cards:</strong> {selectedDeck.cards}</p>
//                   <p><strong>Difficulty:</strong> <DifficultyBadge difficulty={selectedDeck.difficulty} /></p>
//                   <p><strong>Category:</strong> <span className="px-3 py-1 bg-gray-200 rounded-full text-sm font-medium">{selectedDeck.category}</span></p>
//                   <p><strong>Status:</strong> <StatusBadge status={selectedDeck.status} /></p>
//                   <p><strong>Last Modified:</strong> {selectedDeck.lastModified}</p>
//                 </div>
//               </div>
//             )}

//             {/* Add/Edit Mode Form */}
//             {(modalType === 'add' || modalType === 'edit') && (
//               <div className="flex flex-col gap-4">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-2">{modalType === 'add' ? 'Create New Deck' : 'Edit Deck'}</h3>
                
//                 {/* Title Input */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Title</label>
//                     <input
//                       id="title"
//                       placeholder="e.g. Basic Italian Greetings"
//                       value={formData.title}
//                       onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                       className="rounded border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                     />
//                 </div>

//                 {/* Description Textarea */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
//                     <textarea
//                       id="description"
//                       placeholder="Essential greetings and polite expressions"
//                       value={formData.description}
//                       onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                       className="rounded border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                       rows={2}
//                     />
//                 </div>
                
//                 {/* Cards Input */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="cards" className="text-sm font-medium text-gray-700 mb-1">Number of Cards</label>
//                     <input
//                       id="cards"
//                       type="number"
//                       placeholder="25"
//                       value={formData.cards}
//                       onChange={(e) => setFormData({ ...formData, cards: Math.max(0, Number(e.target.value)) })} // Ensure non-negative
//                       className="rounded border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                     />
//                 </div>

//                 {/* Difficulty Select */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="difficulty" className="text-sm font-medium text-gray-700 mb-1">Difficulty</label>
//                     <select
//                       id="difficulty"
//                       value={formData.difficulty}
//                       onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as ContentItem['difficulty'] })}
//                       className="rounded border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white"
//                     >
//                       {DIFFICULTY_OPTIONS.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                 </div>
                
//                 {/* Category Select (UPDATED) */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">Category</label>
//                     <select
//                       id="category"
//                       value={formData.category}
//                       onChange={(e) => setFormData({ ...formData, category: e.target.value as ContentItem['category'] })}
//                       className="rounded border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white"
//                     >
//                       {CATEGORY_OPTIONS.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                 </div>
                
//                 {/* Status Select */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
//                     <select
//                       id="status"
//                       value={formData.status}
//                       onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentItem['status'] })}
//                       className="rounded border border-gray-300 p-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 bg-white"
//                     >
//                       {STATUS_OPTIONS.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                       ))}
//                     </select>
//                 </div>

//                 <div className="flex justify-end gap-3 mt-4">
//                   <button onClick={closeModal} className="rounded-lg bg-gray-200 px-5 py-2 text-gray-700 hover:bg-gray-300 transition-colors">
//                     Cancel
//                   </button>
//                   <button
//                     onClick={modalType === 'add' ? handleAdd : handleEdit}
//                     className="bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2 text-white font-medium transition-colors"
//                   >
//                     {modalType === 'add' ? 'Create Deck' : 'Update Deck'}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {modalType === 'delete' && selectedDeck && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
//             <h3 className="text-xl font-bold text-red-600 mb-3">Confirm Deletion</h3>
//             <p className="mb-6 text-gray-700">Are you sure you want to delete the deck: <strong>{selectedDeck.title}</strong>? This action cannot be undone.</p>
//             <div className="flex justify-end gap-3">
//               <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
//               <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FlashcardsTabContent;