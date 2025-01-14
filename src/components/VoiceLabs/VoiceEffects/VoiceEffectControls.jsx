import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { FaMicrophone, FaStop, FaPlay, FaVolumeUp } from 'react-icons/fa';

function VoiceEffectControls({ effect }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Inisialisasi AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  const handleStartRecording = async () => {
    setIsRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        audioChunks.current = []; // Bersihkan chunks
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        setAudioBuffer(audioBuffer);
      };
      mediaRecorderRef.current.start();
      console.log('Perekaman dimulai...');
    } catch (error) {
      console.error('Error accessing the microphone:', error);
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      console.log('Perekaman dihentikan.');
    }
  };

  const handlePlayAudio = () => {
    if (!audioBuffer) return;
    const audioContext = audioContextRef.current;
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // Menerapkan efek
    let lastNode = source;

    if (effect === 'echo') {
      const delayNode = audioContext.createDelay();
      delayNode.delayTime.value = 0.3; // 300ms delay

      const feedbackGain = audioContext.createGain();
      feedbackGain.gain.value = 0.5;

      delayNode.connect(feedbackGain);
      feedbackGain.connect(delayNode);

      lastNode.connect(delayNode);
      lastNode = delayNode;
    } else if (effect === 'robot') {
      const distortion = audioContext.createWaveShaper();
      const curve = new Float32Array(44100);
      for (let i = 0; i < 44100; i++) {
        const x = (i * 2) / 44100 - 1;
        curve[i] = ((Math.PI + 20) * x) / (Math.PI + 20 * Math.abs(x));
      }
      distortion.curve = curve;
      distortion.oversample = '4x';

      lastNode.connect(distortion);
      lastNode = distortion;
    } else if (effect === 'speed') {
      source.playbackRate.value = 1.5; // Mempercepat audio 1.5x
    }

    lastNode.connect(audioContext.destination);
    source.start(0);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:justify-start gap-3 mb-4">
        <Button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          color={isRecording ? 'danger' : 'success'}
          className="flex items-center justify-center gap-2 px-4 py-2 transition-transform transform hover:scale-105"
        >
          {isRecording ? (
            <>
              <FaStop className="text-gray-700 mx-1" />
              <span className='text-gray-700'>
                Hentikan Perekaman
              </span>
            </>
          ) : (
            <>
              <FaMicrophone className="text-gray-100 mx-1" />
              <span className='text-gray-100'>

                Mulai Perekaman
              </span>
            </>
          )}
        </Button>

        <Button
          onClick={handlePlayAudio}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!audioBuffer}
        >
          <FaPlay className="text-white" />
          Putar Audio
        </Button>
      </div>
    </div>
  );
}

export default VoiceEffectControls;
