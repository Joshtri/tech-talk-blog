import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression'; // Untuk kompresi file
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Gunakan JSX runtime otomatis untuk performa lebih baik
    }),
    compression({ algorithm: 'gzip' }), // Aktifkan kompresi gzip
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias ke folder src
    },
  },
  server: {
    host: '0.0.0.0', // Akses dari jaringan lokal
    port: 3000, // Port server development
    open: true, // Buka browser otomatis saat server dijalankan
    strictPort: true, // Error jika port sudah digunakan
    watch: {
      usePolling: true, // Gunakan polling untuk filesystem berbasis jaringan
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundle React dependencies
    exclude: ['@mediapipe/face_mesh'], // Exclude dependencies berat
  },
  build: {
    target: 'esnext', // Target browser modern
    outDir: 'dist', // Output folder
    sourcemap: false, // Nonaktifkan sourcemap untuk build lebih cepat
    minify: 'esbuild', // Gunakan esbuild untuk minifikasi cepat
    chunkSizeWarningLimit: 500, // Peringatan untuk chunk lebih dari 500 KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Pisahkan dependensi vendor ke chunk terpisah
          }
        },
      },
    },
  },
});
