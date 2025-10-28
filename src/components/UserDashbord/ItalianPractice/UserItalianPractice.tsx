import React from "react";
import { ClockIcon, TargetIcon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import tatgeticon from "../../../assets/Dashbord/tergeticon.svg";
import readingicon from "../../../assets/Dashbord/reading.svg";
import lesteningicon from "../../../assets/Dashbord/listening.svg";
import writingicon from "../../../assets/Dashbord/writing.svg";
import speakingicon from "../../../assets/Dashbord/speaking.svg";
import lockicon from "../../../assets/Dashbord/lock.svg";
import { GiBookmarklet } from "react-icons/gi";

import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import UnlockProCard from "@/components/FreeUserDashbord/Overview/UnlockProCard";

// StatCard Component
const StatCard: React.FC<any> = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 lg:p-5 rounded-xl shadow-md flex flex-col justify-between dark:text-gray-100 h-full">
      <div className="flex justify-between items-start mb-2">
        <p className="text-xs xs:text-sm sm:text-base text-[#A7A7A7] dark:text-gray-300 font-medium">{title}</p>
        <span className="text-indigo-500 text-lg sm:text-xl lg:text-2xl">{icon}</span>
      </div>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
    </div>
  );
};

// Daily Goal Progress Component
const DailyGoalProgress: React.FC<any> = ({ currentMinutes, totalMinutes, timeLeft }) => {
  const percentage = Math.round((currentMinutes / totalMinutes) * 100);
  return (
    <div className="bg-[#0E9F6E1A] p-4 sm:p-5 lg:p-6 rounded-xl border border-[#0E9F6E33] shadow-sm mb-4 sm:mb-6 lg:mb-8 dark:bg-[#0E9F6E1A] dark:border-[#0E9F6E33]">
      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-start gap-3 xs:gap-4 mb-3 sm:mb-4">
        <div className="flex gap-3 items-center flex-1 min-w-0">
          <img className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" src={tatgeticon} alt="Target" />
          <div className="min-w-0 flex-1">
            <p className="text-sm sm:text-base lg:text-lg font-semibold text-[#111827] dark:text-gray-200 truncate">
              Daily Goal Progress
            </p>
            <p className="text-xs sm:text-sm text-[#585858] dark:text-gray-50 truncate">
              {currentMinutes} of {totalMinutes} minutes completed
            </p>
          </div>
        </div>
        <div className="text-left xs:text-right">
          <p className="text-base sm:text-lg lg:text-xl font-bold from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent leading-none">
            {percentage}%
          </p>
          <p className="text-xs sm:text-sm text-[#585858] dark:text-gray-300">{timeLeft}</p>
        </div>
      </div>
      <ProgressBar progress={percentage} color="bg-black" showPercentage={false} className="mt-3 sm:mt-4" />
    </div>
  );
};

// SkillCard Component
const SkillCard = ({ icon, title, subtitle, duration, progress, bgColor, iconBg, path, lockicon }: any) => {
  const userData = localStorage.getItem("userData");
  const { role } = userData ? JSON.parse(userData) : {};

  return (
    <div className={`${bgColor} rounded-xl p-4 sm:p-5 lg:p-6 shadow-sm dark:bg-gray-800 h-full flex flex-col transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-4 flex-1">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`${iconBg} rounded-lg p-2 sm:p-3 flex items-center justify-center`}>
            <img src={icon} alt={title} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base lg:text-lg mb-1 truncate">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
              {subtitle}
            </p>
          </div>
        </div>

        {role === "freeuser" ? (
          lockicon ? (
            <img src={lockicon} alt="lock" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6  ml-2" />
          ) : (
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2  whitespace-nowrap">
              {duration}
            </span>
          )
        ) : (
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2 whitespace-nowrap">
            {duration}
          </span>
        )}
      </div>

      <ProgressBar
        progress={progress}
        color="bg-black"
        showPercentage={false}
        height="h-1.5 sm:h-2"
        className="mb-3"
      />

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-600 dark:text-gray-400">{progress}% Completed</span>
      </div>

      <Link
        to={path}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-2.5 px-4 rounded-lg transition-colors text-center text-xs sm:text-sm lg:text-base block w-full"
      >
        Start Practice
      </Link>
    </div>
  );
};

// Main UserItalianPractice Component
const UserItalianPractice: React.FC = () => {
  const userData = localStorage.getItem("userData");
  const { role } = userData ? JSON.parse(userData) : {};

  const location = useLocation();

  const progressData = {
    currentMinutes: 22,
    totalMinutes: 30,
    timeLeft: "8 min left",
  };

  const sessionsData = {
    title: "Today's Sessions",
    value: 3,
    icon: <GiBookmarklet className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-700" />,
  };

  const studyTimeData = {
    title: "Total Study Time",
    value: "3/5",
    icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />,
  };

  const accuracyData = {
    title: "Average Accuracy",
    value: "88%",
    icon: <TargetIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />,
  };

  const isNested = location.pathname.startsWith("/user/practice/") && location.pathname !== "/user/practice";
  const thisNested = location.pathname.startsWith("/freeuser/practice/") && location.pathname !== "/freeuser/practice";

  if (isNested || thisNested) {
    return <Outlet />;
  }

  const skills = [
    {
      icon: readingicon,
      title: "Reading",
      subtitle: "Comprehension practice",
      duration: "8 min",
      progress: 70,
      bgColor: "bg-blue-50",
      iconBg: "bg-gradient-to-r from-[#0B5FFF] to-[#6C9AF0]",
      path: "reading",
    },
    {
      icon: lesteningicon,
      title: "Listening",
      subtitle: "Audio comprehension",
      duration: "8 min",
      lockicon: lockicon,
      progress: 50,
      bgColor: "bg-orange-50",
      path: "listening",
    },
    {
      icon: writingicon,
      title: "Writing",
      subtitle: "Sentence composition",
      duration: "10 min",
      progress: 30,
      lockicon: lockicon,
      bgColor: "bg-green-50",
      iconBg: "bg-gradient-to-r from-[#0E9F6E] to-[#11D090]",
      path: "writing",
    },
    {
      icon: speakingicon,
      title: "Speaking",
      subtitle: "Pronunciation and fluency",
      duration: "12 min",
      lockicon: lockicon,
      progress: 80,
      bgColor: "bg-red-50",
      iconBg: "bg-gradient-to-r from-[#BA0BFF] to-[#E19FFB]",
      path: "speaking",
    },
  ];

  return (
    <div className="min-h-screen p-3 xs:p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200 mb-2 lg:mb-3">
            Practice Italian
          </h1>
          <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-100 max-w-3xl">
            Choose a skill to practice and improve your Italian proficiency
          </p>
        </div>

        {/* Daily Goal Progress */}
        <DailyGoalProgress
          currentMinutes={progressData.currentMinutes}
          totalMinutes={progressData.totalMinutes}
          timeLeft={progressData.timeLeft}
        />

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <StatCard {...sessionsData} />
          <StatCard {...studyTimeData} />
          <StatCard {...accuracyData} />
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>

        {/* Unlock Pro Card */}
        {role === "freeuser" && (
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <UnlockProCard
              title="Unlock Premium Access"
              description="Access to all expert-led courses and downloadable resources."
              buttonText="Get 30 Days Trial"
              onButtonClick={() => alert("Starting Premium trial!")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItalianPractice;