/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import flowbite from  "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(),


  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        slideIn: 'slideIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),


  ],
}

