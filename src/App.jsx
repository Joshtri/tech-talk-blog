// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './pages/MainPage';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NewsPage from './pages/NewsPage';
import GamesPage from './pages/GamesPage';
import { HelmetProvider } from 'react-helmet-async';
import VoiceLabPage from './pages/VoiceLabPage';


function App() {
  
  return (
    <>
      <HelmetProvider>
        <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/post/:slug" element={<PostDetail/>} />
            <Route path='/games' element={<GamesPage/>}/>

            <Route path='/news' element={<NewsPage/>}/>
            <Route path='/voice-labs' element={<VoiceLabPage/>}/>

    
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App
