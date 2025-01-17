"use client";

export default function NewsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md border border-gray-300 overflow-hidden animate-pulse">
      <div className="w-full md:w-1/3 h-48 bg-gray-300"></div> {/* Skeleton Gambar */}
      <div className="p-4 flex flex-col w-full md:w-2/3">
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
      </div>
    </div>
  );
}
