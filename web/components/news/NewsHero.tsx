"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { NewsItem } from "@/lib/types";
import Link from "next/link";

export default function NewsHero({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`}>
      <Card className="relative h-[420px] overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <CardContent className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
          <CardTitle className="text-white text-3xl leading-snug">
            {item.title}
          </CardTitle>

          <p className="text-gray-300 text-sm mt-2 max-w-2xl line-clamp-2">
            {item.content}
          </p>

          <span className="text-xs text-gray-400 mt-4">
            {item.author} • {new Date(item.created_at).toLocaleDateString()}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
