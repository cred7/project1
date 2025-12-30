import { NewsItem } from "@/lib/types";
const BASE_URL = process.env.API_URL;
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article: NewsItem = await fetch(`${BASE_URL}/news/${slug}/`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log;
      return null;
    });

  return article ? (
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
  ) : (
    <p>Article not found</p>
  );
}
