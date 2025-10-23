
import React, { useState } from 'react';
import { SetupGoalView } from './SetupGoalView';
import { YourPlanView } from './YourPlanView';

type Tab = 'Setup Goal' | 'Your Plan';

export type GoalData = {
  focusAreas: string[];
  target: string;
  dailyTime: string;
  daysPerWeek: number;
};

const TabButton: React.FC<{
  label: Tab;
  isActive: boolean;
  onClick: (label: Tab) => void;
}> = ({ label, isActive, onClick }) => (
  <button
    className={`px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-white shadow-md bg-gradient-to-b from-indigo-500 to-purple-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
    onClick={() => onClick(label)}
  >
    {label}
  </button>
);

export const AIStudyPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Setup Goal');

  const [goalData, setGoalData] = useState<GoalData>({
    focusAreas: [],
    target: 'Learn 50 New Words',
    dailyTime: '20 minutes',
    daysPerWeek: 5,
  });

  return (
    <div className="  min-h-screen  ">
      <div className="mx-auto p-8 rounded-xl    ">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">AI Study Planner</h1>
        <p className="text-gray-500 mb-8">Create your personalized study plan with AI!</p>

        {/* Tab Navigation */}
        <div className="flex space-x-2 p-2 rounded-xl bg-gray-200 w-fit mb-10">
          <TabButton label="Setup Goal" isActive={activeTab === 'Setup Goal'} onClick={setActiveTab} />
          <TabButton label="Your Plan" isActive={activeTab === 'Your Plan'} onClick={setActiveTab} />
        </div>

        {/* Content */}
        <div className=''>
          {activeTab === 'Setup Goal' && (
            <SetupGoalView
              goalData={goalData}
              setGoalData={setGoalData}
              onGenerate={() => setActiveTab('Your Plan')}
            />
          )}
          {activeTab === 'Your Plan' && <YourPlanView goalData={goalData} />}
        </div>
      </div>
    </div>
  );
};












// import React, { useState } from 'react';
// import { SetupGoalView } from './SetupGoalView';
// import { YourPlanView } from './YourPlanView';

// type Tab = 'Setup Goal' | 'Your Plan';

// // const TabButton: React.FC<{
// //   label: Tab;
// //   isActive: boolean;
// //   onClick: (label: Tab) => void;
// // }> = ({ label, isActive, onClick }) => (
// //   <button
// //     className={`px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-colors duration-200 ${
// //       isActive
// //         ? 'bg-indigo-600 text-white shadow-md  ' 
// //         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //     }`}
// //     onClick={() => onClick(label)}
// //   >
// //     {label}
// //   </button>
// // );

// const TabButton: React.FC<{
//   label: Tab;
//   isActive: boolean;
//   onClick: (label: Tab) => void;
// }> = ({ label, isActive, onClick }) => (
//   <button
//     className={`px-6 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200 ${
//       isActive
//         ? 'text-white shadow-md bg-gradient-to-b from-indigo-500 to-purple-700'
//         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//     }`}
//     onClick={() => onClick(label)}
//   >
//     {label}
//   </button>
// );



// export const AIStudyPlanner: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<Tab>('Setup Goal');

//   return (
//     <div className="p-8   min-h-screen">
//       <div className="  mx-auto   p-8 rounded-xl  ">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-2">
//           AI Study Planner
//         </h1>
//         <p className="text-gray-500 mb-8">
//           Create your personalized study plan with AI!
//         </p>

//         {/* Tab Navigation */}
//         <div className="flex space-x-2 p-1 rounded-xl bg-gray-100 w-fit mb-10">
//           <TabButton
//             label="Setup Goal"
//             isActive={activeTab === 'Setup Goal'}
//             onClick={setActiveTab}
//           />
//           <TabButton
//             label="Your Plan"
//             isActive={activeTab === 'Your Plan'}
//             onClick={setActiveTab}
//           />
//         </div>
        
//         {/* Content */}
//         <div>
//           {activeTab === 'Setup Goal' && <SetupGoalView />}
//           {activeTab === 'Your Plan' && <YourPlanView />}
//         </div>
//       </div>
//     </div>
//   );
// };