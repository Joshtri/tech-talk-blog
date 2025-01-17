"use client";

import { useState, useEffect } from "react";
import StickyHeader from "@/components/News/StickyHeader";
import NewsCard from "@/components/News/NewsCard";
import NewsSkeleton from "@/components/News/NewsSkeleton";

const newsSources = {
  TechCrunch: "https://techcrunch.com/feed/",
  "The Verge": "https://www.theverge.com/rss/index.xml",
  Wired: "https://www.wired.com/feed/rss",
  "Ars Technica": "http://feeds.arstechnica.com/arstechnica/index",
  Engadget: "https://www.engadget.com/rss.xml",
};

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [selectedSource, setSelectedSource] = useState(
    "https://techcrunch.com/feed/"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        selectedSource
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.items) {
          setNewsItems(data.items);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching RSS feed:", error);
        setLoading(false);
      });
  }, [selectedSource]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-300">
        Latest Technology News
      </h1>

      {/* Sticky Header */}
      <StickyHeader
        sources={newsSources}
        selectedSource={selectedSource}
        onSourceChange={setSelectedSource}
      />

      {/* News Content */}
      <div className="mt-24 space-y-6">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <NewsSkeleton key={index} />
            ))
          : newsItems.map((item, index) => <NewsCard key={index} item={item} />)}
      </div>
    </div>
  );
}
