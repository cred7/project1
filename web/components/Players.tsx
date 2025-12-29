import { Player } from "@/lib/types";
import Link from "next/link";
import React from "react";

const PlayerList: React.FC = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const player: Promise<Player[]> = fetch(`${BASE_URL}/player/`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return null;
    });
  const players = await player;
  return (
    <section className="max-w-6xl m-auto p-4">
      <div className="p-2 grid grid-cols-3 gap-1">
        {players?.slice(0, 3).map((player) => (
          <Link
            key={player.id}
            href={`/player/${player.slug}`}
            className="grid col-span-1 h-60"
          >
            <div className="relative bg-white rounded-none shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer">
              {/* Thumbnail */}
              <img
                src={player.thumbnails || "/placeholder.jpg"}
                alt={`${player.first_name} ${player.last_name}`}
                className="w-full h-full object-contain"
              />

              {/* Overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white text-lg font-bold">
                  {player.first_name} {player.last_name}
                </h2>
                <p className="text-gray-200 text-sm">{player.position}</p>
              </div>

              {/* Player number circle */}
              <div className="absolute top-4 right-4 bg-green-600 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full shadow-lg">
                {player.number}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PlayerList;
