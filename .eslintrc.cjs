module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:tailwindcss/recommended'
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    curly: 'off'
  }
}
