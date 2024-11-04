import React, { useState, useRef } from 'react';
import { Button } from 'flowbite-react';

function SpeechToTextControls({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const handleStartRecording = () => {
    setIsRecording(true);

    // Periksa dukungan Web Speech API
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser Anda tidak mendukung Web Speech API');
      setIsRecording(false);
      return;
    }

    // Inisialisasi objek SpeechRecognition
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'id-ID'; // Set bahasa ke Indonesia
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    // Event handler untuk hasil transkripsi
    recognitionRef.current.onresult = (event) => {
      const transcriptedText = event.results[0][0].transcript;
      setTranscript(transcriptedText);
      if (onTranscription) {
        onTranscription(transcriptedText);
      }
    };

    // Event handler untuk error
    recognitionRef.current.onerror = (event) => {
      console.error('Terjadi kesalahan:', event.error);
      setIsRecording(false);
    };

    // Event handler saat perekaman selesai
    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    // Mulai perekaman
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
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        color={isRecording ? 'danger' : 'success'}
      >
        {isRecording ? 'Hentikan Perekaman' : 'Mulai Perekaman'}
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
