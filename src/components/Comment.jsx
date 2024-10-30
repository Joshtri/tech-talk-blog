import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiSend, FiMic } from 'react-icons/fi'; // Import icons
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'flowbite-react'; // Import Tooltip from Flowbite
import './wave-anim.css';

function Comment({ postId, onAddComment }) {
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0); // For recording duration
  let mediaRecorder;
  let recordingInterval;

  const handleAddComment = async () => {
    try {
      if (newComment.trim() !== '' || audioBlob) {
        setLoading(true);
        
        // Create form data for text comment and/or audio
        const formData = new FormData();
        formData.append('comment_user', newComment);
        formData.append('postId', postId);
        
        if (audioBlob) {
          formData.append('voiceMessage', audioBlob, 'voiceMessage.wav');
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/comment`, formData);
        onAddComment(response.data);
        
        setNewComment('');
        setAudioBlob(null);
        setLoading(false);
        toast.success('Komentar berhasil terkirim');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error adding comment:', error);
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0); // Reset recording time
    recordingInterval = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000); // Update every second

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    const audioChunks = [];
    mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
    
    mediaRecorder.onstop = () => {
      clearInterval(recordingInterval); // Stop the timer
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
      setIsRecording(false);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    clearInterval(recordingInterval); // Stop the timer
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-gray-100 p-4 max-w-4xl mx-auto mt-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Beri Komentar</h2>
      
      <div className="mb-4">
        <textarea
          className="w-full p-2 rounded-lg border border-gray-300"
          rows="4"
          placeholder="Type your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={loading} // Disable textarea when loading
        />
      </div>

      <div className="flex space-x-2 items-center">
        {/* Tooltip for Send Button */}
        <Tooltip content="Send Comment" placement="top">
          <button
            className={`p-2 rounded-lg flex items-center justify-center ${loading ? 'cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            onClick={handleAddComment}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <FiSend className="h-5 w-5" />
            )}
          </button>
        </Tooltip>

        {/* Tooltip for Voice Message Button */}
        <Tooltip content="Voice Message" placement="top">
          <button
            className={`p-2 rounded-lg ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
          >
            <FiMic className="h-5 w-5" />
          </button>
        </Tooltip>
      </div>

      {/* Display recording animation and duration */}
      {isRecording && (
        <div className="flex items-center space-x-2 mt-4">
          <span className="text-red-500">●</span>
          <span>{formatTime(recordingTime)}</span>
          <div className="wave-animation bg-gray-300 h-4 w-20 rounded-full"></div>
        </div>
      )}

      {/* Display recorded audio */}
      {audioBlob && (
        <div className="mt-4">
          <audio controls src={URL.createObjectURL(audioBlob)} className="w-full rounded-md" />
        </div>
      )}
    </div>
  );
}

export default Comment;
