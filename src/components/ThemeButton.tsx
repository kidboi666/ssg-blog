import { useLayoutEffect, useState } from "preact/hooks";
import Button from "./Button";

const ThemeButton = () => {
  const [isDark, setDark] = useState(localStorage.theme === "dark");

  const handleThemeChange = () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
      setDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      localStorage.theme = "dark";
      setDark(true);
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  useLayoutEffect(() => {
    setDark(localStorage.theme === "dark");
    isDark
      ? document.documentElement.classList.toggle("dark")
      : document.documentElement.classList.toggle("light");
  }, []);

  return (
    <Button
      intent="icon"
      padding="md"
      icon={isDark ? "sun" : "moon"}
      viewBox="0 0 24 24"
      onClick={handleThemeChange}
    />
  );
};

export default ThemeButton;
