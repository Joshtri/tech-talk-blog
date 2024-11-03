import express from 'express';
import path from 'path';
import prerender from 'prerender-node';
import { fileURLToPath } from 'url';

// Untuk mendapatkan __dirname dalam modul ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Konfigurasi Prerender.io
prerender.set('prerenderToken', 'YOUR_PRERENDER_IO_TOKEN');
app.use(prerender);

// Sajikan file build dari Vite
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Ekspor handler untuk Vercel
export default app;
