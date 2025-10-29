import React from 'react';
import { Check, RefreshCw } from 'lucide-react';
import { TiArrowForward } from "react-icons/ti";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { GiCrossedAirFlows } from "react-icons/gi";

interface Answer {
  question: string;
  userAnswer?: string;
  correctAnswer: string;
  isCorrect: boolean;
}

interface ReadingExerciseCompleteProps {
  answers: Answer[];
}

const ReadingExerciseComplete: React.FC<ReadingExerciseCompleteProps> = ({ answers }) => {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctCount / answers.length) * 100);

  return (
    <div className="mx-auto rounded-lg">
      {/* Success Icon */}
      <div className="flex justify-center mb-4 mt-6">
        <div className="w-30 h-30 bg-[#4BAE4F] rounded-full flex items-center justify-center">
          <Check className="w-20 h-20 text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-center text-2xl mt-4 font-semibold text-gray-800 mb-2">
        Reading Exercise Complete!
      </h1>
      <p className="text-center text-base text-gray-500 mb-6">
        You scored {correctCount} out of {answers.length} questions ({percentage}%)
      </p>

      {/* Stats */}
      <div className="flex justify-between items-center gap-4 mb-6">
        <div className="text-center w-full py-3 border rounded-2xl 
                  bg-gray-100 dark:bg-gray-800 
                  border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {correctCount}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">CORRECT ANSWERS</div>
        </div>

        <div className="text-center w-full py-3 border rounded-2xl 
                  bg-gray-100 dark:bg-gray-800 
                  border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {percentage}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">ACCURACY</div>
        </div>

        <div className="text-center w-full py-3 border rounded-2xl 
                  bg-gray-100 dark:bg-gray-800 
                  border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            30+
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">XP EARNED</div>
        </div>
      </div>


      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          className="flex-1 py-3 px-4 border-2 rounded-2xl font-medium cursor-pointer 
             flex items-center justify-center gap-2 
             border-gray-900 text-gray-900 
             hover:bg-gray-50 dark:border-gray-300 dark:text-gray-200 dark:hover:bg-gray-700 
             transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>

        <button className="flex-1 justify-center cursor-pointer flex items-center gap-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Keep Reading Practice
          <TiArrowForward className="text-2xl" />
        </button>
      </div>

      {/* Answer Review Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Answer Review</h2>
        <div className="space-y-4">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="border-l-4 pl-4 py-2"
              style={{ borderColor: answer.isCorrect ? '#10b981' : '#ef4444' }}
            >
              <div className="flex items-start gap-2 mb-2">
                {answer.isCorrect ? (
                  <IoCheckmarkDoneSharp className="w-5 h-5 text-green-500  mt-0.5" />
                ) : (
                  <GiCrossedAirFlows className="w-5 h-5 text-red-500   mt-0.5" />
                )}
                <p className="text-base font-medium text-gray-800">{answer.question}</p>
              </div>

              <div className="ml-7 text-sm space-y-1">
                <div>
                  <span className="text-blue-600 font-medium">Your Answer: </span>
                  <span className={answer.isCorrect ? "text-gray-700" : "text-red-600"}>
                    {answer.userAnswer || "No answer"}
                  </span>
                </div>
                <div>
                  <span className="text-green-600 font-medium">Correct Answer: </span>
                  <span className="text-gray-700">{answer.correctAnswer}</span>
                </div>
              </div>

              <p className="ml-7 mt-2 text-xs text-gray-600">
                L'Università di Bologna è stata fondata nel 1088, rendendola una delle università più antiche del mondo.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingExerciseComplete;









