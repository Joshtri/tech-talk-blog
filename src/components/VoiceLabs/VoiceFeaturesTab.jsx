// import React from 'react';

function VoiceFeaturesTab({ activeFeature, setActiveFeature }) {
  return (
    <div className="mb-6 flex space-x-4">
      {/* <button
        onClick={() => setActiveFeature('voiceMessage')}
        className={`px-4 py-2 ${activeFeature === 'voiceMessage' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Voice Message
      </button> */}
      <button
        onClick={() => setActiveFeature('textToSpeech')}
        className={`px-4 py-2 ${activeFeature === 'textToSpeech' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Text-to-Speech
      </button>
      <button
        onClick={() => setActiveFeature('speechToText')}
        className={`px-4 py-2 ${activeFeature === 'speechToText' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Speech-to-Text
      </button>
      <button
        onClick={() => setActiveFeature('voiceEffects')}
        className={`px-4 py-2 ${activeFeature === 'voiceEffects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        Voice Effects
      </button>
    </div>
  );
}

export default VoiceFeaturesTab;
