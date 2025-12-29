import { fetchWithCredentials } from "@/lib/utils/api";
import Links from "./frontends/Link";

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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function Hero() {
  let tickets: Ticket = [];
  let error: string | null = null;

  try {
    const ticket = await fetchWithCredentials(`${BASE_URL}/tickets/events/`, {
      cache: "no-store", // force fresh fetch every request
    });

    tickets = ticket;
    console.log("i am hooooome");
  } catch (err) {
    console.error("Ticket FETCH FAILED:", err);
    error = "ERRORRRRRRRR";
  }

  return (
    <div className="py-2">
      <div className="max-w-mlg md:max-w-6xl mx-auto">
        <div className="w-full  flex flex-col">
          <div className="w-full p-1">
            {!error ? <Links tickets={tickets} /> : "ERROR"}
          </div>
        </div>
      </div>
    </div>
  );
}
