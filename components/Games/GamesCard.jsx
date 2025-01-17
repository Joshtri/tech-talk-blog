"use client";

function GamesCard({ game }) {
  return (
    <div className="bg-white dark:bg-gray-700 text-black rounded-lg shadow-md p-4 flex flex-col items-center">
      <img
        src={game.imageUrl}
        alt={game.title}
        className="w-auto h-60 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">{game.title}</h3>
      <p className="text-gray-700 text-sm mb-4 text-center">{game.description}</p>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {game.tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded text-xs font-semibold ${
              tag === "All Ages"
                ? "bg-yellow-500 text-black"
                : tag === "Single Player"
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500 mb-4 dark:text-gray-200">
        {game.playOn}
      </span>
      <a
        href={game.buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
      >
        {game.buttonText}
      </a>
    </div>
  );
}


export default GamesCard;