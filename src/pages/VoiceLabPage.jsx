import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import RecorderControls from '../components/VoiceMessage/RecorderControls';
import VoiceMessageList from '../components/VoiceMessage/VoiceMessageList';
import { Card } from 'flowbite-react';

function VoiceLabPage() {
  const [voiceMessages, setVoiceMessages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewMessage = (message) => {
    setVoiceMessages([...voiceMessages, message]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Voice Lab</h1>
        <Card className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <span className="mr-2 text-yellow-500">🚧</span>
            <p className="text-yellow-700">This feature is currently under construction and is experimental. Your feedback is appreciated!</p>
          </div>
        </Card>
        <RecorderControls onNewMessage={handleNewMessage} />
        <h2 className="text-2xl font-semibold mb-4">Voice Messages</h2>
        <VoiceMessageList messages={voiceMessages} />
      </div>
    </Layout>
  );
}

export default VoiceLabPage;