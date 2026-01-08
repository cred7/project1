import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ApiError, fetchWithCredentials } from "@/lib/utils/api";
import Link from "next/link";
import LiveMatchUpdates from "./LiveMatchUpdates";

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

const BASE_URL = process.env.API_URL;

export default async function HomeNews() {
  let fetchNews: NewsItem[] | null = null;

  try {
    fetchNews = await fetchWithCredentials(`${BASE_URL}/news/`);
    console.log("Fetched news:", fetchNews);
  } catch (error: any) {
    if (error instanceof ApiError) {
      console.error("Failed to fetch news:", error.message);
      return (
        <p className="text-center py-20">
          Unable to load news. Please try again later.{error.message}
        </p>
      );
    }
  }

  if (!fetchNews || fetchNews.length === 0) {
    return null; // handle empty array or failed fetch
  }

  const [headline, ...rest] = fetchNews;

  return !fetchNews ? (
    <div className="text-center py-12">
      <div className="text-2xl text-gray-500 mb-2">Unable to load news </div>
      <p className="text-gray-400">Please try again later</p>
    </div>
  ) : (
    <section className="max-w-8xl mx-auto px-1 py-3 space-y-6 mb-3 border">
      {/* Section header */}
      <div className="flex items-center justify-end">
        {/* <h2 className="text-2xl font-bold text-gray-900">Latest News</h2> */}
        <Link
          href="/news"
          className="text-sm p-0 text-green-600 hover:text-green-700 font-medium transition-colors flex items-center group"
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
      <LiveMatchUpdates matchId="2" />
      <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-y-6 gap-x-3 md:h-[50vh] lg:h-[90vh] bg-gradient-to-r from-green-700 to-green-600">
        {/* Main headline */}
        <Link
          className="md:col-span-2 h-full items-center group"
          href={`/news/${headline.slug}`}
        >
          <Card className="h-75 md:min-h-full rounded-none overflow-hidden border-0 m-0 p-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
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
        <div className="md:col-span-1 md:h-full h-35 sm:h-45 w-full flex gap-1 md:flex-col border">
          {/* Mobile: Horizontal scrollable strip */}
          {/* <div className="flex-col w-full h-full flex"> */}
          {rest.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.slug}`}
              className=" w-full h-full flex-1 group"
            >
              <Card className="p-0 rounded-none overflow-hidden w-full h-full border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5">
                <div className="relative h-full overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-[50%] inset-0 bg-gradient-to-t from-black/40 to-transparent">
                    <CardContent className="px-1 ">
                      <div className="flex items-center justify-between mb-0">
                        <span className="text-xs text-gray-500 font-medium">
                          {new Date(item.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
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
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
