"use client";
import React, { useState } from "react";

import Logo from "@repo/shared/components/logos/header";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const labels = {
  dark: "Dark",
  light: "Light",
};

export default function header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <header className="w-full flex  pt-2 px-2">
      <div className="w-full flex justify-center">
        <Logo path="/logo-jasoria.svg" width={310} height={55} alt="Jasoria" />
      </div>
      <div className="float-right">
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" onClick={toggleDarkMode} />
          <Label className="w-[34]" htmlFor="airplane-mode">
            {isDarkMode ? labels.dark : labels.light}
          </Label>
        </div>
      </div>
    </header>
  );
}
