import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComp from './components/Navbar'
import FooterComp from './components/Footer'
import Dashboard from './pages/Dashboard';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
