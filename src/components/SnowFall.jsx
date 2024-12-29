import { useEffect, useRef } from 'react';

const Snowfall = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const snowflakes = [];

    const createSnowflake = () => {
      const size = Math.random() * 3 + 1; // Ukuran kecil (1-4 piksel)
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speed = Math.random() * 0.7 + 0.3; // Gerakan lambat
      const opacity = Math.random() * 0.7 + 0.3; // Transparansi (30%-100%)
      const type = Math.random() > 0.7 ? 'flake' : 'circle'; // 30% menjadi logo es ❄️

      snowflakes.push({ x, y, size, speed, opacity, type });
    };

    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((snowflake) => {
        if (snowflake.type === 'circle') {
          // Gambar salju kecil
          ctx.beginPath();
          ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
          ctx.fill();
        } else if (snowflake.type === 'flake') {
          // Gambar logo es ❄️
          ctx.font = `${snowflake.size * 4}px Arial`; // Ukuran lebih besar
          ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
          ctx.fillText('❄️', snowflake.x, snowflake.y);
        }
      });
    };

    const moveSnowflakes = () => {
      snowflakes.forEach((snowflake, index) => {
        snowflake.y += snowflake.speed;

        // Jika salju keluar dari layar, reset ke atas
        if (snowflake.y > canvas.height) {
          snowflakes[index] = {
            ...snowflake,
            y: 0,
            x: Math.random() * canvas.width,
          };
        }
      });
    };

    const update = () => {
      drawSnowflakes();
      moveSnowflakes();
      requestAnimationFrame(update);
    };

    for (let i = 0; i < 29; i++) {
      createSnowflake(); // Jumlah salju tetap banyak
    }

    update();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', // Tetap di posisi tetap di layar
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999, // Memastikan elemen ini berada di paling depan
        pointerEvents: 'none', // Menghindari kanvas menghalangi interaksi dengan elemen di bawahnya
      }}
    />
  );
};

export default Snowfall;
