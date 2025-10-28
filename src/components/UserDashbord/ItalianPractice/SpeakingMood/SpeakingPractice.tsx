import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
// Assuming these types and components are defined in separate files as per the refactoring
import { ExerciseType, Phrase, ConversationData } from './types';
import PronunciationPractice from './PronunciationPractice';
import ConversationPractice from './ConversationPractice';
import ReadingPractice from './ReadingPractice';
import CompletionPage from './CompletionPage';
import ExerciseHeader from './ExerciseHeader';

const pronunciationPhrases: Phrase[] = [
  {
    italian: "Buongiorno, Come Sta?",
    english: "Good morning, how are you?",
    phonetic: "[bwon-JOR-no, KO-meh STAH]"
  },
  {
    italian: "Mi Chiamo Marco E Vengo Dall'Italia.",
    english: "My name is Marco and I come from Italy.",
    phonetic: "[mee kee-AH-moh MAR-koh eh VEN-goh dahl ee-TAH-lee-ah]"
  },
  {
    // Index 2: The phrase shown in the image
    italian: "Dove Posso Trovare Una Farmacia?",
    english: "Where can I find a pharmacy?",
    phonetic: "[DOH-veh POS-soh troh-VAH-reh OO-nah far-mah-CHEE-ah]"
  },
  {
    // Index 3: A duplicate, kept for array length consistency
    italian: "Un caffè e un cornetto, per favore.", 
    english: "A coffee and a croissant, please.",
    phonetic: "[oon kahf-FEH eh oon kor-NET-toh, pehr fah-VOH-reh]"
  }
];

const conversationData: ConversationData = {
  title: "Ordering At A Restaurant",
  description: "You are at an Italian restaurant. The waiter will greet you and take your order.",
  waiterMessages: [
    { italian: "Buongiorno! Benvenuto al nostro ristorante. Ha una prenotazione?", english: "Good morning! Welcome to our restaurant. Do you have a reservation?" },
    { italian: "Perfetto, Ecco il menu. Desidera qualcosa da bere?", english: "Perfect, here is the menu. Would you like something to drink?" },
    { italian: "Ottima scelta! E per il primo piatto?", english: "Great choice! And for the first course?" },
    { italian: "Grazie! E un ordine arriverà tra 15 minuti.", english: "Thank you! Your order will arrive in 15 minutes." }
  ],
  userResponses: [
    "No, non ho una prenotazione. C'è un tavolo libero?",
    "Vorrei una birra, per favore.",
    "Prendo gli spaghetti carbonara.",
    "Perfetto, grazie mille!"
  ]
};

const SpeakingPractice: React.FC = () => {
  // --- STATE MODIFIED TO RENDER IMAGE VIEW ---
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>('pronunciation');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(2); // Start at the 3rd phrase (index 2)
  const [isRecording, setIsRecording] = useState(false);
  const [recordingScore, setRecordingScore] = useState<number | null>(94); // Start with a 94% score
  // ------------------------------------------
    
  const [conversationStarted, setConversationStarted] = useState(false);
  const [currentConversationStep, setCurrentConversationStep] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [showConversationComplete, setShowConversationComplete] = useState(false);

  const handleMicClick = () => {
    // Start Recording Simulation
    if (!isRecording) {
      setIsRecording(true);
      // Reset score when recording starts
      setRecordingScore(null); 
      // Stop Recording Simulation and Score after 2s
      setTimeout(() => {
        setIsRecording(false);
        // Set the score to 94% again (or a random one) for demonstration
        setRecordingScore(94); 
      }, 2000);
    }
  };

  const handleStartConversation = () => {
    setConversationStarted(true);
    setCurrentConversationStep(0);
    setUserResponses([]);
    setShowConversationComplete(false);
  };

  const handleRecordConversationResponse = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      // Simulate user response and advance conversation
      const newUserResponses = [...userResponses, conversationData.userResponses[currentConversationStep]];
      setUserResponses(newUserResponses);
      
      if (currentConversationStep < conversationData.waiterMessages.length - 1) {
        setTimeout(() => {
          setCurrentConversationStep(currentConversationStep + 1);
        }, 500);
      } else {
        setTimeout(() => {
          setShowConversationComplete(true);
        }, 500);
      }
    }, 2000);
  };

  const handleContinue = () => {
    if (currentExercise === 'pronunciation') {
      if (currentPhraseIndex < pronunciationPhrases.length - 1) {
        setCurrentPhraseIndex(currentPhraseIndex + 1);
        setRecordingScore(null);
      } else {
        setCurrentExercise('conversation');
        setCurrentPhraseIndex(0); // Reset for next exercise type
        setRecordingScore(null);
      }
    } else if (currentExercise === 'conversation') {
      setCurrentExercise('reading');
    } else if (currentExercise === 'reading') {
      setCurrentExercise('complete');
    }
    // Reset recording state
    setIsRecording(false);
    setRecordingScore(null);
  };

  const handleTryAgain = () => {
    setRecordingScore(null);
    setIsRecording(false);
  };

  const resetAllExercises = () => {
    setCurrentExercise('pronunciation');
    setCurrentPhraseIndex(0);
    setRecordingScore(null);
    setConversationStarted(false);
    setCurrentConversationStep(0);
    setUserResponses([]);
    setShowConversationComplete(false);
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto px-4 py-4">
          <button className="flex cursor-pointer items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back To Practice</span>
          </button>
        </div>
      </div>

      <div className="mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Speaking Practice
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Improve your Italian pronunciation and conversation skills
          </p>
        </div>

        {currentExercise !== 'complete' && (
          <ExerciseHeader 
            currentExercise={currentExercise} 
            currentPhraseIndex={currentPhraseIndex} 
          />
        )}

        {currentExercise === 'pronunciation' && (
          <PronunciationPractice
            phrase={pronunciationPhrases[currentPhraseIndex]}
            isRecording={isRecording}
            recordingScore={recordingScore}
            onMicClick={handleMicClick}
            onContinue={handleContinue}
            onTryAgain={handleTryAgain}
          />
        )}
        
        {currentExercise === 'conversation' && (
          <ConversationPractice
            conversationData={conversationData}
            conversationStarted={conversationStarted}
            currentConversationStep={currentConversationStep}
            userResponses={userResponses}
            showConversationComplete={showConversationComplete}
            isRecording={isRecording}
            onStart={handleStartConversation}
            onRecordResponse={handleRecordConversationResponse}
            onContinue={handleContinue}
            onTryAgain={handleStartConversation} // Start over simulation
          />
        )}

        {currentExercise === 'reading' && (
          <ReadingPractice
            isRecording={isRecording}
            onMicClick={handleMicClick} // Reusing the same recording logic for reading
            onContinue={handleContinue}
            onTryAgain={handleTryAgain}
          />
        )}

        {currentExercise === 'complete' && (
          <CompletionPage
            onPracticeAgain={resetAllExercises}
          />
        )}
      </div>
    </div>
  );
};

export default SpeakingPractice;