import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card } from 'flowbite-react';
import { MdDateRange } from 'react-icons/md';
import { FiShare2, FiCopy, FiHeart } from 'react-icons/fi';
import { format } from 'date-fns';
import Comment from './Comment';
import CommentList from './CommentList';
import Subscription from './Subscription';
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShareButton from './ReadPost/ShareButton';



function PostDetailComp() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreated] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState(''); // State for cover image
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();

  const [isAnimating, setIsAnimating] = useState(false); // State untuk animasi


  useEffect(() => {
    document.title = 'Postingan';
    getPostById();
    getCommentsByPostId();
    getLikeCount();
  }, []);

  const getPostById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setCreated(response.data.createdAt);
      setCoverImageUrl(response.data.coverImageUrl);

      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the post!', error);
      setLoading(false);
    }
  };

  const getCommentsByPostId = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/comment/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('There was an error fetching the comments!', error);
    }
  };

  const getLikeCount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/like/${id}`);
      setLikeCount(response.data.likeCount);
    } catch (error) {
      console.error('There was an error fetching the like count!', error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        // Unlike the post
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/unlike`, {
          postId: id,
        });
        setLikeCount(response.data.likeCount);
      } else {
        // Like the post
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/like`, {
          postId: id,
        });
        setLikeCount(response.data.likeCount);
      }
      setLiked(!liked); // Toggle like state
      setIsAnimating(true); // Set animasi menjadi aktif setiap kali tombol di-klik
    } catch (error) {
      console.error('There was an error updating the like status!', error);
    }
  };

    // Hilangkan animasi setelah selesai
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500); // Durasi animasi 500ms
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const message = encodeURIComponent(`Check out this post: ${url}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // const handleCopyLink = () => {
  //   const url = window.location.href;
  //   navigator.clipboard
  //     .writeText(url)
  //     .then(() => alert('Link copied to clipboard'))
  //     .catch((err) => console.error('Failed to copy:', err));
  // };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast("🦄 Link copied to clipboard!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
          
          // transition: toast.TYPE.FLIP
          transition: Flip
        });
      })
      .catch((err) => console.error('Failed to copy:', err));
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        {loading ? (
          <Card className="max-w-4xl w-full p-4 mt-8 mb-7 animate-pulse">
            <div className="p-4">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <div className="flex justify-end mt-4 space-x-2">
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="max-w-4xl w-full p-1 mt-8 mb-7">
            {coverImageUrl && (
              <img src={coverImageUrl} alt="Post Cover" className="w-full h-96 object-cover rounded-t-lg" />
            )}
            <div className="p-2">
              <h1 className="text-3xl capitalize font-bold text-center">{title}</h1>
              <p className="text-center text-gray-600 mt-2">
                {createdAt && (
                  <>
                    <MdDateRange className="inline-block mr-2" />
                    {format(new Date(createdAt), 'MMMM dd, yyyy')}
                  </>
                )}
              </p>
              <hr className='mt-3' />
              <div
                className="mt-4 text-justify"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="flex justify-between mt-4 space-x-2">
                <div className=''>
                  <button
                    className={`px-3 py-1 rounded-md flex items-center transition duration-300 transform ${
                      liked ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    } ${isAnimating ? 'animate-like' : ''}`}
                    onClick={handleLikeToggle}
                    disabled={loading} // Nonaktifkan tombol selama loading
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
                  {/* <button
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                    onClick={handleCopyLink}
                    >
                    <FiCopy className="inline-block mr-1" />
                    Copy Link
                  </button> */}
                  <button
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                    onClick={handleCopyLink}
                  >
                    <FiCopy className="inline-block mr-1" />
                    Copy Link
                  </button>

                  {/* ToastContainer untuk menampilkan notifikasi */}
                  {/* <ToastContainer /> */}
                </div>
              </div>
              <div className='flex justify-center mt-4 space-x-2'>
                <div className=''>

                  <ShareButton/>
                  {/* <button
                    className="px-3 py-1 rounded-md bg-green-400 text-white hover:bg-green-600 hover:text-gray-100 font-semibold flex items-center"
                    onClick={handleShareWhatsApp}
                    >
                    <FiShare2 className="inline-block mr-1" />
                    Share WhatsApp
                  </button> */}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {!loading && (
        <>
          <Comment postId={id} onAddComment={handleAddComment} />
          <CommentList comments={comments} />
          <Subscription />
        </>
      )}
    </>
  );
}

export default PostDetailComp;
