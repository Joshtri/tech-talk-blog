// import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { AiOutlineAudio } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

function VoiceMessageList() {
  const { data: messages, error } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/voice`, fetcher, {
    refreshInterval: 5000, // Optional: refresh data every 5 seconds
  });

  if (error) return <p className="text-red-500">Failed to load voice messages.</p>;
  if (!messages) return <p className="text-gray-500">Loading voice messages...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-4">
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={message._id} className="chat-message">
              <div className="flex items-end">
                <FaUser className="w-8 h-8 text-gray-500 order-1" />
                <div className="flex flex-col space-y-2 text-sm mx-2 order-2 items-start w-full">
                  <div>
                    <div className="px-6 py-4 rounded-lg inline-block bg-gray-200 text-gray-800 w-full">
                      <div className="flex items-center space-x-2">
                        <AiOutlineAudio className="h-5 w-5 text-gray-700" />
                        <span className="font-medium">Voice Message {index + 1}</span>
                      </div>
                      <audio controls src={message.voiceUrl} className="mt-2 w-full">
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No voice messages yet. Start recording to create one!</p>
      )}
    </div>
  );
}

export default VoiceMessageList;
