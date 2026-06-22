import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Recent Shelf", href: "#recent-shelf" },
    { label: "Foods", href: "#foods" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#050914]/90">
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-3 text-ink dark:text-white">
         <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-herb-100 shadow-inner dark:bg-herb-500/15">
            <span className="h-6 w-7 rounded-b-full rounded-t-lg border-2 border-herb-600 bg-white dark:bg-[#050914]" />
            <span className="absolute right-3 top-3 h-3.5 w-2.5 rotate-45 rounded-full bg-herb-600" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold leading-tight sm:text-xl">Nutrition Explorer</span>
            <span className="hidden text-xs font-semibold text-slate-500 dark:text-slate-400 sm:block">Simple Food Nutrition</span>
          </span>
        </NavLink>

        <div className="hidden items-center justify-center gap-7 text-sm font-bold text-slate-600 dark:text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors duration-300 hover:text-leaf-600 dark:hover:text-leaf-100">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-11 w-11 place-items-center rounded-full text-2xl text-slate-600 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {isDarkMode ? "\u263c" : "\u263e"}
          </button>
          <a
            href="#search-foods"
            className="hidden rounded-full bg-leaf-600 px-6 py-3 text-sm font-extrabold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-leaf-700 sm:inline-flex"
          >
            Search Foods
          </a>
        </div>
      </nav>
    </header>
  );
}
