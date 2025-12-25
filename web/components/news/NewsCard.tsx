"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsItem } from "@/lib/types";
import Link from "next/link";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="block">
      <Card className="h-full hover:shadow-md transition">
        {/* Image */}
        <div className="h-48 overflow-hidden rounded-t-xl">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover hover:scale-105 transition"
          />
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {item.content}
          </CardDescription>
        </CardHeader>

        <CardFooter className="text-xs text-muted-foreground flex justify-between">
          <span>{item.author}</span>
          <span>{new Date(item.created_at).toLocaleDateString()}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
