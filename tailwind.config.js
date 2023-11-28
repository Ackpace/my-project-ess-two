/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
 
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ['Ubuntu'],
        Silkscreen: ['Silkscreen', 'cursive']
      },
      fontSize: {
        h1: ['4.209rem', {
          lineHeight: '1.3'
        }]
      } 
    },
  },
  plugins: [],
}
