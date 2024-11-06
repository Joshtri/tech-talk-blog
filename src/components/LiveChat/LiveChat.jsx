// src/components/LiveChat.js

import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

// Fungsi untuk mendapatkan data pesan
const fetcher = (url) => axios.get(url).then((res) => res.data);

function LiveChat() {
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null); // State untuk menyimpan userId
  const messagesEndRef = useRef(null);

  // Mendapatkan userId dari backend saat komponen dimuat
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        let storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
          const response = await axios.get('http://localhost:5000/api/user');
          storedUserId = response.data.userId;
          localStorage.setItem('userId', storedUserId);
        }
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error fetching userId:', error);
      }
    };

    fetchUserId();
  }, []);

  // Menggunakan SWR untuk polling otomatis
  const { data: messages, error } = useSWR(
    'http://localhost:5000/api/chat/messages',
    fetcher,
    {
      refreshInterval: 3000,
    }
  );

  useEffect(() => {
    // Scroll otomatis ke pesan terbaru
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !userId) return; // Pastikan userId tersedia

    try {
      // Mengirim pesan ke backend dengan userId
      await axios.post('http://localhost:5000/api/chat/messages', {
        text: newMessage,
        userId,
      });
      setNewMessage('');
      mutate('http://localhost:5000/api/chat/messages'); // Memperbarui data SWR
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!userId) return <div>Loading user data...</div>;
  if (error) return <div>Error loading messages...</div>;
  if (!messages) return <div>Loading messages...</div>;

  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-100 shadow-lg rounded-lg">
      {/* Header */}
      <div className="bg-blue-600 p-4 rounded-t-lg">
        <h2 className="text-white text-lg font-semibold">Live Chat</h2>
      </div>

      {/* Daftar Pesan */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.userId === userId;
          return (
            <div
              key={index}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 max-w-xs rounded-lg shadow-md ${
                  isCurrentUser
                    ? 'bg-green-500 text-white' // Gaya untuk pesan pengguna sendiri
                    : 'bg-gray-300 text-gray-900' // Gaya untuk pesan pengguna lain
                }`}
                style={{
                  borderRadius: isCurrentUser
                    ? '20px 20px 0px 20px' // Gaya bubble untuk pesan pengguna sendiri
                    : '20px 20px 20px 0px', // Gaya bubble untuk pesan pengguna lain
                  margin: '5px',
                }}
              >
                <span>{message.text}</span>
                <span className="block text-xs mt-1 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Pesan */}
      <div className="flex items-center p-4 border-t">
        <input
          type="text"
          className="flex-grow p-2 mr-2 border rounded-md outline-none"
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
