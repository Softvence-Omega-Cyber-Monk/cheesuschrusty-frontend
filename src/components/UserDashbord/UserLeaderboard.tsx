import React from 'react';
import { Flame, Star, Share2,  ChevronDown, BookOpen, Volume2, Edit, Mic, Trophy } from 'lucide-react';

// --- Type Definitions ---

/**
 * Interface for a single leaderboard entry.
 */
interface Leader {
  id: number;
  rank: number;
  name: string;
  points: number;
  streak: number;
  badge: 'R1' | 'R2' | 'A2' | 'B1' | 'B2'; // Example badges
  avatarUrl: string; // Using a URL for real-world scenarios, but keeping emojis for simplicity here.
  isUser: boolean; // To highlight the user's position
  isTopThree: boolean; // To distinguish top three visually
}

// --- Mock Data ---

const userPosition: {
  rank: number;
  totalXP: number;
  dailyStreak: number;
  totalPoint: number;
} = {
  rank: 4,
  totalXP: 2847,
  dailyStreak: 2847, // Assuming Daily Streak is 2847 as per the image
  totalPoint: 96,
};

const skillData: {
  name: string;
  value: number;
  color: string;
  icon: React.ElementType;
}[] = [
  { name: 'Reading', value: 847, color: 'bg-blue-500', icon: BookOpen },
  { name: 'Listening', value: 847, color: 'bg-green-500', icon: Volume2 },
  { name: 'Writing', value: 847, color: 'bg-yellow-500', icon: Edit },
  { name: 'Speaking', value: 847, color: 'bg-red-500', icon: Mic },
];

const quickStats = {
  weeklyPoints: 245,
  monthlyPoints: 4596,
  totalBadge: 3,
  currentLevel: 42,
};


const leadersData: Leader[] = [
  { id: 1, rank: 1, name: 'Sofia Rossi', points: 3254, streak: 12, badge: 'B2', avatarUrl: '👩', isUser: false, isTopThree: true },
  { id: 2, rank: 2, name: 'Wade Warren', points: 3254, streak: 12, badge: 'B2', avatarUrl: '👨', isUser: false, isTopThree: true },
  { id: 3, rank: 3, name: 'Jerome Bell', points: 3254, streak: 12, badge: 'B2', avatarUrl: '👨', isUser: false, isTopThree: true },
  { id: 4, rank: 4, name: 'Marco Rossi', points: 3254, streak: 11, badge: 'R1', avatarUrl: '👨', isUser: true, isTopThree: false },
  { id: 5, rank: 5, name: 'Brooklyn Simmons', points: 3254, streak: 11, badge: 'R1', avatarUrl: '👩', isUser: false, isTopThree: false },
  { id: 6, rank: 6, name: 'Marvin McKinney', points: 3254, streak: 11, badge: 'R1', avatarUrl: '👨', isUser: false, isTopThree: false },
  { id: 7, rank: 7, name: 'Savannah Nguyen', points: 3254, streak: 12, badge: 'A2', avatarUrl: '👩', isUser: false, isTopThree: false },
  { id: 8, rank: 8, name: 'Kathryn Murphy', points: 3254, streak: 12, badge: 'B1', avatarUrl: '👩', isUser: false, isTopThree: false },
  { id: 9, rank: 9, name: 'Courtney Henry', points: 3254, streak: 12, badge: 'A2', avatarUrl: '👩', isUser: false, isTopThree: false },
  { id: 10, rank: 10, name: 'Jacob Jones', points: 3254, streak: 12, badge: 'A2', avatarUrl: '👨', isUser: false, isTopThree: false },
];

// --- Reusable Components ---

/**
 * Renders a single row in the leaderboard table.
 */
const LeaderboardRow: React.FC<{ leader: Leader }> = ({ leader }) => {
  const { rank, name, points, streak, badge, avatarUrl, isUser, isTopThree } = leader;

  const rowClasses = isUser
    ? 'bg-blue-50 border-blue-200 border-l-4'
    : 'border-b border-gray-100 last:border-b-0';

  const rankClasses = isTopThree
    ? rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-400' : 'text-orange-500'
    : 'text-gray-500';
  
  // Custom highlight for Top 3 avatars as seen in the image
  const avatarClasses = isTopThree 
    ? rank === 1 ? 'ring-2 ring-yellow-400' : rank === 2 ? 'ring-2 ring-gray-400' : 'ring-2 ring-orange-400'
    : '';

  return (
    <div
      className={`flex items-center p-3 transition-colors hover:bg-gray-50 ${rowClasses}`}
    >
      <div className={`w-10 font-semibold ${rankClasses}`}>
        {rank === 1 && <Trophy className="w-5 h-5 inline-block" />}
        {rank > 1 && `#${rank}`}
      </div>
      
      <div className={`w-10 h-10 rounded-full bg-gray-200 text-2xl flex items-center justify-center mr-3 ${avatarClasses}`}>
        {avatarUrl}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 truncate">
          {name}
        </div>
      </div>

      <div className="flex items-center space-x-2 mr-4">
        <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
          {badge}
        </span>
        <div className="flex items-center text-sm text-gray-500">
          <Flame className="w-4 h-4 text-orange-500 mr-0.5" />
          <span className="font-medium text-xs">{streak} day streak</span>
        </div>
      </div>
      
      <div className="text-right font-bold text-gray-900 w-16">
        {points}
        <span className="text-xs text-gray-500 font-normal block">Points</span>
      </div>
    </div>
  );
};

