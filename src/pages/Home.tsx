import { useUserRole } from "@/hooks/useUserRole";
import CommonWrapper from "../common/CommonWrapper";
import { Link } from "react-router-dom";
// import { LogIn } from "lucide-react";
// import Login from "@/components/Athontication/Login";

const Home = () => {
  const { setRole } = useUserRole();

  return (
    <CommonWrapper>
      <div className="h-screen flex flex-col gap-11 items-center justify-center text-center p-6 bg-white dark:bg-gray-900">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to Your Dashboard
        </h1>

        {/* Subheading / Description */}
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-6 max-w-2xl">
          Manage your platform effortlessly. Track progress, oversee users, and explore all features in one place.
        </p>

        {/* Info for testing */}
        <h2 className="text-2xl text-green-600 dark:text-green-400">
          <span className="text-blue-700 dark:text-blue-400">Note: </span>
          You can use any email or password to log in.
        </h2>

        {/* User role messages */}
        <div>
          {/* Role Selection Links */}
          <div className="mt-20 flex gap-11">
            <Link
              to="/admin"
              className="cursor-pointer font-semibold bg-amber-300 dark:bg-amber-600 px-6 py-3 rounded-3xl hover:bg-amber-500 dark:hover:bg-amber-700 transition-colors"
              onClick={() => setRole("admin")}
            >
              Admin Dashboard
            </Link>
            <Link
              to="/user"
              className="cursor-pointer font-semibold bg-amber-300 dark:bg-amber-600 px-6 py-3 rounded-3xl hover:bg-amber-500 dark:hover:bg-amber-700 transition-colors"
              onClick={() => setRole("user")}
            >
              Pro User Dashboard
            </Link>
            <Link
              to="/freeuser"
              className="cursor-pointer font-semibold bg-amber-300 dark:bg-amber-600 px-6 py-3 rounded-3xl hover:bg-amber-500 dark:hover:bg-amber-700 transition-colors"
              onClick={() => setRole("freeUser")}
            >
              Free User Dashboard
            </Link>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default Home;
