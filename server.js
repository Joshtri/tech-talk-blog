import express from 'express';
import path from 'path';
import prerender from 'prerender-node';
import { fileURLToPath } from 'url';

// Untuk mendapatkan __dirname dalam modul ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT =  3003;

// Konfigurasi token Prerender.io
prerender.set('prerenderToken', `${process.env.VITE_PRERENDER_TOKEN}`); // Ganti dengan token Prerender.io Anda
app.use(prerender);

// Sajikan build aplikasi Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Arahkan semua permintaan ke index.html untuk mendukung rute SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
