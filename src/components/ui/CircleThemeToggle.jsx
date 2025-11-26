"use client";
import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

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
        <SunIcon className="text-foreground w-6 h-6" />
      ) : (
        <MoonIcon className="text-secondary w-6 h-6" />
      )}
    </button>
  );
};

export default CircleThemeToggle;
