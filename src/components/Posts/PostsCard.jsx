import Link from "next/link";
import { useState } from "react";
import { FaCommentDots, FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp, FaCopy } from "react-icons/fa";
import { id } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Dropdown } from "flowbite-react";

function PostsCard({ post }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Durasi animasi dalam milidetik
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Tautan disalin ke clipboard!");
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Gambar Postingan */}
      {post.coverImageUrl && (
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        {/* Judul Postingan */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Deskripsi Postingan */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-3">
          {post.description?.slice(0, 100)}...
        </p>

        {/* Informasi Waktu dan Komentar */}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: id,
            })}
          </span>
          <span className="flex items-center">
            {post.commentsCount || 0}
            <FaCommentDots className="ml-1" />
          </span>
        </div>

        {/* Share Button dan Link */}
        <div className="flex items-center justify-between">
          {/* Dropdown Share Button */}
          <Dropdown
            label={<FaShareAlt className="text-blue-600 dark:text-blue-400 hover:text-blue-800 cursor-pointer" />}
            inline
            arrowIcon={false}
          >
            <Dropdown.Item onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/post/${post.slug}`, "_blank")}>
              <FaFacebook className="mr-2 text-blue-600" /> Bagikan ke Facebook
            </Dropdown.Item>
            <Dropdown.Item onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.origin}/post/${post.slug}`, "_blank")}>
              <FaTwitter className="mr-2 text-blue-400" /> Bagikan ke Twitter
            </Dropdown.Item>
            <Dropdown.Item onClick={() => window.open(`https://wa.me/?text=${window.location.origin}/post/${post.slug}`, "_blank")}>
              <FaWhatsapp className="mr-2 text-green-500" /> Bagikan ke WhatsApp
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleCopyLink(`${window.location.origin}/post/${post.slug}`)}>
              <FaCopy className="mr-2 text-gray-500" /> Salin Tautan
            </Dropdown.Item>
          </Dropdown>

          {/* Link ke postingan */}
          <Link href={`/post/${post.slug}`}>
            <button
              className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transform transition-all duration-300 ${
                isAnimating ? "animate-bounce" : ""
              }`}
              onClick={handleButtonClick}
            >
              Baca Selengkapnya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostsCard;
