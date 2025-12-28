// "use client";
import { Player } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SinglePlayerPage: React.FC<PageProps> = async ({ params }) => {
  const { slug } = await params;
  console.log(slug);

  const player: Player = await fetch(`http://localhost:7000/player/${slug}/`) // your API endpoint
    .then((res) => res.json())

    .catch((err) => {
      console.error(err);
      return null;
    });

  if (!player) return <p className="text-center mt-10">Player not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Hero section */}
      <Link href={"/player"} className="flex items-center">
        <ArrowLeft size={20} />
        Back
      </Link>
      <div className="flex items-center p-2 border sm:h-[70vh] flex-col sm:flex-row gap-3 overflow-hidden p-auto justify-center">
        <div className="items-center sm:w-2/4 h-100 w-full sm:h-full border">
          <img
            src={player.thumbnails || "/placeholder.jpg"}
            alt={`${player.first_name} ${player.last_name}`}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="max-md:text-sm md:w-1/4 p-6">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            {player.first_name} {player.last_name}
          </h1>
          <p className="text-gray-600 mb-1">
            <strong>Position:</strong> {player.position}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Number:</strong> {player.number}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Nationality:</strong> {player.nationality}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Date of Birth:</strong> {player.dob}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Height:</strong> {player.height} cm
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Weight:</strong> {player.weight} kg
          </p>
          <div className="mt-4 text-gray-700">{player.bio}</div>
        </div>
      </div>

      {/* Additional Stats / Optional Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">Player Info</h3>
          <ul className="text-gray-600">
            <li>
              <strong>Team:</strong> {player.team}
            </li>
            <li>
              <strong>Position:</strong> {player.position}
            </li>
            <li>
              <strong>Number:</strong> {player.number}
            </li>
            <li>
              <strong>Nationality:</strong> {player.nationality}
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="font-semibold mb-2">Physical Stats</h3>
          <ul className="text-gray-600">
            <li>
              <strong>Height:</strong> {player.height} cm
            </li>
            <li>
              <strong>Weight:</strong> {player.weight} kg
            </li>
            <li>
              <strong>Date of Birth:</strong> {player.dob}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayerPage;
