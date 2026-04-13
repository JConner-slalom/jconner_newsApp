

import { Suspense } from "react";
import { fetchTrendingArticles } from "../../../lib/api";
import ArticlesGridDisplay from "@/app/components/articlesGridDisplay";



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

function TrendingArticlesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="h-40 bg-zinc-200 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

async function TrendingArticlesSection() {
  let trending: any[] = [];
  try {
    trending = await fetchTrendingArticles();
  } catch {}
  return <ArticlesGridDisplay featured={trending} />;
}


