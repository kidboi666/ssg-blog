import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */

const pluginContainer = ({ addUtilities, addVariant }) => {
  addUtilities({
    ".scrollbar-none": {
      "-ms-overflow-style": "none", // IE and Edge
      "scrollbar-width": "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Chrome, Safari, Opera
      },
    },
  });
  addVariant(
    "prose-inline-code",
    '&.prose :where(:not(pre)>code):not(:where([class~="not-prose"] *))',
  );
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: {
        custom: {
          css: {
            "li > p:first-of-type": {
              color: "#52525b !important",
              fontWeight: "bold",
            },
            ".dark li > p:first-of-type": {
              color: "#e4e4e7 !important",
              fontWeight: "bold",
            },
            "li::marker": {
              color: "#52525b !important",
            },
            ".dark li::marker": {
              color: "#e4e4e7 !important",
            },
          },
        },
      },
      colors: {
        "var-main-dark": "#13151a",
        "var-accent-dark": "#23262d",
      },
      fontFamily: {
        sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", trnasform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), pluginContainer],
};
