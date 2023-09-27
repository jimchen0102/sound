module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue',
    './node_modules/@left4code/tw-starter/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fff645',
        secondary: '#fd9d02',
        danger: '#ee2828'
      },
      spacing: {
        7.5: '1.875rem',
        12.5: '3.125rem',
        15: '3.75rem',
        25: '6.25rem',
        30: '7.5rem',
        35: '8.75rem',
        45: '11.25rem',
        50: '12.5rem'
      },
      keyframes: {
        marquee: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '410vh 0' }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 40s linear reverse infinite'
      }
    }
  },
  plugins: []
}
