import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReadingExerciseComplete from "./ReadingExerciseComplete";
import readingicon from "../../../../assets/Dashbord/darkreading.svg";
import { MdOutlineTranslate } from "react-icons/md";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import Header from "@/components/Header/Header";

interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
}

const UserReadingPractice: React.FC = () => {
  const navigate = useNavigate();

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Question & answer state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Save theme to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const questions: Question[] = [
    {
      id: 1,
      question: "Quando è stata fondata l'Università di Bologna?",
      answers: ["1088", "1100", "1200", "1300"],
      correctAnswer: "1088",
    },
    {
      id: 2,
      question: "Quanti livelli ha il percorso di studi universitario in Italia?",
      answers: ["Due livelli", "Tre livelli", "Quattro livelli", "Cinque livelli"],
      correctAnswer: "Tre livelli",
    },
    {
      id: 3,
      question: "Dove si riuniscono spesso gli studenti per socializzare?",
      answers: ["In biblioteca", "Nelle piazze e nei caffè", "Nelle aule", "Nei dormitori"],
      correctAnswer: "Nelle piazze e nei caffè",
    },
    {
      id: 4,
      question: "Qual è il voto massimo nel sistema di valutazione italiano?",
      answers: ["25", "28", "30", "32"],
      correctAnswer: "30",
    },
  ];

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const saved = updatedAnswers[questions[nextIndex].id];
      setSelectedAnswer(saved || null);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      const saved = answers[questions[prevIndex].id];
      setSelectedAnswer(saved || null);
    }
  };

  const resultAnswers = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    return {
      question: q.question,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
    };
  });

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="mx-auto px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/user/practice")}
            className={`flex border p-3 rounded-2xl items-center gap-2 ${darkMode ? "border-gray-700 text-gray-200 hover:text-white" : "border-gray-300 text-gray-700 hover:text-gray-900"}`}
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base font-semibold">Back To Practice</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-medium border ${darkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-300 bg-white hover:bg-gray-100"}`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <Header
          title="Reading Practice"
          subtitle="Improve your Italian reading comprehension"
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Reading Passage */}
          <div className={`flex-1 flex flex-col gap-4 rounded-lg shadow-sm p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg">
                  <img className="w-8 h-8" src={readingicon} alt="" />
                </div>
                <h2 className="text-xl font-semibold dark:text-amber-50">
                  La Vita Universitaria in Italia
                </h2>
              </div>
              <button className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 border rounded-lg transition-colors ${darkMode ? "border-gray-700 hover:bg-gray-700 text-gray-200" : "border-gray-300 hover:bg-gray-50 text-gray-900"}`}>
                <MdOutlineTranslate className="w-4 h-4" />
                <span className="text-sm">Show Translation</span>
              </button>
            </div>

            <div className="space-y-4 leading-relaxed text-gray-700 dark:text-[#ffff]">
              <p className="dark:text-[#ffff]">
                L'università italiana ha una lunga tradizione che risale al
                Medioevo. Molte università italiane, come l'Università di
                Bologna fondata nel 1088, sono tra le più antiche del mondo.
              </p>
             <p className="dark:text-[#ffff]">
                Gli studenti universitari in Italia seguono un percorso di studi
                strutturato in tre livelli: la laurea triennale (tre anni), la
                laurea magistrale (due anni) e il dottorato di ricerca.
              </p>
            <p className="dark:text-[#ffff]">
                La vita sociale degli studenti è molto importante. Molti
                partecipano alle attività delle associazioni studentesche, che
                organizzano eventi culturali e ricreativi. È comune vedere
                gruppi di studenti nelle piazze o nei caffè vicino
                all'università.
              </p>
              <p className="dark:text-[#ffff]">
                Il sistema di valutazione italiano è basato su un punteggio da
                18 a 30, dove 18 è il voto minimo per superare un esame e 30 è
                il massimo. Gli studenti che ottengono 30 possono anche ricevere
                la "lode".
              </p>
            </div>

          </div>

          {/* Right Side */}
          <div className={`flex-1 rounded-lg shadow-sm p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            {isComplete ? (
              <ReadingExerciseComplete answers={resultAnswers} />
            ) : (
              <>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </span>
                  </div>
                  <ProgressBar
                    progress={progressPercentage}
                    color={darkMode ? "bg-blue-400" : "bg-black"}
                    height="h-3"
                    rounded="rounded-full"
                    className="mb-2"
                  />
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className={`text-lg py-6 px-4 font-semibold rounded-xl mb-6 ${darkMode ? "bg-gray-700 text-white" : "bg-[#EBEBEB] text-gray-900"}`}>
                    {currentQuestion.question}
                  </h3>

                  <div className="space-y-5">
                    {currentQuestion.answers.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(answer)}
                        className={`w-full text-left p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 ${selectedAnswer === answer
                            ? "border-blue-600 bg-blue-50 text-gray-900"
                            : darkMode
                              ? "border-gray-700 hover:border-gray-500 bg-gray-900 text-gray-200"
                              : "border-gray-200 hover:border-gray-300 bg-white text-gray-900"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span>{answer}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex gap-3">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1 px-6 py-3 border rounded-lg font-medium cursor-pointer text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={`flex-1 px-6 py-3 cursor-pointer rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300 ${selectedAnswer
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {currentQuestionIndex === totalQuestions - 1
                      ? "Finish"
                      : "Next"}
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReadingPractice;