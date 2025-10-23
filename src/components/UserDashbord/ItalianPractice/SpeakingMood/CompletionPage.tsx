import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CompletionPageProps {
  onPracticeAgain: () => void;
}

const CompletionPage: React.FC<CompletionPageProps> = ({ onPracticeAgain }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={50} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Speaking Practice Complete!</h2>
          <p className="text-gray-600">You scored 15 exercises in 8 sessions today!</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900">10</div>
            <div className="text-sm text-gray-600">Exercises Done</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900">75%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900">30+</div>
            <div className="text-sm text-gray-600">XP Earned</div>
          </div>
        </div>
        
        {/* Simplified Analysis & Study Plan (Kept as static for simplicity) */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="text-blue-600 mt-1">📊</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Performance Analysis - Needs Improvement</h3>
                <p className="text-sm text-gray-600">
                  Don't worry! Listening is often the most challenging skill. With targeted practice, you'll see rapid improvement.
                </p>
              </div>
            </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onPracticeAgain}
            className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>🔄</span> Practice Again
          </button>
          <button className="px-6 py-3 bg-blue-60 cursor-pointer rounded-lg font-medium text-white hover:bg-blue-700 transition-colors">
            ➜ More Speaking Practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionPage;
