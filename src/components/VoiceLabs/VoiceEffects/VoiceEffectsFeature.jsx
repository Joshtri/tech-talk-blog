import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { FaMicrophone, FaPlay, FaRobot, FaTachometerAlt } from 'react-icons/fa';
import VoiceEffectControls from './VoiceEffectControls';
import { AiTwotoneSound } from 'react-icons/ai';

function VoiceEffectsFeature() {
  const [effect, setEffect] = useState(null);

  const handleEffectChange = (selectedEffect) => {
    setEffect(selectedEffect);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-10 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-gray-100">Voice Effects</h2>
      <p className="text-gray-700 mb-6 text-center">Tambahkan efek suara pada rekaman:</p>
      <div className="bg-gray-200 p-4 rounded-md shadow-inner mb-6">
        <VoiceEffectControls effect={effect} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Button
          className={`flex items-center justify-center gap-2 ${
            effect === 'echo' ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } transition-all`}
          onClick={() => handleEffectChange('echo')}
        >
          <AiTwotoneSound />
          Terapkan Echo
        </Button>
        <Button
          className={`flex items-center justify-center gap-2 ${
            effect === 'robot' ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } transition-all`}
          onClick={() => handleEffectChange('robot')}
        >
          <FaRobot />
          Terapkan Suara Robot
        </Button>
        <Button
          className={`flex items-center justify-center gap-2 ${
            effect === 'speed' ? 'bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
          } transition-all`}
          onClick={() => handleEffectChange('speed')}
        >
          <FaTachometerAlt />
          Ubah Kecepatan
        </Button>
      </div>
    </div>
  );
}

export default VoiceEffectsFeature;
