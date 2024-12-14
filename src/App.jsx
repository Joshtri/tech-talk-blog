// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './pages/MainPage';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import NewsPage from './pages/NewsPage';
import GamesPage from './pages/GamesPage';
import { HelmetProvider } from 'react-helmet-async';
import VoiceLabPage from './pages/VoiceLabPage';
import LiveChatPage from "./pages/LiveChatPage";
import CSHubPage from "./pages/CsHubPage";
import AudioCutterPage from "./pages/AudioCutterPage";
import FaceDetectionExpressionPage from "./pages/FaceDetectionExpressionPage";
import TechTalkPlaylist from "./pages/TechTalkVideoPages/TechTalkPlaylist";


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


            <Route path="/audio-cutter" element={<AudioCutterPage/>}/>
            <Route path="/face-detection-expression" element={<FaceDetectionExpressionPage/>}/>
            <Route path='/live-chat' element={<LiveChatPage/>}/>
            <Route path="/cs-hub" element={<CSHubPage />} />
            <Route path="/tech-talk-video" element={<TechTalkPlaylist />} />

    
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  )
}

export default App
