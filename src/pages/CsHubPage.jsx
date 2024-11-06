// src/pages/CSHub.js

import { NavLink } from 'react-router-dom';
import Layout from './Layout';
import { Helmet } from 'react-helmet-async';

function CSHubPage() {
  return (
    <>
    <Helmet>
        <title>CS Hub - Tech Talk Blog</title>

      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">CS Hub</h2>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Jelajahi fitur-fitur yang tersedia di platform kami:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Voice Lab */}
            <NavLink
              to="/voice-labs"
              className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Voice Lab</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Eksplorasi alat analisis dan pemrosesan suara.
              </p>
            </NavLink>

            {/* Live Chat */}
            <NavLink
              to="/live-chat"
              className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow hover:bg-green-200 dark:hover:bg-green-800 transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Live Chat</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Bergabung dengan obrolan global untuk terhubung dengan orang lain.
              </p>
            </NavLink>

            {/* Face Recognition - Under Construction */}
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow transition opacity-60 cursor-not-allowed">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Face Recognition <span className="text-sm text-gray-500 dark:text-gray-400">🚧 Under Construction</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Identifikasi dan kenali wajah secara real-time.
              </p>
            </div>

            {/* Face Detection Expression - Under Construction */}
            <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg shadow transition opacity-60 cursor-not-allowed">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Face Detection Expression <span className="text-sm text-gray-500 dark:text-gray-400">🚧 Under Construction</span>
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Deteksi ekspresi wajah dan emosi.
              </p>
            </div>
            
          </div>
        </div>
      </Layout>
    </>
  );
}

export default CSHubPage;
