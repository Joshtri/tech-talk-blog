import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import PostDetail from './pages/PostDetail';
import About from './pages/About';

function App() {
  
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/post/:id" element={<PostDetail/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
