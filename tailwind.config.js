/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // tailwind.config.js
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Lexend Deca', 'system-ui', "sans-serif"],
    },
    colors: {
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,
      amber: colors.amber,
      yellow: colors.yellow,
      orange: colors.orange,
      indigo: colors.indigo,
      purple: colors.purple,
      rose: colors.rose,
      green: colors.green,
      sky: colors.sky,
      red: colors.red,
    },
  },
  variants: {},
  plugins: [],
}
