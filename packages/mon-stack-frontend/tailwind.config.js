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
      backgroundColor: {
        'dark-primary': '#191B21',
        'input-dark-primary': '#111317',
        'item-primary': '#21232B',
        'item-primary-hover': '#203762'
      },
      textColor: {
        'font-secondary': '#5E5F68'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover']
    }
  }
}
