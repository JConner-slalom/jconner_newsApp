import React from "react";
import Link from "next/link";

type Article = {
	id: string;
	image?: string;
	title: string;
	headline?: string;
	category: string;
	publishedAt?: string;
	excerpt?: string;
	summary?: string;
}

type ArticleCardProps = {
	image: string;
	title: string;
	category: string;
	date: string;
	href: string;
	excerpt: string;
}

type ArticlesGridDisplayProps = {
	featured: Article[];
	sectionTitle?: string;
}

export default function ArticlesGridDisplay({ featured, sectionTitle }: ArticlesGridDisplayProps) {
	return (
		<section className="mt-8">
			{sectionTitle && (
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold">{sectionTitle}</h2>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{featured.length > 0 ? (
					featured.slice(0, 6).map((article) => (
						<ArticleCard
							key={article.id}
							image={article.image || "/pro-plan.png"}
							category={article.category}
							date={article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}
							title={article.headline || article.title}
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

function ArticleCard({ image, title, category, date, href, excerpt }: ArticleCardProps) {
	 return (
	 	<Link href={href} className="block rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white p-4 hover:shadow-lg transition">
	 		<img src={image} alt={title} className="w-full h-32 object-cover rounded mb-3" />
	 		<div className="text-xs text-zinc-600 mb-1 uppercase tracking-wide">{category} • {date}</div>
	 		<div className="font-semibold text-lg mb-1 line-clamp-2">{title}</div>
	 		<div className="text-sm text-zinc-600 dark:text-zinc-600 line-clamp-2">{excerpt}</div>
	 	</Link>
	 );
}
