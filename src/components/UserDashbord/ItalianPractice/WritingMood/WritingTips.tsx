import React from 'react';
import { Lightbulb,   } from 'lucide-react';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

interface WritingTipsProps {
  tips: string[];
}

const WritingTips: React.FC<WritingTipsProps> = ({ tips }) => (
  <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-6">
    <div className="flex items-center gap-2 mb-4">
      <Lightbulb className="w-5 h-5 text-yellow-500" />
      <h3 className="font-semibold text-gray-900">Writing Tips</h3>
    </div>
    <ul className="space-y-2">
      {tips.map((tip, index) => (
        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
          <IoCheckmarkDoneSharp className="w-4 h-4  text-[#0E9F6E] mt-0.5" />

          <span>{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default WritingTips;
