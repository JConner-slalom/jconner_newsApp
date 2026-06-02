export const defaultCat = "Select Category";

export type SearchArticle = {
    id: string;
    image?: string;
    title: string;
    headline?: string;
    category: string;
    publishDate?: string;
    publishedAt?: string;
    excerpt?: string;
    summary?: string;
};

export const Categories = [
    defaultCat,
    "customers",
    "community",
    "company-news",
    "changelog",
    "engineering",
];
