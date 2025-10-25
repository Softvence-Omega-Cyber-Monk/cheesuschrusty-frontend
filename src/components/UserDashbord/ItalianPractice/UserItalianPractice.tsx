import React from "react";
 import {   ClockIcon, TargetIcon,   } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
  import tatgeticon from "../../../assets/Dashbord/tergeticon.svg"
  import readingicon from "../../../assets/Dashbord/reading.svg"
  import lesteningicon from "../../../assets/Dashbord/listening.svg"
  import writingicon from "../../../assets/Dashbord/writing.svg"
  import speakingicon from "../../../assets/Dashbord/speaking.svg"
  import lockicon from "../../../assets/Dashbord/lock.svg"
 import { GiBookmarklet } from "react-icons/gi";
  
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import UnlockProCard from "@/components/FreeUserDashbord/Overview/UnlockProCard";


 
 
<ProgressBar
  current={3}
  total={10}
  label="Question"
  color="bg-blue-600"
  showPercentage={true}
/>

 
const StatCard: React.FC<any> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:dark:bg-[linear-gradient(180deg,#34495E_0%,#2C3E50_100%)]
 p-4 rounded-xl shadow-md flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <p className="text-base text-[#A7A7A7] dark:text-gray-900">{title}</p>
        <span className="text-indigo-500 ">{icon}</span>
      </div>
      <p className="text-3xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

 
const DailyGoalProgress: React.FC<any> = ({ currentMinutes, totalMinutes, timeLeft }) => {
    const percentage = Math.round((currentMinutes / totalMinutes) * 100);
    return (
        <div className="bg-[#0E9F6E1A] p-4 rounded-xl border border-[#0E9F6E33] shadow-sm mb-6">
            <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3 items-center">
                     <img  className="w-8 h-8" src={tatgeticon} alt="" />
                    <div>
                        <p className="text-base font-semibold text-[#111827] dark:text-gray-200">Daily Goal Progress</p>
                        <p className="text-sm text-[#585858] dark:text-gray-50">{currentMinutes} of {totalMinutes} minutes completed</p>
                    </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold bg-gradient-to-b from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent leading-none">
    {percentage}%
  </p>
                    <p className="text-sm text-[#585858]">{timeLeft}</p>
                </div>
            </div>
            <ProgressBar progress={percentage} color="bg-black" showPercentage={false} className="mt-4" />
        </div>
    );
};
// ----------------------------------------------------

const SkillCard = ({ icon, title, subtitle, duration, progress, bgColor, iconBg, path,lockicon }: any) => {


  const userData = localStorage.getItem("userData");
const { role } = userData ? JSON.parse(userData) : {};

console.log(role)

  return (
  <div className={`${bgColor}  rounded-xl p-4 shadow-sm`}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`${iconBg} rounded-lg p-3 flex items-center justify-center`}>
         <img src={icon} alt="" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

{role === "freeuser" ? (
  lockicon ? (
    <img src={lockicon} alt="lock" />
  ) : (
    <span className="text-sm text-gray-600">{duration}</span>
  )
) : (
  <span className="text-sm text-gray-600">{duration}</span>
)}      
    </div>

    <ProgressBar
      progress={progress}
      color="bg-black"
      showPercentage={false} // Removed showPercentage from here to use the custom text below
      height="h-2" // Set a height for consistency
      className="mb-2"
    />

    <div className="flex items-center justify-between mb-4 mt-1">
      <span className="text-xs text-gray-600">{progress}% Completed</span>
    </div>

    <Link
      to={path}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors inline-block"
    >
      Start Practice
    </Link>
  </div>
);
}

const UserItalianPractice: React.FC = () => {

  const userData = localStorage.getItem("userData");
const { role } = userData ? JSON.parse(userData) : {};

console.log(role)

  const location = useLocation();
  
   const progressData = {
    currentMinutes: 22,
    totalMinutes: 30,
    timeLeft: '8 min left',
  };

  const sessionsData = {
    title: "Today's Sessions",
    value: 3, 
    icon: <GiBookmarklet className="w-8 h-8 text-green-700" />,
  };

  const studyTimeData = {
    title: "Total Study Time",
    value: '3/5', 
    icon: <ClockIcon className="w-8 h-8" />,
  };

  const accuracyData = {
    title: "Average Accuracy",
    value: '88%',
    icon: <TargetIcon className="w-8 h-8" />,
  };
  
   const isNested = location.pathname.startsWith("/user/practice/") && location.pathname !== "/user/practice";
   const thisNested = location.pathname.startsWith("/freeuser/practice/") && location.pathname !== "/freeuser/practice";
 
  if (isNested) {
    return <Outlet />;
  } 

  if (thisNested) {
      return <Outlet />;
  }
  const skills = [
    {
      icon:  readingicon,
      title: "Reading",
      subtitle: "Comprehension practice",
      duration: "8 min",
      progress: 70,
      //  lockicon:lockicon,
      bgColor: "bg-blue-50",
     iconBg: "bg-gradient-to-r from-[#0B5FFF] to-[#6C9AF0]",
      path: "reading",
    },
    {
      icon: lesteningicon,
      title: "Listening",
      subtitle: "Audio comprehension",
      duration: "8 min",
      lockicon:lockicon,
      progress: 50,
      bgColor: "bg-orange-50",
    //  iconBg: "bg-gradient-to-r from-[#BA0BFF] to-[#E19FFB]",
      path: "listening",
    },
    {
      icon: writingicon,
      title: "Writing",
      subtitle: "Sentence composition", // Updated subtitle
      duration: "10 min", // Updated duration
      progress: 30, // Updated progress
       lockicon:lockicon,
      bgColor: "bg-green-50", // Updated color
      iconBg: "bg-gradient-to-r from-[#0E9F6E] to-[#11D090]",
      path: "writing",
    },
    {
      icon: speakingicon,
      title: "Speaking", // Corrected typo
      subtitle: "Pronunciation and fluency", // Updated subtitle
      duration: "12 min", // Updated duration
       lockicon:lockicon,
      progress: 80, // Updated progress
      bgColor: "bg-red-50", // Updated color
      iconBg: "bg-gradient-to-r from-[#BA0BFF] to-[#E19FFB]",
      path: "speaking", // Corrected path
    },
  ];

  return (
    <div className="min-h-screen   p-6">
      <div className="mx-auto  "> {/* Added max-width for better centering */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">Practice Italian</h1>
          <p className="text-gray-600 dark:text-gray-100">Choose a skill to practice and improve your Italian proficiency</p>
        </div>

        {/* 1. Daily Goal Progress - Passing props */}
        <DailyGoalProgress
          currentMinutes={progressData.currentMinutes}
          totalMinutes={progressData.totalMinutes}
          timeLeft={progressData.timeLeft}
        />

        {/* 2. Stat Cards - Passing props and using a grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard {...sessionsData} />
            <StatCard {...studyTimeData} />
            <StatCard {...accuracyData} />
        </div>

        {/* 3. Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>


{
  role==='freeuser'?<>
  
  
  {/* Usage 2: A different plan/offer (demonstrating reusability) */}
            <div className="mt-8">
                <UnlockProCard
                    title="Unlock Premium Access"
                    description="Access to all expert-led courses and downloadable resources."
                    buttonText="Get 30 Days Trial"
                    onButtonClick={() => alert('Starting Premium trial!')}
                />
            </div>
  
  
  </>:""
}

      </div>
    </div>
  );
};

export default UserItalianPractice;






 