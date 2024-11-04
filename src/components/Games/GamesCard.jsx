import React from 'react';

function Games() {
    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl dark:text-gray-300 font-bold mb-4">Mbul Adventure</h2>
            <div className="bg-white text-black rounded-lg shadow-md p-2 flex flex-col items-center">
                <img 
                    src="https://img.itch.zone/aW1nLzg4NDU2NDUuanBn/315x250%23c/ft3M1p.jpg" 
                    alt="Mbul Adventure" 
                    className="w-auto h-60 object-cover rounded mb-2" 
                />
                <h3 className="text-md font-semibold mb-1">Mbul Adventure</h3>
                <p className="text-gray-700 text-sm mb-1 text-center">Join Mbul on an epic adventure filled with challenges and fun!</p>
                <div className="flex flex-wrap gap-1 mb-2 justify-center">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">Adventure</span>
                    <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">Single Player</span>
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">All Ages</span>
                </div>
                <span className="text-xs text-gray-500 mb-2">Play on web browser</span>
                <a 
                    href="https://chipset-unc.itch.io/mbuls-adventure" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"
                >
                    Play Now
                </a>
            </div>
        </div>
    );
}

export default Games;