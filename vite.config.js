import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
<<<<<<< Updated upstream
=======
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      },
      external: ['/portfolio/assets/index-Be_rP3pk.js']

    }
  }
>>>>>>> Stashed changes
})
