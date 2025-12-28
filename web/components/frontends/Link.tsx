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
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {tickets.map((p) => (
        <Link
          key={p.id}
          href={`/${p.slug}`}
          className="flex-1 min-w-[280px] max-w-[320px]"
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:border-green-300 group overflow-hidden h-full">
            {/* Header with date and H/A indicator */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 px-3 py-2 flex justify-between items-center">
              <span className="text-white font-semibold text-xs">
                {new Date(p.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <div
                className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${
                  p.team_a === "Gor Mahia" ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                {p.team_a === "Gor Mahia" ? "HOME" : "AWAY"}
              </div>
            </div>

            {/* Match details */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {p.team_a}
                  </h3>
                  <span className="text-gray-500 text-xs mx-1">vs</span>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
                    {p.team_b}
                  </h3>
                </div>
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-medium text-gray-700 truncate">
                  {p.name}
                </p>
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-3 h-3 mr-1 flex-shrink-0"
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
                  <span className="text-xs truncate">{p.venue}</span>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="mt-2 flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                <span className="text-xs font-medium">View Details</span>
                <svg
                  className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Links;
