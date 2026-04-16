import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.API_BYPASS_TOKEN || "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q";

export async function GET() {
    try {
        const res = await fetch(`${API_BASE}/articles/trending`, {
            headers: { "x-vercel-protection-bypass": API_BYPASS },
            next: { revalidate: 30 },
        });
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch trending articles" }, { status: 500 });
        }
        const data = await res.json();
        return NextResponse.json({ data: data.data });
    } catch (error) {
        return NextResponse.json({ error: "Server error fetching trending articles" }, { status: 500 });
    }
}
