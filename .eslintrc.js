module.exports = {
  extends: 'eslint:recommended',
  root: true,
  env: {
    node: true,
  },
    parser: 'babel-eslint',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['warn', 'never',],
    'comma-dangle': ['warn', 'always',],
    quotes: ['warn', 'single',],
  },
}
