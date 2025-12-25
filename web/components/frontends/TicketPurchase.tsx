"use client";

import { useState } from "react";

type TicketType = {
  id: number;
  name: string;
  price: string;
  remaining: number;
};

type EventData = {
  id: number;
  name: string;
  venue: string;
  date: string;
  team_a: string;
  team_b: string;
  ticket_types: TicketType[];
};

type TicketPurchaseFormProps = {
  event: EventData;
  // could also be buyer name/email depending on your backend
};

export default function TicketPurchaseForm({ event }: TicketPurchaseFormProps) {
  const [ticketTypeId, setTicketTypeId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [buyer, setbuyer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTypeId) return setMessage("Please select a ticket type.");
    if (quantity < 1) return setMessage("Quantity must be at least 1.");

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:7000/tickets/purchased/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: ticketTypeId,
          buyer: buyer,
          quantity: quantity,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to purchase ticket");
      }

      const data = await res.json();
      console.log(data);
      setMessage(
        `Successfully purchased ${quantity} ticket(s)! Code: ${data.map(
          (d: any) => `ticket code: ${d.ticket_code}`
        )}`
      );
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">
          {event.name} - Ticket Purchase
        </h2>

        <p className="mb-2">
          {event.team_a} vs {event.team_b} @ {event.venue} on{" "}
          {new Date(event.date).toLocaleString()}
        </p>

        <label className="block mb-2 font-medium">Select Ticket Type:</label>
        <select
          value={ticketTypeId ?? ""}
          onChange={(e) => setTicketTypeId(Number(e.target.value))}
          className="border p-2 w-full mb-4"
        >
          <option value="">-- Select --</option>
          {event.ticket_types.map((t) => (
            <option key={t.id} value={t.id} disabled={t.remaining <= 0}>
              {t.name} - ${t.price} ({t.remaining} left)
            </option>
          ))}
        </select>

        <label className="block mb-2 font-medium">Email:</label>
        <input
          type="email"
          value={buyer}
          onChange={(e) => setbuyer(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <label className="block mb-2 font-medium">Quantity:</label>
        <input
          type="number"
          min={1}
          max={
            ticketTypeId
              ? event.ticket_types.find((t) => t.id === ticketTypeId)?.remaining
              : 1
          }
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-full mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Purchasing..." : "Buy Ticket"}
        </button>

        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </>
  );
}
