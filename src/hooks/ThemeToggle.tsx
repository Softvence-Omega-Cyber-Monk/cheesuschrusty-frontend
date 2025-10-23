// import { useState, useEffect } from "react";
// import { Classic } from "@theme-toggles/react";
// import "@theme-toggles/react/css/classic.css";

// const ThemeToggle: React.FC = () => {
//   const [isDark, setIsDark] = useState<boolean>(false);

//   // Load initial theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setIsDark(savedTheme === "dark");
//     } else {
//       const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       setIsDark(prefersDark);
//     }
//   }, []);

//   // Apply and store theme
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", isDark);
//     localStorage.setItem("theme", isDark ? "dark" : "light");
//   }, [isDark]);

//   return (
//     <button
//       onClick={() => setIsDark(!isDark)}
//       title="Toggle dark mode"
//       className="p-2 rounded-full text-gray-800 dark:text-yellow-300 text-3xl"
//     >
//       <Classic toggled={isDark} duration={750} />
//     </button>
//   );
// };

// export default ThemeToggle;
