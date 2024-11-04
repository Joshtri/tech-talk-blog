import { useEffect } from 'react';
import { Card, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';


function About() {

  const titlePage = "About";
  useEffect(() => {
    document.title = titlePage;

  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <Card className="max-w-3xl p-4 mt-10 mb-10">
        <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">About Tech Talk</h2>
        <p className="text-gray-700 mb-4 dark:text-gray-200">
          Selamat datang di Blog Tech Talk, pada blog ini saya ingin membagikan ilmu seputaran IT dalam berbagai bidang dan berinisiatif untuk mengedukasi semua orang bagi yang memang tertarik atau ingin mencari tau mengenai IT.
        </p>
        <p className="text-gray-700 mb-4 dark:text-gray-200">
          Misi dari blog ini adalah ingin mengedukasi semua orang mengenai IT, khusus di wilayah NTT.
        </p>
          <Link to='/'>
            <Button className='mx-auto'>
                Kembali ke Beranda
            </Button>
          </Link>
      </Card>
    </div>
  );  
}

export default About;
