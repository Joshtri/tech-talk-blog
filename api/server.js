import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Untuk mendapatkan __dirname dalam modul ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware Prerender.io
// eslint-disable-next-line no-undef
app.use(require('prerender-node').set('prerenderToken', `${process.env.VITE_PRERENDER_TOKEN}`));

// Sajikan file build dari Vite
app.use(express.static(path.join(__dirname, '../dist')));

// Arahkan semua rute ke index.html untuk mendukung rute SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Ekspor handler untuk digunakan oleh Vercel
export default app;
