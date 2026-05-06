import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/82 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink to="/" className="flex items-center gap-3 font-display text-base font-bold tracking-normal text-ink">
          <span className="relative grid h-10 w-10 place-items-center rounded-full bg-leaf-100 shadow-inner">
            <span className="h-5 w-6 rounded-b-full rounded-t-lg border-2 border-leaf-600 bg-white" />
            <span className="absolute right-2 top-2 h-3 w-2 rotate-45 rounded-full bg-leaf-600" />
          </span>
          <span>Nutrition Explorer</span>
        </NavLink>

        <div className="flex items-center gap-1 rounded-full border border-leaf-100 bg-white p-1 text-sm font-semibold text-slate-600 shadow-sm">
          <a href="#home" className="rounded-full px-3 py-2 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-700">
            Home
          </a>
          <a href="#about" className="rounded-full px-3 py-2 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-700">
            About
          </a>
          <a href="#contact" className="rounded-full px-3 py-2 transition-all duration-300 hover:bg-leaf-50 hover:text-leaf-700">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
