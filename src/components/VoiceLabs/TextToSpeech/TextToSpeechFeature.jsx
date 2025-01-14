import React, { useState } from 'react';
import { Button } from 'flowbite-react';

function TextToSpeechFeature() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleConvertToSpeech = () => {
    if ('speechSynthesis' in window) {
      // Jika masih berbicara, hentikan dulu
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID'; // Mengatur bahasa ke Bahasa Indonesia

      // Event saat mulai berbicara
      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      // Event saat selesai berbicara
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      // Mulai berbicara
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Browser Anda tidak mendukung fitur Text-to-Speech.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Text-to-Speech</h2>
      <p className="text-gray-600 mb-4 dark:text-gray-100">Masukkan teks yang ingin diubah menjadi suara:</p>
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Ketik teks di sini..."
        value={text}
        onChange={handleTextChange}
      />
      <Button color="info" onClick={handleConvertToSpeech}>
        {isSpeaking ? 'Hentikan' : 'Ubah ke Suara'}
      </Button>
    </div>
  );
}

export default TextToSpeechFeature;
