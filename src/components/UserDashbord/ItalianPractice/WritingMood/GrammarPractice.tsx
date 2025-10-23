import React, { useState } from 'react';
 import ExerciseHeader from '../ExerciseHeader';
import NavigationButtons from './NavigationButtons';


interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  sentence: string;
  options: Option[];
  selectedAnswer: string | null;
}

interface Props {
  onPrev: () => void;
  onFinish: () => void;
}

// ✅ Separate, reusable data
const grammarQuestions: Question[] = [
  {
    id: 1,
    sentence: "Il libro _____ molto interessante.",
    options: [
      { id: 'A', text: 'è davvero molto interessante.' },
      { id: 'B', text: 'sembra essere molto interessante.' },
      { id: 'C', text: 'risulta molto interessante.' },
      { id: 'D', text: 'appare molto interessante.' },
    ],
    selectedAnswer: null,
  },
  {
    id: 2,
    sentence: "Loro _____ arrivati in tempo alla riunione.",
    options: [
      { id: 'A', text: 'sono' },
      { id: 'B', text: 'saranno' },
      { id: 'C', text: 'erano' },
      { id: 'D', text: 'fossero' },
    ],
    selectedAnswer: null,
  },
  {
  id: 3,
  sentence: "Noi _____ a Roma per le vacanze estive.",
  options: [
    { id: 'A', text: 'andiamo' },
    { id: 'B', text: 'andate' },
    { id: 'C', text: 'vanno' },
    { id: 'D', text: 'va' },
  ],
  selectedAnswer: null,
},
{
  id: 4,
  sentence: "Tu _____ mai stato in Italia prima d’ora?",
  options: [
    { id: 'A', text: 'sei' },
    { id: 'B', text: 'eri' },
    { id: 'C', text: 'saresti' },
    { id: 'D', text: 'fossi' },
  ],
  selectedAnswer: null,
},
{
  id: 5,
  sentence: "Domani noi _____ una grande festa per il compleanno di Anna.",
  options: [
    { id: 'A', text: 'facciamo' },
    { id: 'B', text: 'faremo' },
    { id: 'C', text: 'abbiamo fatto' },
    { id: 'D', text: 'stiamo facendo' },
  ],
  selectedAnswer: null,
},
{
  id: 6,
  sentence: "Se piove, noi non _____ al mare.",
  options: [
    { id: 'A', text: 'andremo' },
    { id: 'B', text: 'andiamo' },
    { id: 'C', text: 'siamo andati' },
    { id: 'D', text: 'andremmo' },
  ],
  selectedAnswer: null,
},
];


interface Option { id: string; text: string; }
interface Question { id: number; sentence: string; options: Option[]; selectedAnswer: string | null; }

interface Props {
  onPrev: () => void;
  onFinish: () => void;
}

const GrammarPractice: React.FC<Props> = ({ onPrev, onFinish }) => {
const [questions, setQuestions] = useState<Question[]>(grammarQuestions);

  const handleSelect = (qid: number, oid: string) => {
    setQuestions(q => q.map(qs => qs.id === qid ? { ...qs, selectedAnswer: oid } : qs));
  };
 const [showTips, setShowTips] = useState(true);
  return (
    <div className="  mx-auto     rounded-xl     ">
      {/* <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Grammar Practice</h2>
        <div className="flex gap-2">
          <button onClick={onPrev} className="px-4 py-2 border rounded-lg">← Back</button>
        </div>
      </div> */}

       <ExerciseHeader
        title="Grammar Practice"
        description="Choose the correct grammatical form."
        progressLabel="Exercise 3 /3"
        showTips={showTips}
        onToggleTips={() => setShowTips(!showTips)}
      /> 


 <div className='w-full bg-[#EBEBEB] py-6 px-4 rounded-2xl mt-10'>
  <p > Select the correct form for each sentence:</p>
 </div>


     <div className=' mt-10 flex flex-col gap-6'>
       {questions.map(q => (
        <div key={q.id} className="mb-4">
          <p className="mb-2 text-xl font-medium"> {q.id}. {q.sentence}</p>
          <div className="grid grid-cols-2 gap-2">
            {q.options.map(o => (
              <button key={o.id} onClick={() => handleSelect(q.id, o.id)}
                className={`p-3 border rounded-lg text-base cursor-pointer text-left ${q.selectedAnswer === o.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <strong>{o.id}.</strong> {o.text}
              </button>
            ))}
          </div>
        </div>
      ))}
     </div>

      {/* <div className="mt-6 flex justify-end gap-4">
        <button onClick={onPrev} className="px-6 py-3 border rounded-lg">Back</button>
        <button onClick={onFinish} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Finish</button>
      </div> */}

  <NavigationButtons onPrev={onPrev} onNext={onFinish}/>
    </div>
  );
};

export default GrammarPractice;











 