import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
};

export default useTheme;
