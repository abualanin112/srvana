"use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const CircleThemeToggle = ({ darkMode, setDarkMode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="transition-colors duration-500 p-1"
    >
      {darkMode ? (
        <Sun size={24} className="text-foreground" />
      ) : (
        <Moon size={24} className="text-secondary" />
      )}
    </button>
  );
};

export default CircleThemeToggle;
