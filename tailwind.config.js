/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-blue': '#162660',
        'powder-blue': '#D0E6FD',
        'bone': '#F1E4D1',
      },
    },
  },
  plugins: [],
};
