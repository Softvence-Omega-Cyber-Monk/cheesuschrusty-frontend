import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Pause,
  Play,
  X,
  HelpCircle,
  Check,
  Star,
  Clock1,
  BookOpen,
} from "lucide-react";
import { TopicData } from "./FlashcardApp";

interface RatingButtonProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  colorClasses: string;
}

const RatingButton: React.FC<RatingButtonProps> = ({
  label,
  description,
  icon,
  colorClasses,
}) => (
  <button
    className={`p-4 rounded-xl text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md ${colorClasses}`}
  >
    {icon}
    <p className="font-bold text-lg mt-2 mb-1">{label}</p>
    <p className="text-xs">{description}</p>
  </button>
);

interface FlashcardReviewSessionProps {
  onContinue: () => void;
  topic: TopicData;
  cardIndex: number;
  goToNextCard: () => void;
  goToPreviousCard: () => void;
}

export const FlashcardReviewSession: React.FC<FlashcardReviewSessionProps> = ({
  topic,
  cardIndex,
  goToNextCard,
  goToPreviousCard,
  onContinue,
}) => {
  const [cardRevealed, setCardRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);

  const currentCard = useMemo(() => topic.cards[cardIndex], [topic, cardIndex]);
  const totalCards = topic.cards.length;

  const sessionStats = {
    viewed: cardIndex + 1,
    total: totalCards,
    correct: 8,
    incorrect: 4,
    time: "08:35 min",
  };

  const progressPercent = (sessionStats.viewed / sessionStats.total) * 100;

  const handleReveal = () => setCardRevealed(true);

  const handleNextCard = () => {
    setCardRevealed(false);
    goToNextCard();
  };

  const handlePreviousCard = () => {
    setCardRevealed(false);
    goToPreviousCard();
  };

  const isFirstCard = cardIndex === 0;
  const isLastCard = cardIndex === totalCards - 1;

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.word);
      utterance.lang = "it-IT";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech (TTS) is not supported by your browser.");
    }
  };

  const togglePause = () => setPaused((prev) => !prev);
  const handleEnd = () => setEnded(true);

  // If the session is ended, show summary
  if (ended) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center max-w-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Session Ended
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            You've completed your review session for{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {topic.title}
            </span>
            .
          </p>
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-blue-600 dark:bg-blue-700 cursor-pointer text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 relative transition-colors duration-200">
      {/* Breadcrumb */}
      <div className="mx-auto mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Advanced Flashcard &gt;{" "}
          <span className="text-gray-900 dark:text-white">{topic.title}</span>
        </p>
      </div>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8">
          {/* Flashcard Display */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={handlePreviousCard}
              disabled={isFirstCard}
              className={`absolute left-0 p-3 cursor-pointer bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-400 transition-colors z-10 border border-gray-200 dark:border-gray-700
                  ${
                    isFirstCard
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
            >
              <ChevronLeft size={24} />
            </button>

            <div
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl p-8 lg:p-12 text-center cursor-pointer transition-all border border-gray-200 dark:border-gray-700 ${
                paused ? "opacity-60 pointer-events-none" : ""
              }`}
              onClick={handleReveal}
              style={{ minHeight: "400px" }}
            >
              <span className="inline-flex items-center text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                <BookOpen size={14} className="mr-1" /> Italian Word
              </span>

              <h2 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white my-4">
                {currentCard.word}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {cardRevealed
                  ? currentCard.translation
                  : "Tap to reveal translation"}
              </p>

              <div className="flex items-center justify-center mt-10">
                <button
                  onClick={handleSpeak}
                  className="flex items-center cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Volume2 size={24} className="mr-2 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-sm">Click to hear pronunciation</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleNextCard}
              disabled={isLastCard}
              className={`absolute right-0 p-3 cursor-pointer bg-white dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-400 transition-colors z-10 border border-gray-200 dark:border-gray-700
                  ${
                    isLastCard
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Rating Buttons */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              How Well Did You Know This Word?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your answer helps optimize your learning schedule
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <RatingButton
                label="Didn't Know"
                description="Show again soon"
                icon={<X size={32} className="text-red-600 dark:text-red-400" />}
                colorClasses="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
              />
              <RatingButton
                label="Unsure"
                description="Review tomorrow"
                icon={<HelpCircle size={32} className="text-yellow-600 dark:text-yellow-400" />}
                colorClasses="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"
              />
              <RatingButton
                label="Good"
                description="Review in 3 days"
                icon={<Check size={32} className="text-orange-600 dark:text-orange-400" />}
                colorClasses="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
              />
              <RatingButton
                label="Perfect"
                description="Review in 1 week"
                icon={<Star size={32} className="text-green-600 dark:text-green-400" />}
                colorClasses="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handlePreviousCard}
                disabled={isFirstCard}
                className={`px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors ${
                  isFirstCard
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Previous Card
              </button>
              <button
                onClick={handleNextCard}
                className="px-8 py-3 bg-blue-600 dark:bg-blue-700 cursor-pointer text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                {isLastCard ? "Finish Session" : "Next Card"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              This Session
            </h3>

            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Card Viewed
            </p>
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {sessionStats.viewed}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {sessionStats.viewed} of {sessionStats.total} cards
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex space-x-4 mt-6">
              <div className="flex-1 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {sessionStats.correct.toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-600 dark:text-green-200">Correct</p>
              </div>
              <div className="flex-1 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center border border-red-200 dark:border-red-800">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {sessionStats.incorrect.toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-600 dark:text-red-200">Incorrect</p>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 mt-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock1 size={20} className="text-gray-600 dark:text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Session Time</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {sessionStats.time}
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {/* Toggle Pause/Resume Button */}
              <button
                onClick={togglePause}
                className={`w-full py-3 cursor-pointer font-medium rounded-lg flex items-center justify-center transition-colors ${
                  paused
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {paused ? (
                  <>
                    <Play size={20} className="mr-2" /> Resume Session
                  </>
                ) : (
                  <>
                    <Pause size={20} className="mr-2" /> Pause Session
                  </>
                )}
              </button>

              <button
                onClick={handleEnd}
                className="w-full py-3 bg-red-600 cursor-pointer text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <X size={20} className="mr-2" /> End Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardReviewSession;