// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["var(--font-permanent-marker)", ...fontFamily.serif],
        title: ["var(--font-montserrat)", ...fontFamily.serif],
        body: ["var(--font-varela-round)", ...fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
