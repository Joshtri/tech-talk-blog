import React, { useState } from 'react';
import { FaWhatsapp, FaX } from 'react-icons/fa6';
import { FiShare2, FiFacebook, FiTwitter, FiInstagram, FiCopy } from 'react-icons/fi';

function ShareButton() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShareOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const message = encodeURIComponent(`Check out this post: ${url}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}&text=Check out this post!`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareInstagram = () => {
    alert("Instagram doesn't support direct sharing via URL. Share manually!");
  };

  return (
    <div className='flex justify-center mt-4 space-x-2'>
      <div className='relative'>
        <button
          className="px-3 py-1 rounded-md bg-green-400 text-white hover:bg-green-600 hover:text-gray-100 font-semibold flex items-center"
          onClick={toggleShareOptions}
        >
          <FiShare2 className="inline-block mr-1" />
          Share
        </button>
        
        {/* Dropdown menu for sharing options */}
        {showOptions && (
          <div className="absolute z-10 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200">
            <ul className="py-2">
              <li
                onClick={handleShareWhatsApp}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaWhatsapp className="mr-2 text-green-500" />
                WhatsApp
              </li>
              <li
                onClick={handleShareFacebook}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FiFacebook className="mr-2 text-blue-600" />
                Facebook
              </li>
              <li
                onClick={handleShareTwitter}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FaX className="mr-2 text-blue-400" />
                Twitter
              </li>
              <li
                onClick={handleShareInstagram}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <FiInstagram className="mr-2 text-pink-500" />
                Instagram
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareButton;
