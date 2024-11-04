import React, { useState } from 'react';
import SpeechToTextControls from './SpeechToTextControls';

function SpeechToTextFeature() {
  const [transcription, setTranscription] = useState('');

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Speech-to-Text</h2>
      <p className="text-gray-600 mb-4 dark:text-gray-100">Rekam suara dan lihat hasil transkripsinya:</p>
      <SpeechToTextControls onTranscription={setTranscription} />
      {transcription && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h4 className="text-lg font-semibold">Transkripsi Terakhir:</h4>
          <p className="text-gray-700">{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default SpeechToTextFeature;
