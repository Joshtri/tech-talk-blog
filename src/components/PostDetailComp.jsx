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

function PostDetailComp() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdAt, setCreated] = useState('');
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const { id } = useParams();

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
    } catch (error) {
      console.error('There was an error updating the like status!', error);
    }
  };

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const message = encodeURIComponent(`Check out this post: ${url}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => alert('Link copied to clipboard'))
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
              <div
                className="mt-4 text-justify"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="flex justify-between mt-4 space-x-2">
                  <div className=''>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        liked ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                      } flex items-center`}
                      onClick={handleLikeToggle}
                      >
                      <FiHeart className="inline-block mr-1" />
                      {liked ? 'Liked' : 'Like'}
                    </button>
                    <p className="text-gray-600 mt-2 text-center">{likeCount} Likes</p>
                  </div>

                  <div>
                    <button
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center"
                      onClick={handleShareWhatsApp}
                      >
                      <FiShare2 className="inline-block mr-1" />
                      Share WhatsApp
                    </button>
                  </div>

                  <div>
                    <button
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                      onClick={handleCopyLink}
                      >
                      <FiCopy className="inline-block mr-1" />
                      Copy Link
                    </button>
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
