import  { useState } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Layout from './Layout';
import RecorderControls from '../components/VoiceMessage/RecorderControls';
import VoiceMessageList from '../components/VoiceMessage/VoiceMessageList';
import { Card, Button } from 'flowbite-react'; // Hilangkan Tab

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

function VoiceLabPage() {
  const { data: voiceMessages, error } = useSWR(`${import.meta.env.VITE_BASE_URL}/api/voice`, fetcher);
  const [activeFeature, setActiveFeature] = useState('voiceMessage');

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

        {/* Tab Navigasi Sederhana */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setActiveFeature('voiceMessage')}
            className={`px-4 py-2 ${activeFeature === 'voiceMessage' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Voice Message
          </button>
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

        {/* Konten fitur */}
        {activeFeature === 'voiceMessage' && (
          <>
            <RecorderControls onNewMessage={handleNewMessage} />
            <h2 className="text-2xl font-semibold mb-4 dark:text-gray-200">Voice Messages</h2>
            <VoiceMessageList />
          </>
        )}

        {activeFeature === 'textToSpeech' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Text-to-Speech</h2>
            <p className="text-gray-600 mb-4">Masukkan teks yang ingin diubah menjadi suara:</p>
            <textarea className="w-full p-2 border rounded mb-4" placeholder="Ketik teks di sini..." />
            <Button color="info">Convert to Speech</Button>
          </div>
        )}

        {activeFeature === 'speechToText' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Speech-to-Text</h2>
            <p className="text-gray-600 mb-4">Rekam suara dan lihat hasil transkripsinya:</p>
            <RecorderControls />
            <div className="mt-4 p-4 border rounded">Transkripsi suara akan muncul di sini...</div>
          </div>
        )}

        {activeFeature === 'voiceEffects' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Voice Effects</h2>
            <p className="text-gray-600 mb-4">Tambahkan efek suara pada rekaman:</p>
            <RecorderControls />
            <div className="mt-4">
              <Button className="mr-2">Apply Echo</Button>
              <Button className="mr-2">Apply Robot Voice</Button>
              <Button className="mr-2">Apply Speed Change</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default VoiceLabPage;
