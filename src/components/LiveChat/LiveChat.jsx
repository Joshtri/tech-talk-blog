// src/components/LiveChat.js

import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { v4 as uuidv4 } from 'uuid';

// Fetcher function untuk digunakan oleh SWR
const fetcher = (url) => axios.get(url).then((res) => res.data);

// Dapatkan atau buat ID pengguna di `localStorage`
const getCurrentUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = uuidv4(); // Buat UUID baru
    localStorage.setItem('userId', userId);
    
  }
  return userId;
};

const CURRENT_USER_ID = getCurrentUserId();
console.log("Current User ID:", CURRENT_USER_ID); // Tambahkan ini untuk melihat userId di console

function LiveChat() {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Menggunakan SWR untuk melakukan polling otomatis
  const { data: messages, error } = useSWR(
    'http://localhost:5000/api/chat/messages',
    fetcher,
    {
      refreshInterval: 3000, // Polling setiap 3 detik
    }
  );

  useEffect(() => {
    // Scroll otomatis ke pesan terbaru saat data diperbarui
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      // Mengirim pesan ke backend dengan `userId`
      await axios.post("http://localhost:5000/api/chat/messages", {
        text: newMessage,
        userId: CURRENT_USER_ID, // Mengirim userId yang telah dibuat
      });
      setNewMessage('');

      // Memaksa SWR untuk revalidasi data agar pesan baru langsung terlihat
      mutate('http://localhost:5000/api/chat/messages');

      // Scroll otomatis ke pesan terbaru
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleClearMessages = async () => {
    try {
      await axios.delete("http://localhost:5000/api/chat/messages");
      // Mengosongkan cache SWR untuk membersihkan pesan
      mutate('http://localhost:5000/api/chat/messages', []);
    } catch (error) {
      console.error("Error clearing messages:", error);
    }
  };

  if (error) return <div>Error loading messages...</div>;
  if (!messages) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="bg-blue-600 dark:bg-blue-700 p-4 rounded-t-lg">
        <h2 className="text-white text-lg font-semibold">Live Chat</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.userId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.userId === CURRENT_USER_ID
                  ? 'bg-green-500 text-white' // Warna hijau untuk pesan dari pengguna saat ini
                  : 'bg-gray-300 text-gray-900' // Warna abu-abu untuk pesan dari pengguna lain
              }`}
              style={{
                borderRadius: message.userId === CURRENT_USER_ID ? '15px 15px 0px 15px' : '15px 15px 15px 0px', // Untuk memberikan bentuk bubble seperti WhatsApp
              }}
            >
              <span className="block">{message.text}</span>
              <span className="block text-xs mt-1 text-right">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
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
        <button
          onClick={handleClearMessages}
          className="p-2 ml-2 bg-red-600 text-white rounded-full hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default LiveChat;
