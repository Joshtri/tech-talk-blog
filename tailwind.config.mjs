/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin");
const flowbiteReact = require("flowbite-react/tailwind");
const typography = require("@tailwindcss/typography");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        slideIn: "slideIn 1s ease-in-out forwards",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none", // Remove max width
            lineHeight: "1.8", // Adjust line height
            p: {
              marginTop: "0",
              marginBottom: "1em", // Adjust paragraph spacing
            },
          },
        },
      },
    },
  },
  plugins: [
    flowbite,
    flowbiteReact.plugin(),
    typography,
  ],
};
