/** @type {import('tailwindcss').Config} */

const addUtilities = ({ addUtilities }) => {
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
  theme: {
    extend: {},
  },
  plugins: [addUtilities],
};
