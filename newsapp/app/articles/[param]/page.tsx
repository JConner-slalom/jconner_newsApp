

import { Suspense } from "react";
import { fetchTrendingArticles } from "../../../lib/api";



export default function ArticleDetailPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Article Detail</h1>
      <p className="mb-8">This is the article detail page. Dynamic content will be loaded here.</p>

      <h2 className="text-xl font-semibold mb-4">Trending Articles</h2>
      <Suspense fallback={<TrendingArticlesSkeleton />}>
        <TrendingArticlesSection />
      </Suspense>
    </div>
  );
}

async function TrendingArticlesSection() {
  let trending: any[] = [];
  try {
    trending = await fetchTrendingArticles();
  } catch {}
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trending.length > 0 ? (
        trending.slice(0, 4).map((article: any) => (
          <ArticleCard
            key={article.id}
            image={article.image || "/pro-plan.png"}
            category={article.category}
            date={formatDate(article.publishDate)}
            title={article.headline}
            href={`/articles/${article.id}`}
            excerpt={article.excerpt || article.summary || ""}
          />
        ))
      ) : (
        <div className="col-span-2 text-center text-zinc-500">No trending articles found.</div>
      )}
    </div>
  );
}

function TrendingArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-40 bg-zinc-200 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

function ArticleCard({ image, category, date, title, href, excerpt }: {
  image: string;
  category: string;
  date: string;
  title: string;
  href: string;
  excerpt: string;
}) {
  return (
    <a href={href} className="block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-3" />
      <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">{category} • {date}</div>
      <div className="font-semibold text-lg mb-1 line-clamp-2">{title}</div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{excerpt}</div>
    </a>
  );
}

function formatDate(dateString: string | undefined): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