/**
 * Reusable component for the main leaderboard table section.
 */
const LeaderboardTable: React.FC<{ leaders: Leader[] }> = ({ leaders }) => {
  const timePeriods = ['Daily', 'Weekly', 'Monthly', 'All Time'];
  const [activeTab, setActiveTab] = React.useState('All Time');

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setActiveTab(period)}
              className={`px-3 py-1 text-sm cursor-pointer font-medium rounded-md transition-colors ${
                activeTab === period
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          All Time <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>

      <div className="p-2">
        <h3 className="text-lg font-semibold text-gray-800 px-2 py-1">Top 10 Learners</h3>
        {leaders.slice(0, 10).map((leader) => (
          <LeaderboardRow key={leader.id} leader={leader} />
        ))}
      </div>
    </div>
  );
};

/**
 * Renders the user's current rank and stats banner.
 */
const UserStatusBanner: React.FC = () => {
  const { rank, totalXP, dailyStreak, totalPoint } = userPosition;

  // Function to create a stat block
  const StatBlock: React.FC<{ label: string; value: number; icon?: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        {icon}
        <span className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</span>
      </div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );

  return (
    <div className="bg-green-50 p-6 rounded-xl shadow-lg flex items-center justify-between space-x-4 border border-green-200">
      <div className="flex items-center space-x-4">
        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
        <div className="text-lg font-semibold text-gray-700">Your Position</div>
      </div>

      <div className="flex items-center space-x-10">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-extrabold text-green-700">#{rank}</span>
          <span className="text-sm text-green-600">Current Rank</span>
        </div>
        
        <StatBlock label="Total XP" value={totalXP} />
        <StatBlock label="Daily Streak" value={dailyStreak} />
        
        <div className="flex flex-col items-end">
          <span className="text-4xl font-extrabold text-gray-900">{totalPoint}</span>
          <span className="text-sm text-gray-500">Total Point</span>
          <div className="w-full h-2 bg-gray-300 rounded-full mt-1">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(totalPoint, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};


/**
 * Renders the skill progress section.
 */
const SkillProgress: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Skill</h3>
    {skillData.map((skill, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center text-gray-700 font-medium">
            <skill.icon className="w-4 h-4 mr-1 text-gray-500" />
            {skill.name}
          </div>
          <span className="text-sm font-semibold text-gray-900">{skill.value}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${skill.color}`}
            style={{ width: `${skill.value / 10}%` }} // Simplified percentage for visualization
          ></div>
        </div>
      </div>
    ))}
  </div>
);


/**
 * Renders the quick stats section.
 */
const QuickStats: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
    <div className="space-y-3">
      {Object.entries(quickStats).map(([key, value]) => (
        <div key={key} className="flex justify-between items-center pb-1 border-b border-gray-50 last:border-b-0">
          <span className="text-gray-600 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
          <span className={`font-bold ${key === 'currentLevel' ? 'text-green-600' : 'text-gray-900'}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// --- Main Component ---

export const UserLeaderboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Pro Leader Board</h1>
          <p className="text-gray-600 mt-1">Compete with premium learners worldwide</p>
        </div>
        <button className="flex items-center space-x-2 bg-white cursor-pointer text-gray-700 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="font-semibold">Share Progress</span>
        </button>
      </header>
      
      {/* User Status Banner */}
      <div className="mb-8">
        <UserStatusBanner />
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Leaderboard */}
        <div className="lg:col-span-2">
          <LeaderboardTable leaders={leadersData} />
        </div>
        
        {/* Right Column: Skills and Quick Stats */}
        <div className="lg:col-span-1 space-y-8">
          <SkillProgress />
          <QuickStats />
        </div>
        
      </div>
    </div>
  );
};

// NOTE: You would typically export the main component for use in your application.
// export default ProLeaderboardPage;