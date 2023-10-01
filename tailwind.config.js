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
          '100%': { backgroundPosition: '615vh 0' }
        },
        progress: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '3.125rem 0' }
        },
        rotate: {
          '100%': { transform: 'rotate(360deg)' }
        },
        'fill-unfill-rotate': {
          '12.5%': { transform: 'rotate(135deg)' },
          '25%': { transform: 'rotate(270deg)' },
          '37.5%': { transform: 'rotate(405deg)' },
          '50%': { transform: 'rotate(540deg)' },
          '62.5%': { transform: 'rotate(675deg)' },
          '75%': { transform: 'rotate(810deg)' },
          '87.5%': { transform: 'rotate(945deg)' },
          '100%': { transform: 'rotate(1080deg)' }
        },
        'layer-1-fade-in-out': {
          '0%': { opacity: 1 },
          '25%': { opacity: 1 },
          '26%': { opacity: 0 },
          '89%': { opacity: 0 },
          '90%': { opacity: 1 },
          '100%': { opacity: 1 }
        },
        'layer-2-fade-in-out': {
          '0%': { opacity: 0 },
          '15%': { opacity: 0 },
          '25%': { opacity: 1 },
          '50%': { opacity: 1 },
          '51%': { opacity: 0 },
          '100%': { opacity: 0 }
        },
        'layer-3-fade-in-out': {
          '0%': { opacity: 0 },
          '40%': { opacity: 0 },
          '50%': { opacity: 1 },
          '75%': { opacity: 1 },
          '76%': { opacity: 0 },
          '100%': { opacity: 0 }
        },
        'layer-4-fade-in-out': {
          '0%': { opacity: 0 },
          '65%': { opacity: 0 },
          '75%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        'left-spin': {
          '0%': { transform: 'rotate(130deg)' },
          '50%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(130deg)' }
        },
        'right-spin': {
          '0%': { transform: 'rotate(-130deg)' },
          '50%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(-130deg)' }
        }
      }
    }
  },
  plugins: []
}
