/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef2f2",
          100: "#fee2e2",
          400: "#fa7f81",
          600: "#981611",
          700: "#7d1210",
        },
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 1px 1.5px rgba(0,0,0,0.1)",
        sidebar: "0px 2px 4px rgba(30,64,175,0.3)",
      },
    },
  },
  plugins: [],
}

