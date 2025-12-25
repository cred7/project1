"use client";
import { Player } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:7000/player/") // your API
      .then((res) => res.json())
      .then((data: Player[]) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading players...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {players.map((player) => (
        <Link key={player.id} href={`/player/${player.slug}`}>
          <div className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition cursor-pointer">
            {/* Thumbnail */}
            <img
              src={player.thumbnails || "/placeholder.jpg"}
              alt={`${player.first_name} ${player.last_name}`}
              className="w-full h-64 object-cover"
            />

            {/* Overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
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
  );
};

export default PlayerList;
