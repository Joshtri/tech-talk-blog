import React, { useState } from 'react';
import axios from 'axios';

function Comment() {
  const [newComment, setNewComment] = useState('');

  // Fungsi untuk menambah komentar baru
  const handleAddComment = async () => {
    try {
      if (newComment.trim() !== '') {
        // Ganti URL dengan endpoint untuk menyimpan komentar ke server
        const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
          body: newComment,
          postId: 1, // Ganti postId dengan id postingan jika diperlukan
        });
        console.log('Comment added successfully:', response.data);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-4 max-w-2xl mx-auto mt-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Beri Komentar</h2>
      <div className="mb-4">
        <textarea
          disabled
          className="w-full p-2 rounded-lg border border-gray-300"
          rows="4"
          // placeholder="Type your comment here..."
          placeholder="fitur komentar sedang dalam tahap pengembangan..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleAddComment}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}

export default Comment;
