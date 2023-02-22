/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        orange: '#FE5000',
        'dark-gray': '#25282A',
      },
      greyscale: {
        white: '#FFFFFF',
        'light-gray': '#BBBCBC',
        gray: '#363636',
        'dark-gray': '#25282A',
        black: '#000000',
      },
      secondary: {
        blue: '#545BFF',
        purple: '#4449B3',
        green: '#AAFF87',
        'light-gray': '#BBBCBC',
      },
      complementary: {
        'light-blue': '#545AFF',
        'dark-blue': '#2A2D80',
        'light-green': '#AAFF87',
        'dark-green': '#568044',
        'light-purple': '#6169FF',
        'dark-purple': '#303480',
      },
      social: {
        'facebook-blue': '#3b5998',
        'twitter-blue': '#0084b4',
        'google-red': '#db4a39',
        'github-blue': '#4078c0',
      },
      cta: {
        red: '#C0392B',
        yellow: '#F1C40F',
        green: '#62C462',
      },
    },
  },
  fontFamily: {
    uniwars: ['uniwars', 'sans-serif'],
    zonapro: ['Zona\\ Pro'],
  },
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       hero: `
  //         url('./logo.svg') no-repeat,
  //         linear-gradient(114.86deg, #2D0936 14.71%, #170312 78.23%)
  //       `,
  //     },
  //     backgroundSize: {
  //       hero: '200px, 100%',
  //     },
  //     backgroundPosition: {
  //       hero: 'bottom 50px right 100px, cover',
  //     },
  //   },
  // },
}
