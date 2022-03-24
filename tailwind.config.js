module.exports = {
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  content: [],
  theme: {
    extend: {},
    screens:{
      'xs': '576px',
      'sm': '800px',
      'md': '1080px',
      'lg': '1440px',
      'xl': '2000px',
    }
  },
  plugins: [],
}
