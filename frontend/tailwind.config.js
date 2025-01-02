/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        //'custom-light': '#6B7280', 
        //'custom-dark': '#E5E7EB',  
      },
    },
  },
  plugins: [],
}

