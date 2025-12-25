import { NewsItem } from "@/lib/types";

async function getArticle(slug: string): Promise<NewsItem> {
  const res = await fetch(`http://localhost:7000/news/${slug}/`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Article not found");

  return res.json();
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <p className="text-sm text-gray-500 mb-6">
        By {article.author} •{" "}
        {new Date(article.created_at).toLocaleDateString()}
      </p>

      <img
        src={article.thumbnail}
        alt={article.title}
        className="w-full rounded-lg mb-6"
      />

      <div className="prose max-w-none">{article.content}</div>
    </article>
  );
}
