import { ApiError, fetchWithCredentials } from "@/lib/utils/api";
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

const BASE_URL = process.env.API_URL;

export default async function Hero() {
  let tickets: Ticket = [];
  let error: string | null = null;

  try {
    const ticket = await fetchWithCredentials(`${BASE_URL}/tickets/events/`, {
      cache: "no-store", // force fresh fetch every request
    });

    tickets = ticket;
    console.log("i am hooooome");
  } catch (error: any) {
    if (error instanceof ApiError) {
      console.error("Failed to load :", error.message);
      return (
        <p className="text-center py-20">
          {error.message} Please try again later.
        </p>
      );
    }
  }

  return (
    <div className="py-2">
      <div className="max-w-mlg md:max-w-7xl mx-auto">
        <div className="w-full  flex flex-col">
          <div className="w-full p-1">
            {!error ? <Links tickets={tickets} /> : "klklk"}
          </div>
        </div>
      </div>
    </div>
  );
}
