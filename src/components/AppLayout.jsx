import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#fff7fb] text-ink transition-colors duration-300 dark:bg-[#050914] dark:text-slate-100">
      <Navbar />
      <main className="pt-[88px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
