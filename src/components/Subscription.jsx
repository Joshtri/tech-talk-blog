import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Subscription() {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // Menggunakan `process.env.NEXT_PUBLIC_BASE_URL` karena ini standar di Next.js
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscription`,
        {
          email_subscription: email,
          whats_app_subscription: whatsapp,
        }
      );

      // Reset input fields setelah sukses
      setEmail('');
      setWhatsapp('');

      // Tampilkan notifikasi sukses
      toast.success('Subscription successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      // Tampilkan notifikasi gagal
      toast.error('Subscription failed. Please try again later.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-200">
        Mau dapat email setiap ada postingan baru?
      </h2>
      <div className="mb-4">
        <input
          required={true}
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <input
          required={true}
          type="number"
          placeholder="Enter your WhatsApp...."
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubscribe}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Subscribe'}
        </button>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Subscription;
