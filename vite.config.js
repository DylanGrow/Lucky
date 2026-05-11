import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// ⚠️ REPLACE THIS with your exact GitHub repo name
const REPO_NAME = 'lucky'

export default defineConfig({
  // CRITICAL: Tells Vite where your app lives on GitHub Pages
  base: `/${REPO_NAME}/`,
  
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Let the Luck Roll In',
        short_name: 'LuckRoll',
        theme_color: '#1a472a',
        background_color: '#0f2b19',
        display: 'standalone',
        icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia']
        }
      }
    }
  },
  
  server: {
    port: 5173,
    open: true
  }
})
