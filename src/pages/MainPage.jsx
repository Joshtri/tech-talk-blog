import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { Button, Card, Dropdown } from "flowbite-react";
import Welcome from '../components/Main/Welcome';
import { Link } from 'react-router-dom';
import { FaShareAlt, FaCommentDots, FaFacebook, FaTwitter, FaWhatsapp, FaCopy } from 'react-icons/fa';
import { id } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import SearchBar from '../components/SearchBar';

function Main() {
  const [postItem, setPostItem] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const title = "Beranda";

  useEffect(() => {
    setFilteredPosts(postItem); // Set default filteredPosts to all posts
  }, [postItem]);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredPosts(postItem); // Reset if searchTerm is empty
      return;
    }
    const results = postItem.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  };

  useEffect(() => {
    document.title = title;
    getPost();
  },[]);

  const getPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post`);
      const posts = response.data;
  
      // Fetch comment count for each post and ensure commentsCount is a number
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          try {
            const commentResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/comment/count/${post._id}`);
            const commentsCount = commentResponse.data.count || 0; // Ensure number
            return { ...post, commentsCount };
          } catch (error) {
            console.error(`Failed to fetch comments for post ${post._id}:`, error);
            return { ...post, commentsCount: 0 }; // Default if failed
          }
        })
      );
  
      setPostItem(postsWithComments);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin ke clipboard!");
  };

  return (
    <Layout>
      <Welcome />
      <SearchBar onSearch={handleSearch} />

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
            filteredPosts.map((post) => (
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
                  <div className="flex items-center justify-between mt-auto mb-4">

                    <div className="flex items-center text-gray-600 dark:text-gray-100">
                      <FaCommentDots className="mr-1" />
                      <span className="text-sm">{post.commentsCount || 0} Komentar</span>
                    </div>
                    <Dropdown
                      label={<FaShareAlt className="text-blue-600 dark:text-blue-400 hover:text-blue-800 cursor-pointer" />}
                      inline
                      arrowIcon={false}
                    >
                      <Dropdown.Item onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/post/${post.slug}`, '_blank')}>
                        <FaFacebook className="mr-2 text-blue-600" /> Bagikan ke Facebook
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.origin}/post/${post.slug}`, '_blank')}>
                        <FaTwitter className="mr-2 text-blue-400" /> Bagikan ke Twitter
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => window.open(`https://wa.me/?text=${window.location.origin}/post/${post.slug}`, '_blank')}>
                        <FaWhatsapp className="mr-2 text-green-500" /> Bagikan ke WhatsApp
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleCopyLink(`${window.location.origin}/post/${post.slug}`)}>
                        <FaCopy className="mr-2 text-gray-500" /> Salin Tautan
                      </Dropdown.Item>
                    </Dropdown>
                    
                  </div>
                  <span className="text-xs text-end dark:text-gray-400">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: id })}
                  </span>
                  <hr className='mt-2 mb-4'/>
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
