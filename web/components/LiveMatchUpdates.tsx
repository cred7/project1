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
    teamA_score: number;
    teamB_score: number;
    status: "live" | "ended" | string;
    minute: number;
  };
}

export default function LiveMatchUpdates({}: LiveMatchUpdatesProps) {
  const [score, setScore] = useState<{
    teamA_score: number;
    teamB_score: number;
    status: string;
    minute: number;
  } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";
  const WS_BASE_URL =
    process.env.NEXT_PUBLIC_WS_API_URL || "http://localhost:9000";

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

  useEffect(() => {
    if (selectedMatchId) {
      const match = matches.find((m) => m.id.toString() === selectedMatchId);
      setSelectedMatch(match || null);
    } else {
      setSelectedMatch(null);
    }
  }, [selectedMatchId, matches]);

  useEffect(() => {
    if (!selectedMatchId) return;

    const wsUrl = `${WS_BASE_URL}/ws/scores/${selectedMatchId}/`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data: ScoreUpdate = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        if (data.score) {
          console.log("Received score update:", data.score);

          setScore(data.score);
          // console.log("Received score update:", data.score);
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      setError("WebSocket connection failed");
      console.error("WebSocket error:", err);
    };

    return () => {
      ws.close();
    };
  }, [selectedMatchId, WS_BASE_URL]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4">
      <h3 className="text-lg font-bold mb-2">Select a Live Match</h3>
      <select
        value={selectedMatchId || ""}
        onChange={(e) => setSelectedMatchId(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Choose a match</option>
        {matches.map((match) => (
          <option key={match.id} value={match.id.toString()}>
            {match.teamA} vs {match.teamB} ({match.status})
          </option>
        ))}
      </select>

      {selectedMatch && score && score.status === "live" && (
        <>
          <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-400" : "bg-red-400"
                  }`}
                ></div>
                <span className="text-sm font-medium">
                  {isConnected ? "LIVE" : "OFFLINE"}
                </span>
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
                  {selectedMatch.teamA}
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
                  {selectedMatch.teamB}
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
        </>
      )}

      {selectedMatch && (!score || score.status !== "live") && (
        <div className="p-8 text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm">Waiting for match data...</p>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border-t border-red-200">
          <p className="text-xs text-red-600 text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
