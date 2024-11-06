// src/components/LiveChat.js

import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

// Fungsi untuk mendapatkan data pesan
const fetcher = (url) => axios.get(url).then((res) => res.data);

// Import audio files
import sentAudio from '../../assets/audio/sent-tone.mp3';
import receivedAudio from '../../assets/audio/fart-tone.mp3';

function LiveChat() {
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null); // State untuk menyimpan userId
  const messagesEndRef = useRef(null);

  // Audio objects for ringtones
  const sentMessageAudio = new Audio(sentAudio);
  const receivedMessageAudio = new Audio(receivedAudio);

  // Mendapatkan userId dari backend saat komponen dimuat
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        let storedUserId = localStorage.getItem('userId');
        if (!storedUserId) {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user`);
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
    `${import.meta.env.VITE_BASE_URL}/api/chat/messages`,
    fetcher,
    {
      refreshInterval: 3000,
      onSuccess: (newMessages) => {
        // Play received message sound if there's a new message from others
        if (messages && newMessages.length > messages.length) {
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.userId !== userId) {
            receivedMessageAudio.play();
          }
        }
      },
    }
  );

  useEffect(() => {
    // Scroll otomatis ke pesan terbaru
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !userId) return;

    try {
      // Mengirim pesan ke backend dengan userId
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/chat/messages`, {
        text: newMessage,
        userId,
      });
      setNewMessage('');
      mutate(`${import.meta.env.VITE_BASE_URL}/api/chat/messages`); // Memperbarui data SWR

      // Play sent message sound
      sentMessageAudio.play();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Skeleton Loading untuk Pesan
  const SkeletonMessage = () => (
    <div className="flex flex-col space-y-4 p-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-3/4 bg-gray-300 h-6 rounded-md animate-pulse"></div>
      ))}
    </div>
  );

  if (!userId || error) return <SkeletonMessage />;

  return (
    <div className="mt-10 mb-10 flex flex-col h-full w-full max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-blue-900 p-4 text-white font-semibold text-lg text-center">
        Live Chat
      </div>

      {/* Daftar Pesan dengan area scroll */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4" style={{ maxHeight: '400px' }}>
        {!messages ? (
          <SkeletonMessage />
        ) : (
          messages.map((message, index) => {
            const isCurrentUser = message.userId === userId;
            return (
              <div
                key={index}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 max-w-xs rounded-lg shadow-md ${
                    isCurrentUser
                      ? 'bg-green-500 text-white' // Warna untuk pesan pengguna sendiri
                      : 'bg-gray-300 text-gray-900' // Warna untuk pesan pengguna lain
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
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Pesan yang Sticky */}
      <div className="p-4 border-t border-gray-600 flex items-center sticky bottom-0 bg-gray-100 dark:bg-gray-800">
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
