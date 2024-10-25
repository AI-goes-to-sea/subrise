import { getRedditListByPage } from "@/server/subreddits";
import { NextRequest, NextResponse } from "next/server";
import { generateSitemapXml, SitemapUrl } from "@/lib/utils";

export const runtime = 'edge';

export async function GET(req: NextRequest) {

  const page = req.nextUrl.searchParams.get('page') || 1;

  const subreddits = await getRedditListByPage(+page);

  const urls: SitemapUrl[] = subreddits.map(subreddit => ({
    loc: `https://subrise.co/${subreddit.language}/reddit-list/${subreddit.name}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.9
  }))

  const sitemap = generateSitemapXml(urls)

  const response = new NextResponse(sitemap);
  response.headers.set('Content-Type', 'application/xml');
  return response;
}