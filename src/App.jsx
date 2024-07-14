import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComp from './components/Navbar'
import FooterComp from './components/Footer'
import Dashboard from './pages/Dashboard';
import PostDetail from './pages/PostDetail';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="post/:id" element={<PostDetail/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
