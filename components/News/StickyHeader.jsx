"use client";

export default function StickyHeader({ sources, selectedSource, onSourceChange }) {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-700 shadow-md p-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(sources).map(([name, url]) => (
          <button
            key={name}
            onClick={() => onSourceChange(url)}
            className={`px-4 py-2 rounded-md border ${
              selectedSource === url
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
