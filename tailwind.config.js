/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        almostblack: "#161616",
        almostdark: "#1D1D1D",
        verydarkgray: "#29292B",
        almostdarkgray: "#313131",
      },
      spacing: {
        "12/25": "48%",
      },
      fontFamily: {
        jetbrainsmono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
