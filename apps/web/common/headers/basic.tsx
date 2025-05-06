"use client";
import React, { useState, useEffect } from "react";

import Logo from "@repo/shared/components/logos/header";
import getTheme, { setTheme } from "@repo/shared/utils/theme";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const labels = {
  dark: "Dark",
  light: "Light",
};

export default function header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserPrefersDarkMode, setIsUserPrefersDarkMode] = useState(false);

  useEffect(() => {
    const getThemeFromStorage = getTheme();

    if (getThemeFromStorage === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Check if the user has a system preference for dark mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setIsUserPrefersDarkMode(mediaQuery.matches);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    setTheme(isDarkMode ? "dark" : "light");
  };

  const renderLogoPath = () => {
    if (isDarkMode) return "/logo-light.svg";
    return "/logo-dark.svg";
  };
  return (
    <header className="w-full flex  pt-2 px-2">
      <div className="w-full flex justify-center py-4">
        <Logo path={renderLogoPath()} width={286} height={55} alt="Jasoria" />
      </div>
      <div className="float-right">
        {!isUserPrefersDarkMode && (
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" onClick={toggleDarkMode} />
            <Label
              className="w-[34] transition delay-100 duration-200 ease-in-out"
              htmlFor="airplane-mode"
            >
              {isDarkMode ? labels.dark : labels.light}
            </Label>
          </div>
        )}
      </div>
    </header>
  );
}
