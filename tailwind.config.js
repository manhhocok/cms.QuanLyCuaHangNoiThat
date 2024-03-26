/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    //   ],
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// import { withUt } from 'uploadthing/tw';

// export default withUt({
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',

//     // Or if using `src` directory:
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//     //   ],
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });
