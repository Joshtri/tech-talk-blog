import React from 'react';

function CommentList() {
  const comments = [
    {
      username: 'admin#1234',
      content: 'saya baru tau coding itu gitu ya, jadi ininya di ini in.😁',
      createdAt: '2024-07-14T12:34:56.000Z',
    },

    {
      username: 'admin#1234',
      content: 'Sangat informatif dan mudah dipahami.',
      createdAt: '2024-07-15T10:45:00.000Z',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Daftar Komentar</h2>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-800">
              <strong>{comment.username}:</strong>
            </p>
            <p className="text-gray-600">{comment.content}</p>
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
