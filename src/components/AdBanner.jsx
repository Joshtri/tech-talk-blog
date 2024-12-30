import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.type = 'text/javascript';
    script1.innerHTML = `
      atOptions = {
        'key' : 'e27fc1f8918cbd6dca2c4ec4060bc453',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = '//www.highperformanceformat.com/e27fc1f8918cbd6dca2c4ec4060bc453/invoke.js';
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div style={{ width: '160px', height: '600px' }}>
      {/* Ad space */}
    </div>
  );
};

export default AdBanner;
