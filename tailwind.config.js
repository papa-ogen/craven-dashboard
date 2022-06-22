/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightGray: "#c8c8c8",
        gray: "#3e444c",
        darkGray: "#272b30",
        blue: "#5bc0de",
        green: "#62c462",
        yellow: "#F1C40F",
        orange: "#dc8000",
        red: "#C0392B",
      },
    },
  },
  plugins: [],
};
