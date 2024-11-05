import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';
import '../../VoiceLabs/wave-anim.css'


function SpeechToTextControls({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const handleStartRecording = () => {
    setIsRecording(true);

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser Anda tidak mendukung Web Speech API');
      setIsRecording(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'id-ID';
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const transcriptedText = event.results[0][0].transcript;
      setTranscript(transcriptedText);
      if (onTranscription) {
        onTranscription(transcriptedText);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Terjadi kesalahan:', event.error);
      setIsRecording(false);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
    console.log('Perekaman dimulai...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log('Perekaman dihentikan.');
    }
  };

  return (
    <div>
      <Button
      className='dark:text-gray-100'
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        // color={isRecording ? 'danger' : 'success'}
      >
        {isRecording ? 'Hentikan Perekaman' : 'Mulai Perekaman'}
        {isRecording && (
          <div className="dot-wave-container">
            <div className="dot-wave"></div>
            <div className="dot-wave"></div>
            <div className="dot-wave"></div>
            <div className="dot-wave"></div>
            <div className="dot-wave"></div>
            <div className="dot-wave"></div>
          </div>
        )}
      </Button>
      {transcript && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h4 className="text-lg font-semibold">Transkripsi:</h4>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default SpeechToTextControls;
