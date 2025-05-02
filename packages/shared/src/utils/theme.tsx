export default function getTheme() {
  // Check if the user has a preference stored in localStorage
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    return storedTheme;
  }

  // Check if the user has a system preference
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return isDarkMode ? "dark" : "light";
}

export function setTheme(theme: "dark" | "light") {
  // Set the theme in localStorage
  localStorage.setItem("theme", theme);

  // Apply the theme to the document
  // set localStorage theme to dark or light based on user preference
  if (theme === "dark") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  document.documentElement.classList.add("transition-colors", "duration-300");
}
