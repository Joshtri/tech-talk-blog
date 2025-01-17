import React, { useEffect } from 'react';

const SocialBar = () => {
  useEffect(() => {
    // Buat elemen script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//pl25427046.profitablecpmrate.com/b0/2c/47/b02c471891a012ec3bed3e99a12171e9.js';
    script.async = true;
    // Tambahkan ke body
    document.body.appendChild(script);

    // Bersihkan script saat komponen dilepas
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Social Bar akan muncul di sini */}
    </div>
  );
};

export default SocialBar;
