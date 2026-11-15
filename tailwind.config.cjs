/** @type {import('tailwindcss').Config} */
// Light theme. Token names are kept from the original template so components
// didn't need renaming; read them by role:
//   primary   = page background      cream = main text (teal)
//   tertiary  = card surface         gold  = text accent (deep amber)
//   secondary = muted body text      lupin = golden buttons/fills (teal text on top; never as text on light)
// Cream #F5F1E8 and teal #003B4A from the live NUTRUMMY site, with golden-lupin buttons.
// Contrast (WCAG AA): teal 10.8:1, secondary 6.1:1, amber accent 5.7:1 on cream; teal on gold 6.1:1.
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
        lupin: "#F2A900",
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
        card: "0 1px 2px rgba(0,59,74,0.04), 0 12px 32px -12px rgba(0,59,74,0.14)",
        glow: "0 10px 30px -10px rgba(242,169,0,0.55)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
