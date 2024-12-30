import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import MaintenancePage from './pages/MaintenancePage'; // Halaman maintenance

import Snowfall from "./components/SnowFall";
import allRoutes from "./routes/allRoutes";
import { useState } from "react";

function App() {
  const [isMaintenance, setIsMaintenance] = useState(false); // Ganti ke `false` jika tidak dalam mode maintenance

  if (isMaintenance) {
    return <MaintenancePage />; // Tampilkan halaman maintenance
  }
  return (
    <>
      <Snowfall />
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {allRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </>
  );
}

export default App;
