
import React, { useState } from 'react';

interface ListeningDictationProps {
  continueCallback: () => void; // <-- callback prop
}

const ListeningDictation: React.FC<ListeningDictationProps> = ({ continueCallback }) => {
  const [text, setText] = useState('');
  const targetWords = 30;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClearText = () => {
    setText('');
  };

  const handleContinue = () => {
    // Call the callback to move to the next step
    continueCallback();
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="  mx-auto p-6 bg-white">
      {/* Instruction */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <p className="text-gray-800 font-medium">Listen carefully and write what you hear</p>
      </div>

      {/* Text Area */}
      <div className="mb-4 ">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type what you hear here...."
          className="w-full bg-[#EBEBEB] h-40 p-4   focus:bg-indigo-50 focus:border-indigo-600 hover:bg-indigo-50 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500   text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Word Count */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-gray-600">
          Word Written: <span className="font-medium">{wordCount}</span>
        </span>
        <span className="text-sm text-gray-600">
          Target: <span className="font-medium">{targetWords}</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleClearText}
          className="px-8 py-3 cursor-pointer border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear Text
        </button>
        <button
          onClick={handleContinue}
          className="px-8 py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ListeningDictation;














 