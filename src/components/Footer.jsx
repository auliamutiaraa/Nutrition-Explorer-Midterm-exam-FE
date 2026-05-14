export default function Footer() {
  return (
    <footer id="contact" className="border-t border-leaf-100 bg-white px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Made with {"\u2764\uFE0F"} by Aulia - Public Health Student</p>
        <a
          href="https://github.com/auliamutiaraa/Nutrition-Explorer-Midterm-exam-FE.git"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-mist-700 transition-colors duration-300 hover:text-leaf-700"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
