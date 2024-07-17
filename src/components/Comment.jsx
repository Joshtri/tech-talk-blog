import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Comment({ postId, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    try {
      if (newComment.trim() !== '') {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/comment`, {
          comment_user: newComment,
          postId: postId,
        });
        console.log('Comment added successfully:', response.data);
        onAddComment(response.data);
        setNewComment('');
        setLoading(false);
        toast.success('Komentar berhasil terkirim');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 max-w-4xl mx-auto mt-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Beri Komentar</h2>
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
      <div className="flex justify-end">
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
            'Kirim Komentar'
          )}
        </button>
      </div>
    </div>
  );
}

export default Comment;
