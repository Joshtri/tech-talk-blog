import React from 'react';
import Layout from './Layout';
import News from '../components/News/NewsCard';
import { Helmet } from 'react-helmet-async';

function NewsPage() {
  return (
    <>
      <Helmet>
        <title>News - Tech Talk Blog</title>
        <meta name="description" content="Berita terbaru dan terkini di Tech Talk Blog." />
        <meta property="og:title" content="News - Tech Talk Blog" />
        <meta property="og:description" content="Berita terbaru dan terkini di Tech Talk Blog." />
        <meta property="og:image" content="https://tech-talks-blog.com/news-image.jpg" />
        <meta property="og:url" content="https://tech-talks-blog.com/news" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News - Tech Talk Blog" />
        <meta name="twitter:description" content="Berita terbaru dan terkini di Tech Talk Blog." />
        <meta name="twitter:image" content="https://tech-talks-blog.com/news-image.jpg" />
      </Helmet>
      <Layout>
        <News />
      </Layout>
    </>
  );
}

export default NewsPage;
