"use client";
import { useState, createContext } from "react";
import type { ThemeContextType } from "./types";

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
