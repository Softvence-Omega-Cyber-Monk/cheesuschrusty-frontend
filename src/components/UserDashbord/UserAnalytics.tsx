import React from 'react';
import { 
    Target, BookOpen, Bolt,  Mic, Pencil, 
  Headphones, TrendingUp, Clock, ArrowUpRight,   BookA,
  BookMarked, Users, Sparkles,
  FireExtinguisher
} from 'lucide-react'; 
import { ProgressBar } from '../ProgressBar/ProgressBar';
import timeicon from "../../assets/Dashbord/timeicon.svg"
import fireicon from "../../assets/Dashbord/fireicon2.svg"
import bookicon from "../../assets/Dashbord/bookopen.svg"
import tergeticon from "../../assets/Dashbord/tergeticon.svg"
// --- 1. Small Components (For Organization) ---

// 1.1. SummaryCard (The top row of stats)
interface SummaryCardProps {
    title: string;
    value: string;
    icon: string | undefined;
    color: string;
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
    <div className="flex   justify-between p-4 items-start bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="text-3xl font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center `}>
       <img src={icon} alt="" />
        </div>
    </div>
);

// 1.2. WeeklyBar (Individual progress bar for Weekly Performance)
// interface WeeklyBarProps {
//     day: string;
//     accuracy: number;
//     minutes: number;
// }
// const WeeklyBar: React.FC<WeeklyBarProps> = ({ day, accuracy, minutes }) => {
//     const goalMinutes = 40;
//     const progressWidth = (minutes / goalMinutes) * 100;

//     return (
//         <div className="mb-4">
//             <div className="flex justify-between items-center text-sm mb-1">
//                 <div className="font-semibold text-gray-700">{day}</div>
//                 <div className={`font-medium ${accuracy >= 70 ? 'text-green-600' : 'text-orange-500'}`}>
//                     {accuracy}% Accuracy
//                 </div>
//             </div>
//             <div className="h-2 bg-gray-200 rounded-full">
//                 <div 
//                     className="h-2 bg-indigo-600 rounded-full" 
//                     style={{ width: `${Math.min(progressWidth, 100)}%` }}
//                 ></div>
//             </div>
//             <div className="flex justify-between text-xs text-gray-500 mt-1">
//                 <span>{minutes} min</span>
//                 <span>{goalMinutes} min goal</span>
//             </div>
//         </div>
//     );
// };


  
interface WeeklyBarProps {
  day: string;
  accuracy: number;
  minutes: number;
}

const WeeklyBar: React.FC<WeeklyBarProps> = ({ day, accuracy, minutes }) => {
  const goalMinutes = 40;

  return (
    <div className="mb-4 border rounded-xl border-[#EBEBEB] p-3">
      {/* Header with day and accuracy */}
      <div className="flex justify-between items-center text-sm mb-3">
        <div className="font-semibold text-[#585858]">{day}</div>
        <div
          className={`font-medium ${
            accuracy >= 70 ? "text-green-600" : "text-[#0E9F6E]"
          }`}
        >
          {accuracy}% Accuracy
        </div>
      </div>

      {/* Use the reusable ProgressBar */}
      <ProgressBar
        current={minutes}
        total={goalMinutes}
        color="bg-black"
        height="h-2"
        rounded="rounded-full"
      />

      {/* Footer with numeric minutes */}
      <div className="flex mt-3 justify-between text-xs text-gray-500 ">
        <span>{minutes} min</span>
        <span>{goalMinutes} min goal</span>
      </div>
    </div>
  );
};

 



// 1.3. SkillProgressCard (Reading, Listening, Writing, Speaking)
interface SkillCardProps {
    skill: string;
    icon: React.ReactNode;
    lessons: number;
    completion: number;
    improvement: number;
    iconBg: string;
}
const SkillProgressCard: React.FC<SkillCardProps> = ({ skill, icon, lessons, completion, improvement, iconBg }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
                {icon}
            </div>
            <div className="flex items-center text-sm font-semibold text-green-600">
                <ArrowUpRight size={16} className="mr-1" />
                +{improvement}%
            </div>
        </div>
        
        <h4 className="text-md font-bold text-gray-800">{skill}</h4>
        <p className="text-sm text-gray-500 mb-4">{lessons} Lessons completed</p>

        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${completion}%` }}
            ></div>
        </div>
        <p className="text-xs font-medium text-gray-700">{completion}% Completed</p>
    </div>
);

// 1.4. AchievementItem
interface AchievementItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}
const AchievementItem: React.FC<AchievementItemProps> = ({ icon, title, subtitle }) => (
    <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-2">
        <div className="mr-3 text-gray-600">
            {icon}
        </div>
        <div>
            <p className="font-semibold text-sm text-gray-900">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    </div>
);

// 1.5. RecentSessionItem
interface RecentSessionItemProps {
    icon: React.ReactNode;
    title: string;
    time: string;
    accuracy: number;
}
const RecentSessionItem: React.FC<RecentSessionItemProps> = ({ icon, title, time, accuracy }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mb-2">
        <div className="flex items-center">
            <div className="mr-3 text-indigo-600">
                {icon}
            </div>
            <div>
                <p className="font-medium text-sm text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
        <span className={`text-sm font-bold ${accuracy >= 90 ? 'text-green-600' : 'text-blue-600'}`}>
            {accuracy}%
        </span>
    </div>
);

