import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

function AudioCutter() {
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#cce5ff',
        progressColor: '#007bff',
        cursorColor: '#007bff',
        backend: 'WebAudio',
        height: 100,
      });

      wavesurfer.current.on('ready', () => {
        setEndTime(wavesurfer.current.getDuration());
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setDownloadUrl(null); // Reset download link on new file selection
      const url = URL.createObjectURL(file);
      wavesurfer.current.load(url);
    }
  };

  const handlePlayPause = () => {
    wavesurfer.current.playPause();
  };

  const handleCrop = async () => {
    if (startTime >= endTime) {
      alert('Please provide valid start and end times.');
      return;
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const sampleRate = audioBuffer.sampleRate;
      const startSample = Math.floor(startTime * sampleRate);
      const endSample = Math.floor(endTime * sampleRate);
      const trimmedLength = endSample - startSample;

      const trimmedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        trimmedLength,
        sampleRate
      );

      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        const channelData = audioBuffer.getChannelData(i).slice(startSample, endSample);
        trimmedBuffer.copyToChannel(channelData, i, 0);
      }

      audioContext.close();
      const blob = await bufferToWave(trimmedBuffer, sampleRate);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error trimming audio:', error);
    }
  };

  const bufferToWave = (audioBuffer, sampleRate) => {
    const numOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numOfChannels * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);

    const writeString = (view, offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + audioBuffer.length * 2 * numOfChannels, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 4, true);
    view.setUint16(32, numOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, audioBuffer.length * 2 * numOfChannels, true);

    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return new Blob([buffer], { type: 'audio/wav' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audio Cutter Online</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} className="mb-4" />
      <div ref={waveformRef} className="waveform bg-gray-100 mb-4" />

      <div className="flex items-center space-x-4 mb-4">
        <button onClick={handlePlayPause} className="bg-green-500 text-white px-4 py-2 rounded">
          Play/Pause
        </button>
        <div className="flex items-center">
          <label>Start:</label>
          <input
            type="number"
            value={startTime.toFixed(2)}
            onChange={(e) => setStartTime(parseFloat(e.target.value))}
            className="border rounded p-1 ml-2 w-20"
          />
        </div>
        <div className="flex items-center">
          <label>End:</label>
          <input
            type="number"
            value={endTime.toFixed(2)}
            onChange={(e) => setEndTime(parseFloat(e.target.value))}
            className="border rounded p-1 ml-2 w-20"
          />
        </div>
        <button onClick={handleCrop} className="bg-blue-500 text-white px-4 py-2 rounded">
          Crop
        </button>
      </div>

      {downloadUrl && (
        <div className="mt-4">
          <a href={downloadUrl} download="trimmed_audio.wav" className="text-blue-500">
            Download Trimmed Audio
          </a>
        </div>
      )}
    </div>
  );
}

export default AudioCutter;
