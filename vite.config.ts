import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          clerk: ['@clerk/clerk-react'],
          monaco: ['@monaco-editor/react'],
          router: ['react-router-dom'],
          utils: ['axios', 'zustand', 'date-fns']
        }
      }
    },
    sourcemap: false,
    minify: 'terser'
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true
  }
});
