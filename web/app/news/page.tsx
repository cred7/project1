import NewsCard from "@/components/news/NewsCard";
import NewsHero from "@/components/news/NewsHero";
import { NewsItem } from "@/lib/types";
import { ApiError, fetchWithCredentials } from "@/lib/utils/api";

const BASE_URL = process.env.API_URL;

async function getNews(): Promise<NewsItem[]> {
  return await fetchWithCredentials(`${BASE_URL}/news/`, {
    cache: "no-store",
  });
}

export default async function NewsPage() {
  let news: NewsItem[] = [];

  try {
    news = await getNews();
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

  if (!news.length) {
    return <p className="text-center py-20">No sports news available.</p>;
  }

  const [headline, ...rest] = news;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <NewsHero item={headline} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
