/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        '300': 'repeat(auto-fill, minmax(300px, 1fr))',
      }
    },
  },
  plugins: [],
}

