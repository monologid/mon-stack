/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss-animate")
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#191B21',
        'input-dark-primary': '#111317',
        'item-primary': '#21232B',
        'hover:item-primary': '#203762'
      }
    },
  },
}
