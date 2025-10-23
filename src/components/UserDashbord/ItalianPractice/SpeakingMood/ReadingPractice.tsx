import React from 'react';
import MicButton from './MicButton';

interface ReadingPracticeProps {
  isRecording: boolean;
  onMicClick: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
}

const readingText = {
  italian: "La città di Roma è famosa in tutto il mondo per la sua storia antica e i suoi monumenti. Il Colosseo, il Foro Romano e la Fontana di Trevi sono alcune delle attrazioni più visitate ogni anno. Camminare per le strade di Roma è come fare un viaggio nel tempo, dove ogni pietra racconta una storia.",
  english: "The city of Rome is famous worldwide for its ancient history and monuments. The Colosseum, Roman Forum and Trevi Fountain are some of the most visited attractions every year. Walking through the streets of Rome is like taking a journey through time, where every stone tells a story.",
};

const ReadingPractice: React.FC<ReadingPracticeProps> = ({
  isRecording,
  onMicClick,
  onContinue,
  onTryAgain,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
            {readingText.italian}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {readingText.english}
          </p>
          <button className="px-4 cursor-pointer py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Hide Translation
          </button>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Record Your Reading
          </h3>
          
          <MicButton 
            isRecording={isRecording} 
            onClick={onMicClick} 
            label="Click the microphone to record your reading" 
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={onTryAgain}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>🔄</span>
              Try Again
            </button>
            <button
              onClick={onContinue}
              className="px-6 py-3 bg-blue-600 cursor-pointer rounded-lg font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingPractice;