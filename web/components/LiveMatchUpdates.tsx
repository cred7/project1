"use client";

import { useEffect, useState } from "react";

interface LiveMatchUpdatesProps {
  matchId: string;
}

interface ScoreUpdate {
  type: string;
  score: {
    teamA: number;
    teamB: number;
    status: string;
    minute: string;
    // Add other score fields as needed
  };
}

export default function LiveMatchUpdates({ matchId }: LiveMatchUpdatesProps) {
  const [score, setScore] = useState<{
    teamA: number;
    teamB: number;
    status: string;
    minute: string;
  } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const wsUrl = `ws://localhost:9000/ws/scores/${matchId}/`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    ws.onmessage = (event) => {
      try {
        const data: ScoreUpdate = JSON.parse(event.data);
        if (data.score) {
          console.log("Received score update:", data.score);
          setScore(data.score);
          console.log("Received score update:", data.score);
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
  }, [matchId]);

  return (
    <div className="live-match-updates">
      <h3>Live Match Updates</h3>
      <div className="connection-status">
        Status: {isConnected ? "game on" : "Disconnected"}
        {error && <span className="error"> - {error}</span>}
      </div>
      {score && (
        <div className="score-display">
          <p>Home: {score.teamA}</p>
          <p>Away: {score.teamB}</p>
          <p>Updates: {score.status}</p>
          <p>Time: {score.minute}</p>
        </div>
      )}
      <style jsx>{`
        .live-match-updates {
          border: 1px solid #ccc;
          padding: 1rem;
          margin: 1rem 0;
        }
        .connection-status {
          margin-bottom: 1rem;
        }
        .error {
          color: red;
        }
        .score-display {
          font-size: 1.2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
