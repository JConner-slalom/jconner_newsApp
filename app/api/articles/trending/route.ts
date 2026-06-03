import { NextResponse } from "next/server";
import { cacheLife } from "next/cache";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.API_BYPASS_TOKEN || "";

async function getTrendingPayload(): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
    "use cache";
    cacheLife({ revalidate: 30 });
    try {
        const res = await fetch(`${API_BASE}/articles/trending`, {
            headers: { "x-vercel-protection-bypass": API_BYPASS },
        });
        if (!res.ok) {
            return { ok: false, error: "Failed to fetch trending articles" };
        }
        const data = await res.json();
        return { ok: true, data: data.data };
    } catch {
        return { ok: false, error: "Server error fetching trending articles" };
    }
}

export async function GET() {
    const payload = await getTrendingPayload();
    if (!payload.ok) {
        return NextResponse.json({ error: payload.error }, { status: 500 });
    }
    return NextResponse.json({ data: payload.data });
}
