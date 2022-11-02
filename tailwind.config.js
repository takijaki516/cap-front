/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        128: "40rem",
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(450px, 1fr))",
      },
    },
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
    },
    minHeight: {
      128: "40rem",
    },
  },
  plugins: [],
};
