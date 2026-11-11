/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#061124",
        navy: "#0B1D3B",
        night: "#112A52",
        ivory: "#F4EFE4",
        pearl: "#FAF7F0",
        moon: "#E6DEC8",
        champagne: "#E4CA96",
        "champagne-light": "#F2E3BF",
        gold: "#88652B",
        dusk: {
          deep: "#061124",
          navy: "#0F2447",
          champagne: "#D6B575",
          ivory: "#FAF7F0",
        },
        glow: {
          gold: "#E4CA96",
          warm: "#F2E3BF",
          flame: "#C8A462",
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        display: ['"Cormorant Garamond"', "serif"],
        arabic: ['"Amiri"', "serif"],
        sans: ['"Outfit"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        champagne: "0 0 32px rgba(228, 202, 150, 0.34)",
      },
    },
  },
  plugins: [],
};
