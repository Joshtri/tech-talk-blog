import React, { useState } from 'react';
import { FaWhatsapp, FaX } from 'react-icons/fa6';
import { FiShare2, FiFacebook, FiTwitter } from 'react-icons/fi';

const ShareButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleShareOptions = () => setShowOptions(!showOptions);

  const handleShare = (platform) => {
    const url = window.location.href;
    const shareUrls = {
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/share?url=${encodeURIComponent(url)}`,
    };
    if (shareUrls[platform]) window.open(shareUrls[platform], '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleShareOptions}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        <FiShare2 className="inline-block mr-2" />
        Share
      </button>
      {showOptions && (
        <div className="absolute z-10 bg-white shadow-md rounded-md mt-2 w-40">
          <ul>
            <li onClick={() => handleShare('whatsapp')} className="p-2 hover:bg-gray-100 cursor-pointer">
              <FaWhatsapp className="inline-block mr-2 text-green-500" />
              WhatsApp
            </li>
            <li onClick={() => handleShare('facebook')} className="p-2 hover:bg-gray-100 cursor-pointer">
              <FiFacebook className="inline-block mr-2 text-blue-600" />
              Facebook
            </li>
            <li onClick={() => handleShare('twitter')} className="p-2 hover:bg-gray-100 cursor-pointer">
              <FiTwitter className="inline-block mr-2 text-blue-400" />
              Twitter
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
