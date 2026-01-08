"use client";

import { g } from "@/app/[id]/page";
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
  const [phone, setPhone] = useState<string>("");
  const [buyer, setbuyer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [trial, trials] = useState<string | undefined>("");
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTypeId) return setMessage("Please select a ticket type.");
    if (quantity < 1) return setMessage("Quantity must be at least 1.");

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/api/payments/initiate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template_id: ticketTypeId,
          buyer: buyer,
          quantity: quantity,
          phone_number: phone,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        g(err);
        throw new Error(err.detail || "Failed to purchase ticket");
      }

      const data = await res.json();
      console.log(data);
      setMessage(` ${data.message}`);
    } catch (err: any) {
      g(err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white mb-1">{event.name}</h2>
        <p className="text-green-100 text-sm">
          {event.team_a} vs {event.team_b} -{BASE_URL}
        </p>
        <button
          className="bg-red"
          onClick={() => trials(process.env.NEXT_PUBLIC_API_URL)}
        >
          REDDDD --{trial}
        </button>
      </div>

      {/* Event Details */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {event.venue}
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Ticket Type Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Ticket Type
          </label>
          <select
            value={ticketTypeId ?? ""}
            onChange={(e) => setTicketTypeId(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
          >
            <option value="">-- Choose your ticket --</option>
            {event.ticket_types.map((t) => (
              <option
                key={t.id}
                value={t.id}
                disabled={t.remaining <= 0}
                className={t.remaining <= 0 ? "text-gray-400" : ""}
              >
                {t.name} - ${t.price} ({t.remaining} remaining)
              </option>
            ))}
          </select>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={buyer}
              onChange={(e) => setbuyer(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1234567890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            max={
              ticketTypeId
                ? event.ticket_types.find((t) => t.id === ticketTypeId)
                    ?.remaining
                : 1
            }
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          />
        </div>

        {/* Purchase Button */}
        <button
          type="submit"
          disabled={loading || !ticketTypeId}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Processing Purchase...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1-5m1.1 5l1.1 5M9 21h6m-3-3v3"
                />
              </svg>
              <span>Purchase Tickets</span>
            </>
          )}
        </button>

        {/* Message Display */}
        {message && (
          <div
            className={`p-4 rounded-lg border ${
              message.includes("STK")
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {message.includes("Successfully") ? (
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 mr-2 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
