import TicketPurchaseForm from "@/components/frontends/TicketPurchase";
import { Ticket } from "@/lib/types";
import { fetchWithCredentials } from "@/lib/utils/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getPlayer(id: string): Promise<Ticket> {
  let ids = id || "1";
  const res = await fetchWithCredentials(
    `${BASE_URL}/tickets/getticket/${ids}/`,
    { cache: "no-store" }
  );
  console.log(res);
  return res;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getPlayer(id);

  return (
    <div className="p-3">
      {/* kjnbb */}
      <TicketPurchaseForm event={event} />
    </div>
  );
}
