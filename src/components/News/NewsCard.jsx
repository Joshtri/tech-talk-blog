import React, { useState, useEffect } from 'react';

// Komponen untuk menampilkan berita dari RSS feed
function News() {
    const [newsItems, setNewsItems] = useState([]);
    const [selectedSource, setSelectedSource] = useState('https://techcrunch.com/feed/');
    const [isSticky, setIsSticky] = useState(false);

    const sources = {
        'TechCrunch': 'https://techcrunch.com/feed/',
        'The Verge': 'https://www.theverge.com/rss/index.xml',
        'Wired': 'https://www.wired.com/feed/rss',
        'Ars Technica': 'http://feeds.arstechnica.com/arstechnica/index',
        'Engadget': 'https://www.engadget.com/rss.xml'
    };

    useEffect(() => {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(selectedSource)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.items) {
                    setNewsItems(data.items);
                }
            })
            .catch(error => console.error('Error fetching RSS feed:', error));

        const handleScroll = () => {
            if (window.scrollY > 100) { // Ganti 100 dengan jarak scroll yang diinginkan
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedSource]);

    const handleSourceChange = (url) => {
        setSelectedSource(url);
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Latest Technology News</h2>
            <div className={`p-4 shadow-md transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-white' : 'relative'}`}>
                <div className="flex flex-wrap gap-2 justify-center">
                    {Object.entries(sources).map(([name, url]) => (
                        <button
                            key={name}
                            onClick={() => handleSourceChange(url)}
                            className={`px-4 py-2 rounded-md border ${selectedSource === url ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Sesuaikan margin-top dengan tinggi navbar dan elemen sticky */}
            <div className={`${isSticky ? 'mt-24' : 'mt-8'} space-y-6`}>
                {newsItems.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden">
                        {item.thumbnail && (
                            <img src={item.thumbnail} alt={item.title} className="w-full md:w-1/3 h-48 md:h-full object-cover" />
                        )}
                        <div className="p-4 flex flex-col justify-between w-full md:w-2/3">
                            <div>
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
                                    {item.title}
                                </a>
                                <p className="text-gray-600 mt-2">{item.pubDate}</p>
                                <p className="text-gray-700 mt-2">{item.description.length > 150 ? item.description.substring(0, 150) + '...' : item.description}</p>
                            </div>
                            <div className="flex items-center mt-4">
                                <img src={item.authorImage || 'https://via.placeholder.com/50'} alt={item.author} className="w-10 h-10 rounded-full mr-3" />
                                <div className="text-sm">
                                    <p className="font-medium text-gray-900">{item.author || 'Unknown Author'}</p>
                                    <p className="text-gray-500">{item.category || 'Technology'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;
