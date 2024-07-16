/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customblue: '#133A6F',
      },
      borderRadius: {
        'custom': '10px',
      }
    },
  },
  plugins: [],
}

