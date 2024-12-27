/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import flowbite from  "flowbite-react/tailwind";
import typography from '@tailwindcss/typography'

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

      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none', // Hilangkan batasan lebar
            lineHeight: '1.8', // Atur jarak antar baris
            p: {
              marginTop: '0',
              marginBottom: '1em', // Atur jarak antar paragraf
            },
          },
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(),
    typography


  ],
}

