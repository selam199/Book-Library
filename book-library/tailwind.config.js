/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",              // main HTML
    "./src/**/*.{js,ts,jsx,tsx}" // all source files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001F5B",   // deep blue for buttons / navbar
        accent: "#FFD700",    // gold/yellow for highlights
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // clean font
      },
    },
  },
  plugins: [],
};

