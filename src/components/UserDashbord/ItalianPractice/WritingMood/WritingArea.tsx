import React from 'react';
import ProgressBar from './ProgressBar';

interface WritingAreaProps {
  prompt: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  minWords: number;
  maxWords: number;
  wordCount: number;
}

const WritingArea: React.FC<WritingAreaProps> = ({
  prompt, text, setText, minWords, maxWords, wordCount
}) => (
  <div className="    ">
    <div className="mb-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-3 rounded-r-lg">
        <p className="text-blue-900 font-medium">{prompt}</p>
      </div>

      <ProgressBar wordCount={wordCount} minWords={minWords} maxWords={maxWords} />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start writing your response..."
        className="w-full h-48 p-4   bg-[#F0F0F0]   rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
      />
    </div>
  </div>
);

export default WritingArea;
