/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      worksans: ['work-sans', 'sans-serif'],
      warnock: ['warnock', 'serif'],
      
      warnockdisp: ['warnock-disp', 'serif'],
      warnockcapt: ['warnock-capt', 'serif'],
      warnocksubh: ['warnock-subh', 'serif'],
      lora: ['lora', 'serif'],
      courier: ['courier-prime', 'monospace'],
    },
    extend: {
      colors: {
        'custom-red': '#b83854',
        brand: '#b83854',
        'brand-teal': '#41b3a3',
      },
    },
  },
  plugins: [],
});
