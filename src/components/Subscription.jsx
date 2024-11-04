import axios from 'axios';
import  { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Subscription() {
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false); // State untuk menentukan status loading

  const handleSubscribe = async () => {
    setLoading(true); // Set loading true saat proses dimulai
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/subscription`, {
        email_subscription: email,
        whats_app_subscription: whatsapp
      });

    //   console.log('Subscription successful:', response.data);

      // Reset input fields after successful subscription
      setEmail('');
      setWhatsapp('');

      // Show success toast
      toast.success('Subscription successful!', {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
    //   console.error('Error subscribing:', error);
      // Handle error as needed
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
      setLoading(false); // Set loading false setelah proses selesai (baik berhasil atau gagal)
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto  mt-6">
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
          type="text"
          placeholder="Enter your WhatsApp (optional)..."
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubscribe}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Men-disable tombol saat loading berlangsung
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
