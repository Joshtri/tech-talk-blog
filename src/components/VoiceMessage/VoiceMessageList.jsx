import React from 'react';
import { Card } from 'flowbite-react';
import { AiOutlineAudio } from 'react-icons/ai';

function VoiceMessageList({ messages }) {
  return (
    <div>
      {messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {messages.map((message, index) => (
            <Card key={index} className="p-4 flex items-center space-x-3">
              <AiOutlineAudio className="h-6 w-6 text-gray-700" />
              <div>
                <p className="text-lg font-medium">{message}</p>
                <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                  Play
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No voice messages yet. Start recording to create one!</p>
      )}
    </div>
  );
}

export default VoiceMessageList;
