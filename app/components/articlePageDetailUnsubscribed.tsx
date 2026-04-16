import { fetchArticleById } from "../../lib/api";
import ArticleSubButton from "./articleSubButton";

type ArticleContentBlock = {
    type: string;
    text: string;
}

type ArticleData = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: ArticleContentBlock[];
    category: string;
    author: {
        name: string;
        avatar: string;
    };
    image: string;
    publishedAt: string;
    featured: boolean;
    tags: string[];
}

export default async function ArticlePageDetailUnsubscribed({ id }: { id: string }) {
	  let article: ArticleData | null = null;
    try {
        const res = await fetchArticleById(id);
        article = res;
    } catch {
        return <div className="text-red-500">Failed to load article.</div>;
    }
    if (!article) {
        return <div className="text-zinc-500">Article not found.</div>;
    }

    return (
        <article className="prose max-w-none mx-auto py-8">
            {article.image && (
                <img src={article.image} alt={article.title} className="w-full rounded-lg mb-6" />
            )}
            <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
            <div className="flex items-center gap-3 mb-4">
                {article.author?.avatar && (
                    <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full" />
                )}
                <span className="font-medium">{article.author?.name}</span>
                <span className="text-zinc-400">&bull;</span>
                <span className="text-zinc-400">
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : ""}
                </span>
                <span className="text-zinc-400">&bull;</span>
                <span className="uppercase text-xs tracking-wide bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                    {article.category}
                </span>
            </div>
            <div className="space-y-4">
                <p>{article.excerpt}</p>
            </div>
            {article.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                        <span key={tag} className="bg-zinc-200 dark:bg-zinc-700 text-xs px-2 py-1 rounded">{tag}</span>
                    ))}
                </div>
            )}
            <div className="flex justify-center mt-8">
                <ArticleSubButton />
            </div>

        </article>
    );
}
