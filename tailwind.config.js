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
