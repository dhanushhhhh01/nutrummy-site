/** @type {import('tailwindcss').Config} */
// "Sunrise" theme. Token names are kept from the original template so components
// didn't need renaming; read them by role:
//   primary   = page background (peach)    cream / ink = main text and dark bands (plum)
//   tertiary  = card surface (white)       gold  = text accent (burnt orange)
//   secondary = muted body text            lupin = tangerine buttons/fills (plum text on top)
//   mango     = bright decorative highlight
// Contrast (WCAG AA): plum 13.2:1 and secondary 7.3:1 on peach; accent 5.0:1;
// plum on tangerine 5.1:1; tangerine on plum 5.1:1.
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FFF3E6",
        secondary: "#5E4A66",
        tertiary: "#FFFFFF",
        gold: "#B8420A",
        lupin: "#FF6B1A",
        mango: "#FFC233",
        cream: "#3D1A4D",
        ink: "#3D1A4D",
        berry: "#B42318",
        muted: "#74607A",
        "black-100": "#FFFFFF",
        "black-200": "#FFF8F0",
        "white-100": "#3D1A4D",
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
