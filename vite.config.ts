import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    name: 'Instagram Unfollowers',
    short_name: 'Unfollowers',
    description: 'A safe and comfortable way to preview Instagram unfollowers',
    theme_color: '#000000',
    background_color: '#000000',
    icons: [
      {
        src: '/images/icons-256.png',
        type: 'image/png',
        sizes: '256x256',
        purpose: 'any',
      },
      {
        src: '/images/maskable_icon_x192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/images/icons-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any',
      },
      {
        src: '/images/maskable_icon_x512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(pwaOptions),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
