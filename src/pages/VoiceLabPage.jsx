import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Layout from './Layout';
import { Card, Modal } from 'flowbite-react';
import FeatureTabs from '../components/VoiceLabs/VoiceFeaturesTab';
import TextToSpeechFeature from '../components/VoiceLabs/TextToSpeech/TextToSpeechFeature';
import SpeechToTextFeature from '../components/VoiceLabs/SpeechToText/SpeechToTextFeature';
import VoiceEffectsFeature from '../components/VoiceLabs/VoiceEffects/VoiceEffectsFeature';
import { isInstagramApp } from '../utils/deviceHelpers';
import { FaChrome } from 'react-icons/fa6';

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const openInChromeAndroid = () => {
  const url = `${window.location.origin}/voice-labs`;
  window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
};

const openInDefaultBrowser = () => {
  const url = `${window.location.origin}/voice-labs`;
  window.open(url, '_blank');
};

function VoiceLabPage() {
  const { data: voiceMessages, error } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/voice`, fetcher);
  const [activeFeature, setActiveFeature] = useState('textToSpeech');
  const [showOpenInBrowser, setShowOpenInBrowser] = useState(false);

  useEffect(() => {
    if (isInstagramApp()) {
      setShowOpenInBrowser(true);
    }
  }, []);

  const handleNewMessage = (newMessage) => {
    mutate(`${import.meta.env.VITE_BASE_URL}/api/voice`, (messages) => [newMessage, ...messages], false);
  };

  const handleOpenInBrowser = () => {
    if (isIOS()) {
      openInDefaultBrowser();
    } else {
      openInChromeAndroid();
    }
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
            <p className="text-yellow-400">Fitur ini sedang dibangun dan bersifat eksperimental. Masukan Anda sangat kami hargai!</p>
          </div>
        </Card>

        <FeatureTabs activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        <hr />

        {activeFeature === 'textToSpeech' && <TextToSpeechFeature />}
        {activeFeature === 'speechToText' && <SpeechToTextFeature />}
        {activeFeature === 'voiceEffects' && <VoiceEffectsFeature />}
      </div>

      {/* Modal untuk Peringatan "Buka di Browser" */}
      {showOpenInBrowser && (
        <Modal
          show={showOpenInBrowser}
          onClose={() => setShowOpenInBrowser(false)}
          size="md"
          className="text-center"
        >
          <Modal.Header>Buka di Browser <FaChrome/></Modal.Header>
          <Modal.Body>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-4">
                Fitur ini hanya dapat diakses pada web browser Chrome <FaChrome/>, 
                Untuk pengalaman terbaik, buka halaman ini di browser chrome Anda.
              </p>
              <button
                onClick={handleOpenInBrowser}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Buka di Browser Chrome <FaChrome/>
              </button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Layout>
  );
}

export default VoiceLabPage;
