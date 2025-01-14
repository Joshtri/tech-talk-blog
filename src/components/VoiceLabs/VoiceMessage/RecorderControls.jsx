import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'flowbite-react';
import { FiMic, FiSend } from 'react-icons/fi';

function RecorderControls({ onNewMessage }) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunksRef = useRef([]);

  const handleRecordToggle = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
        recorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        recorder.onstop = handleSend;
        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const handleSend = async () => {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
    audioChunksRef.current = []; // Kosongkan chunks setelah rekaman selesai
  
    try {
      const formData = new FormData();
      formData.append('voice', blob, 'recording.webm');
  
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/voice`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.status === 'success') {
        const newMessage = {
          _id: response.data.data._id, // Ambil ID dari respons server
          voiceUrl: response.data.data.voiceUrl, // Ambil URL yang benar dari respons server
        };
  
        onNewMessage(newMessage); // Panggil fungsi untuk memperbarui state di parent
      }
  
      console.log('Voice message sent at', new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Gagal mengirim voice message:', error.response?.data?.message || error.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      <Button
        onClick={handleRecordToggle}
        color={recording ? 'failure' : 'primary'}
        className="flex items-center space-x-2 dark:text-gray-200"
      >
        <FiMic className="h-5 w-5" />
        <span >{recording ? 'Stop Recording' : 'Start Recording'}</span>
      </Button>
      <Button
        onClick={() => {
          if (recording) {
            mediaRecorder.stop();
            setRecording(false);
          }
        }}
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
