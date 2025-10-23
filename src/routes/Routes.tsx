 



























import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "@/components/Athontication/Login";
import Signup from "@/pages/Signup";
import UserLayout from "@/Layout/UserLayout/UserLayout";
import { UserOverview } from "@/components/UserDashbord/Overviwe/UserOverview";
import { UserAnalytics } from "@/components/UserDashbord/UserAnalytics";
 import { UserLeaderboard } from "@/components/UserDashbord/UserLeaderboard";
 import UserItalianPractice from "@/components/UserDashbord/ItalianPractice/UserItalianPractice";
import UserReadingPractice from "@/components/UserDashbord/ItalianPractice/ReadingMood/UserReadingPractice";
import AdminLayout from "@/Layout/AdminLayout/AdminLayout";
import AdminUserManagement from "@/components/AdminDashbord/Admin/AdminUserManagement";
 import AdminSubscription from "@/components/AdminDashbord/Admin/AdminSubscription";
import AdminAnalytics from "@/components/AdminDashbord/Admin/AdminAnalytics";
import AdminOverview from "@/components/AdminDashbord/Overview/AdminOverview";
import AdminSupport from "@/components/AdminDashbord/Admin/AdminSupport";
import AdminSettings from "@/components/AdminDashbord/Admin/AdminSettings";
import ListeningPractice from "@/components/UserDashbord/ItalianPractice/ListeningMood/ListeningPractice";
  import ExercisesContainer from "@/components/UserDashbord/ItalianPractice/WritingMood/ExercisesContainer";
import UserDetailsPage from "@/components/AdminDashbord/UserManagementDashboard/UserDetailsPage/UserDetailsPage";
import ContentManagementPage from "@/components/AdminDashbord/ContentManagementPage/ContentManagementPage";
import SpeakingPractice from "@/components/UserDashbord/ItalianPractice/SpeakingMood/SpeakingPractice";
import UserSettings from "@/components/UserDashbord/UserSettings";
import UserFlashcards from "@/components/UserDashbord/UserFlashcards";
import UserStudyPlanner from "@/components/UserDashbord/UserStudyPlanner";
import FreeUserLayout from "@/Layout/FreeUserLayout/FreeUserLayout";
import FreeUserOverviwe from "@/components/FreeUserDashbord/Overview/FreeUserOverviwe";
 import ProtectedRoute from "../components/Athontication/ProtectedRoute";
import FreeUserAnalytics from "@/components/FreeUserDashbord/FreeUserAnalytics/FreeUserAnalytics";
import FlashcardApp from "@/components/UserDashbord/UserFlashCard/FlashcardApp";
import SettingsPage from "@/components/FreeUserDashbord/FreeUserSitting/SettingsPage";





const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },



// Free User Routes
{
  path: "freeuser",
  element: (
    <ProtectedRoute allowedRoles={["freeuser"]}>
      <FreeUserLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <FreeUserOverviwe /> },
     { path: "analytics", element: <FreeUserAnalytics /> },
     { path: "flashcards", element: <FlashcardApp /> },
     { path: "settings", element: <SettingsPage /> },
    {
      path: "practice",
      element: <UserItalianPractice />,
      children: [
        { path: "reading", element: <UserReadingPractice /> },
        { path: "listening", element: <ListeningPractice /> },
        { path: "writing", element: <ExercisesContainer /> },
        { path: "speaking", element: <SpeakingPractice /> },
      ],
    },
  ],
},

// User Routes
{
  path: "user",
  element: (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <UserOverview /> },
    { path: "analytics", element: <UserAnalytics /> },
    { path: "flashcards", element: <UserFlashcards /> },
    { path: "leaderboard", element: <UserLeaderboard /> },
    { path: "planner", element: <UserStudyPlanner /> },
    { path: "settings", element: <UserSettings /> },
    {
      path: "practice",
      element: <UserItalianPractice />,
      children: [
        { path: "reading", element: <UserReadingPractice /> },
        { path: "listening", element: <ListeningPractice /> },
        { path: "writing", element: <ExercisesContainer /> },
        { path: "speaking", element: <SpeakingPractice /> },
      ],
    },
  ],
},

// Admin Routes
{
  path: "admin",
  element: (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <AdminOverview /> },
    { path: "users", element: <AdminUserManagement /> },
    { path: ":id", element: <UserDetailsPage /> },
    { path: "content", element: <ContentManagementPage /> },
    { path: "subscription", element: <AdminSubscription /> },
    { path: "analytics", element: <AdminAnalytics /> },
    { path: "support", element: <AdminSupport /> },
    { path: "settings", element: <AdminSettings /> },
  ],
},









    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
















 