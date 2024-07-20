/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        customblue: '#133A6F',
        softgray: '#B2B2B2',
      },
      borderRadius: {
        'custom': '10px',
      }
    },
  },
  plugins: [],
}

