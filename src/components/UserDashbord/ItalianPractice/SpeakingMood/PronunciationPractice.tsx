
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

  // ************************************************************
  // ** NEW: Text-to-Speech (TTS) Logic for Pronunciation Button **
  // ************************************************************
  const handleSpeak = () => {
    // 1. Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.italian);
      
      // 2. Set the language code (e.g., 'it-IT' for Italian)
      // This ensures the correct accent and reading rules are used.
      utterance.lang = "it-IT"; 
      
      // 3. Stop any current speech and speak the new phrase
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback for unsupported browsers
      console.error("Text-to-Speech (TTS) is not supported by your browser.");
      alert("Audio playback is not supported in this browser.");
    }
  };
  // ************************************************************

  return (
    <div className="rounded-lg">
      <div className="p-8">
        <div className="text-center mb-6 bg-white py-8 rounded-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            "{phrase.italian}"
          </h2>
          <p className="text-gray-600 text-lg mb-4">{phrase.english}</p>
          
          <button
            onClick={() => setShowPhonetic(!showPhonetic)}
            className="px-4 cursor-pointer py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showPhonetic ? 'Hide Phonetic' : 'Show Phonetic'}
          </button>
          
          {showPhonetic && (
            <p className="text-gray-500 text-sm mt-2">{phrase.phonetic}</p>
          )}
        </div>

        {/* ********************************************** */}
        {/* Updated Button to use handleSpeak */}
        {/* ********************************************** */}
        <div className="flex justify-center mb-8">
          <button 
              onClick={handleSpeak}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Volume2 size={20} className="text-gray-700" />
            <span className="font-medium text-gray-900">Listen To Pronunciation</span>
          </button>
        </div>
        {/* ********************************************** */}

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Record Your Pronunciation
          </h3>
          
          <MicButton 
            isRecording={isRecording} 
            onClick={onMicClick} 
            label="Click the microphone to record your pronunciation"
          />

          {recordingScore !== null && (
            <div className="mb-8 p-6 bg-green-50 rounded-lg max-w-md mx-auto">
              <div className="text-4xl font-bold text-green-600 mb-2">{recordingScore}%</div>
              <div className="text-sm text-gray-600 mb-4">Accuracy Score</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${recordingScore}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600">Excellent pronunciation!</div>
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={onTryAgain}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>🔄</span>
              Try Again
            </button>
            <button
              onClick={onContinue}
              className="px-6 cursor-pointer py-3 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationPractice;










 