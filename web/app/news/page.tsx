import NewsCard from "@/components/news/NewsCard";
import NewsHero from "@/components/news/NewsHero";
import { NewsItem } from "@/lib/types";

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch("http://localhost:7000/news/", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch news");

  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

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
