"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function HomeNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:7000/news/", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: NewsItem[] = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
        setError("Connection error, please try again later");
      }
    };
    fetchNews();
  }, []);

  if (!news.length) return null;

  const [headline, ...rest] = news;

  return error ? (
    <>
      <div className="text-5xl">{error}</div>
    </>
  ) : (
    <section className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Latest News</h2>
        <Link
          href="/news"
          className="text-sm text-muted-foreground hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-4 items-center gap-2 px-2">
        {/* Main headline */}
        <Link className="w-full md:col-span-3" href={`/news/${headline.slug}`}>
          <Card className="overflow-hidden gap-1 py-0">
            <div className="h-70">
              <img
                src={headline.thumbnail}
                alt={headline.title}
                className="h-full w-full  rounded-2xl object-cover"
              />
            </div>
            <CardContent className="p-4 pt-0">
              <CardTitle className="text-2xl leading-tight">
                {headline.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {headline.content}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Secondary headlines */}
        <div className="mt-4 md:col-span-1 md:flex md:flex-col grid sm:grid-col w-full gap-4">
          {rest.slice(0, 3).map((item) => (
            <Link key={item.id} href={`/news/${item.slug}`}>
              <Card className="hover:bg-muted/50 transition">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                  <CardTitle className="text-sm leading-snug line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
