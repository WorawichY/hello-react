import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
            if (id.includes('node_modules')) {
                if (id.includes('react-dom') || (id.includes('/react/') && !id.includes('react-redux'))) {
                    return 'vendor';
                }
                if (id.includes('@reduxjs') || id.includes('react-redux')) {
                    return 'redux';
                }
            }
        },
      },
    },
  },
})
