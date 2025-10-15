import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('./app/client/src', import.meta.url))),
      '@shared': resolve(fileURLToPath(new URL('./packages/shared/src', import.meta.url))),
      '@/': resolve(fileURLToPath(new URL('./app/server/src', import.meta.url))),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build'],
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    },
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
})