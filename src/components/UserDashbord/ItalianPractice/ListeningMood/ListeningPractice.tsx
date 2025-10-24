

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ListeningDictation from './ListeningDictation';
import SentenceOrdering from './SentenceOrdering';
import ListeningPracticeComplete from './ListeningPracticeComplete';
import { ProgressBar } from '@/components/ProgressBar/ProgressBar';
import { AudioPlayerComponent } from './AudioPlayerComponent ';
import Header from '@/components/Header/Header';
import ExerciseHeader from '../ExerciseHeader';
import lisdteningicon from "../../../../assets/Dashbord/microhead.svg";
import audioFile from '../../../../assets/videoplayback_2.m4a';
// Define props interface
interface ListeningPracticeProps {
  continueCallback?: () => void; // optional if needed
}

// Define question type
interface Question {
  id: number;
  question: string;
  options: string[];
  selectedAnswer: string | null;
}

const ListeningPractice: React.FC<ListeningPracticeProps> = ({ continueCallback }) => {
  const navigate = useNavigate();
  // const audioSrc = "/videoplayback_2.m4a"; // correct
 
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, question: "Che cosa ordina Marco?", options: ["Un cappuccino", "Un caffè", "Un cornetto", "Un tè"], selectedAnswer: null },
    { id: 2, question: "Dove si svolge la conversazione?", options: ["In un ristorante", "In un bar", "In una pizzeria", "In un supermercato"], selectedAnswer: null },
    { id: 3, question: "A che ora è l'appuntamento di Marco?", options: ["Alle 9:00", "Alle 10:00", "Alle 11:00", "Alle 12:00"], selectedAnswer: null },
    { id: 4, question: "Con chi ha l'appuntamento Marco?", options: ["Con il suo capo", "Con un amico", "Con un cliente", "Con sua sorella"], selectedAnswer: null },
    { id: 5, question: "Quanto costa il caffè?", options: ["1 euro", "1.50 euro", "2 euro", "2.50 euro"], selectedAnswer: null },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [phase, setPhase] = useState<'questions' | 'dictation' | 'sentence' | 'complete'>('questions');
  const [showTips, setShowTips] = useState(true);
  const [currentExercise, setCurrentExercise] = useState(1);
  const totalExercises = 3;

  const handleOptionSelect = (option: string) => {
    const updated = [...questions];
    updated[currentQuestion].selectedAnswer = option;
    setQuestions(updated);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setPhase('dictation');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleDictationContinue = () => {
    setPhase('sentence');
    setCurrentExercise(currentExercise + 1);
  };

  const handleSentenceComplete = () => {
    setPhase('complete');
    setCurrentExercise(currentExercise + 1);
    continueCallback?.(); // call parent callback if provided
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {phase !== 'complete' && (
          <>
            <button
              onClick={() => navigate("/user/practice")}
              className="flex border p-3 cursor-pointer rounded-2xl items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
            >
              <ChevronLeft className="w-6 h-6" />
              <span className="text-base font-semibold">Back To Practice</span>
            </button>

            <Header title="Listening Practice" subtitle="Improve your Italian listening comprehension" />

            <ExerciseHeader
              title="Short Essay"
              icon={lisdteningicon}
              description="Write a short paragraph about the given topic."
              progressLabel={`Exercise ${currentExercise}/${totalExercises}`}
              showTips={showTips}
              onToggleTips={() => setShowTips(!showTips)}
            />

            <AudioPlayerComponent src={audioFile} />

            {phase === 'questions' && (
              <div className="rounded-xl mt-8 mb-6">
                <ProgressBar current={currentQuestion} total={questions.length} label="Question" color="bg-black" />

                <div className="bg-[#EBEBEB] rounded-lg p-4 mt-6 mb-4">
                  <h3 className="font-medium text-gray-900">{questions[currentQuestion].question}</h3>
                </div>

                <div className="space-y-3 mb-6">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full text-left px-4 py-3 border-2 rounded-lg transition-colors cursor-pointer ${
                        questions[currentQuestion].selectedAnswer === option
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'bg-white border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      <span className="font-semibold text-gray-900">{String.fromCharCode(65 + idx)}.</span>
                      <span className="ml-2 text-gray-700">{option}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestion === 0}
                      className={`px-6 py-3 border-2 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                        currentQuestion === 0
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      disabled={!questions[currentQuestion].selectedAnswer}
                      className={`px-6 py-3 rounded-lg font-medium  flex items-center gap-2 transition-colors cursor-pointer ${
                        !questions[currentQuestion].selectedAnswer
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                      <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {phase === 'dictation' && (
              <ListeningDictation continueCallback={handleDictationContinue} />
            )}

            {phase === 'sentence' && (
              <SentenceOrdering continueCallback={handleSentenceComplete} />
            )}
          </>
        )}

        {phase === 'complete' && <ListeningPracticeComplete />}
      </div>
    </div>
  );
};

export default ListeningPractice;













 