import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import MicButton from './MicButton';
import { Phrase } from './types';

interface PronunciationPracticeProps {
  phrase: Phrase;
  isRecording: boolean;
  recordingScore: number | null;
  onMicClick: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
}

const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({
  phrase,
  isRecording,
  recordingScore,
  onMicClick,
  onContinue,
  onTryAgain,
}) => {
  const [showPhonetic, setShowPhonetic] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.italian);
      utterance.lang = "it-IT";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech (TTS) is not supported by your browser.");
      alert("Audio playback is not supported in this browser.");
    }
  };

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="p-8">
        {/* Phrase Display Card */}
        <div className="text-center mb-6 bg-white dark:bg-gray-800 py-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            "{phrase.italian}"
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            {phrase.english}
          </p>

          <button
            onClick={() => setShowPhonetic(!showPhonetic)}
            className="px-4 cursor-pointer py-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {showPhonetic ? 'Hide Phonetic' : 'Show Phonetic'}
          </button>

          {showPhonetic && (
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              {phrase.phonetic}
            </p>
          )}
        </div>

        {/* Listen Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleSpeak}
            className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Volume2 size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="font-medium text-gray-900 dark:text-white">
              Listen To Pronunciation
            </span>
          </button>
        </div>

        {/* Recording Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Record Your Pronunciation
          </h3>

          <MicButton
            isRecording={isRecording}
            onClick={onMicClick}
            label="Click the microphone to record your pronunciation"
          />

          {/* Results Display */}
          {recordingScore !== null && (
            <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg max-w-md mx-auto border border-green-200 dark:border-green-800 transition-colors duration-200">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {recordingScore}%
              </div>
              <div className="text-sm text-gray-600 dark:text-green-200 mb-4">
                Accuracy Score
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${recordingScore}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 dark:text-green-200">
                {recordingScore >= 90 && "Excellent pronunciation! 🎉"}
                {recordingScore >= 70 && recordingScore < 90 && "Good job! Keep practicing! 👍"}
                {recordingScore >= 50 && recordingScore < 70 && "Not bad! Try again for better results! 💪"}
                {recordingScore < 50 && "Keep practicing! You'll get better! 🌟"}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onTryAgain}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md"
            >
              <span className="text-lg">🔄</span>
              Try Again
            </button>
            <button
              onClick={onContinue}
              className="px-6 cursor-pointer py-3 bg-blue-600 dark:bg-blue-700 rounded-lg font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
            >
              Continue
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Speak clearly and at a natural pace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationPractice;