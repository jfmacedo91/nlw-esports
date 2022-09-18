/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: 'url("/background-galaxy.png")',
        nlwGradient: 'linear-gradient(90deg, #9572FC, #43E7AD, #E1D55D)',
        gameGradient: 'linear-gradient(180deg, #00000000 0%, #000000E5 67%)'
      }
    },
  },
  plugins: [],
}
