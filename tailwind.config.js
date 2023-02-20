/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  plugins: [require('flowbite/plugin')],
  theme: {
    extend: {
      backgroundImage: {
        hero: `
          url('./logo.svg') no-repeat,
          linear-gradient(114.86deg, #2D0936 14.71%, #170312 78.23%)
        `,
      },
      backgroundSize: {
        hero: '200px, 100%',
      },
      backgroundPosition: {
        hero: 'bottom 50px right 100px, cover',
      },
    },
  },
}
