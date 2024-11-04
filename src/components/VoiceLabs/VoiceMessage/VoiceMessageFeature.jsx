import React from 'react';
import RecorderControls from '../../VoiceLabs/VoiceMessage/RecorderControls';
import VoiceMessageList from '../../VoiceLabs/VoiceMessage/VoiceMessageList';

function VoiceMessageFeature({ onNewMessage }) {
  return (
    <>
      <RecorderControls onNewMessage={onNewMessage} />
      <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Voice Messages</h2>
      <VoiceMessageList />
    </>
  );
}

export default VoiceMessageFeature;
