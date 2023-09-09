/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./src/*.js"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Black Ops One", "cursive"],
        sansSerif: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
