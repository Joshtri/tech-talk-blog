import React from "react";

function SkeletonPostsCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse flex flex-col">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
        <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="mt-4 w-full h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

export default SkeletonPostsCard;
