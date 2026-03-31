/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      // This replaces the default 'font-sans' with Montserrat
      sans: ["var(--font-montserrat)", "ui-sans-serif", "system-ui"],
      montserrat: ["var(--font-montserrat)", "sans-serif"],
    },
  },
},
  plugins: [],
};