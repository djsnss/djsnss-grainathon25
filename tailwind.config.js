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
          'rasterforge': ['"Raster Forge"', 'sans-serif']
      },
         keyframes: {
        slideFade: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "10%": { opacity: "1", transform: "translateY(0)" },
          "90%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-30px)" },
        },
      },
      animation: {
        slideFade: "slideFade 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
