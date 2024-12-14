import { useEffect, useState } from "react";
import Layout from "../Layout";
import { Card } from "flowbite-react";
import { FaPlayCircle } from "react-icons/fa";

const TechTalkPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    document.title = "Tech Talk Playlist";

    // Data Statis untuk Playlist YouTube
    const staticPlaylist = [
      {
        id: 1,
        title: "CRUD Data Node.JS",
        description: "Pada video ini anda akan mempelajari bagaimana menggunakan Node.JS untuk melakukan CRUD data serta menyimpan data tersebut di database MySQL",
        thumbnail: "https://i.ytimg.com/pl_c/PLDeIcjYDGryOQ1CljnPoIQvEB_92Tc3CV/studio_square_thumbnail.jpg?sqp=CKHI87oG-oaymwEICKoDEPABSFqi85f_AwYI3vfzugY=&rs=AOn4CLDgDglhXLq917FCsxNT3PYIF5xcvg",
        duration: "9 Video",
        youtubeUrl: "https://youtube.com/playlist?list=PLDeIcjYDGryOQ1CljnPoIQvEB_92Tc3CV&si=Gtr8LE9cg3-8JgEZ", // Playlist URL
      }
    ];

    setPlaylist(staticPlaylist);
  }, []);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Tech Talk Video Playlist
        </h1>

        {playlist.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300">Belum ada playlist video yang tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
            {playlist.map((item) => (
              <Card
                key={item.id}
                className="relative shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
              >
                {item.thumbnail && (
                  <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </a>
                )}
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
                  {item.duration || "Durasi Tidak Tersedia"}
                </div>
                <div className="p-4 flex flex-col">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">
                    {item.description?.slice(0, 100)}{item.description?.length > 100 && "..."}
                  </p>
                  <a
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <FaPlayCircle className="text-xl" />
                    Buka Playlist
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TechTalkPlaylist;
