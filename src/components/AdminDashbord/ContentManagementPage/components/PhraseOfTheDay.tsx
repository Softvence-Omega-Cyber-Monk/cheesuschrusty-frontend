import React, { useState } from 'react';
import { PhraseOfTheDay as PhraseType } from './types';

const initialPhrase: PhraseType = {
  italian: 'La vita è bella',
  englishTranslation: 'Life is beautiful',
  pronunciation: 'la VEE-ta eh BEL-la',
  explanation: 'A famous Italian phrase expressing optimism and appreciation for life.'
};

const PhraseOfTheDay: React.FC = () => {
  const [phrase, setPhrase] = useState<PhraseType>(initialPhrase);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPhrase((prev: PhraseType) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Phrase:', phrase);
    // Here you would typically make an API call to save the data
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Phrase of the Day</h2>
              <p className="text-slate-500 mt-1">Manage daily Italian phrases for user engagement</p>
            </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm space-y-6 max-w-2xl">
            <div>
                <label htmlFor="italian" className="block text-sm font-medium text-slate-700">Italian</label>
                <input type="text" id="italian" name="italian" value={phrase.italian} onChange={handleChange} className="mt-1 block w-full input"/>
            </div>
            <div>
                <label htmlFor="englishTranslation" className="block text-sm font-medium text-slate-700">English Translation</label>
                <input type="text" id="englishTranslation" name="englishTranslation" value={phrase.englishTranslation} onChange={handleChange} className="mt-1 block w-full input"/>
            </div>
            <div>
                <label htmlFor="pronunciation" className="block text-sm font-medium text-slate-700">Pronunciation</label>
                <input type="text" id="pronunciation" name="pronunciation" value={phrase.pronunciation} onChange={handleChange} className="mt-1 block w-full input"/>
            </div>
            <div>
                <label htmlFor="explanation" className="block text-sm font-medium text-slate-700">Explanation</label>
                <textarea id="explanation" name="explanation" value={phrase.explanation} onChange={handleChange} rows={3} className="mt-1 block w-full input"/>
            </div>
            <div>
                <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                    Update Todays Phrase
                </button>
            </div>
        </form>
        <style>{`
            .input { border-radius: 0.5rem; padding: 0.65rem 1rem; border: 1px solid #cbd5e1; width: 100%; transition: all 0.15s ease-in-out; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
            .input:focus { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4); outline: none; border-color: #3B82F6; }
        `}</style>
    </div>
  );
};

export default PhraseOfTheDay;