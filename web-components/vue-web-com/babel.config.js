module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['@vue/babel-plugin-jsx', {isCustomElement: tag => tag.startsWith('fc-')}]
  ]
}
