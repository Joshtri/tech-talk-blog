import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  optimizeDeps: {
    // Uncomment the following line if you want to exclude TensorFlow dependencies from optimization
    // exclude: ['@tensorflow-models/face-landmarks-detection', '@tensorflow/tfjs'],
    exclude: ['@mediapipe/face_mesh'],

  },
});
