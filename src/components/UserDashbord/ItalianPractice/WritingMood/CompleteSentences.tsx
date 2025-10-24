
import React, { useState } from 'react';
import { Lightbulb,  } from 'lucide-react';
import NavigationButtons from './NavigationButtons';
 import ExerciseHeader from '../ExerciseHeader';
// interface Sentence {
//   id: number;
//   prefix: string;
//   blank: string;
//   suffix: string;
//   hint: string;
//   userAnswer: string;
// }

// interface Props {
//   onPrev: () => void;
//   onNext: () => void;
// }
interface Sentence {
  id: number;
  prefix: string;
  blank: string;
  suffix: string;
  hint: string;
  userAnswer: string;
}

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

const sentenceData: Sentence[] = [
  {
    id: 1,
    prefix: 'Maria',
    blank: '',
    suffix: '(andare) al cinema ogni venerdì.',
    hint: 'Third person singular of "andare"',
    userAnswer: '',
  },
  {
    id: 2,
    prefix: 'Io',
    blank: '',
    suffix: '(mangiare) una mela ogni mattina.',
    hint: 'First person singular of "mangiare"',
    userAnswer: '',
  },
  {
    id: 3,
    prefix: 'Noi',
    blank: '',
    suffix: '(avere) due cani e un gatto.',
    hint: 'First person plural of "avere"',
    userAnswer: '',
  },
  {
  id: 4,
  prefix: 'Loro',
  blank: '',
  suffix: '(parlare) molto bene l’italiano.',
  hint: 'Third person plural of "parlare"',
  userAnswer: '',
},
{
  id: 5,
  prefix: 'Tu',
  blank: '',
  suffix: '(scrivere) una lettera a tua madre ogni settimana.',
  hint: 'Second person singular of "scrivere"',
  userAnswer: '',
},
{
  id: 6,
  prefix: 'Io',
  blank: '',
  suffix: '(dormire) otto ore ogni notte.',
  hint: 'First person singular of "dormire"',
  userAnswer: '',
},
];

const CompleteSentences: React.FC<Props> = ({ onPrev, onNext }) => {
  const [sentences, setSentences] = useState<Sentence[]>(sentenceData);

  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});

  const handleInputChange = (id: number, value: string) => {
    setSentences(sentences.map(s => (s.id === id ? { ...s, userAnswer: value } : s)));
  };

  const toggleHint = (id: number) => {
    setShowHints(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // const hideHints = () => setShowHints({});
 const [showTips, setShowTips] = useState(true);
  return (
    <div className="  mx-auto     rounded-xl      ">
      {/* <div className="flex items-start justify-between mb-6">
       <div className='flex items-center gap-3 '>
        <img src={completesectence} alt="" />
         <div>
          <h2 className="text-xl font-bold text-gray-900">Complete the Sentences</h2>
          <p className="text-sm text-gray-600">Fill in the blanks with the correct Italian words</p>
        </div>
       </div>
        <div className="flex gap-2">
          <button onClick={hideHints} className="px-3 py-1.5 cursor-pointer text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
            <Eye className="w-4 h-4" /> Hide Hints
          </button>
          <button className="px-3 py-1.5 cursor-pointer text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
          Exercise 2/3
        </button>
        </div> 
      </div> */}

       <ExerciseHeader
        title="Complete the Sentences"
        description="Fill in the blanks with the correct Italian words"
        progressLabel="Exercise 2/3"
        showTips={showTips}
        onToggleTips={() => setShowTips(!showTips)}
      />

      <div className="space-y-4 mt-10">
        {sentences.map(s => (
          <div key={s.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-2 flex-wrap text-xl">
              <span>{s.prefix}</span>
              <input
                type="text"
                placeholder="..."
                value={s.userAnswer}
                onChange={e => handleInputChange(s.id, e.target.value)}
                className="px-2 py-1 focus:border border-blue-500  rounded-md bg-[#EBEBEB] min-w-[100px]"
              />
              <span >{s.suffix}</span>
            </div>
            <button onClick={() => toggleHint(s.id)} className="flex mt-4   bg-[#F7F9FF] border border-[#AFC7FF] text-base cursor-pointer items-center gap-2  rounded-xl p-2 text-gray-600">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              {showHints[s.id] ? s.hint : 'Click to show hint'}
            </button>
          </div>
        ))}
      </div>
 
      <NavigationButtons onPrev={onPrev} onNext={onNext}/>
    </div>
  );
};

export default CompleteSentences;













 