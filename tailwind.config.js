/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gadBlue: "#00a9e1",
        gadDarkBlue: "#2e6bc6",
      },
    },
  },
  plugins: [daisyui],
};
