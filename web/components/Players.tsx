import { Player } from "@/lib/types";
import { ApiError, fetchWithCredentials } from "@/lib/utils/api";
import Link from "next/link";
import React from "react";

const PlayerList: React.FC = async () => {
  const BASE_URL = process.env.API_URL;
  let players: Player[] = [];
  try {
    const player = await fetchWithCredentials(`${BASE_URL}/player/`, {
      cache: "no-store",
    });

    players = player;
    console.log("i am hooooome");
  } catch (error: any) {
    if (error instanceof ApiError) {
      console.error("Failed to load :", error.message);
      return (
        <p className="text-center py-20">
          Failed to fetch players. why?,
          {error.message}. Please try again later.
        </p>
      );
    }
  }
  return (
    <section className="max-w-7xl m-auto p-4">
      <div className="py-2 flex flex-row gap-1">
        {players ? (
          players.slice(0, 4).map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.slug}`}
              className="grid flex-1 h-60"
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
          ))
        ) : (
          <p>ERROROROROROROROROROR</p>
        )}
      </div>
    </section>
  );
};

export default PlayerList;
