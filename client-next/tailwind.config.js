/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'sm': '12px',
      'base': '14px',
      'xl': '16px',
      '2xl': '18px',
      '3xl': '20px',
      '4xl': '22px',
      '5xl': '32px',
    },
    extend: {
      fontFamily: {
        anekdevanagari: ["'Anek Devanagari'", "sans-serif"],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'light-shadow': "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        'dark-shadow': "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        'regular-shadow': "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        'card': '0 0 10px rgba(0,0,0,0.1)',
      },
      colors: {
        'blue': '#000068',
        'red': '#fd0202',
        'gray': '#616161',
        'black': 'black',
        'white': 'white',
        'transparent': 'transparent',
      },
    },
  },
  plugins: [],
};
