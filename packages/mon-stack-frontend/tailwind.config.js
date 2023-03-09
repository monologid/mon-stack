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
    extend: {},
  },
}
