

import { Suspense } from "react";
import { fetchBreakingNews, fetchFeaturedArticles } from "../lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "JC News Daily",
  openGraph: {
    title: "Home | JC News Daily",
    description: "JC News Daily",
  },
  twitter: {
    title: "Home | JC News Daily",
    description: "JC News Daily",
  },
};


export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Suspense fallback={<BreakingNewsSkeleton />}>
        <BreakingNewsSection />
      </Suspense>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 py-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">News and insights for modern web developers.</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-xl">
            Changelogs, engineering deep dives, customer stories, and community updates — all in one place.
          </p>
          <div className="flex gap-4">
            <a href="/search" className="px-5 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-80 transition">Browse articles</a>
            <button className="px-5 py-2 rounded border border-black dark:border-white font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">Subscribe</button>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <Suspense fallback={<div className="w-72 h-44 bg-zinc-200 animate-pulse rounded-lg" /> }>
            <FeaturedHeroImage />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<FeaturedArticlesSkeleton />}>
        <FeaturedArticlesSection />
      </Suspense>
    </div>
  );
}

async function BreakingNewsSection() {
  let breakingNews: any[] = [];
  try {
    breakingNews = await fetchBreakingNews();
  } catch {}
  if (!breakingNews.length) return null;
  return (
    <div className="w-full bg-black text-white py-2 px-4 rounded mb-4 flex items-center gap-2">
      <span className="font-bold text-xs bg-red-600 px-2 py-1 rounded mr-2">BREAKING</span>
      <span>{breakingNews[0].headline}</span>
    </div>
  );
}

async function FeaturedHeroImage() {
  let featured: any[] = [];
  try {
    featured = await fetchFeaturedArticles();
  } catch {}
  return (
    <img src={featured[0]?.image || "/pro-plan.png"} alt="Featured story" className="rounded-lg shadow-lg w-72 h-44 object-cover" />
  );
}

async function FeaturedArticlesSection() {
  let featured: any[] = [];
  try {
    featured = await fetchFeaturedArticles();
  } catch {}
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Featured</h2>
        <a href="/search" className="text-sm text-zinc-500 hover:underline">View all</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.length > 0 ? (
          featured.slice(0, 6).map((article: any) => (
            <ArticleCard
              key={article.id}
              image={article.image || "/pro-plan.png"}
              category={article.category}
              date={new Date(article.publishDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              title={article.headline}
              href={`/articles/${article.id}`}
              excerpt={article.excerpt || article.summary || ""}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-zinc-500">No featured articles found.</div>
        )}
      </div>
    </section>
  );
}

function BreakingNewsSkeleton() {
  return <div className="w-full h-10 bg-zinc-200 animate-pulse rounded mb-4" />;
}

function FeaturedArticlesSkeleton() {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Featured</h2>
        <span className="text-sm text-zinc-500">Loading...</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-zinc-200 animate-pulse rounded-lg" />
        ))}
      </div>
    </section>
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
