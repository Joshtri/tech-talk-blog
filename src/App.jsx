import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MaintenancePage from "./pages/MaintenancePage"; // Halaman maintenance
import Snowfall from "./components/SnowFall";
import allRoutes from "./routes/allRoutes";
import { useState, useEffect } from "react";
import axios from "axios"; // Tambahkan axios

function App() {
  const [isMaintenance, setIsMaintenance] = useState(false); // State untuk status maintenance
  const [isLoading, setIsLoading] = useState(true); // State untuk loading status

  // Fungsi untuk mengambil status maintenance dari backend
  const fetchMaintenanceStatus = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/maintenance`); // Sesuaikan URL
      setIsMaintenance(response.data.isMaintenance);
    } catch (error) {
      console.error("Failed to fetch maintenance status:", error);
    } finally {
      setIsLoading(false); // Set loading selesai
    }
  };

  // Panggil fetchMaintenanceStatus saat komponen mount
  useEffect(() => {
    fetchMaintenanceStatus();
  }, []);

  // Tampilkan spinner loading saat memuat status maintenance
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="ml-4 text-lg font-semibold text-blue-600">Loading...</p>
      </div>
    );
  }

  // Jika dalam mode maintenance, tampilkan halaman maintenance
  if (isMaintenance) {
    return <MaintenancePage />;
  }

  // Tampilkan aplikasi jika tidak dalam mode maintenance
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
