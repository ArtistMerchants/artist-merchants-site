/** @type {import('tailwindcss').Config} */

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
      },
      spacing: {
        ...new Array(401)
          .fill()
          .map((_, i) => i)
          .reduce((acc, val) => {
            acc[val] = `${val}px`
            return acc
          }, {}),
      },
      lineHeight: {
        100: '100%',
        110: '110%',
        120: '120%',
        130: '130%',
        140: '140%',
        150: '150%',
        160: '160%',
      },
      fontSize: {
        ...new Array(401)
          .fill()
          .map((_, i) => i)
          .reduce((acc, val) => {
            acc[val] = `${val}px`
            return acc
          }, {}),
      },
      letterSpacing: {
        ...new Array(100)
          .fill()
          .map((_, i) => i / 100)
          .reduce((acc, val) => {
            acc[val * 100] = `${val}em`
            return acc
          }, {}),
      },
      fontFamily: {
        constellation: ['var(--font-constellation)'],
        serif: ['var(--font-self-modern)'],
        sans: ['var(--font-gerstner)'],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
