const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const jestGlobals = {
  afterEach: 'readonly',
  describe: 'readonly',
  expect: 'readonly',
  jest: 'readonly',
  test: 'readonly',
};

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/**', 'coverage/**'] },
  {
    files: ['src/**/*.ui.test.js', 'src/test/**/*.js'],
    languageOptions: { globals: jestGlobals },
    // Dependencies are resolved by `npm ci`; this also lets lint run in restricted/offline environments.
    rules: { 'import/no-unresolved': 'off' },
  },
]);
