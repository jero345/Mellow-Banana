import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // The reel is a large media file — keep it out of the inline-asset path.
    assetsInlineLimit: 4096,
  },
})
