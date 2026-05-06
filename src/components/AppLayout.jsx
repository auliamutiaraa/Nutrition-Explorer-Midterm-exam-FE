import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function AppLayout() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7fbf8] text-ink">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
