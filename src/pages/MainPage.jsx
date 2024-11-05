import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { Button, Card } from "flowbite-react";
import Welcome from '../components/Main/Welcome';
import { Link } from 'react-router-dom';
import { FaShareAlt, FaCommentDots } from 'react-icons/fa';

function Main() {
  const [postItem, setPostItem] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const title = "Beranda";

  useEffect(() => {
    document.title = title;
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post`);
      setPostItem(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Welcome />
      <div className="flex justify-center px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full">
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="max-w-sm w-80 flex flex-col shadow-lg rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="mt-auto">
                    <div className="h-10 bg-gray-300 rounded w-full"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            postItem.map((post) => (
              <Card key={post._id} className="w-full flex flex-col shadow-lg rounded-lg overflow-hidden">
                {post.coverImageUrl && (
                  <img
                    src={post.coverImageUrl}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize mb-2">
                    {post.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                    {post.description?.slice(0, 65)}{post.description?.length > 65 && '...'}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    {/* Comment count */}
                    <div className="flex items-center text-gray-600 dark:text-gray-100">
                      <FaCommentDots className="mr-2" />
                      <span>{post.comments ? post.comments.length : 0} Komentar</span>
                    </div>
                    {/* Share button */}
                    <button className="flex items-center text-blue-600 dark:text-gray-200 hover:text-blue-800">
                      <FaShareAlt className="mr-2" />
                      Bagikan
                    </button>
                  </div>
                  <Link to={`post/${post.slug}`} className="mt-auto">
                    <Button className="w-full">
                      Baca Lanjut
                      <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Main;
