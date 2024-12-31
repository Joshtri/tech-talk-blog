// src/routes/publicRoutes.js

import MainPage from '../pages/MainPage';
import About from '../pages/About';
import NewsPage from '../pages/NewsPage';
import GamesPage from '../pages/GamesPage';
import ReadPostPage from '../pages/ReadPostPage';

const publicRoutes = [
  { path: "/", element: <MainPage /> },
  { path: "/about", element: <About /> },
  { path: "/news", element: <NewsPage /> },
  { path: "/games", element: <GamesPage /> },
  { path: "/post/:slug", element: <ReadPostPage/> },

  // <Route path="/post/:slug" element={<PostDetail/>} />




];

export default publicRoutes;
