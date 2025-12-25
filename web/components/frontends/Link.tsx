"use client";
import Link from "next/link";
export type Ticket = {
  id: number;
  name: string;
  venue: string;
  date: string;
  capacity: number;
  slug: string;
  team_b: string;
  team_a: string;
}[];

const Links = ({ tickets }: { tickets: Ticket }) => {
  const button = async (id: number) => {};
  return (
    <div className="flex gap2">
      {tickets.map((p) => (
        <Link key={p.id} href={`/${p.slug}`} className="flex-1">
          <div className="p-2 flex border-l hover:bg-slate-50 min-w-50 flex-col">
            <h1 className="bg-slate-50 w-full rounded flex justify-between px-1">
              {p.date.split("T")[0]}
              <p>A</p>
            </h1>
            <p className="sm">
              {p.team_a} vs {p.team_b}
            </p>

            <p className="text-xs font-bold">{p.name}</p>
            <p>{p.venue} slugg</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Links;
