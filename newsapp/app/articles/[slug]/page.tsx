

import { Suspense } from "react";
import { fetchTrendingArticles } from "../../../lib/api";
import ArticlesGridDisplay from "@/app/components/articlesGridDisplay";
import ArticleDetail from "@/app/components/articleDetail";



export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Article Detail</h1>
      <Suspense fallback={<ArticleDetailSkeleton />}>
        <ArticleDetail id={slug} />
      </Suspense>

      <h2 className="text-xl font-semibold mb-4">Trending Articles</h2>
      <Suspense fallback={<TrendingArticlesSkeleton />}>
        <TrendingArticlesSection />
      </Suspense>
    </div>
  );
}

function ArticleDetailSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-2/3 bg-zinc-200 rounded" /> {/* Title skeleton */}
      <div className="h-4 w-full bg-zinc-200 rounded" />
      <div className="h-4 w-5/6 bg-zinc-200 rounded" />
      <div className="h-4 w-4/6 bg-zinc-200 rounded" />
      <div className="h-4 w-3/6 bg-zinc-200 rounded" />
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


