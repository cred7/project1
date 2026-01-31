"use client";

import { useEffect, useState } from "react";

interface LiveMatchUpdatesProps {}

interface Match {
  id: number;
  teamA: string;
  teamB: string;
  teamA_score: number;
  teamB_score: number;
  current_minute: number;
  status: string;
  date: string;
}

interface ScoreUpdate {
  type: string;
  score: {
    teamB_name: string;
    teamA_name: string;
    teamA_score: number;
    teamB_score: number;
    status: "live" | "ended" | string;
    minute: number;
  };
}

export default function LiveMatchUpdates({}: LiveMatchUpdatesProps) {
  const [scores, setScores] = useState<
    {
      teamB_name: string;
      teamA_name: string;
      teamA_score: number;
      teamB_score: number;
      status: string;
      minute: number;
    }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";
  const WS_BASE_URL =
    process.env.NEXT_PUBLIC_WS_API_URL || "http://localhost:7000";

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await fetch(`${BASE_URL}/ws/`);
        const matchesData: Match[] = await data.json();
        setMatches(matchesData);
      } catch (err) {
        console.error("Failed to fetch matches:", err);
      }
    };
    fetchMatches();
  }, [BASE_URL]);
  const [conecteds, setConnecteds] = useState(false);

  // my trial of connecting to the front end
  useEffect(() => {
    const mId = [3, 4, 5, 6, 7, 8, 9];
    mId.map((m) => {
      const wsU = `${WS_BASE_URL}/ws/scores/${m}/`;
      const sock = new WebSocket(wsU);
      sock.onopen = () => {
        setConnecteds(true);
        console.log("connected to websocket 3");
      };

      sock.onmessage = (event) => {
        try {
          const data: ScoreUpdate = JSON.parse(event.data);
          console.log("WebSocket message received:", data);
          if (data.score) {
            console.log("Received score update:", data.score);

            setScores([...scores, data.score]);
          }
        } catch (err) {
          console.error("Failed to parse WebSocket message:", err);
        }
      };
      sock.onerror = (event) => {
        setError("error occured on setup");
      };
    });
  }, []);

  return (
    <>
      {scores.map((score) => (
        <div
          key={score.minute}
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4"
        >
          <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${"bg-green-400"}`}></div>
                <span className="text-sm font-medium">LIVE</span>
              </div>
              <div className="text-xs">
                {score.status === "live"
                  ? `${score.minute}'`
                  : (score.status as string).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {score.teamA_name}
                </div>
                <div className="text-4xl font-black text-blue-600">
                  {score.teamA_score}
                </div>
              </div>

              <div className="px-4 text-center">
                <div className="text-2xl font-bold text-gray-400 mb-1">VS</div>
                <div className="text-xs text-gray-500">
                  {score.status === "live"
                    ? "LIVE"
                    : (score.status as string).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-gray-800 mb-1">
                  {score.teamB_name}
                </div>
                <div className="text-4xl font-black text-red-600">
                  {score.teamB_score}
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700">
                  {score.status === "live"
                    ? `Minute ${score.minute}`
                    : "Match Ended"}
                </span>
              </div>
            </div>
          </div>

          {/* {selectedMatch && (!score || score.status !== "live") && (
          <div className="p-8 text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm">Waiting for match data...</p>
          </div>
          )} */}

          {error && (
            <div className="p-3 bg-red-50 border-t border-red-200">
              <p className="text-xs text-red-600 text-center">{error}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
