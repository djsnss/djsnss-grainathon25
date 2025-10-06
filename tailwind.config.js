/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'libertinus': ['"Libertinus Keyboard"', 'monospace'],
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'up': ['up', 'sans-serif'],
        'arcade': ['arcade', 'sans-serif'],
        'pixel': ['pixel', 'sans-serif'],
        'bungee': ['"Bungee Spice"', 'cursive'],
        'silkscreen': ['Silkscreen', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
