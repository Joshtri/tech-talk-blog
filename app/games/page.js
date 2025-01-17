"use client";

// import GameCard from "@components/games/GameCard";
// import GameCard from "@/components/Games/GameCard";
import GamesCard from "@/components/Games/GamesCard";


const gamesData = [
  {
    title: "Mbul Adventure",
    description: "Join Mbul on an epic adventure filled with challenges and fun!",
    imageUrl: "https://img.itch.zone/aW1nLzg4NDU2NDUuanBn/315x250%23c/ft3M1p.jpg",
    tags: ["Adventure", "Single Player", "All Ages"],
    playOn: "Play on web browser",
    buttonText: "Play Now",
    buttonLink: "https://chipset-unc.itch.io/mbuls-adventure",
  },
  {
    title: "Trash Taker Turtle",
    description: "Help the turtle clean up the trash in this fun top-down shooter!",
    imageUrl: "https://img.itch.zone/aW1nLzE2MzQ0NzgyLnBuZw==/347x500/24u2Fg.png",
    tags: ["Top Down Shooter", "Single Player", "All Ages"],
    playOn: "Play on desktop",
    buttonText: "Download Now",
    buttonLink: "https://samuel-jacob.itch.io/trash-taker-turtle",
  },
];

export default function GamesPage() {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold dark:text-gray-300 mb-6 text-center">
        Explore Our Games
      </h1>
      {gamesData.map((game, index) => (
        <GamesCard key={index} game={game} />
      ))}
    </div>
  );
}
