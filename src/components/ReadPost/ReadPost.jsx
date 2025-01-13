import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { MdDateRange } from 'react-icons/md';
import { format } from 'date-fns';
import { FiCopy, FiHeart } from 'react-icons/fi';
import Comment from '../Comment';
import CommentList from '../CommentList';
import Subscription from '../Subscription';
import ShareButton from './ShareButton';
import { Helmet } from 'react-helmet-async';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './content.css';
import './precode.css'
import hljs from "highlight.js"; // Import Highlight.js
import "highlight.js/styles/monokai-sublime.css";

function ReadPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.title = 'Postingan';
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/${slug}`);
      setPost(response.data.data);
    } catch (err) {
      console.error('Error fetching the post:', err);
      setError('Error fetching the post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post && post._id) {
      getLikeCount();
      getCommentsByPostId();
    }
  }, [post]);

  useEffect(() => {
    if (post && post._id) {
      const fetchLikeStatus = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/like/${post._id}`);
          setLiked(response.data.liked); // Status apakah pengguna sudah menyukai
          setLikeCount(response.data.likeCount); // Total jumlah like
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      };
  
      fetchLikeStatus();
    }
  }, [post]);
  

  useEffect(() => {
    // Highlight elemen <pre><code> setelah rendering
    const codeBlocks = document.querySelectorAll("pre code, pre.ql-syntax");
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [post]);


  const getCommentsByPostId = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/comment/${post._id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const getLikeCount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/like/${post._id}`);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('Error fetching like count:', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const url = liked
        ? `${import.meta.env.VITE_BASE_URL}/api/unlike`
        : `${import.meta.env.VITE_BASE_URL}/api/like`;
  
      // Update state secara instan untuk memberikan feedback kepada pengguna
      setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      setLiked(!liked);
  
      // Lakukan API call
      const response = await axios.post(url, { postId: post._id });
      setLikeCount(response.data.likeCount); // Pastikan sinkron dengan data backend
    } catch (error) {
      console.error('Error updating like status:', error);
  
      // Revert perubahan jika API call gagal
      setLikeCount((prevCount) => (liked ? prevCount + 1 : prevCount - 1));
      setLiked(!liked);
    }
  };
  

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast('🦄 Link copied to clipboard!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: 'light',
          transition: Flip,
        });
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  return (
    <>
      {post && (
        <Helmet>
          <title>{post.title} - Tech Talk Blog</title>
          <meta name="description" content={post.summary || 'Deskripsi default untuk postingan.'} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.summary || 'Deskripsi default untuk postingan.'} />
          <meta property="og:image" content={post.coverImageUrl} />
          <meta property="og:url" content={`https://tech-talks-blog.com/post/${post.slug}`} />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.summary || 'Deskripsi default untuk postingan.'} />
          <meta name="twitter:image" content={post.coverImageUrl} />
        </Helmet>
      )}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-700 px-4">
        {loading ? (
          <Card className="max-w-4xl w-full p-4 mt-8 mb-7">
            <div className="animate-pulse">
              <div className="w-full h-96 bg-gray-300 rounded-t-lg"></div>
              <div className="p-2">
                <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mt-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mt-2"></div>
                <hr className="mt-3" />
                <div className="mt-4 space-y-4">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="flex justify-between mt-4 space-x-2">
                  <div className="h-10 bg-gray-300 rounded w-24"></div>
                  <div className="h-10 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  <div className="h-10 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          post && (
            <Card className="max-w-4xl w-full p-0 mt-8 mb-7">
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt="Post Cover"
                  className="w-full h-96 object-cover rounded-t-lg"
                />
              )}
              <div className="p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert">
                <h1 className="text-3xl font-bold text-center capitalize dark:text-gray-200">{post.title}</h1>
                <p className="text-center text-gray-600 mt-2 dark:text-gray-300">
                  <MdDateRange className="inline-block mr-2" />
                  {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                </p>
                <hr className="mt-3" />
                <div
                  className="text-gray-800 dark:text-gray-300 prose text-justify w-full max-w-4xl prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />


                <div className="flex justify-between mt-4 space-x-2">
                  <div>
                  <button
                      className={`px-3 py-1 rounded-md flex items-center transition duration-300 transform ${
                        liked ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-slate-500 hover:bg-gray-300'
                      } ${isAnimating ? 'animate-like' : ''}`}
                      onClick={handleLikeToggle}
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-1 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <FiHeart
                          className={`inline-block mr-1 transition-transform duration-300 ${
                            isAnimating ? 'scale-125 text-pink-500' : ''
                          }`}
                        />
                      )}
                      {liked ? 'Liked' : 'Like'}
                    </button>


                    <p className="text-gray-600 mt-2 text-center">{likeCount} Likes</p>
                  </div>
                  <div>
                    <button
                      className="px-3 py-1 rounded-md dark:bg-slate-500 bg-gray-200 hover:bg-gray-300"
                      onClick={handleCopyLink}
                    >
                      <FiCopy className="inline-block mr-1" />
                      Copy Link
                    </button>
                    <ToastContainer />
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  <ShareButton />
                </div>
              </div>
            </Card>
          )
        )}
      </div>
      {!loading && post && (
        <>
          <Comment postId={post._id} onAddComment={handleAddComment} />
          <CommentList comments={comments} />
          <Subscription />
        </>
      )}
    </>
  );
}

export default ReadPost;
