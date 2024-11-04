import  { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSend } from 'react-icons/fi';
import { Tooltip } from 'flowbite-react'; // Import Tooltip from Flowbite

function Comment({ postId, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return; // Prevent empty comments

    try {
      setLoading(true);

      // Make the API request to add a comment
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/comment`, {
        comment_user: newComment,
        postId: postId,
      });

      // Trigger parent function to update comments list
      onAddComment(response.data);

      // Show success toast once
      toast.success('Komentar berhasil terkirim', {
        toastId: 'comment-success' // Unique ID to prevent duplicate toasts
      });

      // Reset comment input
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false); // Ensure loading state is disabled
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 max-w-4xl mx-auto mt-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">Beri Komentar</h2>
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded-lg border border-gray-300"
          rows="4"
          placeholder="Type your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading} // Disable textarea when loading
        />
      </div>
      <div className="flex justify-start">
        <Tooltip content="Send Comment" placement="top">
          <button
            className={`bg-blue-500 text-white p-2 rounded-lg ${loading ? 'cursor-not-allowed' : ''}`}
            onClick={handleAddComment}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              <FiSend className="h-5 w-5" />
            )}
          </button>
        </Tooltip>

      </div>
    </div>
  );
}

export default Comment;
