/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'utmd': {'max':'767px'},
        'utxs': {'max':'480px'},
        'xs': {'min':'480px'},
      }
    },
  },
  plugins: [],
}