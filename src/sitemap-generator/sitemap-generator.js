import fs from 'fs';
import axios from 'axios';

// Fungsi untuk mengambil slug dari API
const fetchSlugs = async () => {
  try {
    const response = await axios.get('https://tech-talk-blog-api.vercel.app/api/post');
    const posts = response.data; // Asumsi API mengembalikan array of posts
    return posts.map(post => post.slug); // Ambil slug dari data API
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return []; // Fallback jika API gagal
  }
};

// Fungsi untuk membuat sitemap XML
const generateSitemap = async () => {
  const baseUrl = 'https://tech-talks-blog.com'; // Ganti dengan domain Anda
  const staticRoutes = [
    '/',
    '/about',
    '/news',
    '/games',
  ]; // Rute statis Anda

  const slugs = await fetchSlugs();
  const dynamicRoutes = slugs.map(slug => `/post/${slug}`); // Buat rute dinamis berdasarkan slug

  // Gabungkan semua rute
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Template sitemap XML
  const sitemapContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map(route => {
          return `
          <url>
            <loc>${baseUrl}${route}</loc>
          </url>`;
        })
        .join('')}
    </urlset>
  `;

  // Simpan ke file sitemap.xml
  fs.writeFileSync('./public/sitemap.xml', sitemapContent.trim());
  console.log('Sitemap berhasil dibuat!');
};

generateSitemap();
