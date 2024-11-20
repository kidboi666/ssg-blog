/** @type {import('tailwindcss').Config} */

const pluginContainer = ({ addUtilities }) => {
  addUtilities({
    ".scrollbar-none": {
      "-ms-overflow-style": "none", // IE and Edge
      "scrollbar-width": "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Chrome, Safari, Opera
      },
    },
  });
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    extend: {
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
  plugins: [pluginContainer],
};
