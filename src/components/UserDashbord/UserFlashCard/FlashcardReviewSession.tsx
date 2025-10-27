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
    className={`p-4   rounded-xl text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md ${colorClasses}`}
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Session Ended
          </h2>
          <p className="text-gray-600 mb-8">
            You’ve completed your review session for{" "}
            <span className="font-semibold">{topic.title}</span>.
          </p>
          <button
            onClick={onContinue}
            className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      {/* Breadcrumb */}
      <div className="mx-auto mb-6">
        <p className="text-sm text-gray-500 font-medium">
          Advanced Flashcard &gt;{" "}
          <span className="text-gray-900">{topic.title}</span>
        </p>
      </div>

      <div className="mx-auto grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8">
          {/* Flashcard Display */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={handlePreviousCard}
              disabled={isFirstCard}
              className={`absolute left-0 p-3 cursor-pointer bg-white rounded-full shadow-md text-gray-600 transition-colors z-10 
                  ${
                    isFirstCard
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
            >
              <ChevronLeft size={24} />
            </button>

            <div
              className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl p-12 text-center cursor-pointer transition-all ${
                paused ? "opacity-60 pointer-events-none" : ""
              }`}
              onClick={handleReveal}
              style={{ minHeight: "400px" }}
            >
              <span className="inline-flex items-center text-blue-600 bg-blue-50 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                <BookOpen size={14} className="mr-1" /> Italian Word
              </span>

              <h2 className="text-7xl font-extrabold text-gray-900 my-4">
                {currentCard.word}
              </h2>
              <p className="text-lg text-gray-600">
                {cardRevealed
                  ? currentCard.translation
                  : "Tap to reveal translation"}
              </p>

              <div className="flex items-center justify-center mt-10">
                <button
                  onClick={handleSpeak}
                  className="flex items-center cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <Volume2 size={24} className="mr-2 text-indigo-500" />
                  <span className="text-sm">Click to hear pronunciation</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleNextCard}
              disabled={isLastCard}
              className={`absolute right-0 p-3 cursor-pointer bg-white rounded-full shadow-md text-gray-600 transition-colors z-10
                  ${
                    isLastCard
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Rating Buttons */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              How Well Did You Know This Word?
            </h3>
            <p className="text-gray-600 mb-8">
              Your answer helps optimize your learning schedule
            </p>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <RatingButton
                label="Didn't Know"
                description="Show again soon"
                icon={<X size={32} className="text-red-600" />}
                colorClasses="bg-red-50 text-red-700 border border-red-200"
              />
              <RatingButton
                label="Unsure"
                description="Review tomorrow"
                icon={<HelpCircle size={32} className="text-yellow-600" />}
                colorClasses="bg-yellow-50 text-yellow-700 border border-yellow-200"
              />
              <RatingButton
                label="Good"
                description="Review in 3 days"
                icon={<Check size={32} className="text-orange-600" />}
                colorClasses="bg-orange-50 text-orange-700 border border-orange-200"
              />
              <RatingButton
                label="Perfect"
                description="Review in 1 week"
                icon={<Star size={32} className="text-green-600" />}
                colorClasses="bg-green-50 text-green-700 border border-green-200"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePreviousCard}
                disabled={isFirstCard}
                className={`px-8 py-3 bg-white border cursor-pointer border-gray-300 text-gray-700 font-medium rounded-lg transition-colors ${
                  isFirstCard
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Previous Card
              </button>
              <button
                onClick={handleNextCard}
                className="px-8 py-3 bg-blue-600 cursor-pointer text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isLastCard ? "Finish Session" : "Next Card"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              This Session
            </h3>

            <p className="text-sm font-semibold text-gray-800 mb-2">
              Card Viewed
            </p>
            <div className="flex justify-between items-center mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {sessionStats.viewed}
              </span>
              <span className="text-sm text-gray-500">
                {sessionStats.viewed} of {sessionStats.total} cards
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex space-x-4 mt-6">
              <div className="flex-1 p-4 bg-green-50 rounded-lg text-center border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {sessionStats.correct.toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-600">Correct</p>
              </div>
              <div className="flex-1 p-4 bg-red-50 rounded-lg text-center border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {sessionStats.incorrect.toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-gray-600">Incorrect</p>
              </div>
            </div>

            <div className="flex items-center justify-center p-4 mt-4 bg-gray-50 rounded-lg">
              <Clock1 size={20} className="text-gray-600 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Session Time</p>
                <p className="text-xl font-bold text-gray-900">
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















// import React, { useState, useMemo } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Volume2,
//   Pause,
//   X,
//   HelpCircle,
//   Check,
//   Star,
//   Clock1,
//   BookOpen,
//   Play,
// } from "lucide-react";
// import { TopicData } from "./FlashcardApp";

// interface RatingButtonProps {
//   label: string;
//   description: string;
//   icon: React.ReactNode;
//   colorClasses: string;
// }

// const RatingButton: React.FC<RatingButtonProps> = ({
//   label,
//   description,
//   icon,
//   colorClasses,
// }) => (
//   <button
//     className={`p-4 cursor-pointer rounded-xl text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md ${colorClasses}`}
//   >
//     {icon}
//     <p className="font-bold text-lg mt-2 mb-1">{label}</p>
//     <p className="text-xs">{description}</p>
//   </button>
// );

// interface FlashcardReviewSessionProps {
//   onContinue: () => void;
//   topic: TopicData;
//   cardIndex: number;
//   goToNextCard: () => void;
//   goToPreviousCard: () => void;
// }

// export const FlashcardReviewSession: React.FC<FlashcardReviewSessionProps> = ({
//   topic,
//   cardIndex,
//   goToNextCard,
//   goToPreviousCard,
//   onContinue,
// }) => {
//   const [cardRevealed, setCardRevealed] = useState(false);
//   const [paused, setPaused] = useState(false);
//   const [ended, setEnded] = useState(false);

//   const currentCard = useMemo(() => topic.cards[cardIndex], [topic, cardIndex]);
//   const totalCards = topic.cards.length;

//   const sessionStats = {
//     viewed: cardIndex + 1,
//     total: totalCards,
//     correct: 8,
//     incorrect: 4,
//     time: "08:35 min",
//   };

//   const progressPercent = (sessionStats.viewed / sessionStats.total) * 100;

//   const handleReveal = () => setCardRevealed(true);

//   const handleNextCard = () => {
//     setCardRevealed(false);
//     goToNextCard();
//   };

//   const handlePreviousCard = () => {
//     setCardRevealed(false);
//     goToPreviousCard();
//   };

//   const isFirstCard = cardIndex === 0;
//   const isLastCard = cardIndex === totalCards - 1;

//   const handleSpeak = () => {
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(currentCard.word);
//       utterance.lang = "it-IT";
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     } else {
//       alert("Text-to-Speech (TTS) is not supported by your browser.");
//     }
//   };

//   // --- Session controls ---
//   const handlePause = () => setPaused(true);
//   const handleResume = () => setPaused(false);
//   const handleEnd = () => setEnded(true);

//   // If the session is ended, show summary or exit
//   if (ended) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//         <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-lg">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Session Ended
//           </h2>
//           <p className="text-gray-600 mb-8">
//             You’ve completed your review session for{" "}
//             <span className="font-semibold">{topic.title}</span>.
//           </p>
//           <button
//             onClick={onContinue}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//           >
//             Return to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 relative">
//       {/* Pause Overlay */}
//       {paused && (
//         <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Session Paused
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Take a short break — your progress is saved.
//             </p>
//             <button
//               onClick={handleResume}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
//             >
//               <Play size={20} className="mr-2" /> Resume Session
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Breadcrumb */}
//       <div className="mx-auto mb-6">
//         <p className="text-sm text-gray-500 font-medium">
//           Advanced Flashcard &gt;{" "}
//           <span className="text-gray-900">{topic.title}</span>
//         </p>
//       </div>

//       <div className="mx-auto grid grid-cols-12 gap-8">
//         {/* Left Column */}
//         <div className="col-span-8">
//           {/* Flashcard Display */}
//           <div className="relative flex items-center justify-center">
//             <button
//               onClick={handlePreviousCard}
//               disabled={isFirstCard}
//               className={`absolute cursor-pointer left-0 p-3 bg-white rounded-full shadow-md text-gray-600 transition-colors z-10 
//                   ${
//                     isFirstCard
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-gray-100"
//                   }`}
//             >
//               <ChevronLeft size={24} />
//             </button>

//             <div
//               className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-12 text-center cursor-pointer"
//               onClick={handleReveal}
//               style={{ minHeight: "400px" }}
//             >
//               <span className="inline-flex items-center text-blue-600 bg-blue-50 text-xs font-semibold px-3 py-1 rounded-full mb-6">
//                 <BookOpen size={14} className="mr-1" /> Italian Word
//               </span>

//               <h2 className="text-7xl font-extrabold text-gray-900 my-4">
//                 {currentCard.word}
//               </h2>
//               <p className="text-lg text-gray-600">
//                 {cardRevealed
//                   ? currentCard.translation
//                   : "Tap to reveal translation"}
//               </p>

//               <div className="flex items-center justify-center mt-10">
//                 <button
//                   onClick={handleSpeak}
//                   className="flex cursor-pointer items-center text-gray-700 hover:text-indigo-600 transition-colors"
//                 >
//                   <Volume2 size={24} className="mr-2 text-indigo-500" />
//                   <span className="text-sm">Click to hear pronunciation</span>
//                 </button>
//               </div>
//             </div>

//             <button
//               onClick={handleNextCard}
//               disabled={isLastCard}
//               className={`absolute cursor-pointer right-0 p-3 bg-white rounded-full shadow-md text-gray-600 transition-colors z-10
//                   ${
//                     isLastCard
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-gray-100"
//                   }`}
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           {/* Rating Buttons */}
//           <div className="mt-12 text-center">
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">
//               How Well Did You Know This Word?
//             </h3>
//             <p className="text-gray-600 mb-8">
//               Your answer helps optimize your learning schedule
//             </p>

//             <div className="grid grid-cols-4 gap-4 mb-8">
//               <RatingButton
//                 label="Didn't Know"
//                 description="Show again soon"
//                 icon={<X size={32} className="text-red-600" />}
//                 colorClasses="bg-red-50 text-red-700 border border-red-200"
//               />
//               <RatingButton
//                 label="Unsure"
//                 description="Review tomorrow"
//                 icon={<HelpCircle size={32} className="text-yellow-600" />}
//                 colorClasses="bg-yellow-50 text-yellow-700 border border-yellow-200"
//               />
//               <RatingButton
//                 label="Good"
//                 description="Review in 3 days"
//                 icon={<Check size={32} className="text-orange-600" />}
//                 colorClasses="bg-orange-50 text-orange-700 border border-orange-200"
//               />
//               <RatingButton
//                 label="Perfect"
//                 description="Review in 1 week"
//                 icon={<Star size={32} className="text-green-600" />}
//                 colorClasses="bg-green-50 text-green-700 border border-green-200"
//               />
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={handlePreviousCard}
//                 disabled={isFirstCard}
//                 className={`px-8 py-3 cursor-pointer bg-white border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors ${
//                   isFirstCard
//                     ? "opacity-50 cursor-not-allowed"
//                     : "hover:bg-gray-100"
//                 }`}
//               >
//                 Previous Card
//               </button>
//               <button
//                 onClick={handleNextCard}
//                 className="px-8 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 {isLastCard ? "Finish Session" : "Next Card"}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Stats */}
//         <div className="col-span-4 space-y-4">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h3 className="font-bold text-lg text-gray-900 mb-4">
//               This Session
//             </h3>

//             <p className="text-sm font-semibold text-gray-800 mb-2">
//               Card Viewed
//             </p>
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-2xl font-bold text-gray-900">
//                 {sessionStats.viewed}
//               </span>
//               <span className="text-sm text-gray-500">
//                 {sessionStats.viewed} of {sessionStats.total} cards
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-indigo-600 h-2 rounded-full"
//                 style={{ width: `${progressPercent}%` }}
//               ></div>
//             </div>

//             <div className="flex space-x-4 mt-6">
//               <div className="flex-1 p-4 bg-green-50 rounded-lg text-center border border-green-200">
//                 <div className="text-2xl font-bold text-green-600">
//                   {sessionStats.correct.toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-sm text-gray-600">Correct</p>
//               </div>
//               <div className="flex-1 p-4 bg-red-50 rounded-lg text-center border border-red-200">
//                 <div className="text-2xl font-bold text-red-600">
//                   {sessionStats.incorrect.toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-sm text-gray-600">Incorrect</p>
//               </div>
//             </div>

//             <div className="flex items-center justify-center p-4 mt-4 bg-gray-50 rounded-lg">
//               <Clock1 size={20} className="text-gray-600 mr-2" />
//               <div>
//                 <p className="text-sm text-gray-500">Session Time</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {sessionStats.time}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-3 mt-6">
//               <button
//                 onClick={handlePause}
//                 className="w-full cursor-pointer py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//               >
//                 <Pause size={20} className="mr-2" /> Pause Session
//               </button>
//               <button
//                 onClick={handleEnd}
//                 className="w-full py-3 cursor-pointer bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
//               >
//                 <X size={20} className="mr-2" /> End Session
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardReviewSession;




























// import React, { useState, useMemo } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Volume2,
//   Pause,
//   X,
//   HelpCircle,
//   Check,
//   Star,
//   Clock1,
//   BookOpen,
// } from "lucide-react";
// import { TopicData } from "./FlashcardApp"; // Import the TopicData type

// // --- Rating Button --- (remains the same)
// interface RatingButtonProps {
//   label: string;
//   description: string;
//   icon: React.ReactNode;
//   colorClasses: string;
// }

// const RatingButton: React.FC<RatingButtonProps> = ({
//   label,
//   description,
//   icon,
//   colorClasses,
// }) => (
//   <button
//     className={`p-4 cursor-pointer rounded-xl text-center flex flex-col items-center justify-center transition-shadow hover:shadow-md ${colorClasses}`}
//   >
//     {icon}
//     <p className="font-bold text-lg mt-2 mb-1">{label}</p>
//     <p className="text-xs">{description}</p>
//   </button>
// );

// // --- Main Flashcard Review Session ---
// interface FlashcardReviewSessionProps {
//   onContinue: () => void;
//   topic: TopicData; // New prop for the selected topic
//   cardIndex: number; // New prop for the current card index
//   goToNextCard: () => void; // Handler for next card
//   goToPreviousCard: () => void; // Handler for previous card
// }

// export const FlashcardReviewSession: React.FC<
//   FlashcardReviewSessionProps
// > = ({   topic, cardIndex, goToNextCard, goToPreviousCard }) => {
//   const [cardRevealed, setCardRevealed] = useState(false);

//   // Dynamic Card Data
//   const currentCard = useMemo(
//     () => topic.cards[cardIndex],
//     [topic, cardIndex]
//   );
  
//   const totalCards = topic.cards.length;

//   // Session Stats (now based on totalCards)
//   const sessionStats = {
//     viewed: cardIndex + 1, // viewed is the current index + 1
//     total: totalCards, // total cards in the topic
//     correct: 8, // Keep static for now
//     incorrect: 4, // Keep static for now
//     time: "08:35 min", // Keep static for now
//   };

//   const progressPercent = (sessionStats.viewed / sessionStats.total) * 100;

//   const handleReveal = () => {
//     setCardRevealed(true);
//   };
  
//   // Custom next card handler that resets the reveal state
//   const handleNextCard = () => {
//       setCardRevealed(false);
//       goToNextCard();
//   }
  
//   // Custom previous card handler that resets the reveal state
//   const handlePreviousCard = () => {
//       setCardRevealed(false);
//       goToPreviousCard();
//   }

//   // Determine if navigation buttons should be disabled
//   const isFirstCard = cardIndex === 0;
//   const isLastCard = cardIndex === totalCards - 1;



// const handleSpeak = () => {
//     // Check if the browser supports Speech Synthesis
//     if ("speechSynthesis" in window) {
//       const utterance = new SpeechSynthesisUtterance(currentCard.word);
      
//       // Set the language (e.g., 'it-IT' for Italian)
//       // This is crucial for correct pronunciation.
//       utterance.lang = "it-IT"; 
      
//       // Stop any current speech and speak the new word
//       window.speechSynthesis.cancel();
//       window.speechSynthesis.speak(utterance);
//     } else {
//       alert("Text-to-Speech (TTS) is not supported by your browser.");
//     }
//   };









//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Breadcrumb */}
//       <div className="  mx-auto mb-6">
//         <p className="text-sm text-gray-500 font-medium">
//           Advanced Flashcard &gt;{" "}
//           <span className="text-gray-900">{topic.title}</span> {/* Dynamic Topic Title */}
//         </p>
//       </div>

//       <div className="  mx-auto grid grid-cols-12 gap-8">
//         {/* Left Column */}
//         <div className="col-span-8">
//           {/* Flashcard Display */}
//           <div className="relative flex items-center justify-center">
//             {/* Previous Card Button */}
//             <button
//               onClick={handlePreviousCard}
//               disabled={isFirstCard}
//               className={`absolute cursor-pointer left-0 p-3 bg-white rounded-full shadow-md text-gray-600 transition-colors z-10 
//                   ${isFirstCard ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//             >
//               <ChevronLeft size={24} />
//             </button>

//             <div
//               className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-12 text-center cursor-pointer"
//               onClick={handleReveal}
//               style={{ minHeight: "400px" }}
//             >
//               <span className="inline-flex items-center text-blue-600 bg-blue-50 text-xs font-semibold px-3 py-1 rounded-full mb-6">
//                 <BookOpen size={14} className="mr-1" /> Italian Word
//               </span>

//               <h2 className="text-7xl font-extrabold text-gray-900 my-4">
//                 {currentCard.word} {/* Dynamic Word */}
//               </h2>
//               <p className="text-lg text-gray-600">
//                 {cardRevealed
//                   ? currentCard.translation // Dynamic Translation
//                   : "Tap to reveal translation"}
//               </p>

//               {/* <div className="flex items-center justify-center mt-10">
//                 <button className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
//                   <Volume2 size={24} className="mr-2 text-indigo-500" />
//                   <span className="text-sm">Click to hear pronunciation</span>
//                 </button>
//               </div> */}




// <div className="flex items-center justify-center mt-10">
//                 <button 
//                   onClick={handleSpeak} // Call the TTS function
//                   className="flex cursor-pointer items-center text-gray-700 hover:text-indigo-600 transition-colors"
//                 >
//                   <Volume2 size={24} className="mr-2 text-indigo-500" />
//                   <span className="text-sm">Click to hear pronunciation</span>
//                 </button>
//               </div>






              
//             </div>

//             {/* Next Card Button */}
//             <button
//               onClick={handleNextCard}
//               disabled={isLastCard}
//               className={`absolute cursor-pointer right-0 p-3 bg-white rounded-full shadow-md text-gray-600 transition-colors z-10
//                   ${isLastCard ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>

//           {/* Rating Buttons */}
//           <div className="mt-12 text-center">
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">
//               How Well Did You Know This Word?
//             </h3>
//             <p className="text-gray-600 mb-8">
//               Your answer helps optimize your learning schedule
//             </p>

//             <div className="grid grid-cols-4 gap-4 mb-8">
//               <RatingButton
//                 label="Didn't Know"
//                 description="Show again soon"
//                 icon={<X size={32} className="text-red-600" />}
//                 colorClasses="bg-red-50 text-red-700 border border-red-200"
//               />
//               <RatingButton
//                 label="Unsure"
//                 description="Review tomorrow"
//                 icon={<HelpCircle size={32} className="text-yellow-600" />}
//                 colorClasses="bg-yellow-50 text-yellow-700 border border-yellow-200"
//               />
//               <RatingButton
//                 label="Good"
//                 description="Review in 3 days"
//                 icon={<Check size={32} className="text-orange-600" />}
//                 colorClasses="bg-orange-50 text-orange-700 border border-orange-200"
//               />
//               <RatingButton
//                 label="Perfect"
//                 description="Review in 1 week"
//                 icon={<Star size={32} className="text-green-600" />}
//                 colorClasses="bg-green-50 text-green-700 border border-green-200"
//               />
//             </div>

//             {/* Navigation Buttons */}
//             <div className="flex justify-center space-x-4">
//               <button 
//                   onClick={handlePreviousCard}
//                   disabled={isFirstCard}
//                   className={`px-8 py-3 cursor-pointer bg-white border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors ${isFirstCard ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
//               >
//                 Previous Card
//               </button>
//               <button
//                 onClick={handleNextCard}
//                 className="px-8 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 {isLastCard ? "Finish Session" : "Next Card"} {/* Dynamic button text */}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Stats */}
//         <div className="col-span-4 space-y-4">
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <h3 className="font-bold text-lg text-gray-900 mb-4">
//               This Session
//             </h3>

//             <p className="text-sm font-semibold text-gray-800 mb-2">
//               Card Viewed
//             </p>
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-2xl font-bold text-gray-900">
//                 {sessionStats.viewed}
//               </span>
//               <span className="text-sm text-gray-500">
//                 {sessionStats.viewed} of {sessionStats.total} cards
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-indigo-600 h-2 rounded-full"
//                 style={{ width: `${progressPercent}%` }}
//               ></div>
//             </div>

//             {/* Correct / Incorrect */}
//             <div className="flex space-x-4 mt-6">
//               <div className="flex-1 p-4 bg-green-50 rounded-lg text-center border border-green-200">
//                 <div className="text-2xl font-bold text-green-600">
//                   {sessionStats.correct.toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-sm text-gray-600">Correct</p>
//               </div>
//               <div className="flex-1 p-4 bg-red-50 rounded-lg text-center border border-red-200">
//                 <div className="text-2xl font-bold text-red-600">
//                   {sessionStats.incorrect.toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-sm text-gray-600">Incorrect</p>
//               </div>
//             </div>

//             {/* Session Time */}
//             <div className="flex items-center justify-center p-4 mt-4 bg-gray-50 rounded-lg">
//               <Clock1 size={20} className="text-gray-600 mr-2" />
//               <div>
//                 <p className="text-sm text-gray-500">Session Time</p>
//                 <p className="text-xl font-bold text-gray-900">
//                   {sessionStats.time}
//                 </p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3 mt-6">
//               <button className="w-full cursor-pointer py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
//                 <Pause size={20} className="mr-2" /> Pause Session
//               </button>
//               <button className="w-full py-3 cursor-pointer bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center">
//                 <X size={20} className="mr-2" /> End Session
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlashcardReviewSession;













 