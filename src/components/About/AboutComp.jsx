import { useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function About() {
  const titlePage = "Tech Talks Blog | About";
  useEffect(() => {
    document.title = titlePage;
  }, []);

  // Animation variants for Framer Motion
  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const developerVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  const textVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div 
        className="max-w-3xl w-full px-6 mt-10 mb-10"
        variants={cardVariant}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <motion.h2 
            className="text-2xl font-bold mb-4 dark:text-gray-200"
            variants={textVariant}
          >
            About Tech Talk
          </motion.h2>
          <motion.p className="text-gray-700 mb-4 dark:text-gray-200" variants={textVariant}>
            Selamat datang di Blog Tech Talk, pada blog ini saya ingin membagikan ilmu seputaran IT dalam berbagai bidang dan berinisiatif untuk mengedukasi semua orang bagi yang memang tertarik atau ingin mencari tau mengenai IT.
          </motion.p>
          <motion.p className="text-gray-700 mb-8 dark:text-gray-200" variants={textVariant}>
            Misi dari blog ini adalah ingin mengedukasi semua orang mengenai IT, khusus di wilayah NTT.
          </motion.p>

          {/* Developer Section */}
          <motion.div className="flex items-center border-t pt-8 space-x-6" variants={developerVariant}>
            <motion.img 
              src="https://portofolio-yostri.vercel.app/assets/87437837853-wOt9gp6e.jpg" 
              alt="Developer" 
              className="w-32 h-32 rounded-full shadow-lg"
              whileHover={{ scale: 1.1, rotate: 2 }} // Subtle hover effect
              transition={{ type: "spring", stiffness: 300 }}
            />
            <div>
              <motion.h3 className="text-xl font-semibold dark:text-gray-200" variants={textVariant}>
                Yosry Lenggu
              </motion.h3>
              <motion.p className="text-gray-700 mt-2 dark:text-gray-300" variants={textVariant}>
                Saya adalah seorang developer web tech talk serta penulis yang berdedikasi dalam bidang IT, khususnya dalam pengembangan web dan pemrograman. 
                Dengan blog ini, saya berharap dapat berbagi pengetahuan dan pengalaman saya bagi semua orang.
              </motion.p>
            </div>
          </motion.div>

          {/* Back to Home Button */}
          <div className="flex justify-center mt-8">
            <Link to='/'>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white'>
                  Kembali ke Beranda
                </Button>
              </motion.div>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default About;
