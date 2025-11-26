import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar02 } from "@/components/layout/Navbar02";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar02 darkMode={darkMode} setDarkMode={setDarkMode} />
      <main dir="rtl" className="flex-grow w-full bg-background">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
