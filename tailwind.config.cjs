/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#120a05",
        secondary: "#c9b8a6",
        tertiary: "#24150b",
        gold: "#F5B82E",
        cream: "#FFF4E0",
        berry: "#B82C45", // 5.5:1 with cream text
        muted: "#a8998a", // placeholders, 6.4:1 on tertiary
        "black-100": "#1b0f07",
        "black-200": "#0d0703",
        "white-100": "#f6ede0",
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Poppins"', "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #3a2210",
        glow: "0 0 60px -10px rgba(245,184,46,0.45)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
