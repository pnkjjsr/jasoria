"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import Logo from "@repo/shared/components/logos/header";
import UserLoginButton from "@repo/shared/components/auth/UserLoginButton";
import getTheme, { setTheme } from "@repo/shared/utils/theme";

import Language from "@/components/dropdowns/Language";

export default function Header() {
  const t = useTranslations();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isUserPrefersDarkMode, setIsUserPrefersDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const getThemeFromStorage = getTheme();

    if (getThemeFromStorage === "dark") {
      setIsDarkMode(true);
      setTheme("dark");
    } else setTheme("light");

    // Check if the user has a system preference for dark mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsUserPrefersDarkMode(mediaQuery.matches);

    const handleScroll = () => {
      const wheelY = document.body.scrollTop;
      setScrollY(wheelY);
    };

    document.body.addEventListener("scroll", handleScroll);
    return () => document.body.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      setTheme(newMode ? "dark" : "light");
      return newMode;
    });
  };

  const renderLogoPath = () => {
    if (isDarkMode) return "/logo-light.svg";
    return "/logo-dark.svg";
  };

  return (
    <header
      className={`w-full flex py-2 px-2 animate-fade-in duration-700 ${scrollY > 50 ? "bg-white/90 dark:bg-[#1a1a1a]/90" : ""}`}
    >
      <div className="w-full flex align-left lg:justify-center md:py-4">
        <Logo path={renderLogoPath()} width={164} height={55} alt="Jasoria" />
      </div>
      <div className="float-right flex justify-center space-x-2 items-start ">
        <Language />

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="airplane-mode"
            checked={isDarkMode}
            onClick={toggleDarkMode}
          />
          <Label
            className="w-[34] transition delay-100 duration-200 ease-in-out"
            htmlFor="airplane-mode"
          >
            {isDarkMode ? t("theme_dark") : t("theme_light")}
          </Label>
        </div>

        <UserLoginButton />
      </div>
    </header>
  );
}
