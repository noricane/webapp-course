/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{'oswald':['Oswald','sans-serif']},
      screens: {
        'utxl': {'max':'1423px'},
        'utlg': {'max':'1023px'},
        'utmd': {'max':'767px'},
        'utsm': {'max':'639px'},
        'utxs': {'max':'479px'},
        'xs': {'min':'480px'},
      }
    },
  },
  plugins: [],
}