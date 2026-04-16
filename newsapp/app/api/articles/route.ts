import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://vercel-daily-news-api.vercel.app/api";
const API_BYPASS = process.env.API_BYPASS_TOKEN;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = searchParams.toString();
        const url = `${API_BASE}/articles${params ? `?${params}` : ''}`;

        const apiRes = await fetch(url, {
            headers: {
                'x-vercel-protection-bypass': API_BYPASS,
            },
        });
        const text = await apiRes.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid JSON from upstream API', raw: text }, { status: 502 });
        }
        return NextResponse.json(data, { status: apiRes.status });
    } catch (err) {
        return NextResponse.json({ error: 'Proxy error', details: (err as Error).message }, { status: 500 });
    }
}
