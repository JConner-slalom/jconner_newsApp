import { fetchArticleById } from "../../lib/api";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	try {
		const article = await fetchArticleById(slug);
		return {
			title: article?.title,
			description: article?.excerpt,
			openGraph: {
				title: `${article?.title}`,
				description: article?.excerpt,
				images: article?.image ? [article.image] : [],
			},
			twitter: {
				title: `${article?.title}`,
				description: article?.excerpt,
			},
		};
	} catch {
		return {
			title: "Article Detail",
			description: "Read this article on JC News Daily.",
		};
	}
}
