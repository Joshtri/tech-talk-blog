import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaSmile, FaFrown } from 'react-icons/fa';

const EmptyArticleMessage = ({ message, description, buttonText, onButtonClick }) => {
  const controls = useAnimation(); // Kontrol animasi
  const [isHappy, setIsHappy] = useState(false); // State untuk menentukan emoji

  // Animasi perubahan emoji dan warna
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        // Emoji sedih
        setIsHappy(false);
        await controls.start({
          scale: 1.2,
          rotate: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        });

        await controls.start({
          scale: 1,
          rotate: 15,
          transition: { duration: 0.5 },
        });

        // Emoji ceria (berubah menjadi senyum dan kuning)
        setIsHappy(true);
        await controls.start({
          scale: 1.2,
          rotate: -15,
          color: '#FFD700', // Warna kuning untuk emoji ceria
          transition: { duration: 0.5 },
        });

        await controls.start({
          rotate: 0,
          scale: 1,
          transition: { duration: 0.5 },
        });

        // Tunggu sebentar sebelum mengulang
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    sequence();
  }, [controls]);

  return (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
      <motion.div
        animate={controls}
        initial={{ scale: 1, opacity: 0.8 }}
        className="text-6xl mb-4"
        style={{ color: isHappy ? '#C1A61D' : '#A9A9A9' }} // Warna berdasarkan state
      >
        {isHappy ? <FaSmile /> : <FaFrown />} {/* Tampilkan emoji berdasarkan state */}
      </motion.div>

      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-2">
        {message}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>

      <button
        onClick={onButtonClick}
        className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default EmptyArticleMessage;
