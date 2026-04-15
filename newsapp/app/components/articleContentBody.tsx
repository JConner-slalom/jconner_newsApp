import React from "react";

type ArticleContentBlock = {
    type: string;
    text: string;
};

export default function ArticleContentBody({ content }: { content: ArticleContentBlock[] }) {
	if (!content) return null;
	return (
		<>
			{content.map((block, idx) => (
				<p key={idx}>{renderMarkdownLinks(block.text)}</p>
			))}
		</>
	);
}

// Helper to render [text](url) as anchor tags
function renderMarkdownLinks(text: string) {
	if (!text) return null;
	const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
	const parts: React.ReactNode[] = [];
	let lastIndex = 0;
	let match;
	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}
		parts.push(
			<a
				key={match[2] + match.index}
				href={match[2]}
				className="text-blue-600 underline break-all"
				target="_blank"
				rel="noopener noreferrer"
			>
				{match[1]}
			</a>
		);
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}
	return parts;
}
