"use client";
import React, { useContext, useState } from "react";
import ThemeContext from "@repo/shared/contexts/theme";

export default function NotificationBar() {
  const [enabled, setEnabled] = useState(false);
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }
  const { theme, toggleTheme } = context;

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={() => {
          setEnabled(!enabled);
          toggleTheme();
        }}
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-gray-900 rounded-full relative transition-colors">
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
      </div>
      <span className="ml-3 text-sm font-medium text-gray-700">{theme}</span>
    </label>
  );
}
