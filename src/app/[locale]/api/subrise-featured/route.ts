import { generateSitemapXml, SitemapUrl } from "@/lib/utils";
import { getAllSubredditFeatured } from "@/server/featured";
import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET(request: Request) {

  const result = await getAllSubredditFeatured();

  const dynamicUrls: SitemapUrl[] = [];

  result.forEach(item => {
    dynamicUrls.push({
      loc: `https://subrise.co/${item.language}/subrise-featured/${item.featuredUrl}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.8
    })
  })
  
  const urls = [...dynamicUrls]
  const sitemap = generateSitemapXml(urls)

  const response = new NextResponse(sitemap);
  response.headers.set('Content-Type', 'application/xml');
  return response;
}