// --- 2. Main Analytics Page (Assembled) ---

export const UserAnalytics: React.FC = () => {
    // Data to match the image
    const weeklyProgress = [
        { day: 'Monday', accuracy: 53, minutes: 25 },
        { day: 'Tuesday', accuracy: 55, minutes: 25 },
        { day: 'Wednesday', accuracy: 63, minutes: 25 },
        { day: 'Thursday', accuracy: 68, minutes: 25 },
        { day: 'Friday', accuracy: 59, minutes: 25 },
        { day: 'Saturday', accuracy: 55, minutes: 25 },
        { day: 'Sunday', accuracy: 55, minutes: 25 },
    ];

 



    return (
        <div className="p-6   min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
            <p className="text-gray-600 mb-8">Track your progress and achievements in Italian learning</p>

            {/* --- TOP SUMMARY CARDS --- */}
            <div className="grid grid-cols-4 gap-4 mb-10">
                <SummaryCard 
                    title="This Week" 
                    value="175m" 
                    // icon={<Clock className="w-5 h-5 text-white" />} 
                    icon={timeicon} 
                    color="bg-indigo-500"
                />
                <SummaryCard 
                    title="Current Streak" 
                    value="7 Days" 
                    icon={fireicon} 
                    color="bg-red-500"
                />
                <SummaryCard 
                    title="Avg. Accuracy" 
                    value="86%" 
                    icon={tergeticon} 
                    color="bg-green-500"
                />
                <SummaryCard 
                    title="Total Lessons" 
                    value="84" 
                    icon={bookicon} 
                    color="bg-blue-500"
                />
            </div>
            {/* ------------------------- */}

            <div className="grid grid-cols-12 gap-6">
                
                {/* --- LEFT COLUMN (Weekly Performance & Skill Progress) --- */}
                <div className="col-span-8 space-y-6">
                    
                    {/* Weekly Performance */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                            <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" />
                            Weekly Performance
                        </h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Study time and accuracy over the past week
                        </p>
                        {weeklyProgress.map((data) => (
                            <WeeklyBar 
                                key={data.day}
                                day={data.day} 
                                accuracy={data.accuracy} 
                                minutes={data.minutes} 
                            />
                        ))}
                    </div>

                    {/* Skill Progress */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center mb-6">
                            <ArrowUpRight className="w-5 h-5 text-indigo-600 mr-2" />
                            Skill Progress
                        </h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Your improvement in each skill area
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <SkillProgressCard
                                skill="Reading"
                                icon={<BookA className="w-6 h-6 text-white" />}
                                lessons={12}
                                completion={75}
                                improvement={12}
                                iconBg="bg-blue-500"
                            />
                            <SkillProgressCard
                                skill="Listening"
                                icon={<Headphones className="w-6 h-6 text-white" />}
                                lessons={14}
                                completion={75}
                                improvement={12}
                                iconBg="bg-orange-500"
                            />
                            <SkillProgressCard
                                skill="Writing"
                                icon={<Pencil className="w-6 h-6 text-white" />}
                                lessons={18}
                                completion={75}
                                improvement={12}
                                iconBg="bg-green-500"
                            />
                            <SkillProgressCard
                                skill="Speaking"
                                icon={<Mic className="w-6 h-6 text-white" />}
                                lessons={15}
                                completion={75}
                                improvement={12}
                                iconBg="bg-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN (Achievements & Sessions) --- */}
                <div className="col-span-4 space-y-6">
                    
                    {/* Recent Achievements */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Recent Achievements
                        </h2>
                        <AchievementItem 
                            icon={<FireExtinguisher size={20} />} 
                            title="7 Day Streak" 
                            subtitle="4 days ago"
                        />
                        <AchievementItem 
                            icon={<Bolt size={20} />} 
                            title="Fast Learner" 
                            subtitle="6 days ago"
                        />
                        <AchievementItem 
                            icon={<BookMarked size={20} />} 
                            title="Grammar Master" 
                            subtitle="1 week ago"
                        />
                        <AchievementItem 
                            icon={<Users size={20} />} 
                            title="Pronunciation Pro" 
                            subtitle="1 week ago"
                        />
                    </div>

                    {/* Recent Sessions */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Recent Sessions
                        </h2>
                        <div className='space-y-3'>
                            <RecentSessionItem 
                                icon={<Mic size={20} />} 
                                title="Speaking Practice" 
                                time="2 days ago" 
                                accuracy={92} 
                            />
                            <RecentSessionItem 
                                icon={<Pencil size={20} />} 
                                title="Writing Exercises" 
                                time="3 days ago" 
                                accuracy={92} 
                            />
                            <RecentSessionItem 
                                icon={<Headphones size={20} />} 
                                title="Listening Comprehension" 
                                time="1 week ago" 
                                accuracy={92} 
                            />
                            <RecentSessionItem 
                                icon={<BookA size={20} />} 
                                title="Reading Practice" 
                                time="1 week ago" 
                                accuracy={55} 
                            />
                        </div>

                        <button className="w-full mt-6 py-3 bg-indigo-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center">
                            <Sparkles size={20} className="mr-2"/>
                            Start New Session
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserAnalytics;












 