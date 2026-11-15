/** @type {import('tailwindcss').Config} */
// Cream and teal from the live NUTRUMMY reference site plus a bright, playful secondary palette
// (sun, tangerine, leaf, sky, lilac). Cards and buttons use teal outlines with offset 'pop' shadows. Token names are kept from the original
// template so components didn't need renaming; read them by role:
//   primary   = page background (cream #F5F1E8)   cream / ink = text and dark bands (teal #003B4A)
//   tertiary  = card surface (white)              gold  = amber text accent (#8A5100)
//   secondary = muted body text                   lupin = golden lupin #F5B82E for buttons/fills
//   onaccent  = text on gold buttons              mango = gold highlights on teal bands and stars
// Contrast (WCAG AA): teal 10.8:1, secondary 6.1:1, amber 5.7:1 on cream;
// teal on gold buttons 6.8:1; gold on teal 6.8:1.
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F5F1E8",
        secondary: "#4A5D63",
        tertiary: "#FFFFFF",
        gold: "#8A5100",
        lupin: "#FFC93C",
        onaccent: "#003B4A",
        mango: "#FFC93C",
        // Colourful secondary palette (teal text passes AA on all of these)
        sun: "#FFC93C",
        "sun-soft": "#FFF1C2",
        tangerine: "#FF8A3D",
        "tangerine-soft": "#FFE0CC",
        leaf: "#5CC46A",
        "leaf-soft": "#D9F2D6",
        sky: "#6FB8FF",
        "sky-soft": "#DCEEFF",
        lilac: "#B9A3FF",
        "lilac-soft": "#ECE5FF",
        cream: "#003B4A",
        ink: "#003B4A",
        berry: "#B42318",
        muted: "#5F7075",
        "black-100": "#FFFFFF",
        "black-200": "#FBF8F2",
        "white-100": "#003B4A",
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "6px 6px 0 0 #003B4A",
        pop: "6px 6px 0 0 #003B4A",
        "pop-sm": "3px 3px 0 0 #003B4A",
        "pop-lg": "10px 10px 0 0 #003B4A",
        glow: "0 10px 30px -10px rgba(255,107,26,0.55)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
