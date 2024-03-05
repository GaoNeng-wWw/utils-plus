import { defineConfig } from 'vitest/config';

export default defineConfig({
  define:{
    __TEST__: true,
    __DEV__: true
  },
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: ['node_modules/**/*', 'dist', '*.config.js', '.eslint*.*']
    },
  },
});