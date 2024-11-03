import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { FiMic, FiSend } from 'react-icons/fi';

function RecorderControls({ onNewMessage }) {
  const [recording, setRecording] = useState(false);

  const handleRecordToggle = () => {
    setRecording(!recording);
    // Logic for recording audio goes here
  };

  const handleSend = () => {
    // Placeholder for sending logic
    const newMessage = `Voice message ${new Date().toLocaleTimeString()}`;
    onNewMessage(newMessage);
    setRecording(false);
  };

  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      <Button
        onClick={handleRecordToggle}
        color={recording ? 'failure' : 'primary'}
        className="flex items-center space-x-2"
      >
        <FiMic className="h-5 w-5" />
        <span>{recording ? 'Stop Recording' : 'Start Recording'}</span>
      </Button>
      <Button
        onClick={handleSend}
        color="success"
        className="flex items-center space-x-2"
        disabled={!recording}
      >
        <FiSend className="h-5 w-5" />
        <span>Send</span>
      </Button>
    </div>
  );
}

export default RecorderControls;
