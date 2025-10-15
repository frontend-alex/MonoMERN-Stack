import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/client/src'),
      '@shared': path.resolve(__dirname, './packages/shared/src'),
      '@/': path.resolve(__dirname, './app/server/src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build'],
    typecheck: {
      tsconfig: './tsconfig.tests.json'
    }
  },
})
