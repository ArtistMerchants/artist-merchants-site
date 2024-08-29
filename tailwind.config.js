/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
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
    darkMode: 'class',
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#FFFFFF',
        'off-white': '#F8F8F8',
        black: '#000000',
        gray: '#E6E6E7',
      },
      spacing: {
        panel: 'calc(calc(calc(100vw - 64px) / 9) + 32px)',
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
        body: [
          '13px',
          {
            lineHeight: '16px',
            letterSpacing: '0.03em',
          },
        ],
        caption: [
          '10px',
          {
            lineHeight: '16px',
            letterSpacing: '0.08em',
          },
        ],
        'large-heading': 'var(--text-large-heading)',
        'large-heading-sup': 'var(--text-large-heading-sup)',
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
      borderWidth: {
        0: '0px',
        1: '1px',
      },
      animation: {
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)',
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)',
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)',
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)',
          },
        },
      },
      height: {
        screen: 'calc(var(--vh, 1vh) * 100)',
        'screen-s': '100svh',
      },
      minHeight: {
        screen: 'calc(var(--vh, 1vh) * 100)',
        'screen-s': '100svh',
      },
      // responsive sizes
      screens: {
        md: '960px',
      },
    },
  },
  plugins: [],
}
