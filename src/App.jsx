import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Snowfall from "./components/SnowFall";
import allRoutes from "./routes/allRoutes";

function App() {
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
