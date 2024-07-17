import React, { useState } from 'react';


function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-gray-100 p-4 max-w-2xl mx-auto mt-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-white p-2 rounded-lg shadow-sm mb-2">
            {comment}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
            disabled
          type="text"
          className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          flex-grow p-2 rounded-l-lg border border-gray-300"
          placeholder="fitur komentar sedang dalam tahap pengembangan......."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg"
          onClick={handleAddComment}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Comment;
