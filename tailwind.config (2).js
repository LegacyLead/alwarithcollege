/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sky: '#1CA7E0',      // logo circle blue
        navy: '#0B2545',     // ink / headings
        coral: '#E64A3F',    // ribbon red
        sun: '#FFC93C',      // accent yellow
        paper: '#F7FAFC',    // page background
        chalk: '#EAF6FC',    // soft section background
      },
      fontFamily: {
        display: ['var(--font-baloo)'],
        body: ['var(--font-worksans)'],
        mono: ['var(--font-plexmono)'],
      },
      fontWeight: {
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
      },
      clipPath: {
        ribbon: 'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 85% 70%, 15% 70%, 8% 100%, 0 70%)',
      },
    },
  },
  plugins: [],
};
