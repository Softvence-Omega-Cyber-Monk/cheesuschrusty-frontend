import React from 'react';
import { Volume2, MessageSquare, CheckCircle, Mic } from 'lucide-react';
import { ConversationData } from './types';

interface ConversationPracticeProps {
  conversationData: ConversationData;
  conversationStarted: boolean;
  currentConversationStep: number;
  userResponses: string[];
  showConversationComplete: boolean;
  isRecording: boolean;
  onStart: () => void;
  onRecordResponse: () => void;
  onContinue: () => void;
  onTryAgain: () => void;
}

const ConversationPractice: React.FC<ConversationPracticeProps> = ({
  conversationData,
  conversationStarted,
  currentConversationStep,
  userResponses,
  showConversationComplete,
  isRecording,
  onStart,
  onRecordResponse,
  onContinue,
  onTryAgain,
}) => {
  
  // --- Conversation Complete View ---
  if (showConversationComplete) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={40} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Conversation Complete!</h2>
          <p className="text-gray-600">Great job completing the restaurant scenario!</p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onTryAgain}
            className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <span>🔄</span> Try Again
          </button>
          <button
            onClick={onContinue}
            className="px-6 py-3 cursor-pointer bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Next Exercise
          </button>
        </div>
      </div>
    );
  }

  // --- Start Conversation View ---
  if (!conversationStarted) {
    return (
      <div className=" rounded-lg    ">
        <div className="p-8 rounded-2xl bg-white">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                <MessageSquare className="text-indigo-600" size={40} />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{conversationData.title}</h2>
            <p className="text-gray-600 mb-4">{conversationData.description}</p>
            <button className="px-4 py-2 cursor-pointer text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              View Role Guidance
            </button>
          </div>
        </div>
          <div className="flex mt-6 justify-center">
            <button
              onClick={onStart}
              className="flex items-center cursor-pointer gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Volume2 size={20} />
              Begin Conversation
            </button>
          </div>
      </div>
    );
  }

  // --- Active Conversation View ---
  const isUserTurn = !isRecording && userResponses.length === currentConversationStep && currentConversationStep < conversationData.waiterMessages.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <MessageSquare className="text-indigo-600" size={32} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{conversationData.title}</h2>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto mb-8">
          {/* Conversation History */}
          {conversationData.waiterMessages.slice(0, currentConversationStep + 1).map((message, index) => (
            <div key={index} className="space-y-4">
              {/* Waiter Message */}
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 text-left">
                <p className="text-gray-900 font-medium mb-2">{message.italian}</p>
                <button className="flex items-center cursor-pointer gap-2 text-sm text-blue-600 hover:text-blue-700">
                  <Volume2 size={14} /> <span>Listen</span>
                </button>
              </div>
              
              {/* User Response (if recorded) */}
              {userResponses[index] && (
                <div className="flex justify-end">
                  <div className="bg-gray-900 text-white rounded-2xl rounded-tr-none p-4 max-w-md">
                    <p>{userResponses[index]}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Action Area */}
        {isUserTurn && (
          <div className="flex justify-center">
            <button
              onClick={onRecordResponse}
              className="flex items-center cursor-pointer gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Mic size={20} />
              Record Your Response
            </button>
          </div>
        )}

        {isRecording && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center animate-pulse mb-4">
              <Mic className="text-white" size={32} />
            </div>
            <p className="text-gray-600 text-sm">Recording your response...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationPractice;