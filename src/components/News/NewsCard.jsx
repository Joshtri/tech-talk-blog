"use client";

export default function NewsCard({ item }) {
  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden">
      {item.thumbnail && (
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full md:w-1/3 h-48 md:h-full object-cover"
        />
      )}
      <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
        <div>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {item.title}
          </a>
          <p className="text-gray-600 mt-2">{item.pubDate}</p>
          <p className="text-gray-700 mt-2">
            {item.description.length > 150
              ? item.description.substring(0, 150) + "..."
              : item.description}
          </p>
        </div>
        <div className="flex items-center mt-4">
          <img
            src={item.authorImage || "https://via.placeholder.com/50"}
            alt={item.author}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {item.author || "Unknown Author"}
            </p>
            <p className="text-gray-500">{item.category || "Technology"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
