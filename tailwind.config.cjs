/** @type {import('tailwindcss').Config} */
// Cream and teal from the live NUTRUMMY reference site, with golden-lupin accents (no pink). Token names are kept from the original
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
        lupin: "#F5B82E",
        onaccent: "#003B4A",
        mango: "#F5B82E",
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
        card: "0 1px 2px rgba(61,26,77,0.04), 0 12px 32px -12px rgba(61,26,77,0.14)",
        glow: "0 10px 30px -10px rgba(255,107,26,0.55)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
