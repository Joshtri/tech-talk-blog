/** @type {import('next').NextConfig} */
const nextConfig = {
    // Menentukan output directory untuk build
    distDir: "dist",
  
    // Optimasi tambahan
    reactStrictMode: true, // Aktifkan mode ketat untuk React
    swcMinify: true, // Aktifkan SWC untuk mempercepat proses build
    images: {
      domains: ["https://tech-talks-blog.com"], // Tambahkan domain untuk mengizinkan pemrosesan gambar eksternal
    },
    experimental: {
      appDir: true, // Aktifkan App Directory jika menggunakan layout routing baru
    },
    output: "standalone",

  };
  
  export default nextConfig;
  