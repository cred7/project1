// "use client";
import PlayerList from "@/components/Players";
import React from "react";

const PlayersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-8">Players</h1>
      <p className="text-gray-600 mb-6">
        Meet the squad for the season. Click a player for full details now.
      </p>
      <PlayerList />
    </div>
  );
};

export default PlayersPage;
