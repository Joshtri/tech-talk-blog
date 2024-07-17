import React from 'react';

function CommentList({ comments }) {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Komentar</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-800">
              <strong>{comment.username}:</strong>
            </p>
            <p className="text-gray-600">{comment.comment_user}</p>
            <p className="text-gray-400 text-sm">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Belum ada komentar.</p>
      )}
    </div>
  );
}

export default CommentList;
