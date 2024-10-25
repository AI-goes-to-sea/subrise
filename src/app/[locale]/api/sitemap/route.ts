
import { generateSitemapXml, SitemapUrl } from '@/lib/utils';
import { getAllTipsNoLimit } from '@/server/tips'
import { NextResponse } from 'next/server';

export const runtime = "edge";

export async function GET() {
  
  // const staticUrls: SitemapUrl[] = [
  //   { loc: `https://subrise.co/en`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1 },
  //   { loc: `https://subrise.co/en/concept`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.9 },
  //   { loc: `https://subrise.co/en/reddit-list`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.8 },
  //   { loc: `https://subrise.co/en/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.9 },
  //   { loc: `https://subrise.co/en/terms-of-service`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
  //   { loc: `https://subrise.co/en/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
  //   { loc: `https://subrise.co/zh`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1 },
  //   { loc: `https://subrise.co/zh/concept`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.9 },
  //   { loc: `https://subrise.co/zh/reddit-list`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.8 },
  //   { loc: `https://subrise.co/zh/blog`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.9 },
  //   { loc: `https://subrise.co/zh/terms-of-service`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
  //   { loc: `https://subrise.co/zh/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
  // ]

  const blogs = await getAllTipsNoLimit();
  // const subreddits = await getAllSubredditNoLimit();

  const dynamicUrls: SitemapUrl[] = [];
  blogs.forEach(blog => {
    dynamicUrls.push({
      loc: `https://subrise.co/${blog.language}/blog/${blog.articleUrl}`,
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