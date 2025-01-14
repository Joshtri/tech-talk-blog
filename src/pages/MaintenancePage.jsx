import React from 'react';
import './MaintenancePage.css'; // Impor file CSS

const MaintenancePage = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-icon">🚧</div>
      <h1 className="maintenance-heading">Situs Sedang Dalam Perbaikan</h1>
      <p className="maintenance-message">
        Kami sedang melakukan pemeliharaan untuk meningkatkan pengalaman Anda. Harap kembali lagi nanti. Terima kasih atas pengertiannya! 🙏
      </p>
      <div className="maintenance-loader"></div>
    </div>
  );
};

export default MaintenancePage;
