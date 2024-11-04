import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Layout from './Layout';
import { Card } from 'flowbite-react';
import FeatureTabs from '../components/VoiceLabs/VoiceFeaturesTab';
import VoiceMessageFeature from '../components/VoiceLabs/VoiceMessage/VoiceMessageFeature';
import TextToSpeechFeature from '../components/VoiceLabs/TextToSpeech/TextToSpeechFeature';
import SpeechToTextFeature from '../components/VoiceLabs/SpeechToText/SpeechToTextFeature';
import VoiceEffectsFeature from '../components/VoiceLabs/VoiceEffects/VoiceEffectsFeature';

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

function VoiceLabPage() {
  const { data: voiceMessages, error } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/voice`, fetcher);
  const [activeFeature, setActiveFeature] = useState('textToSpeech');

  const handleNewMessage = (newMessage) => {
    mutate(`${import.meta.env.VITE_BASE_URL}/api/voice`, (messages) => [newMessage, ...messages], false);
  };

  if (error) return <p className="text-red-500">Failed to load voice messages.</p>;
  if (!voiceMessages) return <p className="text-gray-500">Loading voice messages...</p>;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-gray-300">Voice Lab</h1>
        <Card className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <span className="mr-2 text-yellow-500">🚧</span>
            <p className="text-yellow-700">Fitur ini sedang dibangun dan bersifat eksperimental. Masukan Anda sangat kami hargai!</p>
          </div>
        </Card>

        <FeatureTabs activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        <hr />

        {/* {activeFeature === 'voiceMessage' && <VoiceMessageFeature onNewMessage={handleNewMessage} />} */}
        {activeFeature === 'textToSpeech' && <TextToSpeechFeature />}
        {activeFeature === 'speechToText' && <SpeechToTextFeature />}
        {activeFeature === 'voiceEffects' && <VoiceEffectsFeature />}
      </div>
    </Layout>
  );
}

export default VoiceLabPage;
