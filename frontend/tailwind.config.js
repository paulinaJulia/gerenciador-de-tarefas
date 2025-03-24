/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xl: { max: '1920px' },
        lg: { max: '1440px' },
        md2: { max: '1280px' },
        md: { max: '1024px' },
        sm: { max: '600px' },
      },
    },
    /*     screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
 */
    colors: {
      'primary-pure': '#8284FA',
      'primar-dark': '#5e60CE',
      secondary: '#4ea8de',
      'secondary-dark': '#1e6f9f',
      'gray-700': '#0d0d0d',
      'gray-600': '#1a1a1a',
      'gray-500': '#262626',
      'gray-400': '#333333',
      'gray-300': '#808080',
      'gray-200': '#d9d9d9',
      'gray-100': '#f2f2f2',
      danger: '#e25858',
    },
    spacing: {
      0: '0',
      1: '1px',
      2: '0.125rem',
      4: '0.25rem',
      6: ' 0.38rem',
      8: '0.5rem',
      10: '.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.13rem',
      20: '1.25rem',
      24: '1.5rem',
      28: '1.75rem',
      32: '2rem',
      34: '2.75rem',
      40: '2.5rem',
      42: '2.63rem',
      48: '3rem',
      52: '3.25rem',
      56: '3.5rem',
      64: '4rem',
      72: '4.5rem',
      80: '5rem',
      96: '6rem',
      120: '7.5rem',
      160: '10rem',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}
