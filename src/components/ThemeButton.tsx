import { useLayoutEffect, useState } from "preact/hooks";
import Button from "./Button";

const ThemeButton = () => {
  const [isDark, setDark] = useState(localStorage.theme === "dark");

  /**
   * 깃허브의 댓글 테마도 다크모드 토글시 변경해주는 함수
   */
  const toggleUtterancesTheme = () => {
    if (document.querySelector(".utterances-frame")) {
      const theme =
        localStorage.getItem("theme") === "light"
          ? "github-light"
          : "github-dark";
      const message = {
        type: "set-theme",
        theme,
      };
      const iframe = document.querySelector(
        ".utterances-frame",
      ) as HTMLIFrameElement; // omit as HTMLIFrameElement if you're wring JS
      iframe?.contentWindow?.postMessage(message, "https://utteranc.es");
    }
  };

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
    toggleUtterancesTheme();
  };

  useLayoutEffect(() => {
    setDark(localStorage.theme === "dark");
    if (localStorage.theme === undefined) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.toggle("dark");
      } else {
        document.documentElement.classList.toggle("light");
      }
    } else {
      isDark
        ? document.documentElement.classList.toggle("dark")
        : document.documentElement.classList.toggle("light");
    }
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
