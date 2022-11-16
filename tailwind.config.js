/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        center: true
      },
      borderRadius: {
        xl: '10px'
      }
    },
    boxShadow: {
      card: '0 0 0px 4px #fff3'
    },
    colors: {
      primary: '#03071e',
      secondary: '#edf2f4',
      board: '#fff1'
    }
  },
  important: '#root',
  plugins: []
};
