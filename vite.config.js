import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/let-the-luck-roll-in/',  // Add this line - matches your repo name
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
