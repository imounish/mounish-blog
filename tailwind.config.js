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
    },
  },
  plugins: [],
});
