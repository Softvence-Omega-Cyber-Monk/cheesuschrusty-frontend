
import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface Sentence {
  id: number;
  text: string;
}

interface SentenceOrderingProps {
  continueCallback: () => void; // <-- callback prop
}

const SentenceOrdering: React.FC<SentenceOrderingProps> = ({ continueCallback }) => {
  const [availableSentences, setAvailableSentences] = useState<Sentence[]>([
    { id: 1, text: "Ne vorrei mezzo chilogrammo, per favore." },
    { id: 2, text: "Eccolo qui, nel reparto formaggi." },
    { id: 3, text: "Buongiorno, posso aiutarla?" },
    { id: 4, text: "Costa 24 euro al chilogrammo." },
    { id: 5, text: "Sì, sto cercando del formaggio parmigiano." }
  ]);

  const [orderedSentences, setOrderedSentences] = useState<Sentence[]>([]);

  const handleSentenceClick = (sentence: Sentence) => {
    setOrderedSentences([...orderedSentences, sentence]);
    setAvailableSentences(availableSentences.filter(s => s.id !== sentence.id));
  };

  const handleOrderedSentenceClick = (sentence: Sentence, index: number) => {
    const newOrdered = orderedSentences.filter((_, i) => i !== index);
    setOrderedSentences(newOrdered);
    setAvailableSentences([...availableSentences, sentence]);
  };

  const handleResetOrder = () => {
    setAvailableSentences([...availableSentences, ...orderedSentences]);
    setOrderedSentences([]);
  };

  const handleContinue = () => {
    // Instead of console.log, call the callback
    continueCallback();
  };

  return (
    <div className="  mx-auto p-6 bg-white">
      {/* Instruction */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <p className="text-gray-800 font-medium">
          Listen to the conversation and arrange the sentences in the correct order
        </p>
      </div>

      {/* Answer Area */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Your Answer <span className="text-gray-500 font-normal">(click sentences below to order)</span>
        </h3>
        <div className="min-h-[200px] bg-white border-2 border-gray-200 rounded-lg p-6">
          {orderedSentences.length === 0 ? (
            <p className="text-center text-gray-400 pt-16">
              Click on sentences below to add them in order
            </p>
          ) : (
            <div className="space-y-3">
              {orderedSentences.map((sentence, index) => (
                <div
                  key={sentence.id}
                  onClick={() => handleOrderedSentenceClick(sentence, index)}
                  className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  <span className="  w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <p className="text-gray-800 flex-1">{sentence.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Available Sentences */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Available Sentences:</h3>
        <div className="space-y-3">
          {availableSentences.map((sentence) => (
            <div
              key={sentence.id}
              onClick={() => handleSentenceClick(sentence)}
              className="p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <p className="text-gray-800">{sentence.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleResetOrder}
          className="px-8 py-3 cursor-pointer border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Order
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

export default SentenceOrdering;



















 