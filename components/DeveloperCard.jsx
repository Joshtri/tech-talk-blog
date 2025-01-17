"use client"; // Required for client-side rendering in Next.js

import { motion } from "framer-motion";

const DeveloperCard = () => {
  const developerVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
  };

  return (
    <motion.div
      className="flex items-center border-t pt-8 space-x-6"
      variants={developerVariant}
    >
      <motion.img
        src="https://portofolio-yostri.vercel.app/assets/87437837853-wOt9gp6e.jpg"
        alt="Developer"
        className="w-32 h-32 rounded-full shadow-lg"
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <div>
        <motion.h3
          className="text-xl font-semibold dark:text-gray-200"
          variants={textVariant}
        >
          Yosry Lenggu
        </motion.h3>
        <motion.p
          className="text-gray-700 mt-2 dark:text-gray-300"
          variants={textVariant}
        >
          Saya adalah seorang developer web Tech Talk serta penulis yang
          berdedikasi dalam bidang IT, khususnya dalam pengembangan web dan
          pemrograman. Dengan blog ini, saya berharap dapat berbagi pengetahuan
          dan pengalaman saya bagi semua orang.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default DeveloperCard;
