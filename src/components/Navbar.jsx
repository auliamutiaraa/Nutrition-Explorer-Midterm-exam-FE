import { NavLink } from "react-router-dom";
import { useNutrition } from "../contexts/NutritionContext.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

export default function Navbar() {
  const { foods, query } = useNutrition();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/82 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/82">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 font-display text-base font-bold tracking-normal text-ink dark:text-white">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf-100 shadow-inner dark:bg-slate-800">
            <span className="h-5 w-6 rounded-b-full rounded-t-lg border-2 border-leaf-600 bg-white" />
            <span className="absolute right-2 top-2 h-3 w-2 rotate-45 rounded-full bg-leaf-600" />
          </span>
          <span className="truncate">Nutrition Explorer</span>
        </NavLink>

        <div className="hidden min-w-0 rounded-full border border-leaf-100 bg-leaf-50 px-3 py-2 text-xs font-bold text-leaf-700 dark:border-slate-700 dark:bg-slate-900 dark:text-leaf-100 md:block">
          {foods.length} hasil untuk {query}
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-full border border-leaf-100 bg-white p-1 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <a href="#home" className="rounded-full px-3 py-2 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-700">
            Home
          </a>
          <a href="#foods" className="rounded-full px-3 py-2 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-700">
            Foods
          </a>
          <a href="#contact" className="hidden rounded-full px-3 py-2 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-700 sm:inline-block">
            Contact
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-full bg-leaf-600 text-base text-white transition-all duration-300 hover:bg-mist-700"
          >
            {isDarkMode ? "L" : "D"}
          </button>
        </div>
      </nav>
    </header>
  );
}
