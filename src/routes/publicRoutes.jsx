// src/routes/publicRoutes.js

import MainPage from '../pages/MainPage';
import About from '../pages/About';
import NewsPage from '../pages/NewsPage';
import GamesPage from '../pages/GamesPage';

const publicRoutes = [
  { path: "/", element: <MainPage /> },
  { path: "/about", element: <About /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/games", element: <GamesPage /> },
];

export default publicRoutes;
