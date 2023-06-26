/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: { //keyframes used to create an animation
        shimmer: {
          '100%': {transform: 'translateX(100%)'} //moving the element 100% to right hand side
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite' //go an find that shimmer role above play it over span 1.5 second and repeate that forever
      }
    },
  },
  plugins: [],
}

