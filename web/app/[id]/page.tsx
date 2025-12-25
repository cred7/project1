import TicketPurchaseForm from "@/components/frontends/TicketPurchase";
import { Ticket } from "@/lib/types";
import { fetchWithCredentials } from "@/lib/utils/api";

async function getPlayer(id: string): Promise<Ticket> {
  const res = await fetchWithCredentials(
    `http://localhost:7000/tickets/getticket/${id}/`,
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
