import React from "react";

type Article = {
    image: string;
    category: string;
    date: string;
    title: string;
    href: string;
    excerpt: string;
}

type ArticlesGridDisplayProps = {
    featured: Article[];
}

export default function ArticlesGridDisplay({ featured }: ArticlesGridDisplayProps) {
    return (
        <section className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.length > 0 ? (
                    featured.slice(0, 5).map((article) => (
                        <ArticleCard
                            key={article.id}
                            image={article.image || "/pro-plan.png"}
                            category={article.category}
                            date={article.publishDate ? new Date(article.publishDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}
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

function ArticleCard({ image, category, date, title, href, excerpt }: Article) {
    return (
        <a href={href} className="block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:shadow-lg transition">
            <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-3" />
            <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">{category} • {date}</div>
            <div className="font-semibold text-lg mb-1 line-clamp-2">{title}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{excerpt}</div>
        </a>
    );
}
