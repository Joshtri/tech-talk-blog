// LiveChat.js

import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { io } from 'socket.io-client';

const socket = io("https://tech-talk-blog-api.vercel.app", {
  reconnectionAttempts: 5,
  timeout: 10000,
  withCredentials: true, // Penting untuk CORS dengan kredensial
});

function LiveChat() {
  const [messages, setMessages] = useState([
    { id: 1, userId: 'Bot', text: 'Selamat datang di chat! Ada yang bisa kami bantu?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mendapatkan ID pengguna saat ini
    socket.on('connect', () => {
      setCurrentUserId(socket.id);
      console.log("Connected to server with ID:", socket.id);
    });

    // Mendengarkan pesan dari server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('connect_error', (err) => {
      console.error("Connection Error:", err);
    });

    socket.on('disconnect', (reason) => {
      console.warn("Disconnected from server:", reason);
    });

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      socket.off('connect');
      socket.off('receiveMessage');
      socket.off('connect_error');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      userId: currentUserId,
      text: newMessage
    };

    socket.emit('sendMessage', message);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="bg-blue-600 dark:bg-blue-700 p-4 rounded-t-lg">
        <h2 className="text-white text-lg font-semibold">Live Chat</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.userId === currentUserId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.userId === currentUserId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-900'
              }`}
            >
              <span className="block font-semibold">
                {message.userId === currentUserId ? 'You' : 'Other'}
              </span>
              <span className="block">{message.text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
        <input
          type="text"
          className="flex-grow p-2 mr-2 border rounded-md outline-none dark:bg-gray-700 dark:text-white"
          placeholder="Tulis pesan..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default LiveChat;
