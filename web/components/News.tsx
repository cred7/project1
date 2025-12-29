import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  author: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  slug: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function HomeNews() {
  let fetchNews: NewsItem[] | null = null;

  try {
    const res = await fetch(`${BASE_URL}/news/`, { cache: "no-store" });

    if (!res.ok) {
      console.error("HTTP error:", res.status);
      return null;
    }

    fetchNews = await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    return null;
  }

  if (!fetchNews || fetchNews.length === 0) {
    return null; // handle empty array or failed fetch
  }

  const [headline, ...rest] = fetchNews;

  return !fetchNews ? (
    <div className="text-center py-12">
      <div className="text-2xl text-gray-500 mb-2">Unable to load news</div>
      <p className="text-gray-400">Please try again later</p>
    </div>
  ) : (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-6 mb-3">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
        <Link
          href="/news"
          className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors flex items-center group"
        >
          View all news
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 md:h-[80vh]">
        {/* Main headline */}
        <Link className="lg:col-span-2 h group" href={`/news/${headline.slug}`}>
          <Card className="overflow-hidden border-0 m-0 p-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
            <div className="relative h-full overflow-hidden">
              <img
                src={headline.thumbnail}
                alt={headline.title}
                className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full mb-3">
                  FEATURED
                </div>
                <CardTitle className="text-2xl md:text-3xl leading-tight text-white mb-2 group-hover:text-green-100 transition-colors">
                  {headline.title}
                </CardTitle>
                <p className="text-gray-200 text-sm line-clamp-2">
                  {headline.content}
                </p>
              </div>
            </div>
          </Card>
        </Link>

        {/* Secondary headlines - Horizontal strip on mobile, vertical column on desktop */}
        <div className="lg:col-span-1 h-full w-full lg:flex lg:flex-col border">
          {/* Mobile: Horizontal scrollable strip */}
          {/* <div className="flex-col w-full h-full flex"> */}
          {rest.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className=" w-full h-full lg:flex-1 group"
            >
              <Card className="overflow-hidden lg:w-full lg:h-full border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative h-full overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <CardContent className="px-1">
                  <div className="flex items-center justify-between mb-0">
                    <span className="text-xs text-gray-500 font-medium">
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <svg
                      className="w-3 h-3 text-green-600 group-hover:translate-x-1 transition-transform"
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
                  <CardTitle className="text-xs leading-snug text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
          {/* </div> */}

          {/* Desktop: Vertical column */}
          {/* <div className="hidden lg:flex lg:flex-col lg:space-y-4">
            {rest.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="block group"
              >
                <Card className="overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <svg
                        className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform"
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
                    <CardTitle className="text-sm leading-snug text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
