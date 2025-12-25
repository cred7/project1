import { Player } from "@/lib/types";

async function getPlayer(id: string): Promise<Player> {
  console.log(id);
  const res = await fetch(`http://localhost:7000/tickets/{$}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export default async function Page({ params }: { params: string }) {
  console.log("hh", params);
  //   const player = await getPlayer(params);

  return (
    <div>
      {/* <h1>{player.name}</h1>
      <p>{player.venue}</p>
      <p>{player.date}</p>
      <p>
        {player.team_a} vs {player.team_b}
      </p> */}
    </div>
  );
}
