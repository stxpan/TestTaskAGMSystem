import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react({
      babel: {
        plugins: [['effector/babel-plugin']],
      },
    }),
  ],
  test: {
    setupFiles: 'src/shared/lib/testing/setup',
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      all: true,
      exclude: [
        '.storybook',
        '.next',
        '.unlighthouse',
        '*.config.{ts,js,mjs,cjs}',
        'src/pages/**/*.page.{ts,tsx}',
        '**/*.d.ts',
        '**/index.ts',
        '**/*.stories.tsx',
        '**/*.styled.ts',
        'src/**/*.test.{ts,tsx}',
        'src/stories',
        'dist',
      ],
    },
  },
});
