import { SITEMAP_INDEX_PAGE_SIZE } from "@/constants";
import { generateSitemapIndexXml } from "@/lib/utils";
import { getSubredditTotalCount } from "@/server/subreddits";
import { NextResponse } from "next/server";

export async function GET() {
  const totalCount = await getSubredditTotalCount();
  const totalPages = Math.ceil(totalCount[0].count / SITEMAP_INDEX_PAGE_SIZE);

  let urls: string[] = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   urls.push(`https://subrise.co/en/api/reddit-sitemap/${i}`);
  // }

  let i = 1;
  while (i <= totalPages) {
    urls.push(`https://subrise.co/en/api/reddit_map/${i}`);
    i++;
  }

  const sitemapIndex = generateSitemapIndexXml(urls);

  const response = new NextResponse(sitemapIndex);
  response.headers.set('Content-Type', 'application/xml');
  return response;
}